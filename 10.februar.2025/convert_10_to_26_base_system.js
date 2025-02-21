var convertToTitle = function(number) {
    let res = "";
    while ( number ) {
        number--;
        let remainder = number % 26;
        res = String.fromCharCode(remainder + 65) + res;
        number = Math.floor(number / 26);
    }
    return res;
};
