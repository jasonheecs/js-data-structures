'use strict';

import {Graph} from '../src/index.js';

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
  it('test graph creation', function () {
    let g = createGraph();
    expect(g.print().replace(/\s/g, '')).to.have.string(`
        A => B D E
        B => A C
        C => B E F
        D => A E
        E => A D F C
        F => E C
      `.trim().replace(/\r?\n|\r|\s/g, ''));
  });
});
