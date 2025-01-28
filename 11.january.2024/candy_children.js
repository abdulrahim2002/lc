var findContentChildren = function(required_size, size) {
    var R = required_size.length;
    var S = size.length;
    required_size.sort( (a,b) => a-b );
    size.sort( (a,b) => a-b );

    var i;var j;
    for (i=j=0 ; i < R && j < S; j++) {
        if ( required_size[i] <= size[j] ) i++;
    }

    return i;
};
