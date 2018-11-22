'use strict';

import { Graph } from '../src/index.js';

const expect = require('chai').expect;

/**
 * Create and populate a Graph
 * @return {Graph}
 */
function createGraph () {
  let g = new Graph();
  let vertices = [ 'A', 'B', 'C', 'D', 'E', 'F' ];

  // adding vertices
  for (let i = 0; i < vertices.length; i++) {
    g.addVertex(vertices[i]);
  }

  // adding edges
  g.addEdge('A', 'B');
  g.addEdge('A', 'D');
  g.addEdge('A', 'E');
  g.addEdge('B', 'C');
  g.addEdge('D', 'E');
  g.addEdge('E', 'F');
  g.addEdge('E', 'C');
  g.addEdge('C', 'F');

  return g;
}

describe('Test Graph', function () {
  let g = createGraph();

  it('test graph creation', function () {
    expect(g.print().replace(/\s/g, '')).to.have.string(`
        A => B D E
        B => A C
        C => B E F
        D => A E
        E => A D F C
        F => E C
      `.trim().replace(/\r?\n|\r|\s/g, ''));
  });

  it('test bfs', function () {
    expect(g.bfs('A', 'F')).to.deep.equal(['A', 'E', 'F']);
    expect(g.bfs('B', 'B')).to.deep.equal(['B']);
    expect(g.bfs('A', 'G')).to.deep.equal([]);
  });

  it('test dfs', function () {
    expect(g.dfs('A', 'F')).to.deep.equal(['A', 'B', 'C', 'E', 'D', 'F']);
    expect(g.dfs('A', 'C')).to.deep.equal(['A', 'B', 'C']);
    expect(g.dfs('C', 'C')).to.deep.equal(['C']);
    expect(g.dfs('A', 'G')).to.deep.equal([]);
  });
});
