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

  // BELOW ARE THE CASES FOR THE REMOVED NODE NOT HAVING ANY CHILDREN

  // if match is root and has no children
  if(!match.right && !match.left && match === this.root) {
    console.log('TREE ONLY HAS ONE NODE');
    this.root = null;
    return;
  }

  // if match has no children and is right child of parent
  if(!match.right && !match.left && prevNode.right === match) {
    console.log('MATCH HAS NO CHILDREN and is RIGHT CHILD OF PARENT');
    prevNode.right = match.right;
  }

  // if match has no children and is left child of parent
  if(!match.right && !match.left && prevNode.left === match) {
    console.log('MATCH HAS NO CHILDREN and is LEFT CHILD OF PARENT');
    prevNode.left = match.right;
  }

  // BELOW ARE THE CASES FOR THE REMOVED NODE HAVING 1 CHILD

  // if match is root and only has right child
  if(match.right && !match.left && this.root === match) {
    console.log('match is root and only has right child');
    this.root = match.right;
    return;
  }

  if(match.left && !match.right && this.root === match) {
    console.log('match is root and only has left child');
    this.root = match.left;
    return;
  }

  if(match.right && !match.left && prevNode.right === match) {
    console.log('match has one right child and is right child of parent');
    prevNode.right = match.right;
  }

  if(match.right && !match.left && prevNode.left === match) {
    console.log('match has one right child and is left child of parent');
    prevNode.left = match.right;
  }

  if(!match.right && match.left && prevNode.left === match) {
    console.log('match has one left child and is left child of parent');
    prevNode.left = match.left;
  }

  if(!match.right && match.left && prevNode.right === match) {
    console.log('match has one left child and is right child of parent');
    prevNode.right = match.left;
  }

  _findReplacement(match);

  // BELOW ARE THE CASES FOR THE REMOVED NODE HAVING NO CHILDREN
  if(!replacement.left && !replacement.right && prevReplacement.left === replacement) {
    console.log('REPLACEMENT HAS NO CHILDREN AND IS A LEFT CHILD');
    match.val = replacement.val;
    prevReplacement.left = null;
  }

  if(!replacement.left && !replacement.right && prevReplacement.right === replacement) {
    console.log('REPLACEMENT HAS NO CHILDREN AND IS A LEFT CHILD');
    match.val = replacement.val;
    prevReplacement.right = null;
  }

  // BELOW ARE CASES FOR REMOVED NODE HAVING ONE CHILD
  if(replacement.right && prevReplacement.right === replacement) {
    console.log('REPLACEMENT HAS RIGHT CHILD AND IS A RIGHT CHILD');
    match.val = replacement.val;
    prevReplacement.right = replacement.right;
  }

  if(replacement.right && prevReplacement.left === replacement) {
    console.log('REPLACEMENT HAS RIGHT CHILD AND IS A LEFT CHILD');
    match.val = replacement.val;
    prevReplacement.left = replacement.right;
  }


  console.log('prevNode', prevNode);
  console.log('matchyyyy', match);
  console.log('prevReplacement', prevReplacement);
  console.log('replacemnt', replacement);

  function _findMatch(node) {
    if(!node) return;

    if(node.val === val) {
      match = node;
      console.log('IS THIS REAL', match);
      return;
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
    let curr = node.right;
    prevReplacement = node;

    while(curr.left) {
      prevReplacement = curr;
      curr = curr.left;
    }

    replacement = curr;
  }

};

let bst = new Tree();
bst.insert(5);
bst.insert(2);
bst.insert(10);
// bst.insert(9);
// bst.insert(15);
// bst.insert(13);
// bst.insert(14);
// bst.insert(9);

bst.remove(5);
console.log('FULL TREE', bst);
// console.log('right', bst.root.right);
// console.log('left', bst.root.left);
