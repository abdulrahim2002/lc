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
 * @return {number}
 */

let INT_MIN = Number.MIN_SAFE_INTEGER;

let maxd = (node, depth_until_now) => {
    if (!node.left && !node.right) return depth_until_now+1;
    let lval = (node.left) ? maxd(node.left,
                                  depth_until_now+1):INT_MIN;
    let rval = (node.right) ? maxd(node.right,
                                   depth_until_now+1):INT_MIN;

    return Math.max(rval, lval);
};

var maxDepth = function(root) {
    if (!root) return 0;
    return maxd(root, 0);
};
