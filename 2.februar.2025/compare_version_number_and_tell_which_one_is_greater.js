/**
 * @param {string} version1
 * @param {string} version2
 * @return {number}
 */
var compareVersion = function(version1, version2) {
    /**
       Ignore leading 0, and treat mission numbers as 0.
       version 1 < version 2 => return -1
       version 1 > version 2 => return 1
       else return 0

       The exploit here is that we convert the version numbers into
       integer strings. And then we directly convert these into integer

       This exploits the fact that "001" converts to 1 as integer. Then just
       keep on comparing the integers until one of them is found to be smaller.

       If both lists exhausted and no decision can be made. return equal.
    */
    version1 = version1.split('.');
    version2 = version2.split('.');

    let i=0;
    while ( i < version1.length || i < version2.length ) {
        let v1_number = ( i < version1.length ) ? +version1[i]:0;
        let v2_number = ( i < version2.length ) ? +version2[i]:0;

        if ( v1_number > v2_number ) return 1;
        if ( v2_number > v1_number ) return -1;

        i++;
    }

    return 0;
};
