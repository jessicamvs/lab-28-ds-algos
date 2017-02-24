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
  if(!this.root) return console.log('NO TREE EXISTS');

  let prevNode = null;
  let match;
  let prevReplacement;
  let replacement = null;

  _findMatch(this.root);

  if(!match) return console.log('NO MATCH FOUND');

  _findReplacement(match);
  console.log('prevNode', prevNode);
  console.log('match', match);
  console.log('prevReplacement', prevReplacement);
  console.log('replacemnt', replacement);

  _deleteMatch();

  function _findMatch(node) {
    if(!node) return;

    if(node.val === val) {
      return match = node;
    }
    if(node.val <= val) {
      prevNode = node;
      _findMatch(node.right);
    }
    if(node.val > val) {
      prevNode = node;
      _findMatch(node.left);
    }
  }

  function _findReplacement(node) {

    if(node.right) {
      let curr = node.right;
      prevReplacement = node;

      while(curr.left) {
        prevReplacement = curr;
        curr = curr.left;
      }

      replacement = curr;

    } else if(node.left) {
      let curr = node.left;
      prevReplacement = node;

      while(curr.right) {
        prevReplacement = curr;
        curr = curr.right;
      }

      replacement = curr;
    }
  }

  function _deleteMatch() {

    if(!prevReplacement && !prevNode) {
      console.log('MUST DELETE ROOT');
      match = null;
      return;
    } else {
      console.log('ARE WE IN EHRE?');
      match.val = replacement.val;
    }
    if(prevReplacement === match) {
      console.log('PREVREPLACEMENT EQUALS MATCH');
      match.right = replacement.right;
      return;
    }
    if(replacement.right) {
      console.log('REPLACEMENT HAS A RIGHT');
      prevReplacement.left = replacement.right;
      return;
    }

    if(replacement.left) {
      console.log('REPLACEMENT HAS A LEFT');
      prevReplacement.right = replacement.left;
      return;
    }

    if(!replacement.right && !replacement.left) {
      console.log('replacement HAS NO LEFT AND NO RIGHT');
      prevReplacement.left = null;
      return;
    }


  }
};

let bst = new Tree();
bst.insert(9);
// bst.insert(5);
bst.insert(12);
// bst.insert(2);
// bst.insert(8);
// bst.insert(6);
// bst.insert(10);
// bst.insert(16);
// bst.insert(11);
// bst.insert(7);
bst.remove(12);
console.log('FULL TREE', bst);
console.log('right', bst.root.right);
console.log('left', bst.root.left);
