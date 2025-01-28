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
       Strategy:
       Find the (A-n-1) th node. for A-n is the nth node from
       the last and A-n-1 is the node that we will use to remove
       this node.

       We take 2 pointers, g (gatherer) and h(hunter). They are
       both n+1 nodes apart. The idea is that we increment h until
       it becomes null. And since g was n+1 nodes behined it, it will
       hold the A-n-1th node.

       index(h) - index(g) = n+1

    */
    let g = null;
    let h = head;
    let c;

    for ( let i=h, c=0; i; i=i.next, c++ ) {
        if (g) g=g.next;
        if (!g && c == n) g = head;
    }

    if (g) {
        g.next = g.next.next;
        return head;
    }
    else {
        return head.next;
    }
};
