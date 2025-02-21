var deleteNode = function(node) {
    /* What connects to this node should now connect to. The idea here is that
       you will shift the values and not change the pointers.

       For example: 4,5,1,9
       delete 5 means: shift values from 1-9 before one step.
    */
    let g = node;
    let h = g.next;
    for ( ; h.next; h=h.next, g=g.next)
        g.val = h.val;

    g.val = h.val;
    g.next = null;
};
