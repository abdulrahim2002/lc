var maximalRectangle = function(matrix) {
    let m = matrix.length, n = matrix[0].length;
    // fill all heights with 0
    let heights = new Array(n).fill(0);
    let max_area = 0;

    for ( let row of matrix ) {
        // update heights
        for ( let i=0; i < n; i++ )
            heights[i] = (row[i]=='1') ? heights[i]+1:0;
        // calculate maximum area
        max_area = Math.max( max_area, largestRectangleArea(heights) );
    }

    return max_area;
};

/**  Code from problem 84.  **/
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
