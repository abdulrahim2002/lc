/**
 * @param {number[]} nums
 * @return {number}
 */

// in practice, this is slower than sorting
var longestConsecutive = function(a) {
    if ( !a.length ) return 0;

    a = new Set(a);
    let maxLen = 1;

    a.forEach(
        (n) => {
            // skip numbers that cannot be start of a sequence
            if ( a.has(n-1) ) return;

            // n + curLen characters => the sequence
            let curLen = 1;

            // increase 1 to the sequence, until it does not exist
            while ( a.has(n+curLen) ) curLen++;

            maxLen = Math.max( curLen, maxLen );
        }
    );

    return maxLen;
};

// var longestConsecutive = function(a) {
//     if ( !a.length ) return 0;

//     // sort the list
//     a.sort((a,b)=>a-b);

//     let maxLen = -1;
//     let curLen = 1;

//     // iterate to find consecutive sequence
//     for ( let i=1; i < a.length; i++ ) {
//         // remove duplicates
//         if ( a[i] === a[i-1] ) continue;

//         if ( a[i] == a[i-1]+1 )
//             curLen++;
//         else {
//             maxLen = Math.max(curLen, maxLen);
//             curLen = 1;
//         }
//     }

//     return Math.max(maxLen, curLen);
// };
