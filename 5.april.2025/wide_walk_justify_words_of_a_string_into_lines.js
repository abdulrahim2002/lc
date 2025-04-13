/**
 * @param {string[]} words
 * @param {number} maxWidth
 * @return {string[]}
 */
var fullJustify = function(words, maxWidth) {
    /**
       For each line.

       - Get as many words such that:
       The length of words + (number of words-1) <= maxWidth

       - now your next task is to arrange these words
       properly justified. For this first calculate the no.
       of spaces b/w all words by:

       total_spaces = maxWidth - spaces_occupied_by_words
       no_spaces = total_spaces // no_of_words
       residue space = total_spaces % no_of_words

       now for each word from left to right. add the spaces
       as:

       if ( residue space remaining )
       word + (no_spaces + 1 ) times space  " "
       ; residue space--
       else
       word + no_spaces times space " "

       clear current line variables

       Explanation: The task is to find how many words
       should we put in the current line. The width of the
       current line will be: maxWidth
       For n number of words, we need at least n-1 spaces,
       since for the words to be distungishable, we need to
       seperate them with atleast one spcace.
    **/
    if ( !words.length || !maxWidth ) return [""];

    let W = words.length;

    // list of words in current line
    let cl = [];
    // current word index in words
    let cwi = 0;
    // length of words only in the current line
    let clwl = 0;

    let output = [];

    // words are remaining
    while ( cwi < W ) {
        // if current word can be added to current line
        let check_new_len = (clwl) + (cl.length-1) + 1 +
                            words[cwi].length;

        if ( check_new_len <= maxWidth ) {
            clwl += words[cwi].length;
            cl.push( words[cwi] );
            cwi++;
        }
        // current word cannot be added to the current line
        else {
            // justify the current line and add it to output
            // clear the current line variables to accomodate
            // this word in next iteration

            // total no. of spacesn
            let no_spaces = maxWidth - clwl;
            // the last word does not need space, so space words are n-1
            let no_words = cl.length-1;

            // if 1 word only -> no_words -> 1
            if ( no_words == 0 ) {
                // single word is left justified.
                let single_word = cl.join('') + " ".repeat( maxWidth - clwl );

                output.push(single_word);

                // clear line variables
                cl = [];
                clwl = 0;

                // skip below logic (incompatible)
                continue;
            }


            // space per word, divided equally
            let spw = Math.floor( no_spaces/no_words );

            // let left over space. To be distributed from left
            let lo = no_spaces % no_words;

            // this line as string
            let this_line = "";

            for ( let j=0; j < cl.length-1; j++ ) {
                let jth_space = (lo > 0) ? spw+1:spw;
                this_line += cl[j] + " ".repeat(jth_space);
                lo--;
            }

            // add the last word as well
            this_line += cl[ cl.length-1 ];

            output.push(this_line);

            // clesar line variables.
            cl = [];
            clwl=0;
        }
    }

    let last_line = cl.join(' ');
    let padding = maxWidth - last_line.length;
    last_line += " ".repeat(padding);

    output.push(last_line);

    return output;
};
