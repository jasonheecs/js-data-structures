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

/**
 * Generate a tree with a list of values
 * @param  {Array} data
 * @return {BST}
 */
function generateTree (data) {
  let tree = new BST();

  data.forEach((value) => {
    tree.add(value);
  });

  return tree;
}

describe('Test BST', function () {
  it('test adding values', function () {
    let randomData = generateRandomNumbers(50, 1, 9999);
    let tree = generateTree(randomData);

    expect(checkIfTreeIsBST(tree)).to.be.true;
  });

  it('test adding identical values', function () {
    let randomData = [];
    for (let i = 0; i < 50; i++) {
      randomData.push(1);
    }

    let tree = generateTree(randomData);

    expect(checkIfTreeIsBST(tree)).to.be.true;
  });

  it('test searching tree', function () {
    let randomData = generateRandomNumbers(50, 1, 9999);
    let tree = generateTree(randomData);
    let randomIndex = getRandomIntInclusive(0, randomData.length - 1);
    let searchResult = tree.search(randomData[randomIndex]);

    expect(searchResult.value).to.equal(randomData[randomIndex]);
    expect(checkIfTreeIsBST(searchResult)).to.be.true;
  });

  it('test searching for non-existent value', function () {
    let data = [1, 2, 3, 4, 5];
    let tree = generateTree(data);

    expect(tree.search(10)).to.be.false;
  });

  it('test searching empty tree', function () {
    let tree = new BST();
    expect(tree.search(10)).to.be.false;
  });

  it('test find min', function () {
    let randomData = generateRandomNumbers(50, 1, 9999);
    let tree = generateTree(randomData);

    expect(tree.findMin()).to.equal(Math.min.apply(null, randomData));
  });

  it('test find min of empty tree', function () {
    expect((new BST()).findMin()).to.be.false;
  });

  it('test find max', function () {
    let randomData = generateRandomNumbers(50, 1, 9999);
    let tree = generateTree(randomData);

    expect(tree.findMax()).to.equal(Math.max.apply(null, randomData));
  });

  it('test find max of empty tree', function () {
    expect((new BST()).findMax()).to.be.false;
  });

  it('test deletion of value', function () {
    let randomData = generateRandomNumbers(50, 1, 9999);
    let tree = generateTree(randomData);
    let randomIndex = getRandomIntInclusive(0, randomData.length - 1);
    let randomValue = randomData[randomIndex];

    let oldSize = tree.size();

    tree.delete(randomValue);
    randomData.splice(randomIndex, 1);

    expect(checkIfTreeIsBST(tree)).to.be.true;
    expect(oldSize - tree.size()).to.equal(1);
    expect(tree.size()).to.equal(randomData.length);
  });
});
