'use strict';

import {BST} from '../src/index.js';
import {generateRandomNumbers, getRandomIntInclusive} from './helper.js';

const expect = require('chai').expect;

/**
 * Traverse through tree to check if it is a BST
 * @param  {BST} tree
 * @return {Boolean}
 */
function checkIfTreeIsBST (tree) {
  const checkSubtree = (root) => {
    if (root.isLeaf()) {
      return true;
    }

    if (root.left !== null && root.value >= root.left.value) {
      return checkSubtree(root.left);
    }

    if (root.right !== null && root.value < root.right.value) {
      return checkSubtree(root.right);
    }

    return false;
  };

  return checkSubtree(tree.root || tree);
}

describe('Test BST', function () {
  it('test adding values', function () {
    let tree = new BST();

    let randomData = generateRandomNumbers(50, 1, 9999);
    randomData.forEach((value) => {
      tree.add(value);
    });

    expect(checkIfTreeIsBST(tree)).to.be.true;
  });

  it('test adding identical values', function () {
    let tree = new BST();

    let randomData = [];
    for (let i = 0; i < 50; i++) {
      randomData.push(1);
    }

    randomData.forEach((value) => {
      tree.add(value);
    });

    expect(checkIfTreeIsBST(tree)).to.be.true;
  });

  it('test searching tree', function () {
    let tree = new BST();

    let randomData = generateRandomNumbers(50, 1, 9999);
    randomData.forEach((value) => {
      tree.add(value);
    });

    let randomIndex = getRandomIntInclusive(0, randomData.length - 1);
    let searchResult = tree.search(randomData[randomIndex]);

    expect(searchResult.value).to.equal(randomData[randomIndex]);
    expect(checkIfTreeIsBST(searchResult)).to.be.true;
  });

  it('test searching for non-existent value', function () {
    let tree = new BST();

    let data = [1, 2, 3, 4, 5];
    data.forEach((value) => {
      tree.add(value);
    });

    expect(tree.search(10)).to.be.false;
  });

  it('test searching empty tree', function () {
    let tree = new BST();
    expect(tree.search(10)).to.be.false;
  });
});
