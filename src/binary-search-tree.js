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
   * @return {boolean}
   */
  isLeaf () {
    return !this.left && !this.right;
  }
}

/**
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

  /**
   * @param  {*} value
   * @return {(Node | boolean)}
   */
  search (value) {
    if (this.root === null) {
      return false;
    }

    let current = this.root;

    while (current !== null) {
      if (value === current.value) {
        return current;
      }

      if (value < current.value) {
        current = current.left;
      }

      if (value > current.value) {
        current = current.right;
      }
    }

    return false;
  }

  /**
   * @return {(boolean | *)}
   */
  findMin () {
    if (this.root === null) {
      return false;
    }

    let current = this.root;

    while (current.left !== null) {
      current = current.left;
    }

    return current.value;
  }

  /**
   * @return {(boolean | *)}
   */
  findMax () {
    if (this.root === null) {
      return false;
    }

    let current = this.root;

    while (current.right !== null) {
      current = current.right;
    }

    return current.value;
  }
};
