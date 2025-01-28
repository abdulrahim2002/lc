let heapify = (h) => {
    /**
       Heapify the array of list heads, such that the null elements end up at
       the bottom of the tree.
    */
    let H = h.length;

    let heapify_i = (i) => {
        let root = i;
        let lc = 2*i + 1;
        let rc = 2*i + 2;
        let smallest = root;

        if ( lc < H && h[lc] && (!h[smallest] || h[lc].val < h[smallest].val) )
            smallest = lc;
        if ( rc < H && h[rc] && (!h[smallest] || h[rc].val < h[smallest].val) )
            smallest = rc;

        if ( smallest !== root ) {
            [ h[root], h[smallest] ] = [ h[smallest], h[root] ];
            heapify_i(smallest);
        }

    };

    for (let i=Math.floor(H/2)-1; i>=0; i--)
        heapify_i(i);
};

let extract_min = (h) => {
    /** Extracts the minium element out of a min heap h
     */
    let H = h.length;
    let min = h[0];
    if (!min) return null;

    h[0] = h[0].next;

    let drown = (i) => {
        /* drown a value until heap property is satisfied This is useful after
           the minium element from top of heap is extracted. And it is replaced
           with a new value. You must push this new value down until heap
           property is satisfied.
        */
        while ( i <= Math.floor(H/2)-1 ) {
            let root = i;
            let lc = 2*i + 1;
            let rc = 2*i + 2;
            let smallest = root;

            if ( lc < H && h[lc] && (!h[smallest] || h[lc].val < h[smallest].val) )
                smallest = lc;

            if ( rc < H && h[rc] && (!h[smallest] || h[rc].val < h[smallest].val) )
                smallest = rc;

            if ( smallest != root ) {
                [ h[root], h[smallest] ] = [ h[smallest], h[root] ];
                i = smallest;
            }
            else break;
        }
    };

    drown(0);
    return min;
};

var mergeKLists = function(h) {
    if (!h) return null;

    heapify(h);

    let res  = {next:null};
    let g = res;

    let next_node = null;
    while ( next_node = extract_min(h) ) {
        g.next = next_node;
        g = g.next;
    }

    return res.next;
};
