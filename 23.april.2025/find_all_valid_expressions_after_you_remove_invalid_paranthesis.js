var removeInvalidParentheses = function(s) {
    /**
       The basic idea to solve this question is to try out including and
       excluding all possible paranthesis. At each index, keep track of the
       number of left paranthesis and number of right paranthesis until now.
       And also the number of paranthesis removed.

       At last index, it can be found if the expression is valid, by checking
       left paranthesis == right paranthsis. Also, Whenever, you encounter an
       invalid expression, then do not include anything any futher, since, it
       doesn;'t matter what you add to it, it will lead to an invalid solution.
       so prune early. Lastly, just add any non paranthesis character in the input.

       At last, if the number of remove paranthesis is greater than the minium
       number of paranthesis removal seen so far than reject this valid
       expression. Also, at last, filter for length. Only keep the solutions
       with minium number of paranthesios removed.

       Optimation: If we found a solution and we know how many left and right
       paranthesis are removed in the solution, then we can further prune by not
       exploring paths in which we are trying to remove more paranthesis than
       are in a found solution.
    **/

    const N = s.length,
          saves = [];

    let min_global = 1e5,
        l_removed = 1e5,
        r_removed = 1e5;

    const bt_search = ( i, left, right, n_removed, exp, l_rem, r_rem ) => {

        if ( i === N ) {
            if ( left === right && n_removed <= min_global ) {
                saves.push(exp);
                min_global = Math.min( min_global, n_removed );
                l_removed = Math.min( l_removed, l_rem );
                r_removed = Math.min( r_removed, r_rem );
            }

            return;
        }

        if ( right > left || n_removed > min_global ) return;

        if ( s[i] == "(" ) {
            // include
            bt_search( i+1, left+1, right, n_removed, exp+"(", l_rem, r_rem );
            // remove
            if ( l_rem < l_removed )
                bt_search( i+1, left, right, n_removed+1, exp, l_rem+1, r_rem);
        }
        else if ( s[i] == ")" ) {
            // include
            bt_search( i+1, left, right+1, n_removed, exp+")", l_rem, r_rem );
            // remove
            if ( r_rem < r_removed )
                bt_search( i+1, left, right, n_removed+1, exp, l_rem, r_rem+1 );
        }
        else {
            // include
            bt_search( i+1, left, right, n_removed, exp+`${s[i]}`, l_rem, r_rem );
        }
    };

    bt_search( 0, 0, 0, 0, '', 0, 0 );
    // length of valid expressions should be: length of original expression -
    // min number of removed paranthesis

    // saves = saves.filter( (x) => x.length == (N-min_global) );
    return [...new Set(saves)];

//    const N = s.length,
//          saves = new Set();
//
//    let min_global = 1e5;
//
//    const bt_search = ( i, left, right, n_removed, exp ) => {
//
//        if ( i === N ) {
//            if ( left === right && n_removed <= min_global && !saves.has(exp) ) {
//                saves.add(exp);
//                min_global = Math.min( min_global, n_removed );
//            }
//
//            return;
//        }
//
//        if ( right > left ) return;
//
//        if ( s[i] == "(" ) {
//            // include
//            bt_search( i+1, left+1, right, n_removed, exp+"(" );
//            // remove
//            bt_search( i+1, left, right, n_removed+1, exp );
//        }
//        else if ( s[i] == ")" ) {
//            // include
//            bt_search( i+1, left, right+1, n_removed, exp+")" );
//            // remove
//            bt_search( i+1, left, right, n_removed+1, exp );
//        }
//        else {
//            // include
//            bt_search( i+1, left, right, n_removed, exp+`${s[i]}` );
//        }
//    };
//
//    bt_search( 0, 0, 0, 0, '' );
//    // length of valid expressions should be: length of original expression -
//    // min number of removed paranthesis
//
//    return [...saves].filter( (x) => x.length == (N-min_global) );
};
