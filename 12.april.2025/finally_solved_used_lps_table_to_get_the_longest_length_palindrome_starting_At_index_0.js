String.prototype.reverse = function() {
    let rev = "";
    for ( let i = this.length-1; i >= 0; i-- )
        rev += this[i];
    return rev;
};

let create_lps = (str) => {
    let lps = new Array(str.length),
        len = 0,    // length of longest prefix = suffix
        i = 1;      // current character and lps index
    lps[0] = 0;

    while ( i < str.length ) {
        if (str[i] === str[len]) {
            len++;
            lps[i] = len;
            i++;
        }
        else {
            if (len === 0) { lps[i] = 0; i++  }
            else len = lps[len-1];
        }
    }
    return lps;
};

var shortestPalindrome = function(s) {
    /***
        For some reason, for some reason, FOR SOME REASON. the last value at
        lps( s + "$" + s.reverse() ) will give you the length of the longest
        palindrome starting @ index 0
     ***/
    let S = s.length;

    let rev = s.reverse();
    let comb = s + "#" + rev;
    let lps = create_lps( comb );
    // longest palindrome length starting at index 0
    let pal_len = lps[lps.length-1];
    let prefix = rev.slice( 0, S - pal_len );
    return prefix + s;
};
