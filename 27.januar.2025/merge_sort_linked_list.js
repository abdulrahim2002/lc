let divide = ( list ) => {
    /* divide the list in 2 lists. Atleast least one node should be there */
    if (!list) return [null, null];

    let slow = list;
    let fast = list;

    while ( fast.next && fast.next.next ) {
        slow = slow.next;
        fast = fast.next.next;
    }

    let list2 = slow.next;
    slow.next = null;

    return [ list, list2 ];
};

let merge = (list1, list2) => {
    /* merge 2 lists in acesding order */
    let merged = new ListNode(-1);
    let g = merged;

    let h1 = list1;
    let h2 = list2;

    while ( h1 || h2 ) {
        if ( !h1 ) {
            g.next = h2;
            h2 = h2.next;
        }
        else if ( !h2 ) {
            g.next = h1;
            h1 = h1.next;
        }
        else {
            let move_h1 = ( h1.val < h2.val );
            g.next = (move_h1) ? h1:h2;
            if (move_h1) h1 = h1.next;
            else h2 = h2.next;
        }
        g = g.next;
    }
    return merged.next;
};

var sortList = function(list) {
    /**
       Wr need 2 abilities to be able to solve this problem.
       1. be able to divide the list into 2 halves
       2. be able to merge 2 lists into one.

       Approach: Repetedly divide the list into 2 halves until a half is a
       single node. merge the divided lists and return the sorted list.

       The base case is that the list only has 0 or 1 element, in which case it
       is already sorted. otherwise, it is split into left and right halves and
       recursively sort both of these halves. then we return these 2 sorted
       halves merged. It is sort of counter intuitive, since I was not able to
       figure out immediately what i should do immediately.
    */
    if (!list || !list.next) return list;

    let [left, right] = divide(list);

    let left_sorted = sortList(left);
    let right_sorted = sortList(right);

    return merge(left_sorted, right_sorted);
};
