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
 * search()
 * findMin()
 * findMax()
 * preOrder()
 * inOrder()
 * postOrder()
 * levelOrder()
 */
export default class BST {
  constructor () {
    this.root = null;
  }

  /**
   * @param {*} value
   */
  add (value) {
    let node = new Node(value);

    if (this.root === null) {
      this.root = node;
    } else {
      const searchTree = (node, root) => {
        if (node.value <= root.value) {
          if (root.left === null) {
            root.left = node;
          } else {
            searchTree(node, root.left);
          }
        } else if (node.value > root.value) {
          if (root.right === null) {
            root.right = node;
          } else {
            searchTree(node, root.right);
          }
        }
      };

      searchTree(node, this.root);
    }
  }
};
