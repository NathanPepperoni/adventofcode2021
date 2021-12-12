import loadPuzzleInput from "../utils/loadPuzzleInput.js";

const hasVisitedSmallCaveTwice = (path) => {
  const smallCaves = [];
  for (let i = 0; i < path.length; i++) {
    if (path[i] === path[i].toLowerCase()) {
      if (smallCaves.includes(path[i])) {
        return true;
      } else {
        smallCaves.push(path[i]);
      }
    }
  }
  return false;
};

const countPaths = (adjacencyMatrix, path) => {
  const currentNode = path[path.length - 1];
  if (currentNode === "end") {
    return [path];
  }

  const adjacentNodes = adjacencyMatrix.filter((adjacency) => adjacency[0] === currentNode);

  let paths = [];
  adjacentNodes.forEach((node) => {
    if (node[1] === node[1].toLowerCase()) {
      if ((hasVisitedSmallCaveTwice(path) && path.includes(node[1])) || ["start"].includes(node[1])) {
        return;
      }
    }
    const newPath = JSON.parse(JSON.stringify(path));
    newPath.push(node[1]);
    paths = paths.concat(countPaths(adjacencyMatrix, newPath));
  });
  return paths;
};

function star24() {
  const caveEdges = loadPuzzleInput(12).filter((row) => row.length);

  const adjacencyMatrix = [];
  caveEdges.forEach((edge) => {
    const nodes = edge.split("-");
    adjacencyMatrix.push(nodes);
    adjacencyMatrix.push([nodes[1], nodes[0]]);
  });

  return countPaths(adjacencyMatrix, ["start"]).length;
}

export default star24;
