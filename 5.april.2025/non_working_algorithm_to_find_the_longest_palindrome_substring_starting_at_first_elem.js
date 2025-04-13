//let is_palindrome = (str, start, end) => {
//    // assumes start and ending indices are valid
//    let i = start, j = end;
//    while ( i < j ) {
//        if ( str[i] !== str[j] ) return false;
//        i++; j--;
//    }
//    return true;
//};
//

// will not work
let manacher = ( str ) => {
    // return the length of the longest palindrome starting from index 0
    let S = str.length;

    if ( !S || S == 1 ) return S;

    // stores length of longest palindrome starting at index 0
    let len = 1;

    // checkign maximum lenght for an odd length palindrom starting
    // from index 0
    let i=0;
    while ( i < S ) {
        // find palindrome centered @i
        let delta = 0;
        while ( (i-delta >= 0 && i+delta < S) &&
                str[ i-delta ] === str[i+delta]  )
            delta++;

        delta = delta-1;

        if ( i-delta === 0 )
            len = Math.max( 1 + 2*delta, len );

        i = i+delta+1;
    }

    // check for maximum length of an even length palindrome
    // starting form index 0: Think of "abbacd"
    l=0;
    while ( l < S-1 ) {
        // check if string between and including l and r is a
        // palindrome
        let r = l+1;

        // first window is itself invalid
        if ( str[l] !== str[r] ) {
            l++; continue;
        }

        while ( str[l] === str[r]  ) {
            // update conservatively so l and r are valid
            if ( l-1 >= 0 && r+1 < S  ) {
                l--; r++;
            }
            else break;
        }

        if ( l === 0 )
            len = Math.max( 1 + r-l , len );

        l = r+1;
    }

    return len;
};


var shortestPalindrome = function(s) {
    /**
       Find the longest palindrome that you can form
       using the given string from left to right leaving
       delta characters from the right.

       First try leaving 0 characters from the right
       then try leaving 1 characters from the right
       and so on, until you find the correct value of
       delta.

       Then For teh characters you left on the rigth
       i.e. delta, just add these characters at the
       front in reverse. You will get the answer.

       This solution will pass but time limit will exceed.
       The solution is O(n^2) currently because of repetedly
       checking for palndromes. We must make it O(n).

       This can be done by storing a reversed string and cheking
       for palindrome in it. It will reduce the running time.

       The only way to make this algorithm O(n) is to use
       Macher's algorith, which is capable of finding the longest
       palindrome starting from the beginning of the string in O(n);
    **/

    /** runs in O(n)  time  **/
    let S = s.length; if ( !S || S == 1 ) return s;

    let d = manacher(s);

    let prefix = "";
    for ( let i=S-1; i >= d; i-- )
        prefix += s[i];

    return prefix + s;

    /** This answer still gives TLE since it is O(n^2) in time **/
//    let S = s.length;
//    let r = "";
//
//    // generate a reversed string from s
//    for ( let i=S-1; i >= 0; i-- )
//        r += s[i];
//
//    // let this be delta.
//    let d;
//
//    // get the prefix of the string that is already a palindrom
//    for ( d=0; d <= S-1; d++  ) {
//        let is_pal = true;
//
//        for ( let i=0; i <= (S-1)-d; i++ ) {
//            if ( s[i] !== r[d+i] ) {
//                is_pal = false;
//                break;
//            }
//        }
//
//        if ( is_pal ) break;
//    }
//
//    let ans = "";
//
//    // add prefix that would make the whole string a palindrome.
//    for ( let i=0; i < d; i++ )
//        ans += r[i];
//
//    ans += s;
//
//    return ans;

//
//    let S = s.length;
//
//    let delta;
//
//
//    for ( delta = 0; delta < S-1; delta++ )
//       if ( is_palindrome(s, 0, (S-1) - delta) )
//           break;
//
//    // reverse the string and slice up until delta-1 to get
//
//    // the string to be added at the front.
//
//    return ( s.split('').reverse().join('').slice(0, delta) ) + s;
//
};
