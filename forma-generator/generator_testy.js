import { extrudeGeoJSON, extrudePolygon, extrudePolyline } from "geometry-extrude";
// import { Forma } from "forma-embedded-view-sdk/auto";

// generator.js
export async function runGenerator(input) {
  const { indices, position } = extrudePolygon(
    [[[[0, 0], [10, 0], [10, 10], [0, 0]]]],
    {
      lineWidth: 10
    }
  );
  return {
    mesh: {
      verts: position,
      
    }
  };
}

// npx esbuild --bundle --format=esm --outfile=index.js generator_extrudePolygon.js
//npx http-server --cors -c-1