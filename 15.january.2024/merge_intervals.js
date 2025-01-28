var insert = function( patri, fatta) {

    /* insert fatta at parti */
    for (let i=0; i < patri.length; i++) {
        if ( fatta[0] < patri[i][0] ) {
            patri.splice(i, 0, fatta);
            break;
        }
    }

    /* cutting of overlapping fatta */
    let ok_patri = [patri[0]];

    for (let i=1; i < patri.length; i++) {
        let last_fatta = ok_patri.length-1;
        if ( ok_patri[last_fatta][1] >= patri[i][0] ) {
            /* overlap */
            ok_patri[last_fatta][1] = Math.max( ok_patri[last_fatta][1], patri[i][1] );
        }
        else {
            ok_patri.push( patri[i] );
        }
    }

    return ok_patri;
};
