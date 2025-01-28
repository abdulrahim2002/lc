var detectCycle = function(head) {
    /**
       can use a hashmap but the complexity of it is O(n) . Use 2 pointer approach instead:

       use 2 pointers, slow and fast. move the fast pointer by 2 steps and slow
       pointer by 1 step. When they meet first time. they meet at the mid point
       between head of the list and cycle.

       at this point reset the start pointer to head and move both pointers by 1
       step; When they will meet again, they will meet at the place where the
       cycle starts.
    */

    if (!head) return null;

    let slow = head;
    let fast = head;

    while ( fast && fast.next ) {
        fast = fast.next.next;
        slow = slow.next;
        if ( fast===slow ) break;
    }

    if ( !fast || !fast.next ) return null;
    slow = head;

    while ( fast !== slow ) {
        fast = fast.next;
        slow = slow.next;
    }

    return slow;
};
