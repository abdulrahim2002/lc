let is_palindrome = (str, start, end) => {
    // assumes start and ending indices are valid
    let i = start, j = end;
    while ( i < j ) {
        if ( str[i] !== str[j] ) return false;
        i++; j--;
    }
    return true;
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
    **/

   let S = s.length;
   let delta;

   for ( delta = 0; delta < S-1; delta++ )
       if ( is_palindrome(s, 0, (S-1) - delta) )
           break;
   // reverse the string and slice up until delta-1 to get
   // the string to be added at the front.
   return ( s.split('').reverse().join('').slice(0, delta) ) + s;
};
