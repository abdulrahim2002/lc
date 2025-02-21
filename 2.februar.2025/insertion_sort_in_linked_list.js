var insertionSortList = function(head) {
    if (!head || !head.next) return head;

    let res = new ListNode( Number.MIN_SAFE_INTEGER );

    let h = head;
    while ( h ) {
        let tmp = h.next;
        let g = res;
        while ( g.next && h.val > g.next.val ) g = g.next;
        /* insert h into g.next */
        let after = null;
        if (g.next) after = g.next; g.next = h; h.next = after;
        h = tmp;
    }

    return res.next;
};
