import { extrudePolygon } from "geometry-extrude";
import { createServer } from "http";
import fetch from "node-fetch";
import dotenv from 'dotenv';
dotenv.config();


async function getApsToken() {
  const basicAuth = Buffer.from(
    `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`
  ).toString("base64");

  const response = await fetch(
    "https://developer.api.autodesk.com/authentication/v2/token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${basicAuth}`,
      },
      body: "grant_type=client_credentials&scope=data:write",
    }
  );

  if (!response.ok) {
    throw new Error("Unexpected response");
  }
  const json = await response.json();
  return json.access_token;
}

async function getBody(req) {
  const buffers = [];
  for await (const data of req) {
    buffers.push(data);
  }
  return Buffer.concat(buffers).toString();
}

function createMesh() {
  
  const { indices, position } = extrudePolygon(
    [[[[0, 0], [10, 0], [10, 10], [0, 0]]]],
    {
      depth: 20,
    }
  );

  return {
    verts: position,
    faces: indices,
  };
}

function createElement(requestBody, mesh) {
  return {
    rootElement: "element1",
    elements: {
      element1: {
        id: "element1",
        properties: {
          geometry: {
            type: "Inline",
            format: "Mesh",
            verts: Array.from(mesh.verts),
            faces: Array.from(mesh.faces),
          },
          generator: {
            generatorId: "urn:adsk-forma-generators:extension:{EXTENSION_ID}:{PROJECT_ID}:generator_1",
            schemaVersion: "1",
          },
          areaStatsReps: {
            grossFloorPolygonsV2: [
              {
                grossFloorPolygon: [[[0, 0], [10, 0], [10, 10], [0, 0]]],
                elevation: 0,
              },
            ],
          },
        },
      },
    },
  };
}

async function processRequest(req, res, token) {
  console.log("Request received");
  if (
    ["https://app.autodeskforma.eu", "https://app.autodeskforma.com"].includes(
      req.headers.origin
    )
  ) {
    res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
    res.setHeader("Access-Control-Allow-Headers", "*");
  }

  if (req.method !== "POST") {
    res.end();
    return;
  }

  const requestBody = JSON.parse(await getBody(req));
  console.log("Request body", requestBody);

  if (requestBody.generatorValues.polygon == null) {
    requestBody.generatorValues.polygon =
      requestBody.generatorValues["965c705a-4e37-4362-b612-da97e5650303"];
  }
  if (requestBody.generatorValues.height == null) {
    requestBody.generatorValues.height =
      requestBody.generatorValues["8853b205-7749-40b3-a73a-198c9e50dafe"];
  }

  if (requestBody.generatorValues.polygon == null) {
    console.log("No polygon found");
    res.end(
      JSON.stringify({
        error: {
          message: "No polygon found",
        },
      })
    );
    return;
  }

  const mesh = createMesh();
  const createElementBody = JSON.stringify(createElement(requestBody, mesh));

  const formaBaseUrl = req.headers["x-forma-base-url"];
  const authcontext = req.headers["x-forma-project-id"];
  const response = await fetch(
    `${formaBaseUrl}/api/integrate/elements?authcontext=${authcontext}`,
    {
      method: "post",
      body: createElementBody,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const element = await response.json();
  console.log("Returning element", element);

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({
      urn: element.urn,
    })
  );
}

const token = await getApsToken();
const server = createServer((req, res) => processRequest(req, res, token));

server.listen(8080);


// npx esbuild --bundle --platform=node --format=esm --outfile=index.js generator_GFApolygons.js

//npx http-server --cors -c-1