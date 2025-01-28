var swap = (before, first, second) => {
    /*
      expected: before -> first -> second -> after
      after:    before -> second -> first -> after
    */
    if (!second || !first) {
        return;
    }

    first.next = second.next;
    second.next = first;
    before.next = second;

    swap( first, first.next, first.next ? first.next.next:null  );
};

var swapPairs = function(head) {
    /**
       First. If the list has only one or zero nodes.
       return the list as it is for an empty list or
       a list with only one node has nothing the first
       node can be swapped with.

       Then save the location of the second node, for
       this is will be the head of the new list.

       Create a variable schaden, who wound put the juice
       on it's place. The strategy is:
       - schaden -> first node -> second node -> tail
       store
    */

    if (!head) return head;
    if (!head.next) return head;

    let first = head;
    let second = head.next;
    let prev = new ListNode(-101, first);
    let res = new ListNode(-1,second);

    swap( prev, first, second );

    return res.next;
};
