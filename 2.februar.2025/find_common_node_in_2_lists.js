var getIntersectionNode = function(head1, head2) {
    /**
       There is some sorcery u can do in this problem. It works by the principle
       tha if you take 2 pointers a and b and start them at the head of both
       lists. Then you keep on iterating them until you the deadend and then you
       start them from the head of the other list. You will find that in the
       second iteration, they will point to the same node. And it this does not happen
       then they will form a continous cycle.
    */
    let a = head1;
    let b = head2;

    while ( a !== b ) {
        a = (a !== null) ? a.next:head2;
        b = (b !== null) ? b.next:head1;
    }

    return a;

    ///**
    //   Time: O(n)
    //   Space: O(n)
    // */
    //let seen = new Set();
    //for (let i=head1; i; i=i.next) seen.add(i);
    //for (let i=head2; i; i=i.next) if (seen.has(i)) return i;
    //return null;
};
