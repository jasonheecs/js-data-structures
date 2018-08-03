'use strict';

export default class Graph {
  constructor (isDirected = false) {
    this.isDirected = isDirected;
    this.adjList = new Map();
  }

  addVertex (v) {
    this.adjList.set(v, []);
  }

  addEdge (a, b) {
    this.adjList.get(a).push(b);

    if (!this.isDirected) {
      this.adjList.get(b).push(a);
    }
  }

  print () {
    let output = '';

    for (let vertex of this.adjList.keys()) {
      let adjacencies = this.adjList.get(vertex);
      let str = '';

      adjacencies.forEach((adjVertex) => {
        str += adjVertex + ' ';
      });

      output += `${vertex} => ${str}`;
    }

    console.log(output);

    return output;
  }

  bfs (vertex) {
    let q = [];
    let visited = new Set();
    let firstVertex = this.adjList.keys().next().value;

    q.push([firstVertex]);
    visited.add(firstVertex);

    while (q.length) {
      let path = q.shift();
      let v = path[path.length - 1];

      if (v === vertex) {
        return path;
      }

      this.adjList.get(v).forEach((adjacent) => {
        if (!visited.has(adjacent)) {
          q.push(path.concat([adjacent]));
          visited.add(adjacent);
        }
      });
    }

    return [];
  }

  get vertices () {
    return Array.from(this.adjList.keys());
  }
}
