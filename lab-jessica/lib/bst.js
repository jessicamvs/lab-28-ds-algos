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
  if(!this.root) return false;

  if(this.root.val === val) {

    if(this.root.right) {
      let prev = this.root;
      let curr = this.root.right;

      while(curr.left) {
        prev = curr;
        curr = curr.left;
      }
      this.root.val = curr.val;

      if(!curr.right) {
        if(prev.left === curr) {
          prev.left = null;
          return;
        }
        prev.right = null;
        return;

      } else if(curr.right) {
        if(prev.left === curr) {
          prev.left = curr.right;
          return;
        }
        prev.right = curr.right;
        return;
      }
    } else if(this.root.left) {
      let prev = this.root;
      let curr = this.root.left;

      while(curr.right) {
        prev = curr;
        curr = curr.right;
      }
      this.root.val = curr.val;

      if(!curr.left) {
        if(prev.right === curr) {
          prev.right = null;
          return;
        }
        prev.left = null;
        return;
      } else if(curr.left) {
        if(prev.right === curr) {
          prev.right = curr.left;
          return;
        }
        prev.left = curr.left;
        return;
      }
    }

    this.root = null;
  }

};

let bst = new Tree();
bst.insert(9);
bst.insert(5);
// bst.insert(12);
bst.insert(2);
bst.insert(8);
bst.insert(6);
// bst.insert(10);
// bst.insert(16);
// bst.insert(11);
// bst.insert(7);
bst.remove(9);
console.log('FULL TREE', bst);
console.log('right', bst.root.right);
console.log('left', bst.root.left);
