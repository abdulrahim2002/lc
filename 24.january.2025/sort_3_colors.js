var sortColors = function(a) {
    /* the task is to increase
       Output_order: red -> white -> blue
       red = 0
       white = 1
       blue = 2

       Approach: count the occurences of red white blue respectively
       repopulate the array in order in order.
       Time: O(n)
       Space: O(1)
    */
    let A = a.length;
    let rc = 0;
    let wc = 0;
    let bc = 0;

    for (let x of a) {
        if ( x===0 ) rc++;
        if ( x===1 ) wc++;
        if ( x===2 ) bc++;
    }

    for (let i=0; i < A; i++) {
        if ( rc ) {
            a[i] = 0;
            rc--;
            continue;
        }
        if ( wc ) {
            a[i] = 1;
            wc--;
            continue;
        }

        if ( bc ) {
            a[i] = 2;
            bc--;
        }
    }
};
