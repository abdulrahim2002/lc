var reorderList = function(head) {
    /**
       Let the nodes of the list be:
       a0, a1, a2, a3, a4, ..... a(A-1)
       We need to rearrange the nodes as:
       a0, a(A-1), a1, a(A-2), ...

       Create an index of pointers to the lists, so we can get a node at our will.
       Then we follow a 2 pointer approach to make the desired pattern.

       You can solve it by indexing the nodes into a list, however, this question
       can be solved with O(1) space, using pointer sorcery.

       There are 4 steps to solving this question:
       1. find the middle element of the linked list
       2. divide the list into 2 halves. one before the middle element
       and one after the middle element
       3. reverse the second half of the list
       4. merge the 2 halfs in zig zag fasion
    */
    if (!head) return null;

    /* Step 1: Find the middle element */
    let slow = head;
    let fast = head;

    while ( fast.next && fast.next.next ) {
        slow = slow.next;
        fast = fast.next.next;
    }

    let second_half = slow.next;
    slow.next = null;

    let first_half = head;

    /* reverse the second half of the linked list */
    let g = null;
    let h = second_half;
    while ( h ) {
        let tmp = h.next;
        h.next = g;
        g = h;
        h = tmp;
    }
    second_half = g;

    /* merge the 2 lists in zig zag pattern */
    let res = {next: first_half}

    while ( second_half && first_half ) {
        let tmp_fh = first_half.next;
        let tmp_sh = second_half.next;
        first_half.next = second_half;
        second_half.next = tmp_fh;
        first_half = tmp_fh;
        second_half = tmp_sh;
    }
};
