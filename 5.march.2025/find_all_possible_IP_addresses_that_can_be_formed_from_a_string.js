var restoreIpAddresses = function(s) {
    /**
       Given a string of integers. Return all possible
       IP addresses it can form without changing the
       order.

       25525511135
       -> 255.255.11.135
       -> 255.255.111.35

       We basically need to find number of ways we can
       insert a "." in the input string, satisfying the
       following conditions:
       - No number starts with 0
       - Number in the range [0, 255]
       - All numbers in the input string are used

       Approach 1:
       3 loop approach, trying to place a dot at each
       location

       Time: O(n^3)
       Space: O(1)

       Approach 2:
       Backtracking based solution. Try to put dots in the
       string, for each valid candidate. add it to solution set
       return solutions
       Time: O(n^3) // same
       Space: O(1)
    **/
    const S = s.length;

    // optimization. If the input length is > 12. Then one
    // of the numbers has either leading 0s or is greater than
    // 255
    if ( S > 12 || S < 4 ) return [];

    let ans = [];

    for ( let i=1; i < S-2; i++ )
        for ( let j=i+1; j < S-1; j++ )
            for ( let k=j+1; k < S; k++ ) {

                // check if any number is greater than 3 digit
                if ( (i-0)>3 || (j-i)>3 || (k-j)>3 || (S-k)>3 ) continue;

                let n1= s.slice(0, i) ;
                let n2= s.slice(i, j) ;
                let n3= s.slice(j, k) ;
                let n4= s.slice(k, S) ;
                //console.log(n1, n2, n3, n4);

               // check for leading zeros in any number
               let invalid = false;
               for ( let num of [n1, n2, n3, n4] ) {
                   if ( num.length > 1 && num.startsWith('0') ) {
                       invalid = true;
                       break;
                   }
               }
               if (invalid) continue;

                // check if any number is greater than 255
                if ( (Number(n1) > 255 ) ||
                     (Number(n2) > 255 ) ||
                     (Number(n3) > 255 ) ||
                     (Number(n4) > 255 )
                   )
                continue;

                // save the answer
                ans.push( n1+'.'+n2+'.'+n3+'.'+n4 );
            }

    return ans;
};
