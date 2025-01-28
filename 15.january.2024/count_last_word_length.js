var lengthOfLastWord = function(s) {
    let S = s.length;
    let e; let count = 0;

    for (e=S-1; e>=0 && s[e]==" " ; e--);
    for (e=e; e>=0 && s[e]!=" "; e--, count++);

    return count;
};
