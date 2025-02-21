var removeElements = function(head, val) {
    /**
       Remove all nodes who have value as val, and return the resultant node.
       Approach: Simply make a pointer h, and increment h only when the value of
       a node is not val.
       Time: O(n)
       Space: O(1)
    */
    let h = head;
    /* Surprisignly this new ListNode is much slower. Better use object like
     * structure */
    let res = {next:null}; // new ListNode();  //{next:null};
    let g = res;

    while ( h ) {
        if ( h.val !== val ) {
            g.next = h;
            g = g.next;
            h = h.next;
        }
        else h = h.next;
    }

    g.next = null;

    return res.next;
};
