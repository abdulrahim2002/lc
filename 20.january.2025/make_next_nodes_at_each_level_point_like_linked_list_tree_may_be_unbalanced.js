/**
 * // Definition for a _Node.
 * function _Node(val, left, right, next) {
 *    this.val = val === undefined ? null : val;
 *    this.left = left === undefined ? null : left;
 *    this.right = right === undefined ? null : right;
 *    this.next = next === undefined ? null : next;
 * };
 */

/**
 * @param {_Node} root
 * @return {_Node}
 */
var connect = function(root) {
    if (!root) return null;

    let h = root;
    let d = new _Node(-1);
    let p = d;

    while ( h ) {
        while ( h ) {
            if ( h.left ) {
                p.next = h.left;
                p = p.next;
            }

            if ( h.right ) {
                p.next = h.right;
                p = p.next;
            }

            h = h.next;
        }

        h = d.next;
        d.next = null;
        p = d;
    }
    return root;
};
