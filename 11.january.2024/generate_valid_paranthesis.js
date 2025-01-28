var generate_next = (until_now, n_open, n_close, n, saves) => {
    /**
     * @until_now: valid string that is generated before this step
     * @n_open: number of open paranthesis utilized. Cannot be
     *          greater than n
     * @n_close: number of closing paranthesis utilized. Cannot
     *          be greater than @n_open since that will generate
     *          an invalid next string
     * @n: total number of openining = total number of closing
     *          paranthesis available
     * @saves: all valid solutions. If the generated string has
     *          utilized all available opening and closing
     *          paranthesis, then the string is added to saves
     *
     * Generate the next valid string of 1 more length. i.e. add 1 paranthesis
     * i.e. add an opening or closing paranthesis depending on the
     * conditions:
     *
     * 1. @n_open should be smaller than t
     * 2. @n_close should be smaller than @n_open.
     *  (if closing paranthesis are more then the string is guranteed
     *  to be invalid)
     * 3. @n_open and @n_close should be smaller than t both. t is
     *    the number of available opening and closing paranthesis.
     *    hence, if @n_open = @n_close = t. We are not left with any
     *    more paranthesis and we must return this string as a valid
     *    solution
     */
    if ( until_now.length == 2*n ) {
        saves.push(until_now);
        return;
    }

    if (n_open < t)
        /* add an opening paranthesis */
        generate_next( until_now+"(", n_open+1, n_close, n, saves );

    if (n_close < n_open)
        /* add a closing paranthesis */
        generate_next( until_now+")", n_open, n_close+1, n, saves );
};

var generateParenthesis = function(n) {
    var solutions = [];
    generate_next("", 0, 0, n, solutions);
    return solutions;
};
