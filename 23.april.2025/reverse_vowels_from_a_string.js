/**
 * @param {string} s
 * @return {string}
 */
var reverseVowels = function(a) {
    a = a.split('');

    let A = a.length;

    let i = 0,
        j = A-1;

    const vow = new Set( ['a', 'e', 'i', 'o', 'u'] );

    while ( i < j ) {
        // a[i] is vowel
        const ai = vow.has( a[i].toLowerCase() );
        const aj = vow.has( a[j].toLowerCase() );

        // both are vowels.
        if ( ai && aj ) {
            [ a[i], a[j] ] = [ a[j], a[i] ];
            i++; j--;
        }
        // i is vowel and j is not
        else if ( ai && !aj ) j--;
        // j is vowel and i is not
        else if ( !ai && aj ) i++;
        // both a[i] and a[j] are not vowels
        else { i++; j--; }
    }
    return a.join('');
};
