var isPalindrome = function(head) {
    /**
       The input list is a linked list, if first half of the nodes and the
       last half of the nodes reversed,
       are the same;

       1. divide the list into 2 halves
       2. reverse the second half
       3. iterate over both halves, as soon as a node does not match return false
       4. return true
    */
    if (!head || !head.next) return true;

    /* Step 1: Find the mid point */
    let fast; let slow;
    fast = slow = head;
    while ( fast.next && fast.next.next ) {
        fast = fast.next.next;
        slow = slow.next;
    }

    let first = head;
    let second = slow.next;

    /* Step 2: Reverse the second half */
    let g = second;
    let h = second.next;
    g.next = null;

    while ( h ) {
        let tmp = h.next;
        h.next = g;
        g = h;
        h = tmp;
    }

    second = g;

    /* Step 3: Iterate over and compare */
    while ( first && second ) {
        if ( first.val !== second.val ) return false;
        first = first.next; second = second.next;
    }

    return true;
};
