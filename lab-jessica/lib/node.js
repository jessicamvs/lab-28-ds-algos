'use strict';

module.exports = function(val) {
  if (!val) throw new Error('val expected');

  this.val = val;
  this.left = null;
  this.right = null;
};
