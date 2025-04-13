/**
 * @param {number[][]} dungeon
 * @return {number}
 */
var calculateMinimumHP = function( rooms ) {
    let M = rooms.length;
    let N = rooms[0].length;
    let MAX_INT = 1e9;

    // in place dp
    for ( let i=M-1; i >= 0; i-- )
        for ( let j=N-1; j >= 0; j-- ) {
            if ( i == M-1 && j == N-1 ) {
                rooms[i][j] = ( 1-rooms[i][j] > 0 ) ? (1-rooms[i][j]) : 1;
                continue;
            }

            let min_need =  ( i+1 < M ) ?
                            rooms[i+1][j] : MAX_INT;

            min_need = ( j+1 < N && rooms[i][j+1] < min_need ) ?
                            rooms[i][j+1] : min_need;

            min_need -= rooms[i][j];

            rooms[i][j] = Math.max( 1, min_need );
        }


    return rooms[0][0];


    // let dp = new Array( M+1 ).fill( null ).map( () => new Array( N+1 ).fill( 1e9 ) );

    // dp[M-1][N] = dp[M][N-1] = 1;

    // for ( let i=M-1; i >= 0; i-- )
    //     for ( let j=N-1; j >= 0; j-- ) {
    //         let need = Math.min( dp[i+1][j], dp[i][j+1] ) - rooms[i][j];
    //         dp[i][j] = Math.max( 1, need );
    //     }

    // console.log(dp);

    // return dp[0][0];

    // let memo = new Array( M+1 ).fill(null).map( () => new Array( N+1 ).fill( null ) );

    // let bt_search = ( i, j ) => {

    //     if ( memo[i][j] !== null ) return memo[i][j];

    //     if ( i == M-1 && j == N-1 )
    //         return ( rooms[i][j] <= 0 ) ? 1-rooms[i][j] : 1;

    //     if ( i == M || j == N ) return Number.MAX_SAFE_INTEGER;

    //     let down = bt_search( i+1, j );
    //     let right = bt_search( i, j+1 );

    //     let min_need = Math.min( down, right ) - rooms[i][j];

    //     let res =  ( min_need <= 0 ) ? 1 : min_need;

    //     memo[i][j] = res;

    //     return res;
    // };

    // return bt_search(0, 0);
};
