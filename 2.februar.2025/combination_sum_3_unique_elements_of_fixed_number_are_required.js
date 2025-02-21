var combinationSum3 = function(k, n) {
    /**
       A backtracking based solution searches the search space for
       solutions, pruning whenever a bad candidate is encountered.

       Since, both solution set and n are positive numbers, we can be
       ascertained that if a candidate set sums more than n, then no
       number added to this set further will yield the sum n, therefore
       we will prune such candidates.

       Treat k as numbers left and n as the sum left. If n is negative,
       for any iteration, it means that the sum has already exceeded
       target. If k == 0, we cannot add more numbers to the solution set

       The problem we are currently facing is that same solutions are
       being added again and again. for example: [1,2,4] and [1,4,2]

       T(n) = 9 * T(n-1)
       O(9^n)
       Time: O( 2^n )
       Space: O(n) /from recursion and not counting output stored/
    */

    /**
       This approach ensures that the numbers are generated in
       increasing order. Hence, eliminating the need to check for
       duplicates in the solution.
     */
    let saves = [];

    let btsearch = (k, n, start, cand) => {
        if ( k === 0 ) {
            if ( n === 0 ) saves.push( [...cand] );
            return;
        }

        for (let i=start; i <= 9; i++) {
            /* prune condition */
            if ( n-i < 0 ) continue;
            cand.push(i);
            btsearch( k-1, n-i, i+1, cand );
            cand.pop(i);
        }
    };

    btsearch(k, n, 1, []);
    return saves;

//    let saves = [];
//    let cand = new Set();
//
//    let btsearch = (k, n, last_selected) => {
//        if ( k === 0 ) {
//            if ( n === 0 ) saves.push( [...cand] );
//            return;
//        }
//
//        for (let i=1; i <= 9; i++) {
//            if ( cand.has(i) || (n-i) < 0 || i < last_selected ) continue;
//            cand.add(i);
//            btsearch( k-1, n-i, i );
//            cand.delete(i);
//        }
//    };
//
//    btsearch(k, n, -1);
//    return saves;
};
