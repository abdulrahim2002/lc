

/** This approach is also O(n^2) but it is possible to do this question in
 * linear time and in one pass. Here's is the video
 https://www.youtube.com/watch?v=Bzat9vgD0fs
**/
var largestRectangleArea = function(a) {
    /**
       We create a stack that stores the previous heights, where the previous
       heights are smaller or equal to the next height in the array a. the stack
       contains pairs of (index, height) and tos maintains the top of stack

       It is useful to make the value of i global since at last it will be equal to A
       and can be utilized to calculate remaining areas from stack.
     */
    let A = a.length;
    let stack = [ [-1,0] ];
    let tos = stack.length - 1; /* update each time */
    let i; /* to index i */

    let max_area = 0;

    for ( i=0; i < A; i++ ) {
        if ( a[i] < stack[tos][1] ) {
            for (let k = tos; a[i] < stack[k][1]; k--) {
                let area = stack[k][1] * ( i - stack[k][0] );
                if (area > max_area) max_area = area;
                stack[k][1] = a[i];
            }
            //while ( a[i] < stack[tos][1] ) {
            //    areas.push( stack[tos][1] * ( i - stack[tos][0] ) );
            //
            //    stack.pop(); /* do not pop it altogether because it might
            //                    still be able to contribute tiles to forward
            //                    but only tiles that are equal to a[i] will move
            //                  */
            //    tos = stack.length-1;
            //}
            stack.push( [ i, a[i] ] );
            tos = stack.length-1;
        }
        else {
            stack.push( [ i, a[i] ] );
            tos = stack.length-1;
        }
    }

    for ( let j=0; j < stack.length; j++ ) {
        let area = stack[j][1] * (i-stack[j][0]);
        if (area > max_area) max_area = area;
    }

    return max_area;
};



var findMin = function(a) {
    /**
       Approach:

       You cannot solve this problem in O(log n) since it contains duplicate
       values. But you can actually solve this problem in O(n/2) by using the
       fact that a sorted array follows heap property. And if a sorted array is
       rotated then the heap property no longer holds. to find the minium
       element traverse the array, and find the first subtree where the heap
       property does not hold. the minium of the 2 values where the heap
       property does not satisfy is also minium in the array.

       Time: O(n/2)
       Space: O(1)
    */
    let A = a.length;
    let i = 0;

    while ( i <= Math.floor(A/2)-1 ) {
        let root = i;
        let lc = 2*i + 1;
        let rc = 2*i + 2;
        let smallest = root;

        if ( lc < A && a[lc] < a[smallest] ) smallest = lc;
        if ( rc < A && a[rc] < a[smallest] ) smallest = rc;

        if ( smallest != root )
            /* violation found. the value at smallest is minium */
            return a[smallest];
        i++;
    }

    /* no violation found. Either the array is sorted ar there
       it is all duplicates, in either case, return the first
       element.
    */
    return a[0];
};
