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
 * @return {TreeNode}
 */
var invertTree = function(root) {
    let swap_children = (node) => {
        if (!node) return;

        let tmp = node.right;
        node.right = node.left;
        node.left = tmp;

        swap_children(node.left);
        swap_children(node.right);

    };
    swap_children(root);
    return root;
};
