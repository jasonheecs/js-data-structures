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

  bfs (vertexA, vertexB) {
    let q = [];
    let visited = new Set();

    q.push([vertexA]);
    visited.add(vertexA);

    while (q.length) {
      let path = q.shift();
      let v = path[path.length - 1];

      if (v === vertexB) {
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

  dfs (vertexA, vertexB) {
    let visited = new Set();
    let adjList = this.adjList;

    return dfsHelper(vertexA, []);

    /**
     * @param  {*} v
     * @param  {Array} path
     * @return {Array | boolean}
     */
    function dfsHelper (v, path) {
      path.push(v);
      visited.add(v);

      if (v === vertexB) {
        return path;
      }

      for (let adjacent of adjList.get(v)) {
        if (!visited.has(adjacent)) {
          let result = dfsHelper(adjacent, path);

          if (result) {
            return result;
          }
        }
      }

      return [];
    }
  }

  get vertices () {
    return Array.from(this.adjList.keys());
  }
}
