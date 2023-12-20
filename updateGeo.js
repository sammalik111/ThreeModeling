import { BufferGeometry, BufferAttribute, Matrix4 } from "three";

export default function updateGeometryWithCSGData(OrigGeo, csg) {
    // Create a new BufferGeometry that matches the structure of csg
    const newGeo = new BufferGeometry();

    // Extract vertices and polygons from csg
    const newVertices = [];
    const newIndices = [];
    let vertexIndex = 0;

    csg.polygons.forEach((polygon) => {
        polygon.vertices.forEach((vertex) => {
            newVertices.push(vertex[0], vertex[1], vertex[2]);
            newIndices.push(vertexIndex++);
        });
    });

    // Set the "position" attribute of newGeo with the new vertices
    newGeo.setAttribute("position", new BufferAttribute(new Float32Array(newVertices), 3));
    newGeo.setIndex(new BufferAttribute(new Uint16Array(newIndices), 1));

    // If csg.transforms are provided, apply them to newGeo
    if (csg.transforms) {
        const transforms = new Matrix4();
        transforms.set(...csg.transforms).transpose();
        newGeo.applyMatrix4(transforms);
    }

    // Update OrigGeo to point to the new BufferGeometry
    OrigGeo.dispose(); // Dispose of the old geometry to free up memory
    OrigGeo.copy(newGeo); // Copy the properties of newGeo to OrigGeo
    OrigGeo.computeVertexNormals(); // Compute vertex normals for OrigGeo
    return OrigGeo;
}
