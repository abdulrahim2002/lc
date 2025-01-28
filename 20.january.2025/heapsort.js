    /**
       We will use the heap sort algorithm. Which works as follows.
       1. a valid heap is build from the input array in O(n) time
       2. execute the extract_min operation n times, and place the
       extracted minium element at the front of the list

       Time: O(n log n)
       Space: O(1)
    */

var sortColors = function(a) {
    let A = a.length;

    let heapify = () => {
        let heapify_i = (i) => {
            let root = i;
            let lc = 2*i + 1;
            let rc = 2*i + 2;
            let smallest = root;

            if ( lc < A && a[lc] < a[smallest] ) smallest = lc;
            if ( rc < A && a[rc] < a[smallest] ) smallest = rc;

            if ( smallest !== root ) {
                [ a[root], a[smallest] ] = [ a[smallest], a[root] ];
                heapify_i(smallest);
            }
        };
        for (let i=Math.floor(A/2)-1; i >=0; i--)
            heapify_i(i);
    };
    heapify();  /* O(n) */

    let heapify_down = (new_size) => {
        let i = 0; // Start from the root
        while (true) {
            let lc = 2 * i + 1; // Left child index
            let rc = 2 * i + 2; // Right child index
            let smallest = i;

            // Compare root with left and right children
            if (lc < new_size && a[lc] < a[smallest]) smallest = lc;
            if (rc < new_size && a[rc] < a[smallest]) smallest = rc;

            // If the smallest is not the root, swap and continue
            if (smallest !== i) {
                [a[i], a[smallest]] = [a[smallest], a[i]];
                i = smallest; // Move down to the smallest child
            } else {
                break; // Heap property is restored
            }
        }
    };


    for (let i=A-1; i >= 0; i++) {
        [ a[0], a[i] ] = [ a[i], a[0] ];
        heapify_down( i );
    }

    a.reverse(); // to sort in ascending order
};
