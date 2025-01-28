var partition = function(head, x) {
    /**
       naive solution is to obviously iterate through the list and store the
       nodes that are smaller than x into a list. Also store the nodes that are
       greater than or equal to x in another list.

       generate a new list out of these 2 lists.
       Time: O(2*n)
       Space: O(n)

       This can also be done using pointers. We crate a hunter (h) pointer. Then
       we utilize 2 gatherers, (gs, and gl) where gs means the gatherer that is
       collecting the list with smaller elements than x. and gl is the gatherer
       collecting elements of the list larger or equal to x.
    */
    if (!head) return null;

    let d1 = new ListNode(-1);
    let g1 = d1;

    let d2 = new ListNode(-2);
    let g2 = d2;

    let h = head;

    while ( h ) {
        if ( h.val < x ) {
            g1.next = h;
            g1 = g1.next;
            h = h.next;
        }
        else {
            g2.next = h;
            g2 = g2.next;
            h = h.next;
        }
    }

    g1.next = d2.next;
    g2.next = null;
    return d1.next;
};
