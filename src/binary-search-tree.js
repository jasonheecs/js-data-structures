'use strict';

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
   * @return {number}
   */
  height () {
    const calculateHeight = (node) => {
      if (node === null) {
        return 0;
      }

      return Math.max(1 + calculateHeight(node.left), 1 + calculateHeight(node.right));
    };

    return calculateHeight(this);
  }

  /**
   * @return {boolean}
   */
  isLeaf () {
    return !this.left && !this.right;
  }
}

/**
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
   * @return {number}
   */
  height () {
    return this.root.height();
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

  /**
   * @return {Array}
   */
  preOrder () {
    const preOrderTraversal = (node, result) => {
      if (node === null) {
        return;
      }

      result.push(node.value);

      if (node.left) {
        result.concat(preOrderTraversal(node.left, result));
      }

      if (node.right) {
        result.concat(preOrderTraversal(node.right, result));
      }

      return result;
    };

    return preOrderTraversal(this.root, []);
  }

  /**
   * @return {Array}
   */
  inOrder () {
    const inOrderTraversal = (node, result) => {
      if (node === null) {
        return;
      }

      if (node.left) {
        result.concat(inOrderTraversal(node.left, result));
      }

      result.push(node.value);

      if (node.right) {
        result.concat(inOrderTraversal(node.right, result));
      }

      return result;
    };

    return inOrderTraversal(this.root, []);
  }

  /**
   * @return {Array}
   */
  postOrder () {
    const postOrderTraversal = (node, result) => {
      if (node === null) {
        return;
      }

      if (node.left) {
        result.concat(postOrderTraversal(node.left, result));
      }

      if (node.right) {
        result.concat(postOrderTraversal(node.right, result));
      }

      result.push(node.value);

      return result;
    };

    return postOrderTraversal(this.root, []);
  }

  /**
   * @return {Array}
   */
  levelOrder () {
    const getLevel = (root, level, result) => {
      if (root === null) {
        return;
      }

      if (level === 1) {
        return result.push(root.value);
      }

      getLevel(root.left, level - 1, result);
      getLevel(root.right, level - 1, result);
    };

    let result = [];

    for (let i = 1; i <= this.root.height(); i++) {
      getLevel(this.root, i, result);
    }

    return result;
  }

  /**
   * @param  {Node} node
   */
  invert (node) {
    const invertSubtree = (node) => {
      if (node === null) {
        return;
      }

      [node.left, node.right] = [node.right, node.left];

      invertSubtree(node.left);
      invertSubtree(node.right);
    };

    invertSubtree(this.root);
  }
};
