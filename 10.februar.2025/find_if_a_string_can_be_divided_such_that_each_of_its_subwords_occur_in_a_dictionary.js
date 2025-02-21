var wordBreak = function(s, wordDict) {
    /**
       Using dynamic programming!!
       The most efficient solution is :
       Time: O(n^2)
       Space: O(n)
    */
    let dict = new Set(wordDict);
    let n = s.length;
    let dp = new Array(n + 1).fill(false);
    dp[0] = true;

    // maximum length a word in dictionary can ever be
    let max_len = Math.max(...wordDict.map(word => word.length));

    for (let end = 1; end <= n; end++) {
        for (let start = end - 1; Math.max(end-max_len-1, 0) <= start; start--) {
            if (dp[start] && dict.has(s.substring(start, end))) { // inclusive
                dp[end] = true;
                break;
            }
        }
    }
    return dp[n];

//    let S = string.length;
//    let is_possible = new Array(S+1).fill(false);
//    is_possible[0] = true;
//
//    for (let i=1; i < S+1; i++) {
//        for (let word of dict) {
//            let start = i-word.length;
//            if (start >= 0 && is_possible[start] &&
//                string.substring(start, i) === word) {
//                is_possible[i] =  true;
//                break;
//            }
//        }
//    }
//
//    return is_possible[S];

//    /**
//       The idea is to try to find words as early as possible, and as you find a
//       word, find the next word starting from the index after the last found
//       word. If you ever exhaust the range, return false.
//
//       This appraoch does not work because, we might have a word math multiple
//       words in the dictionary, in which case we have the option to match it
//       with multiple words.
//
//       Imageine the case: aaaa aaa Dictionary = 'aaaa' 'aaa'
//
//       there are multiple ways to match the input with dictionary but only 2 of
//       them give us the correct result.
//
//       The other appraoch is to use dynamic programming which tries to match the
//       input string with multiple strings in the dictionary.
//
//       Another option is to first find all possible words in the input string.
//       After that we see that if these words are in a dictionary. If they are we
//       store them in some kind of structure.
//
//       Then we analyze the structure to find out, if we will ever be able to
//       form all the words in the string.
//    */
//    let web = []; // O(n^2)
//    let dict = new Set(wordDict); // O(n)
//
//    // O(n^3)
//    for (let i=0; i < s.length; i++)
//        for (let j=i; j < s.length; j++)
//            if ( dict.has(s.slice(i, j+1)) ) web.push([i,j]);
//
//    /* Once this is done, we created a graph and now our goal is to check if
//       there is a path from 0 to s.length-1!!
//       To do this we use a BFS approach.
//    */
//    let queue = [0]; // Start from index 0
//    let visited = new Set();
//
//    while (queue.length > 0) {
//        let start = queue.shift();
//        if (start === s.length) return true; // Reached the end
//        for (let [i, j] of web) {
//            if (i === start && !visited.has(j + 1)) {
//                queue.push(j + 1);
//                visited.add(j + 1);
//            }
//        }
//    }
//    return false;

    /// This one does not work
//    let dict = new Set(wordDict);
//    let start = 0;
//    let end = 0;
//
//    while ( end < s.length ) {
//        if ( dict.has(s.slice(start, end+1)) ) {
//            if ( end+1 === s.length ) return true;
//            start = end+1;
//        }
//        end += 1;
//    }
//    return false;
};
