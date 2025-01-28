// Input: nums = [1,2,3]
// Output: [1,3,2]
//
// Input: nums = [3,2,1]
// Output: [1,2,3]
//
// Input: nums = [1,1,5]
// Output: [1,5,1]


/*
 * We are suppose to find the next lexicographical permutation for a
 * given string using it's characters only.
 * */
var nextPermutation = function(a) {
    /**
     * Next permutation algorithm:
     * Step 1: Find the largest k such that a[k]<a[k+1]
     *          if (not found) return k.reverse()
     * Step 2: Find the largest number l such that
     *          a[k] < a[l]
     * Step 3: Swap a[k],a[l]
     * Step 4: reverse the array from a[k+1]- a[A-1]
     * Step 5: return a
     */
    let A = a.length
    let last = true;
    var k;

    // O(n)
    for (k=A-2; k>=0; k--) {
        /* k ∈   {A-2, A-1, A, ..., 0}, consequently
         * k+1 ∈ {A-1, A,   A-1, ..,1}
         * Hence, we never access out of bond */
        if (a[k]<a[k+1]) {
            last = false;
            break;
        }
    }

    if (last) return a.reverse(); // O(n)

    var l; // O(n)
    for (l=A-1; l>k; l--) {
        if (a[l] > a[k]) {
            let tmp=a[k]; a[k]=a[l]; a[l]=tmp;
            break;
        }
    }

    var i=k+1;var j=A-1; //O(n)
    while (i<=j) {
        let tmp=a[i]; a[i]=a[j];a[j]=tmp;
        i++;j--;
    }

    return a;
};

var main = () => {
    var a = [];
    console.log(nextPermutation(a));
};

main();
