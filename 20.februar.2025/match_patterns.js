var isMatch = function(s, p) {
    /**
       If the string matches pattern, return true
       else false

       The pattern has "*" and "?"

       Input; "abaxyzbbb" Pattern: ab*b*

       [a] - [a]
       [b] - [b]
       [a] - [*] ignore all characters until next b
       [xyz] - ignore
       [b] - [b]
       [b] - [*] ignore all remaining characters

       Dry Run: aa, a
       s = [a,a], p=[a]

       next_char = a, next_pat = a
       pattern exhausted but string is left -> false

       s = [aa], p=[*]

       next_char=a, p=* and pattenr is empty -> true

       s = [cb], p=[?a]

       next_char=c, next_pat= ?, tops are b, a
       do not match -> false

       use pointers instead of popping()
    **/
    let S = s.length;
    let P = p.length;
    let i = 0; // index in string
    let j = 0; // index in pattern

    let prev_star = null;
    let prev_char = null;

    while ( i < S ) {
        // if i and j are both same or pattern @ j is ?
        // advance both pointers
        if ( j < P && (s[i] == p[j] || p[j] == '?') ) {
            s++;
            p++;
        }

        // this character is star, increase the pattern pointer
        else if ( j < P && p[j] == "*" ) {
            prev_star = j;
            last_char = i;
            j++;
        }

        // there was a * and the current characters do not match
        // no problem, increase the
        else if ( prev_star ) {
            i++;
        }

        else return false;
    }

    while ( j < P && p[j]=="*" ) j++;
    return j == P;

////// the solutoin works but is expensive. ///////////////
//     s = s.split('');
//     p = p.split('');

//     while ( s.length && p.length ) {
//         let next_char = s.pop();
//         let next_pat = p.pop();

// //        console.log(next_pat, next_char);

//         if ( next_pat!='*' && next_pat!='?' ) {
//             if ( next_char != next_pat ) return false;
//         }
//         else if ( next_pat=='*' ) {
// //            console.log( "next pattrn is star and p=", p );
//             if ( p.length == 0 ) return true;
//             else if ( s.length == 0 ) return false;
//             while ( s[s.length-1] != p[p.length-1] )
//                 s.pop();
//         }
//         else {
//             if ( p.length == 0 ) return true;
//             else if ( s.length == 0 ) return false;
//             if ( s[s.length-1] == p[p.length-1] )
//                 s.pop();
//             else return false;
//         }
//     }

//     // an empty start remains in pattern
//     if ( p.length == 1 && p[0] == "*" ) return true;

//     if ( s.length!=0 || p.length!=0 ) return false;
//     else return true;
};
