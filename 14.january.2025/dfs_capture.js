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
 * @return {number[][]}
 */

var dfs = (node, sum_until_now, target, this_solution, saves) => {
    if (!node) return;

    sum_until_now += node.val;
    this_solution.push( node.val );

    console.log(`node.val = ${node.val}`);
    if (!node.left && !node.right && sum_until_now == target)
        saves.push(this_solution);

    dfs(node.left, sum_until_now, target, this_solution, saves);
    dfs(node.right, sum_until_now, target, this_solution, saves);

    this_solution.pop();
};

var pathSum = function(root, targetSum) {
    var solutions = [];
    dfs(root, 0, targetSum, [], solutions);
    return solutions;
};
