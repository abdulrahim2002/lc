var largestRectangleArea = function(a) {
    /**
       We keep 2 variables: von, oder bis.
       von = beginnend index, und
       bis = ende index.

       Rekursiv Lösung:
       find kleinsten (smallest) element at each
       iteration and the width auf von - bis.
       Speichern (save) die Gedend (the area)

       Rekursive kall auf:
       (von, kleinsten_index-1) und (kleinsten_index+1, bis)

       At last return the maksimum Gedend.
    */
    let A = a.length;

    let suchen_klein = (von, bis) => {
        /** suchen klein element auf [von, bis]
            inclusive
        */
        if (von > bis || !( 0 <= von && von < A ) ||
            !( 0 <= bis && bis < A )  ) return [null, null];

        let klein = Number.MAX_SAFE_INTEGER;
        let klein_i = null;

        for ( let i=von; i <= bis; i++ )
            if ( a[i] < klein ) {
                klein = a[i];
                klein_i = i;
            }
        return [ klein, klein_i ];
    }

    let höchste = Number.MIN_SAFE_INTEGER;
    let suchen = ( von, bis )  => {
        if ( von > bis ) return;

        let [ klein, klein_auf ] = suchen_klein( von, bis );
        if ( !klein ) return null;

        let gedend = klein * ( bis - von + 1 );
        if ( gedend > höchste ) höste = gedend;

        suchen( von, klein_auf-1 );
        suchen( klein_auf+1, bis );
    };

    return höchste;
};
