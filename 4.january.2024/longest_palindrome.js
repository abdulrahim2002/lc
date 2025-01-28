var is_palindrome = (a,i,j) => {
    /**
     * @a: an array of characters or numbers
     * @i: start index
     * @j: end index
     *
     * if a[i] - a[j] (inclusive) is a palindrome, then
     * return the length of the palindrom
     * else
     * return 0
     */
    len = i>=j ? (j+1-i):0;
    while (i<=j) {
        if (a[i]!=a[j])
            return 0;
        else {
            i++;j--;
        }
    }
    return len;
};

var longestPalindrome = function(a)
{
    A = a.length;
    var longest_palindrome = ""; var longest_len = -Infinity;
    for (let i=0; i<A; i++) {
        for (let j=i; j<A; j++) {
            const current_length = is_palindrome(a,i,j);
            if (current_length && current_length > longest_len ) {
                longest_len = current_len;
                longest_palindrome = a.slice(i,j+1);
            }
        }
    }
    return longest_palindrome;
};
