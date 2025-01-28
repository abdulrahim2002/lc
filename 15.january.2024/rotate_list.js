var rotateRight = function(head, k) {
    /*
       record the head of the linked list and make it a
       circular list.
       Then decide how far away is the new tail from the
       previous head. Go to the tail.
       save tail.next as the new head and terminate tail.next
       to null

       O(N) in terms of time and O(1) in space
    */
    if (!head) return null;

    let saved_head = new ListNode();
    saved_head.next = head;

    let LIST_LEN = 1;
    while (head.next) {
        head = head.next;
        LIST_LEN ++;
    }
    head.next = saved_head.next;

    let get_end = LIST_LEN - (k%LIST_LEN) - 1;
    var last_node = saved_head.next;

    for (let i=0; i<get_end; i++, last_node=last_node.next);

//    console.log(`last_after: ${get_end}, last_node=${last_node.val}`);

    saved_head.next = last_node.next;
    last_node.next = null;

    return saved_head.next;
};
