'use strict';

import { MinHeap } from '../src/index.js';
import { generateRandomNumbers, getRandomIntInclusive } from './helper.js';

const expect = require('chai').expect;

/**
 * @param  {Array<number>} values
 * @return {MinHeap}
 */
function createMinHeap (values) {
  let heap = new MinHeap();

  values.forEach((value) => {
    heap.add(value);
  });

  return heap;
}

describe('Test Min Heap', function () {
  it('test adding values', function () {
    for (let i = 0; i < 100; i++) {
      let data = generateRandomNumbers(100, getRandomIntInclusive(1, 9999), getRandomIntInclusive(1, 9999));
      let heap = createMinHeap(data);

      expect(heap.peek()).to.be.equal(Math.min.apply(Math, data));
    }
  });

  it('test peeking empty heap', function () {
    let heap = new MinHeap();

    expect(heap.peek.bind(heap)).to.throw(Error, 'Heap is empty!');
  });

  it('test poll', function () {
    for (let i = 0; i < 100; i++) {
      let data = generateRandomNumbers(10, getRandomIntInclusive(1, 9999), getRandomIntInclusive(1, 9999));
      let heap = createMinHeap(data);
      let minValue = Math.min.apply(Math, data);

      expect(heap.poll()).to.be.equal(minValue);
      expect(data.length - heap.values.length).to.equal(1);
      data.splice(data.indexOf(minValue), 1);
      expect(heap.poll()).to.be.equal(Math.min.apply(Math, data));
    }
  });
});
