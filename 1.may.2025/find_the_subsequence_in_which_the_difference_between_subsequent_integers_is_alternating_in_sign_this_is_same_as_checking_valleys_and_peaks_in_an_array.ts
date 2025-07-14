function wiggleMaxLength(nums: number[]): number {
    /**
       Approach 1: Brute force, find all possible subsequences For each
       subsequence, check if its wiggle Find its length and return it
       We have 2 options, either select the value@i or reject the value@i to
       form the subsequence. If we are at first number, then we have the option
       to either select or reject it. But at any other number, we must check if
       cur_number - previous number has sign opposite of previous sign. The
       current number - last selected number can be optained by value@i -
       cur.top The sign has to be opposite of cur.top - cur.top_2. We can use
       the fact that opposite signs multiple to a negative value
       Time: O(2^n)
       Space: O(n)

       Approach 2: Memoization. We do not need to keep track of the whole
       selected numbers. We can just keep track of the last 2 selected numbers.
       We need to pass the selected length as a parameter then. Also, we need to
       return the length possible.
       Time: O(n)
       Space: O(n)

       Approach 3: Dynamic programming. The observation is:
       at each i, the solution is obtained by the following formula:

       Approach 4: This is simple question, please read the solutions before
       attepteing atleast once. Just count the number of valleys and peaks Time:
       O(n) Space: O(1)
    **/
    const N: number = nums.length;
    enum SIGN { CON };
    let cnt = 1, last_sign = SIGN.CON;

    for ( let i=1; i < N; i++ ) {
        const cur_sign = nums[i] - nums[i-1];

        if ( cur_sign === SIGN.CON ) continue;

        else if ( last_sign === SIGN.CON )
            { cnt++; last_sign = cur_sign; }

        else if ( cur_sign * last_sign < 0 )
            { cnt++; last_sign = cur_sign; }
    }

    return cnt;

//    const bt_search = ( i: number=1,
//                        last: number=nums[0],
//                        last_2: number=undefined,
//                        cur_len: number=1
//                      ): number => {
//
//        if ( i >= N ) return cur_len;
//
//        const key = `${i},${last},${last_2},${cur_len}`;
//        if ( memo.has(key) ) return memo.get(key);
//
//        let len = 0;
//
//        if (   ( cur_len === 1 && (nums[i]-last) !== 0 ) ||
//            (nums[i] - last) * (last - last_2) < 0 )
//            len = Math.max( len, bt_search( i+1, nums[i], last, cur_len+1 ) );
//
//        len = Math.max( len, bt_search( i+1, last, last_2, cur_len ) );
//        memo.set( key, len );
//        return len;
//    };
//
//    return bt_search();


//    const bt_search = (i: number, cur: number[]): void => {
//        const CLEN = cur.length;
//        if ( i >= N ) {
//            max_len = Math.max( max_len, cur.length );
//            return;
//        }
//        if ( CLEN === 1 && (nums[i]-cur[CLEN-1]) !== 0 ) {
//            cur.push( nums[i] );
//            bt_search( i+1, cur );
//            cur.pop();
//        }
//        else if ( (nums[i] - cur[CLEN-1]) * (cur[CLEN-1] - cur[CLEN-2]) < 0 ) {
//            cur.push( nums[i] );
//            bt_search( i+1, cur );
//            cur.pop();
//        }
//        bt_search( i+1, cur );
//    };
//    bt_search( 1, [nums[0]] );
//    return max_len;
}
