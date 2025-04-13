let create_lps = (str) => {
    let lps = new Array(str.length).fill(0),
        len = 0,    // length of longest prefix = suffix
        i = 1;      // current character and lps index

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

let kmp = (main_string, pattern) => {
    let S = main_string.length,
        P = pattern.length,
        matches = [],
        lps = create_lps(pattern),
        i = 0,
        j = 0;

    while ( i < S ) {
        if ( main_string[i] === pattern[j] ) {
            i++; j++;
            if (j === P) {
                matches.push(i - P);
                j = lps[j - 1];
            }
        }
        else {
            if (j === 0) i++
            else j = lps[j - 1];
        }
    }

    return matches;
};

var strStr = function(string, pattern) {
    let match_indices = kmp(string, pattern);
    return match_indices.length ? match_indices[0] : -1;
};
