/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {ListNode} head
 * @return {TreeNode}
 */
let build_bst = (a, i, j ) => {
    /* Build a Binary search tree from an array */
    if ( j < i ) return null;

    let mid = i + Math.floor( (j-i)/2 );
    let node = new TreeNode(
        a[mid], build_bst(a, i, mid-1), build_bst(a, mid+1, j)
    );

    return node;
};

var sortedListToBST = function(head) {
    if (!head) return null;

    let a = [];
    while (head) {
        a.push(head.val);
        head = head.next;
    }

    return build_bst(a, 0, a.length-1);
};
