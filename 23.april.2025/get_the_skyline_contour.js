class MaxHeap {
    constructor(arr) {
        this.heap = arr === undefined ? [] : [...arr];
        this.heapify();
    }

    swap(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }

    heapify() {
        const n = this.heap.length;
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            this.sift_down(i);
        }
    }

    sift_down(i) {
        const a = this.heap;
        const n = a.length;

        if (i < 0 || i >= n) {
            throw new Error(`Invalid index: ${i}`);
        }

        while (true) {
            const lc = 2 * i + 1;
            const rc = 2 * i + 2;
            let largest = i;

            if (lc < n && a[lc] > a[largest]) largest = lc;
            if (rc < n && a[rc] > a[largest]) largest = rc;

            if (largest !== i) {
                this.swap(i, largest);
                i = largest;
            } else {
                break;
            }
        }
    }

    sift_up(ci) {
        const a = this.heap;
        const n = a.length;

        if (ci < 0 || ci >= n) {
            throw new Error(`Invalid index: ${ci}`);
        }

        while (true) {
            const parent = Math.floor((ci - 1) / 2);
            if (parent >= 0 && a[ci] > a[parent]) {
                this.swap(ci, parent);
                ci = parent;
            } else {
                break;
            }
        }
    }

    extract_max() {
        if (this.heap.length === 0) return undefined;
        this.swap(0, this.heap.length - 1);
        const max = this.heap.pop();
        if (this.heap.length > 0) {
            this.sift_down(0);
        }
        return max;
    }

    insert(value) {
        if (typeof value === "number") {
            this.heap.push(value);
            this.sift_up(this.heap.length - 1);
        } else if (Array.isArray(value)) {
            for (const num of value) {
                this.insert(num);
            }
        } else {
            throw new Error("Invalid value type");
        }
    }

    remove(value) {
        if (typeof value === "number") {
            const idx = this.heap.indexOf(value);
            if (idx === -1) return;
            if (idx === this.heap.length - 1) {
                this.heap.pop();
            } else {
                this.swap(idx, this.heap.length - 1);
                this.heap.pop();
                this.sift_down(idx);
            }
        } else if (Array.isArray(value)) {
            for (const num of value) {
                this.remove(num);
            }
        } else {
            throw new Error("Invalid value type");
        }
    }

    peek() {
        return this.heap.length > 0 ? this.heap[0] : undefined;
    }

    size() {
        return this.heap.length;
    }
}



var getSkyline = function(buildings) {
    let heap = new MaxHeap( [0] );

    let checkpoints = [];

    for ( let b of buildings ) {
        // first variable stores x coordinate, and second stores height, and
        // third tells weather the value is a starting point or ending point of
        // a building
        checkpoints.push( [ b[0], b[2], true ] );
        checkpoints.push( [ b[1], b[2], false ] );
    }

    /** Sorting is done based on the following rules:
     *  1. if x not equal -> sort by x
     *  2. if height not equal -> sort by starting point
     *     i.e. positive value first
     *  3. For same x and both starting points. higher height comes first
     *  4. For same x and both ending points; lower height comes first
     **/
    checkpoints.sort( (a,b) => {
        // if x not equal -> sort by x
        if (a[0] !== b[0]) return a[0] - b[0];
        // if height not equal -> sort by starting point
        if (a[2] !== b[2]) return a[2] ? -1 : 1;
        // height is equal and a is starting point -> higher height first
        if (a[2]) return b[1] - a[1];
        // else lower height first
        return a[1] - b[1];

     } );

     console.log(checkpoints);

    let res = [],
        prev_max = 0;

    for ( let c of checkpoints ) {

        let [ pt, ht, is_starting ] = c;

        if ( is_starting )
            heap.insert( ht );
        else
            heap.remove( ht );

        if ( heap.peek() !== prev_max ) {
            res.push( [ pt, heap.peek() ] );
            prev_max = heap.peek();
        }

    }

    return res;
};
