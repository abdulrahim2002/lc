var swap = function(array, i, j) {
    /* swap a[i] and a[j] */
    var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
};

var hash_permute = (a, n, store) => {
    /**
     * hash's algorithm to generate permutations of an array.
     * At each step:
     * Permute the first n-1 elements keeping the nth element fixed.
     * 1 <= n <= A (a.length)
     *
     * Warninig: a is modified in-place.
     *
     * if n==1 => return a; permuting only a[0]
     */
    if (n==1) return store.push([...a]);
    for (var i=0; i<n; i++) {
        hash_permute( a,n-1, store );
        if (n%2==0) swap(a,i,n-1);
        else        swap(a,0,n-1);
    }
}

var permute = (x) =>  {
    /**
     * At each step, operate on k initial elements. i.e. from 0 to k-1
     * initially n=k, and thereafter k<n. At each step, n-k last
     * elements remain unaltered.
     *
     * At each iteration (kth). kth element is unaltered and k-1 times kth
     * element exchanged with each of the initial k-1 elements. A rule is needed
     * to select which elements will be exchanged with the last.
     *
     * This decision can be made by using the parity of the number of elements
     * operated at this step. If k is even, the final element is exchanged with
     * each element before it. If k is exchanged with first element.
     */

    /*
     * Algorithm: Heap's algorithm for generation of n objects.
     * Time: O(n!)
     * Space: O(1)
     */

    var saves = [];
    hash_permute(x, x.length, saves);
    return saves;
};

let a = [1,2,3,4,5];
let res = permute(a);
for (p of res) console.log(p)
console.log(res.length)
