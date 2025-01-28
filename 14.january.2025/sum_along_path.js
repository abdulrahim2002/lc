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
 * @param {number} targetSum
 * @return {boolean}
 */

var dfs = (node, sum_until_now, target ) => {
    if (!node) return false;

    sum_until_now += node.val;
    if (!node.left && !node.right) return sum_until_now == target;

    return dfs(node.left, sum_until_now, target) || dfs(node.right, sum_until_now, target);
};

var hasPathSum = function(root, targetSum) {
    return dfs(root, 0, targetSum);
};
