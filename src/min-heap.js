'use strict';

/**
 * @param  {number} i
 * @param  {number} j
 * @param  {Array<number>} array
 */
function swap (i, j, array) {
  let tmp = array[i];
  array[i] = array[j];
  array[j] = tmp;
}

/**
 * Min heap implementation using an array
 */

export default class MinHeap {
  constructor () {
    this.values = [];
  }

  /**
   * @param  {number} index
   * @return {number}
   */
  getLeftChildIndex (index) {
    return (index * 2) + 1;
  }

  /**
   * @param  {number} index
   * @return {number}
   */
  getRightChildIndex (index) {
    return (index * 2) + 2;
  }

  /**
   * @param  {number} index
   * @return {number}
   */
  getParentIndex (index) {
    return Math.ceil((index - 2) / 2);
  }

  /**
   * @param  {number} index
   * @return {number}
   */
  getLeftChild (index) {
    this.checkIfEmpty();

    return this.values[this.getLeftChildIndex(index)];
  }

  /**
   * @param  {number} index
   * @return {number}
   */
  getRightChild (index) {
    this.checkIfEmpty();

    return this.values[this.getRightChildIndex(index)];
  }

  /**
   * @param  {number} index
   * @return {number}
   */
  getParent (index) {
    this.checkIfEmpty();

    return this.values[this.getParentIndex(index)];
  }

  /**
   * @param  {number}  index
   * @return {Boolean}
   */
  hasLeftChild (index) {
    return this.getLeftChildIndex(index) < this.values.length;
  }

  /**
   * @param  {number}  index
   * @return {Boolean}
   */
  hasRightChild (index) {
    return this.getRightChildIndex(index) < this.values.length;
  }

  /**
   * @param  {number} index
   */
  add (value) {
    this.values.push(value);

    if (this.values.length > 1) {
      this.heapifyUp();
    }
  }

  /**
   * @return {number}
   */
  peek () {
    this.checkIfEmpty();

    return this.values[0];
  }

  heapifyUp () {
    let currentIndex = this.values.length - 1;

    while (currentIndex > 0 && this.values[currentIndex] < this.getParent(currentIndex)) {
      let parentIndex = this.getParentIndex(currentIndex);

      swap(currentIndex, parentIndex, this.values);
      currentIndex = parentIndex;
    }
  }

  /**
   * @return {number}
   */
  poll () {
    this.checkIfEmpty();

    swap(0, this.values.length - 1, this.values);
    let minNum = this.values.pop();

    if (this.values.length > 1) {
      this.heapifyDown();
    }

    return minNum;
  }

  heapifyDown () {
    let currentIndex = 0;

    while (this.hasLeftChild(currentIndex)) {
      let smallestChildIndex = this.getLeftChildIndex(currentIndex);

      if (this.hasRightChild(currentIndex) && this.getRightChild(currentIndex) < this.getLeftChild(currentIndex)) {
        smallestChildIndex = this.getRightChildIndex(currentIndex);
      }

      if (this.values[currentIndex] < this.values[smallestChildIndex]) {
        break;
      }

      swap(smallestChildIndex, currentIndex, this.values);
      currentIndex = smallestChildIndex;
    }
  }

  checkIfEmpty () {
    if (!this.values.length) {
      throw Error('Heap is empty!');
    }
  }
};
