/**
   This algorithm does not work. This is because we greedly match as
   many characters from an input substring which might not gurantee a
   solution will be reached. For example consider:
   s1 = aa b cc
   s2 = d bb ca
   t = aa db cbb cac

   Out algorithm does:
   s1 gives aa. t = db cbb cac, s1 = bc
   s2 gives db. t = cbb cac
   s1 cannot provide cb*, hence false

   However, a possible solution is:
   s1 gives aa, t = db cbb cac, s1 = bcc
   s2 goves d, t = bcbb cac, s2 = bbca
   s1 gives bc, t = bb cac, s1 = c
   s2 goves bbca, t = c, s2 = ""
   s1 gives c, t = "", s1 = ""
   result is true.
 **/
var match_prefix = ( s1, i1, s2, i2 ) => {
    /**
       Take 2 strings s1 and s2, along with pointers for these strings
       i1 and i2 respectivaly. Iterate both pointers until they match.
       return the distance by which both pointers have been advanced
    **/
    let S1 = s1.length, S2 = s2.length, delta = 0;
    if ( !(0 <= i1 && i1 < S1) || !(0 <= i2 && i2 < S2) ) return 0;
    while ( i1 < S1 && i2 < S2 && s1[i1] === s2[i2] ) { i1++; i2++; delta++; }
    return delta;
};

let can_interleave = ( s1, s2, t, s1_first = true ) => {
    let S1 = s1.length, i1 = 0,
        S2 = s1.length, i2 = 0,
        T = t.length,   i =  0;
    let s1_turn = s1_first;
    let delta;
    while ( i < T ) {
        delta = 0;
        if ( s1_turn ) {
            // try matching with s1
            delta = match_prefix( s1, i1, t, i );
            // cannot match any further
            if ( delta === 0 ) break;
            else { i1 += delta; i += delta; }
        }
        else {
            // try matching with s2
            delta = match_prefix( s2, i2, t, i );
            if ( delta === 0 ) break;
            else { i2 += delta; i += delta; }
        }
        s1_turn = !s1_turn;
    }
    return i == T && i1 == S1 && i2 == S2;
};

var isInterleave = function(s1, s2, t) {
    // handling edge case for empty strings.
    if ( s1 == "" ) return s2 == t;
    if ( s2 == "" ) return s1 == t;

    let s1_first = can_interleave( s1, s2, t, true );
    let s2_first = can_interleave( s1, s2, t, false );
    return s1_first || s2_first;
};

/*
  Empty strings are bothering us. Lets see what happens when wither s1
  or s2 is empty, then we must simply return weather the other non
  empty string will match them.

  if both s1 and s2 are empty then t must also be empty which is also
  handeled by the above logic.
 */
