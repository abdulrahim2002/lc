var numDecodings = function(s) {
    let S = s.length;
    if (s[0]=="0") return 0;
    if (S==1) return 1;

    dp_2 = 1;
    dp_1 = 1 ;
    dp = 0;

    for (var i=2; i <= S; i++) {
        j = i-1
        dp = 0

        var num = Number( s.slice(j-1,j+1) );
        num = ( 1 <= num && num <= 26)
        if ( s[j-1]!="0" && num )
            dp += dp_2;

        if (s[j] != "0")
            dp += dp_1;

        dp_2 = dp_1;
        dp_1 = dp;
    }

    return dp;
};
