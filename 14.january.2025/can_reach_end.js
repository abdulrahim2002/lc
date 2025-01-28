var canJump = function(j) {
    /**
       j[i] tells if it is possible from j[i] to j[J-1] (last position)
       the idea is that if j[i] is 3, and the first 3 indeces after j[i]
       have true in any of them. Then it is possible to reach from j[i] to
       the end.
       Algorithm:
       j[J-1] <- true
       i <- J-2 -- 0
       from i we can reach until i+j[i]
       if at any of these indexes there is even one true, then we should be
       able to reach the end.
            j[i] = h <- i -- i+j[i]
       just using this concept calculate all j[i] and then return
    */

    var J = j.length;
    var can_reach = J-1;;

    for (var i=J-2; i>=0; i--) {
        if ( i + j[i] >= can_reach ) {
            can_reach = i;
        }
    }
    return (can_reach==0);
};
