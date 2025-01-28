/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var preorderTraversal = function(root) {
    let res = [];
    let pre_order = (node) => {
        if (!node) return;
        res.push(node.val);
        pre_order(node.left);
        pre_order(node.right);
    };
    pre_order(root);
    return res;
};
