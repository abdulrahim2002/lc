var isDigit = (x) => {
    if (x!=undefined) x = x.charCodeAt(0);
    else return false;

    zero = "0".charCodeAt(0);
    nine = "9".charCodeAt(0);
    return ( x>=zero && x <=nine );
};


var myAtoi = function(s) {
    S = s.length;
    if (!S) return 0;

    var out = 0;
    var i = 0; var neg = false;

    const INT_MIN = -1 * Math.pow(2,31);
    const INT_MAX = Math.pow(2,31)-1;

    while ( s[i]==" " && i<S) i++;
    if ( (s[i] == "-" || s[i] == "+" )  && i<S) {
        neg = s[i]=="-";i++;
    }

    var start = i;
	while ( i < S && isDigit(s[i]) ) {i++;}
    var end = i;

	if (start===end) {
		if (isDigit(s[start])) return +s[start];
		else return 0;
	}

    for (var j=end-1, i=0; j>=start; j--,i++) {
        var multi= +s[j] * Math.pow(10,i);
        out += multi;
    }

    if (neg) out = -out;

    if (out > INT_MAX) return INT_MAX;
    else if (out < INT_MIN) return INT_MIN;
    else return out;
}
