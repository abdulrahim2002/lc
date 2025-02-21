var countPrimes = function(n) {
    /**
       Find the number of prime numbers less than n.

       Naive method:
       1. check each number between 2 and n and return the primes found.
       2. optimized.
       same but check in multiples of 6 and for the prime number check, check
       up until root n

       3. There is another algorithm that can do this job in O(n log logn)
       https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes

       Time: O(n * log(logn))
       Space: O(n)
    */
    if ( n < 2 ) return 0;

    let primes = new Array(n+1).fill(true);

    for (let i=2; i*i <= n; i++)
        if ( primes[i] )
            for (let k=i*i; k < n; k+=i)
                primes[k]  = false;

    let cnt = 0;
    for (let i=2; i < n; i++)
        if ( primes[i] ) cnt++;

    return cnt;

//    if (n < 2) return 0;
//    if ( n == 2 ) return 0;
//    if ( n == 3 ) return 1;
//    if ( n == 4 || n == 5 ) return 2;
//
//    let primes = new Set();
//
//    let isprime = (x) => {
//        if (primes.has(x)) return true;
//
//        if ( x < 2 ) return false;
//        for (let i=2; i < Math.sqrt(x)+1 && i < x; i++ )
//            if ( x%i == 0 ) return false;
//        primes.add(x);
//        return true;
//    };
//
//    let count = 0;
////    for (let i=0; i < 20; i++ ) console.log( `i=${i} is prime: ${isprime(i)}` );
//
//    for (let i=1; i <= Math.floor(n/6); i++) {
//        let l = i*6+1;
//        let r = i*6-1;
//        if ( l < n && isprime(l)) count++;
//        if ( r < n && isprime(r)) count++;
//    }
//
//    return count+2;
};
