var is_alphanumeric = function (character) {
    const code = character[0].charCodeAt(0);

    if (!(code > 47 && code < 58) &&    // numeric (0-9)
        !(code > 64 && code < 91) &&    // upper alpha (A-Z)
        !(code > 96 && code < 123)) {   // lower alpha (a-z)
        return false;
    }
    else return true;
};

var isPalindrome = function(s) {
    /**
     * convert uppercase into lowercase, ignore non-alphanumeric,
     * check palindrome
     * */
    var i= 0;
    var j= s.length-1;

    while (i<=j) {
        if ( !is_alphanumeric( s[i] ) ) { i++; continue; }
        if ( !is_alphanumeric( s[j] ) ) { j--; continue; }
        if (s[i].toLowerCase() != s[j].toLowerCase() ) return false;
        i++;j--;
    }

    return true;
};
