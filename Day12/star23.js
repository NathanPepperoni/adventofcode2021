import loadPuzzleInput from "../utils/loadPuzzleInput.js";

const countPaths = (adjacencyMatrix, path) => {
  const currentNode = path[path.length - 1];
  if (currentNode === 'end') {
    return 1;
  }

  const adjacentNodes = adjacencyMatrix.filter((adjacency) => adjacency[0] === currentNode);

  let sum = 0;
  adjacentNodes.forEach((node) => {
    if (node[1] === node[1].toLowerCase()) {
      if (path.includes(node[1])) {
        return;
      }
    }
    const newPath = JSON.parse(JSON.stringify(path));
    newPath.push(node[1]);
    sum += countPaths(adjacencyMatrix, newPath);
  });
  return sum;
};

function star23() {
  const caveEdges = loadPuzzleInput(12).filter((row) => row.length);

  const adjacencyMatrix = [];
  caveEdges.forEach((edge) => {
    const nodes = edge.split("-");
    adjacencyMatrix.push(nodes);
    adjacencyMatrix.push([nodes[1], nodes[0]]);
  });

  return countPaths(adjacencyMatrix, ["start"]);
}

export default star23;
