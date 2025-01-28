/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} nums
 * @return {TreeNode}
 */

let create_bst = (a, l, r) => {
    if (l > r) return null;

    let mid = l + Math.floor((r - l) / 2);

    let root = new TreeNode(a[mid]);
    root.left = create_bst(a, l, mid - 1);
    root.right = create_bst(a, mid + 1, r);

    return root;
};

var sortedArrayToBST = function(a) {
    return create_bst(a, 0, a.length - 1);
};
