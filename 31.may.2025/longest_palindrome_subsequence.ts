function longestPalindromeSubseq(s: string): number {
    /**
       The answer is the Longest Common subsequence between s and s_reversed
    **/
    return LCS( s, s.split('').reverse().join('') );
};

function LCS( str1: string, str2: string ): number {
    // return the length of longest commom subsequence between str1 and str2
    const   M = str1.length, N = str2.length,
            // rows form the characters of str1 and columns are characters of str2
            lcs_table = Array.from( {length:M}, ()=>new Array(N) );

    const get_lcs = ( i: number, j: number ): number => {
        if ( 0 <= i && i < M && 0 <= j && j < N )
            return lcs_table[i][j];
        else
            return 0;
    };

    for ( let i=0; i < M; i++ ) {
        for ( let j=0; j < N; j++ ) {
            if ( str1[i] == str2[j] )
                lcs_table[i][j] = 1 + get_lcs( i-1, j-1 );
            else
                lcs_table[i][j] = Math.max( get_lcs(i-1, j), get_lcs(i-1, j-1), get_lcs(i, j-1) );
        }
    }

    console.log( lcs_table );

    return get_lcs( M-1, N-1 );
}
