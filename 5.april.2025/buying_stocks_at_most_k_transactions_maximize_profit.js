var maxProfit = function(k, prices) {
    /**
       Input: k = 2, prices = [2,4,1]
       Explanation: Buy on day 1 (price = 2) and sell on day 2 (price = 4),
       profit = 4-2 = 2.

       Input: k = 2, prices = [3,2,6,5,0,3] Output: 7 Explanation: Buy on day 2
       (price = 2) and sell on day 3 (price = 6), profit = 6-2 = 4. Then buy on
       day 5 (price = 0) and sell on day 6 (price = 3), profit = 3-0 = 3.

       [
       [ 0, -1, 3, 2, -3, 0 ],
       [ 0, 0, 4, 3, -2, 1 ],
       [ 0, 0, 0, -1, -6, -3 ],
       [ 0, 0, 0, 0, -5, -2 ],
       [ 0, 0, 0, 0, 0, 3 ],
       [ 0, 0, 0, 0, 0, 0 ]
       ]

       How about we generate all possibilities. For example.
       prices = [2,4,1]
       i,j represents buy on day i and sell on day j. i < j
       0,0 -> 0
       0,1 -> 4-2=2     when buy @ 2 and sell @ 4 then profit = 2
       0,2 -> 2-4+1 -> -1   do not sell @ 4 but keep. Then sell at 1.
       1,1 -> 0
       1,2 -> 0-4+1 -> -3   do not sell at 4 but keep
       2,2 -> 0

       With this matrix at hand, we can solve this problem as a partitioning
       problem i.e. to partition or not to partition. for this particular case,
       to sell or not to sell.

       Each partition starts at date of buying, and each partition ends at date
       of selling the profit is calculated for these 2 dates and solutions are
       explored.

       The solution works but is O(2^n) which is unacceptable for this problem.

    **/
    // this is something worth revisiting
    const n = prices.length;
    if (n === 0 || k === 0) return 0;

    // If k >= n/2, we can do as many transactions as we want
    if (k >= n / 2) {
        let profit = 0;
        for (let i = 1; i < n; i++) {
            if (prices[i] > prices[i - 1]) {
                profit += prices[i] - prices[i - 1];
            }
        }
        return profit;
    }

    const dp = Array.from({ length: k + 1 }, () => Array(n).fill(0));

    for (let t = 1; t <= k; t++) {
        let maxDiff = -prices[0];
        for (let d = 1; d < n; d++) {
            dp[t][d] = Math.max(dp[t][d - 1], prices[d] + maxDiff);
            maxDiff = Math.max(maxDiff, dp[t - 1][d] - prices[d]);
        }
    }

    return dp[k][n - 1];


//    let P = prices.length;
//
//    let profit = new Array(P).fill(null).map( () => new Array(P).fill(0) );
//
//    // O(n^2)
//    for ( let i=0; i < P; i++ )
//        for ( let j=i; j < P; j++ )
//            // buy @ price(i) and sell @ price(j)
//            profit[i][j] = prices[j] - prices[i];
//
//
//    let max_profit = 0;
//
//    // O(2^n)
//    let bt_search = ( start_day, rem_trades, cur_profit ) => {
//        // either the trades exhausted or we exhausted the array
//        if ( start_day >= P || rem_trades < 0 ) {
//            max_profit = Math.max( max_profit, cur_profit );
//            return;
//        }
//
//        // explore each ending date
//        for ( let end_day = start_day; end_day < P; end_day++ ) {
//            // having the condition start_day == end_day allows us
//            // for no trade to be executed. Which is beneficial when
//            // it is best to ignore the current price (too high)
//            if (start_day == end_day)
//                bt_search( end_day+1,
//                       rem_trades, // no trade executed
//                           cur_profit + profit[start_day][end_day] );
//            else
//                bt_search( end_day+1,
//                       rem_trades-1, // trade executed
//                           cur_profit + profit[start_day][end_day] );
//        }
//
//    };
//
//    bt_search( 0, k, 0 );
//
//    return max_profit;
};
