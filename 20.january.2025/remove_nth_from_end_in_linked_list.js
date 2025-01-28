/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
    /**
       if we imagine the list as being zero index, then the nodes can be represented
       as: a0, a1, a2, .... a(A-3), A(A-2), A(A-1)
       A-1 is 1st from last, A-2 is 2nd from last, A-k is kth from last.

       Approach: first store these nodes in an array, so we can index them by number
       then: find the index of the node to remove, which is (A-n).
       if A-n=0; then simply return head.next, else,
       node[A-n-1].next = node[A-1].next : return head

       Time: O(n)
       Space: O(n) // we are storing pointer to nodes
    */
    let a = [];
    for (let i=head; i; i=i.next)
        a.push(i);

    let A = a.length;

    if ( A-n === 0 ) return head.next;
    a[A-n-1].next = a[A-n].next;
    return head;
};
