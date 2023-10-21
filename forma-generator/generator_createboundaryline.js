
import {extrudeGeoJSON } from "geometry-extrude";




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
                100,
                0
              ],
              [
                100,
                100
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
    ]
  };

  const boundaryline = {
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
                -100,
                0
              ],
              [
                200,
                200
              ],
              [
                200,
                -100
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
                3,
                3
              ],
            ]
          ],
          "type": "Polygon"
        }
      },
      {
        "type": "Feature",
        "properties": {
          "elevation": 10,
          "height": 10
        },
        "geometry": {
          "coordinates": [
            [
              [
                20,
                20
              ],
            ]
          ],
          "type": "Polygon"
        }
      }
    ]
  };


  return {
    properties: { category: "constraints" },
    geojson: boundaryline 
    
  };
}


// npx esbuild --bundle --format=esm --outfile=index.js generator_createboundaryline.js
//npx http-server --cors -c-1