
'use strict';

const expect = require('chai').expect;
const BST = require('../lib/bst.js');

describe('Binary Search Tree', function() {
  let bst;

  beforeEach(() => {
    bst = new BST();
  });

  describe('#insert()', function() {
    it('should create a new node as root when tree is empty and return val', function() {
      expect(bst.root).to.equal(null);
      expect(bst.insert(5)).to.equal(5);
      expect(bst.root.val).to.equal(5);
    });

    it('should add 10 to the right of 5', function() {
      bst.insert(5);
      expect(bst.insert(10)).to.equal(10);
      expect(bst.root.right.val).to.equal(10);
    });

    it('should add 5 to the right of 5', function() {
      bst.insert(5);
      expect(bst.insert(5)).to.equal(5);
      expect(bst.root.right.val).to.equal(5);
      expect(bst.root.left).to.equal(null);
    });

    it('should add 3 to the left of 5', function() {
      bst.insert(5);
      expect(bst.insert(3)).to.equal(3);
      expect(bst.root.left.val).to.equal(3);
      expect(bst.root.right).to.equal(null);
    });
  });

  describe('#remove()', function() {
    it('', function() {

    });

    it('', function() {

    });

    it('', function() {

    });
  });
});
