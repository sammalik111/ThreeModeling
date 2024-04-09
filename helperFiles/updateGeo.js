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
