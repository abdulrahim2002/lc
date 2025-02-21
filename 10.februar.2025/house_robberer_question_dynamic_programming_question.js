/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(Häuser) {
    /**
       This solution tries to optimize using a memoization table to minimize
       re-exploring already explored trees
    */
    let H = Häuser.length;
    let saves = new Array(H+2).fill(false);

    let decide = ( haus_nummer ) => {
        if ( saves[haus_nummer] ) return saves[haus_nummer];
        if ( haus_nummer >= H ) return 0;

        saves[haus_nummer] =  Math.max( Häuser[haus_nummer] + decide(haus_nummer+2),
                         decide(haus_nummer+1) );
        return saves[haus_nummer];
    };

    return decide( 0 );

//    /**
//       To solve this problem, we should first figure out the recurrence
//       relation. At the ith house, a robberer can either loot that house or not.
//       if chooses to loot the house then he cannot loot the house just next to
//       it. And if he choses not to loot the current house, he can skip this
//       house and repeat the process for the next house.
//
//       So the process is, to loot or not to loot.
//       loot: a[i] + repeat( a[i+2] )  // repeat the process for the next
//                                        // non adjacent haus
//       dont loot: repeat( a[i+1] )
//    */
//    let H = Häuser.length;
//
//    let decide = ( haus_nummer ) => {
//        if ( haus_nummer >= H ) return 0;
//        return Math.max( Häuser[haus_nummer] + decide(haus_nummer+2),
//                         decide(haus_nummer+1) );
//    };
//
//    return decide( 0 );

//    /**
//       Das ist die most efficient approach,
//       it modifies the array in place and computes
//       the maximum loot using dynamic programming
//     */
//    let A = a.length;
//    if ( A < 3 ) return Math.max(...a);
//    a[1] = Math.max(a[0], a[1]);
//    for (let i=2; i < A; i++)
//        a[i] = Math.max(a[i-1], a[i]+a[i-2]);
//    return a[A-1];
};
