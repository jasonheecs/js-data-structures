'use strict';

/**
 * size()
 * height()
 */
class Node {
  constructor (value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }

  /**
   * @return {Boolean}
   */
  isLeaf () {
    return !this.left && !this.right;
  }
}

/**
 * insert()
 * search()
 * getMin()
 * getMax()
 * preOrder()
 * inOrder()
 * postOrder()
 * levelOrder()
 */
export default class {
  constructor () {
    this.root = null;
    console.log(new Node(1));
  }
};
