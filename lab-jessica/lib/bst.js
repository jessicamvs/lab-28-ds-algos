'use strict';

const Node = require('./node.js');

const Tree = module.exports = function() {
  this.root = null;
};

Tree.prototype.insert = function(val) {
  let newNode = new Node(val);

  if(!this.root) {
    this.root = newNode;
    return newNode.val;
  }

  return _insert(this.root, val);

  function _insert(node, val) {
    if( val < node.val ) {
      if(!node.left) {
        node.left = newNode;
        return node.left.val;
      }
      return _insert(node.left, val);
    }

    if( node.val <= val) {
      if(!node.right) {
        node.right = newNode;
        return node.right.val;
      }
      return _insert(node.right, val);
    }
  }
};

Tree.prototype.remove = function(val) {
};
