// import { BufferGeometry, BufferAttribute, Matrix4 } from "three";

// export default function updateGeometryWithCSGData(OrigGeo, csg) {
//     // Create a new BufferGeometry that matches the structure of csg
//     const newGeo = new BufferGeometry();

//     // Extract vertices and polygons from csg
//     const newVertices = [];
//     const newIndices = [];
//     let vertexIndex = 0;

//     csg.polygons.forEach((polygon) => {
//         polygon.vertices.forEach((vertex) => {
//             newVertices.push(vertex[0], vertex[1], vertex[2]);
//             newIndices.push(vertexIndex++);
//         });
//     });

//     // Set the "position" attribute of newGeo with the new vertices
//     newGeo.setAttribute("position", new BufferAttribute(new Float32Array(newVertices), 3));
//     newGeo.setIndex(new BufferAttribute(new Uint16Array(newIndices), 1));

//     // If csg.transforms are provided, apply them to newGeo
//     if (csg.transforms) {
//         const transforms = new Matrix4();
//         transforms.set(...csg.transforms).transpose();
//         newGeo.applyMatrix4(transforms);
//     }

//     // Update OrigGeo to point to the new BufferGeometry
//     OrigGeo.dispose(); // Dispose of the old geometry to free up memory
//     OrigGeo.copy(newGeo); // Copy the properties of newGeo to OrigGeo
//     OrigGeo.computeVertexNormals(); // Compute vertex normals for OrigGeo
//     return OrigGeo;
// }



import { BufferGeometry, BufferAttribute, Matrix4, Vector3 } from "three";

export default function updateGeometryWithCSGData(OrigGeo, csg) {
    const vertices = [];
    const indices = [];
    let idx = 0;
    
    csg.polygons.forEach((polygon) => {
        polygon.vertices.forEach((vertex) => {
            vertex.index = idx;
            vertices.push(vertex[0], vertex[1], vertex[2]);
            idx++;
        });

        const first = polygon.vertices[0].index;
        for (let i = 2; i < polygon.vertices.length; i++) {
            indices.push(first, polygon.vertices[i - 1].index, polygon.vertices[i].index);
        }
    });

    const geo = new BufferGeometry();
    geo.setAttribute('position', new BufferAttribute(new Float32Array(vertices), 3));
    geo.setIndex(indices);

    if (csg.transforms) {
        const transforms = new Matrix4();
        transforms.set(...csg.transforms).transpose();
        geo.applyMatrix4(transforms);
    }

    geo.computeVertexNormals();

    // Replace the original geometry with the new one
    if (OrigGeo) {
        OrigGeo.dispose();
    }
    OrigGeo = geo;

    return OrigGeo;
}
