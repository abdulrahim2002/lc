let swap = (a, i, j) => {
    let tmp = a[i]; a[i]=a[j]; a[j]=tmp;
};

var findSubstring = function(input, dict) {
    /**
       dictionary = collection of words.

       A {concatinated permutation set} of a dictionary of words
       is defined as:

       "concatination of all permutations of words of a dictionary"

       produce all possible permutations of words in dictionary.
       e.g. : [ 'ab', 'cd', 'de' ]

       permutations:
       ['ab', 'cd', 'ef'],
       ['ab', 'ef', 'cd'],
       ['cd', 'ab', 'ef'],
       ['cd', 'ef', 'ab'],
       ['ef', 'ab', 'cd'],
       ['ef', 'cd', 'ab']

       for each of these permutations of words, concatinate the
       words as they appear in the permutation

       concatinated permutation set:
       ['ab', 'cd', 'ef'] = abcdef
       ['ab', 'ef', 'cd'] = abefcd
       ['cd', 'ab', 'ef'] = cdabef
       ['cd', 'ef', 'ab'] = cdefab
       ['ef', 'ab', 'cd'] = efabcd
       ['ef', 'cd', 'ab'] = efcdab

       Approach:

       Step 1: Produce the concationation_permutation_set of a
       dictionary.
       Step 2: for each substring of the input string of length:
       length of each word * no. of words in the dictionary

       check if the substring is in the concatination_permutation_set
       if yes, save this substring by saving its starting index

       Time: O( n*n! ) for generating permutations
       Space: O(n!)     // storing all permutatiosn

       Appraoch 2: We can and should avoid all possible permutations if
       possible. This can be done by using the fact that all words in the
       dictionary are of equal length

       for each substring of length: dict.length * dict[0].length
       make a temporary set of words.
       divide the substring into chunks of length: dict[0].length
       if chunk in the temporary set, cancel out the chunk.
       repeat for all chunks

       at last, if the temporary set of words is empty, meaning all chunks
       utilized, we can confirm that the chunks were a permutation of words

       save this index.

       Time: O( n^2 )   for each substring, create a new set
       Space: O(n)      Storing the set
    **/

    // eliminate empty inputs
    if ( input.length==0 || dict.length==0 ) return [];

    // Approach 1: iterate thruogh substrings of length: dictionary*chunk length;
    // for each such substring, iterate through the chunks. Find if each
    let D = dict.length;
    let C_LEN = dict[0].length;
    let P_LEN = D * C_LEN;
    let res = [];

    // mapping of words and their frequencies
    let word_save = {};
    for ( word of dict )
        word_save[word] = (word_save[word]|0) + 1;

    let word_map;


    for ( let i=0; i + P_LEN <= input.length; i++ ) {

        word_map = {};
        for ( word of dict )
            word_map[word] = word_save[word];

        for ( let j=i; j+C_LEN <= i+P_LEN; j+=C_LEN ) {
            let chunk = input.slice( j, j+C_LEN );
            word_map[chunk] = (word_map[chunk]|0) - 1;
        }

        let match = true;
        for ( word of dict )
            if ( word_map[word] ) {
                match = false;
                break;
            }

        if (match) res.push(i);
    }


//    // Approach 1: generate concatenated permutation set, then iterate through
//    // patterns and find if the pattern is there in the concatenated permutation
//    // set. return matched indexdes
//    let D = dict.length;
//    let res = [];
//
//    let concatinated_permutation_set = new Set(); // O(n!)
//
//    let perm = ( start ) => {
//        /* backtracking based permutation generation */
//        if ( start == D ) {
//            concatinated_permutation_set.add( dict.join('') );
//            return;
//        }
//        for ( let i=start; i < D; i++ ) {
//            swap( dict, start, i );
//            perm(start+1);
//            swap( dict, start, i );
//        }
//    }
//    perm( 0 );
//
//    // after permutation set produced, iterate through all substrings
//    // of input, of length P_len. and check if they are in the set.
//    // if yes, save their index
//    let P_len = D * dict[0].length;
//
//    for (let i=0; i+P_len <= input.length; i++  )
//        if ( concatinated_permutation_set.has(input.slice(i, i+P_len)) )
//            res.push(i);

    return res;
};
