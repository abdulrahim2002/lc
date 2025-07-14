/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
    if (amount === 0) return 0;

    const n = coins.length;
    if (n === 1) return amount % coins[0] === 0 ? amount / coins[0] : -1;

    coins.sort((a, b) => a - b);

    const minCoin = coins[0];
    if (amount === minCoin) return 1;
    let idx = 1;
    let gcdVal = minCoin;
    while (idx < n && amount >= coins[idx]) {
        if (amount === coins[idx]) return 1;
        gcdVal = gcd(coins[idx], gcdVal);
        coins[idx] -= minCoin;
        idx++;
    }
    if (amount % gcdVal !== 0) return -1;

    const minVal = Math.floor((amount - 1) / (coins[idx - 1] + minCoin)) + 1;
    const maxVal = Math.floor(amount / minCoin);
    for (let i = minVal; i <= maxVal; i++) {
        if (findCombination(coins, 1, idx - 1, amount - i * minCoin, i)) {
            return i;
        }
    }
    return -1;
};

function findCombination(coins, left, right, target, maxCoins) {
    if (target === 0) return true;
    if (target < coins[left] || Math.floor(target / coins[right]) > maxCoins) return false;
    if (target % coins[right] === 0) return true;
    if (left === right) return false;
    for (let k = Math.floor(target / coins[right]) + 1; k--;) {
        if (findCombination(coins, left, right - 1, target - k * coins[right], maxCoins - k)) {
            return true;
        }
    }
    return false;
}

function gcd(a, b) {
    while (b !== 0) {
        let temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function(coins, amount) {
    /**
       Lets take a step back and try to go through the usuall recursion ->
       memoization -> tabulation routine

       To form a recursive equation:

       For each amount x, the

       minimum number of coins needed to form (x) = minimum number of coins needed to form (x-c) + 1
            where c is some coin in given coins
    **/
    const memo = new Array( amount+1 ).fill(-1);

    const min_coins = ( amount ) => {
        if ( memo[amount] !== -1 ) return memo[amount];
        if ( amount === 0 ) return 0;
        let cur = Infinity;
        for ( const c of coins )
            if ( amount - c >= 0 )
                cur = Math.min( cur, min_coins( amount-c )+1 );
        memo[amount] = cur;
        return cur;
    };

    const res = min_coins(amount);
    return ( res === Infinity ) ? -1:res;

};
