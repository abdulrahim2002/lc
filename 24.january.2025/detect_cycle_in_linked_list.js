var hasCycle = function(head) {
    if (!head) return false;

    /**
       There are 2 approaches to solve this question.
       1. Use a map to store references to pointers which have been seen
       2. iterate over the list. If this node has been seen, there is a cycle
       otherwise the list will terminate at null at some point

       2nd approach which is optimal is to use 2 pointers. fast and slow. the
       idea is that the fast pointer takes 2 steps at a time and slow pointer
       takes 1 step at a time; if there is a loop in the list, these two pointers
       will collide at some point. i.e. they will point to the same node.
    */

    let slow = head;
    let fast = head;

    while ( fast && fast.next ) {
        fast = fast.next.next;
        slow = slow.next;
        if (fast === slow) return true;
    }
    return false;

//    let seen = new Map();
//
//    while ( head ) {
//        if ( seen.has(head.next) ) return true;
//        else seen.set( head, true );
//        head =  head.next;
//    }
//
//    return false;
};
