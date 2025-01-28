var characterReplacement = function(s, k) {
    const S = s.length; if (!S) return 0;

    /* stores the frequencies of all english uppercase characrers in s */
    var freq = {};
    for (var i="A".charCodeAt(0); i <= "Z".charCodeAt(0); i++ )
        freq[ String.fromCharCode(i) ] = 0;


    var mff = 1;
    var max_freq_char = s[0];
    freq[ s[0] ]++;

    var l=r=0;
    var max_substr = 0;

    while ( l <= r ) {
        let win_size = r-l+1;

        if ( (win_size - mff) <= k ) {
            max_substr = (win_size > max_substr) ? win_size:max_substr;
            if (r < S-1) {
                r++;
                freq[ s[r] ]++;
                var update_mff = ( freq[ s[r] ] > mff );
                mff = update_mff ? freq[ s[r] ] : mff;
                max_freq_char = update_mff ? s[r]:max_freq_char;
            }
            else {
                freq[ s[l] ]--;
                l++;
                mmf = Math.min(...freq);
            }
        }
        else {
            freq[ s[l] ]--;
            l++;
            mmf = Math.min(...freq);
        }
    }

    return max_substr;
};
