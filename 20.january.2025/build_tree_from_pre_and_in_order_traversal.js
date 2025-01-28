/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

var buildTree = function(pre_order, in_order) {
    if ( !pre_order || !in_order ) return null;

    /** In a in-order traversal, it is guranteed that
        the first node is the next root.
        In a preorder traversal, it is guranteed that for
        every node i. The nodes to left are i are smaller
        than i and nodes to right of i are larger than i.
    */
    pre_order_map = new Map();
    for (i in pre_order) pre_order_map.set(i, pre_order[i]);



};
