/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

let check_sym = (p, q) => {
    /* the subtrees p and q are symmetric if:
       p.val = q.val
       p.left = q.right
       p.right = q.left
       (p.left, q.right) is symmetric
       (p.right, q.left) is symmetric
    */
    if ( !p && !q ) return true;
    if ( (!p && q) || (p && !q) ) return false;

    if (p.val == q.val)
        return check_sym(p.left, q.right) && check_sym(p.right, q.left);
    else return false;
};

var isSymmetric = function(root) {
    if (!root) return true;
    else if (root.left && root.right && root.left.val == root.right.val) // these 2 lines increase the performance from 11 to 100%
        return check_sym(root.left, root.right);                         // this is because if p and q are same as root, we are
                                                                        // checking 2 times
    else return check_sym(root, root);
};
