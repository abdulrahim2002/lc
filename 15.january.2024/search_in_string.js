var strStr = function(bhusa, sui) {
    for (let i=0; i < (bhusa.length - sui.length)+1; i++) {
        let found = true;
        for (let j=i; j < (i + sui.length); j++) {
            if ( bhusa[j] != sui[j-i] ) {
                found = false;
                break;
            }
        }
        if (found) return i;
    }

    return -1;
};
