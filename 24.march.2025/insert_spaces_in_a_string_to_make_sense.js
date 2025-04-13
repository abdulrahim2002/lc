/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {string[]}
 */
var wordBreak = function(s, wordDict) {
    if ( !s.length || !wordDict.length ) return [];

    let S = s.length;
    let saves = [];
    wordDict = new Set(wordDict);


    // backtracking based solution
    // @start: the current word starts at @start and can end upto full
    // @cur: the current string formed after
    let bt_search = (start=0, cur="") => {
        // check if word from [start, <start+1, S>] is in the
        // dictionary. If yes, then move on with adding that
        // word in teh cur string.
        // after that path is explored, remove the word. And
        // continue with that word not included.

        // if start >= S, this is success case.
        // since failure wont reach here.
        if ( start >= S ) {
            saves.push(cur);
            return;
        }

        for (let i=start+1; i <= S; i++)
            if ( wordDict.has(s.slice(start, i)) ) {
                if ( i == S )
                    bt_search( i, cur + s.slice(start, i) );
                else
                    bt_search( i, cur + s.slice(start, i) + " " );
            }
    };

    bt_search();
    return saves;
};
