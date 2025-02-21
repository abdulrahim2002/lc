var isHappy = function(n) {
    /**
       Just keep track of the seen numbers in the sequence and keep updating n
       with the sum of it's unit numbers.

       If at any time, n is repeated -> unhappy number
       if n is 1 -> happy number
    */
    let seen = new Set();

    while ( true ) {
        if ( n === 1 ) return true;
        if ( seen.has(n) ) return false;

        seen.add(n);

        n = n.toString().split('').reduce(
            (a,c) => a += (+c) * (+c), 0
        );
    }
};
