var findRepeatedDnaSequences = function(s) {
    /**
       AAAAA CCCCC AAAAA CCCCC CAAAA AGGGT TT

       AAAAA CCCCC
       AAAAC CCCCA
       AAACC CCCAA
       AACCC CCAAA
       ACCCC CAAAA
       CCCCCAAAAA
       CCCCAAAAAC
       CCCAAAAACC
       CCAAAAACCC
       CAAAAACCCC
       AAAAACCCCC
       AAAACCCCCC
       AAACCCCCCA
       AACCCCCCAA
       ACCCCCCAAA
       CCCCCCAAAA
       CCCCCAAAAA
       CCCCAAAAAG
       CCCAAAAAGG
       CCAAAAAGGG
       CAAAAAGGGT
       AAAAAGGGTT
       AAAAG GGTTT

       AAAAA AAAAA AAA

       AAAAA AAAAA
       AAAAA AAAAA
       AAAAA AAAAA

       AAAAA AAAAAA



       The second example demonstrates that the sequences
       can overlap.

       The algorithm to straight compare is quite inefficient.
       this runs in cubic time.

       This can be improved by using a hashmap.
       The approach is:
       Tiem: O(n)
       Space: O(n)
    **/

    let S = s.length;
    if ( S < 11 ) return [];

    let seen = {};
    let res = [];

    for ( let i=0; i <= (S-10); i++ )
        seen[ s.slice(i, i+10) ] = (seen[ s.slice(i, i+10) ] | 0) + 1;

    for (let [pat, freq] of Object.entries(seen))
        if ( freq > 1 ) res.push(pat) ;

    return res;

//    let S = s.length;
//    let res = new Set();
//
//    if ( S < 11 ) return [];
//
//    /* All possible DNA sequences of length 10 */
//    for (let i=0; i <= (S-10); i++ )
//        for (let j=i+1; j <= (S-10); j++ )
//            if ( s.slice(i, i+10) === s.slice(j, j+10) )
//                res.add( s.slice(i, i+10) );
//
//    return [...res];
};
