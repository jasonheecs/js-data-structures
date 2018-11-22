'use strict';

import { BST } from '../src/index.js';
import { generateRandomNumbers, getRandomIntInclusive } from './helper.js';

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
 * Checks if an array is sorted
 * @param  {Array}  arr
 * @return {Boolean}
 */
function isSorted (arr) {
  return arr.every((el, index) =>
    el <= arr[index + 1] || index >= arr.length - 1
  );
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

  it('test checking tree height', function () {
    let tree = generateTree([4537, 2555, 4842, 1169, 2172, 1000]);
    expect(tree.height()).to.equal(4);

    tree = generateTree([5, 2, -4, 3, 18]);
    expect(tree.height()).to.equal(3);

    tree = generateTree([1, 2, 3, 4, 5]);
    expect(tree.height()).to.equal(5);
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

  it('check preOrder traversal', function () {
    let data = [4537, 2555, 4842, 1169, 2172, 1000];
    let tree = generateTree(data);

    expect(tree.preOrder()).to.deep.equal([4537, 2555, 1169, 1000, 2172, 4842]);
  });

  it('check inOrder traversal', function () {
    let data = [4537, 2555, 4842, 1169, 2172, 1000];
    let tree = generateTree(data);

    expect(tree.inOrder()).to.deep.equal([1000, 1169, 2172, 2555, 4537, 4842]);
    expect(isSorted(tree.inOrder())).to.be.true;
  });

  it('check postOrder traversal', function () {
    let data = [4537, 2555, 4842, 1169, 2172, 1000];
    let tree = generateTree(data);

    expect(tree.postOrder()).to.deep.equal([1000, 2172, 1169, 2555, 4842, 4537]);
  });

  it('check levelOrder traversal', function () {
    let data = [4537, 2555, 4842, 1169, 2172, 1000];
    let tree = generateTree(data);

    expect(tree.levelOrder()).to.deep.equal([4537, 2555, 4842, 1169, 1000, 2172]);
  });

  it('check invert', function () {
    let data = [4, 2, 7, 1, 3, 6, 9];
    let tree = generateTree(data);
    tree.invert();

    expect(tree.inOrder()).to.deep.equal([9, 7, 6, 4, 3, 2, 1]);

    tree.invert();

    expect(tree.inOrder()).to.deep.equal(generateTree(data).inOrder());
  });
});
