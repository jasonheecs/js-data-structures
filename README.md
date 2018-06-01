# Data Structures in Javascript
[![Build Status](https://travis-ci.org/jasonheecs/js-data-structures.svg?branch=master)](https://travis-ci.org/jasonheecs/js-data-structures) [![Coverage Status](https://coveralls.io/repos/github/jasonheecs/js-data-structures/badge.svg?branch=master)](https://coveralls.io/github/jasonheecs/js-data-structures?branch=master)

A package containing implementations of various data structures in Javascript. This project is mainly a learning exercise and personal refresher on the common CS data structures, in addition to playing around with test coverage reports with [coveralls](https://coveralls.io/)

## Installation
`npm install @jasonheecs/js-data-structures --save`

## Data Structures
- [Binary Search Tree](src/binary-search-tree.js)
- [Singly Linked List](src/singly-linked-list.js)
- [Doubly Linked List](src/doubly-linked-list.js)
- [Circular Linked List](src/circular-linked-list.js)
- [Queue](src/queue.js)
- [Stack](src/stack.js)
- [Trie](src/trie.js)
- [Min Heap](src/min-heap.js)

## Usage
```js
    var {BST} = require('@jasonheecs/js-data-structures');
    var {List} = require('@jasonheecs/js-data-structures');
    var {Trie} = require('@jasonheecs/js-data-structures');

    var bst = new BST();
    bst.add(10);
    bst.add(5);
    bst.add(15);

    console.log(bst.inOrder()); // [5, 10, 15]


    var linkedList = new List();
    linkedList.add(1);
    linkedList.add(2);
    linkedList.add(3);

    console.log(linkedList.search(2)); // Node { value: 2, next: Node { value: 3, next: null } }


    var trie = new Trie();
    trie.addWord('cat');
    trie.addWord('car');
    trie.addWord('dog');

    console.log(trie.find('ca')); 
    /** Node { value: 'a', children: Map {
         't' => Node { value: 't', children: Map {}, isCompleteWord: true },
         'r' => Node { value: 'r', children: Map {}, isCompleteWord: true } },
        isCompleteWord: false } **/
```

## Running unit tests
`npm test`

To run a specific test file, you can use an extra `--` to pass the filename through:  
`npm test -- test/binary-search-tree-test.js`

## License
MIT