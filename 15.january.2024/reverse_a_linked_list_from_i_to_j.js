let reverse_list = ( before, head, delta ) => {
    /*
      @before: node just before the head of the list
      @head: the first node in the list where the list needs
      to be reversed
      @delta: the number of nodes to reverse, starting from
      head
      @after: the list after this section of the list.
    */
	if (!head) return null;

	let save_head =  new ListNode(-1, head);
	var g = null;
	var h = head;

	while ( h && delta > 0) {
		let tmp = h.next;
		h.next = g;
		g = h;
		h = tmp;
		delta--;
	}

	/* reconnect */
    let prev_head = save_head.next;
	prev_head.next = h; /* pre_head is the new end. And it connects
                           to h, the list after the rotated sublist*/
    before.next = g;    /* g is the new starting of the rotated sublist
                           likewise, the list before this rotated sublist
                           should be connected back to this rotated sublist
                        */

	return g;

};


var reverseBetween = function(head, left, right) {
    if ( !head || !head.next || (left==right) ) return head;

    left--;right--;

    let save_head = {next:head};

    let delta = right - left + 1;
    let b = new ListNode(-1, head);
    let j = head;
    for ( let i=0; i < left && j ; i++, j = j.next, b=b.next );

    var g;
    if (j) {
        g = reverse_list( b, j, delta);
    }

    if ( left!= 0 ) {
        return save_head.next;
    }
    else {
        return g;
    };
};
