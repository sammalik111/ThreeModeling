function crossProduct(a, b) {
    return [
      a[1] * b[2] - a[2] * b[1],
      a[2] * b[0] - a[0] * b[2],
      a[0] * b[1] - a[1] * b[0],
    ];
  }
  
  function matrixVectorMultiply(mat, vec) {
    let result = [0, 0, 0];
    for (let i = 0; i < 3; i++) {
      result[i] = mat[i][0] * vec[0] + mat[i][1] * vec[1] + mat[i][2] * vec[2];
    }
    return result;
  }
  
  function addVectors(a, b) {
    return a.map((e, i) => e + b[i]);
  }
  
  function scalarMultiply(vec, scalar) {
    return vec.map(e => e * scalar);
  }

  export default function rotatingFrameTransformation(position, velocity, angularVelocity, timeDelta) {
  
    const omegaMatrix = [
      [0, -angularVelocity[2], angularVelocity[1]],
      [angularVelocity[2], 0, -angularVelocity[0]],
      [-angularVelocity[1], angularVelocity[0], 0]
    ];
    
    const I = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
    const omegaMatrixSquared = omegaMatrix.map(row => row.map((value, i) => row.reduce((sum, cell, j) => sum + cell * omegaMatrix[j][i], 0)));
    
    const rotationMatrix = I.map((row, i) => row.map((value, j) => value + Math.sin(timeDelta) * omegaMatrix[i][j] + (1 - Math.cos(timeDelta)) * omegaMatrixSquared[i][j]));
    
    const newVelocity = matrixVectorMultiply(rotationMatrix, velocity);
    const newPosition = addVectors(matrixVectorMultiply(rotationMatrix, position), scalarMultiply(velocity, timeDelta));
    
    return { newPosition, newVelocity };
  }