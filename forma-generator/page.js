import React, { useEffect } from 'react';
import { extrudePolygon } from "geometry-extrude";  // Ensure the library and import path are correct

export default function Home() {
    
    useEffect(() => {
        const {indices, position} = extrudePolygon(
            [[[[0, 0], [10, 0], [10, 10], [0, 0]]]],
            {
                depth: 200
            }
        );
        
        console.log(indices);
        console.log(position);
    }, []);
    
    return (
        <div>
            {/* Your component JSX here */}
        </div>
    );
}
