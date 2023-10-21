import { extrudeGEOjson, extrudeGeoJSON, extrudePolyline } from "geometry-extrude";

// generator.js
export async function runGenerator(input) {
  const json = {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "coordinates": [
            [
              [
                0,
                0
              ],
              [
                10,
                0
              ],
              [
                10,
                10
              ],
              [
                0,
                0
              ]
            ]
          ],
          "type": "Polygon"
        }
      },
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "coordinates": [
            [
              [
                100,
                100
              ],
              [
                100,
                200
              ],
              [
                200,
                200
              ],
              [
                100,
                100
              ]
            ]
          ],
          "type": "Polygon"
        }
      },
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "coordinates": [
            [
              [
                300,
                300
              ],
              [
                300,
                800
              ],
              [
                800,
                800
              ],
              [
                300,
                300
              ]
            ]
          ],
          "type": "Polygon"
        }
      },
      {
        "type": "Feature",
        "properties": {
          "elevation": 10,
          "height": 10,
        },
        "geometry": {
          "coordinates": [
            [
              [
                20,
                20
              ],
              [
                40,
                40
              ],
              [
                20,
                40
              ],
              [
                20,
                20
              ]
            ]
          ],
          "type": "Polygon"
        }
      }
    ]
  };
  const results = extrudeGEOjson(
    json,
    {
    
      lineWidth: 20,
    }
  );
  return {
    geojson: results
  };
}

// npx esbuild --bundle --format=esm --outfile=index.js generator_extrudePolyline.js
//npx http-server --cors -c-1