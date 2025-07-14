/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var oddEvenList = function(head) {
    const odd_head   = new ListNode(-1),
          even_head  = new ListNode(-1);

    let   odd = odd_head,
          even = even_head;

    for ( let i=1, h=head; h; h=h.next, i++ ) {
        if ( i%2 == 1 ) {
            odd.next = h;
            odd = odd.next;
        }
        else {
            even.next = h;
            even = even.next;
        }
    }

    odd.next = even_head.next;
    even.next = null;

    return (odd_head.next);
};
