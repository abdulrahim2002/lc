var copyRandomList = function(head) {
    /**
       Basically do a deep copy of the list.
       Algorithm: create a hash map that maps the original
       nodes to the copied nodes. Initialize copied nodes
       with next=random=null

       set the values of next and null using the hashmap
    */
    if (!head) return null;

    let original_to_copy = new Map();

    for (let i=head; i; i = i.next)
        original_to_copy.set( i, new _Node(i.val, null, null) );

    for ( let i=head; i; i = i.next ) {
        let copied = original_to_copy.get(i);
        copied.next = (i.next) ? original_to_copy.get(i.next):null;
        copied.random = (i.random) ?  original_to_copy.get(i.random):null;
    }

    return original_to_copy.get(head);
};
