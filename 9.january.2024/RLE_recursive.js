var RLE = (s)=> {
    /**
     * s = {s0,s1,s2,s3,s4,s5 .. sS-1}
     * return run length encoding of s
     */
    var rle = "";
    if (!s) return rle;;

    var current_character = s[0]; var current_count = 0;
    for (c of s) {
        if (c == current_character) {
            current_count++;
        }
        else {
            rle += current_count.toString() + current_character;
            current_character = c;
            current_count = 1;
        }
        console.log(`c = ${c}, current_character = ${current_character}, count = ${current_count}`);
    }

    rle += current_count.toString() + current_character;
    return rle;
};

var countAndSay = function(n) {
    if (n==1) return "1";
    else return RLE(countAndSay(n-1));

    /************************************
     Iterative
     if (n==1) return "1";

    var memo = {
        1: "1",
    };

    for (var i=2; i<n; i++) {
        memo[i] = RLE(memo[i-1]);
    }

    return RLE(memo[n-1]);
    ************************************/
};
