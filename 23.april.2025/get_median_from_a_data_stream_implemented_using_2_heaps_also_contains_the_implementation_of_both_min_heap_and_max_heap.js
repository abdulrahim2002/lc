class MinHeap {
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
            let smallest = i;

            if (lc < n && a[lc] < a[smallest]) smallest = lc;
            if (rc < n && a[rc] < a[smallest]) smallest = rc;

            if (smallest !== i) {
                this.swap(i, smallest);
                i = smallest;
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
            if (parent >= 0 && a[ci] < a[parent]) {
                this.swap(ci, parent);
                ci = parent;
            } else {
                break;
            }
        }
    }

    extract_min() {
        if (this.heap.length === 0) return undefined;
        this.swap(0, this.heap.length - 1);
        const min = this.heap.pop();
        if (this.heap.length > 0) {
            this.sift_down(0);
        }
        return min;
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

var MedianFinder = function() {
    /**
        The only problem with the previous solution is that it is expensive in
        insertions. it is O(n). we want to be able to get median in O(1) and
        insertions should be O(log n) at max. How can we do that:

        There are a couple of data structures that can do the job, each with its
        own benifits and drawbacks. Lets discuss them:

        1. Self balancing binary tree: In a self balancing binayr tree like AVL
        tree, you can insert elements in O(log n). We can keep a pointer at the
        middle element, which always increments in pre order traversal hence in
        a sorted order in the tree.

        This appraoch is slightly complicated beacuse we need a self belancing
        tree and both a pointer of pre order. The thing is that keeping the
        pointer in the right position while insertions are hapenning is quite
        difficult and can be considered a research grade problem.

        Time: O(1) for creation, O(1) for median querym O(log n) for insertion
        Space: O(n) keeping track of all the elments

        2. double heap approach: The idea is to partition the numbers at the
        middle such that the smaller numbers are to the left and the larger
        numbers are to the right. The median is then the max of left partition
        or average of max of left partition and min of right partition.

        To the min and max in constant time, we build 2 heaps. Also, in our
        implementation, we keep the size of left parttion larger so the median
        whne elements are odd are found in left partition.

        To keep track the number of elemnets {weather are even or odd} we will
        use a parity bit. Each insertion flips this parity.

        Time: O(1) creation, O(1) median query, O(log n) insertion.
        Space: O(n) keeping track of all elements
    **/
    this.right_partition = new MinHeap();
    this.left_partition =  new MaxHeap();

    // when parity is false(0) the number of elments are even
    // when parity is true(1) number of elmenets are odd
    this.parity = false;
};

MedianFinder.prototype.addNum = function(num) {
    const left_partition = this.left_partition,
          right_partition = this.right_partition;

    // all insertions flip the parity
    this.parity = !this.parity;

    if ( left_partition.size() === 0 ) {
        left_partition.insert( num );
        return;
    }

    if ( right_partition.size() === 0 ) {
        // this number might be smaller than number in the left partition.
        if ( num < left_partition.peek() ) {
            const put_in_right_part =  left_partition.extract_max();
            left_partition.insert( num );
            right_partition.insert( put_in_right_part );
        }
        else right_partition.insert( num );

        return;
    }

    // now that we have filled first and second elements
    if ( num <= left_partition.peek() )
        left_partition.insert( num );
    else right_partition.insert( num );

    if ( right_partition.size() > left_partition.size() )
        left_partition.insert( right_partition.extract_min() );

    if ( left_partition.size() - right_partition.size() > 1 )
        right_partition.insert( left_partition.extract_max() );
};

MedianFinder.prototype.findMedian = function() {
    const left_partition = this.left_partition,
          right_partition = this.right_partition;

    if ( this.parity ) return left_partition.peek();
    else
        return (left_partition.peek() + right_partition.peek())/2;
};

//var MedianFinder = function() {
//    /**
//        Naive method: keep a list of numbers. Store all incoming numbers,
//        and find the median using indices. For this we use technique similar to
//        bubbling in bubble sort.
//    **/
//    this.list = [];
//};
//
///**
// * @param {number} num
// * @return {void}
// */
//MedianFinder.prototype.addNum = function(num) {
//    this.list.push(num);
//    let a = this.list;
//    let A = a.length;
//    for ( let i=A-1; i > 0; i-- ) {
//        if ( a[i] < a[i-1] ) {
//            [ a[i], a[i-1] ] = [ a[i-1], a[i] ];
//        }
//        else break;
//    }
//};
//
///**
// * @return {number}
// */
//MedianFinder.prototype.findMedian = function() {
//    let L = this.list.length;
//    if ( L%2 == 1 ) {
//        // odd number of elements. The the median is @(L-1)/2
//        return this.list[ (L-1)/2 ];
//    }
//    else {
//        // even number of elements, the median is mean of elements
//        // at (L/2) and (L-2)/2
//        let a = this.list[ L/2 ];
//        let b = this.list[ (L-2)/2 ];
//        return a + (b-a)/2;
//    }
//};
//
///**
// * Your MedianFinder object will be instantiated and called as such:
// * var obj = new MedianFinder()
// * obj.addNum(num)
// * var param_2 = obj.findMedian()
// */
