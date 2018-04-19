'use strict';

class Node {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}

export default class List{
  constructor() {
    this.first = null;
  }

  get values() {
    let values = '';

    if (!this.isEmpty()) {
      let current = this.first;
      
      while (current != null) {
        values += JSON.stringify(current.value) + ',';
        current = current.next;
      }

      values = values.slice(0, -1);
    }

    return values;
  }

  /**
   * Prints all values in the linked list
   * @return {string}
   */
  print() {
    if (this.isEmpty()) {
      console.log("List is empty");
    } else {
      let current = this.first;
      let display = '';

      while (current != null) {
        display += JSON.stringify(current.value) + ',';
        current = current.next;
      }

      console.log(display.slice(0, -1));
    }
  }

  /**
  * Adds a value to the end of the linked list
  * @param {*}
  */
  add(value) {
    let n = new Node(value);

    if (this.isEmpty()) {
      this.first = n;
    } else {
      let current = this.first;

      while (current.next != null) {
        current = current.next;
      }

      current.next = n;
    }
  }

  /**
   * Adds a value at first position of list
   * @param {*} value
   */
  addFirst(value) {
    let n = new Node(value, this.first);
    this.first = n;
  }

  /**
  * Adds a value into a specified position in the list
  * @param {*} value
  * @param {Number} position
  */
  addAtPosition(value, position) {
    let n = new Node(value);
    let index = 1;
    let current = this.first;

    if (position === 0) {
      this.addFirst(value);
      return;
    }

    while (current != null) {
      if (index < position) {
        current = current.next;
        index++;
      } else if (index === position) {
        let tmp = current.next;
        current.next = n;
        n.next = tmp;
        break;
      }
    }
    
    if ((index != position && position !== 0) || current === null ) {
      console.log('Unable to add at position ' + position + ', list is of length ' + index);
    }
  }

  /**
  * @return {Boolean}
  */
  isEmpty() {
    return this.first === null;
  }
};