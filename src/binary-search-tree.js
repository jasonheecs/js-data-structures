'use strict';

/**
 * height()
 */
class Node {
  constructor (value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }

  /**
   * Get total number of elements in tree / subtrees
   * @return {number}
   */
  size () {
    const calculateSize = (node) => {
      if (node === null) {
        return 0;
      }

      return 1 + calculateSize(node.left) + calculateSize(node.right);
    };

    return calculateSize(this);
  }

  /**
   * @return {boolean}
   */
  isLeaf () {
    return !this.left && !this.right;
  }
}

/**
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
   * @return {number}
   */
  size () {
    return this.root.size();
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

  /**
   * @param  {*} value
   * @return {Node | null}
   */
  delete (value) {
    const deleteNode = (value, node) => {
      if (node === null) {
        return null;
      }

      if (node.value === value) {
        // node has no children
        if (node.isLeaf()) {
          return null;
        }

        // node has one child
        if (node.left === null || node.right === null) {
          return node.left === null ? node.right : node.left;
        }

        // node has two children
        let tmp = node.right;
        while (tmp.left !== null) {
          tmp = tmp.left;
        }

        node.value = tmp.value;
        node.right = deleteNode(tmp.value, node.right);
      } else if (value < node.value) {
        node.left = deleteNode(value, node.left);
      } else {
        node.right = deleteNode(value, node.right);
      }

      return node;
    };

    this.root = deleteNode(value, this.root);
  }

  print () {
    let printValues = (node) => {
      if (node !== null) {
        console.log(node);
      }

      if (node.left !== null) {
        printValues(node.left);
      }

      if (node.right !== null) {
        printValues(node.right);
      }
    };

    printValues(this.root);
  }
};
