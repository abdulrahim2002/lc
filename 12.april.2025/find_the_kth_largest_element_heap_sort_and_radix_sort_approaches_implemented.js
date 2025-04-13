var findKthLargest = function(a, k) {
    /**
       Approach 1: Sort the elements in decreasing order
       so 1st largest is in 0th index, 2nd largest is in 1st index etc.

       return array[k-1];
       Time: O(n log n)
       Space: O(sort)

       Appraoch 2: Heapify the elements.
       repeatdly extract the maximum elements k times
       return the kth largest element.

       Time: O( n(heapify) + k * log n (extract max k times) ) = O( n log n ) when k ~ n
       Space: O(1)

       Approach 3:
       Radix sort the elments. Employ MSB radix sort with buckets according to
       bits. At each iteration, only sort the buckets that may contain k. i.e.
       large buckets. The input range is 10000 which means 2^13.
       Time: O(14n) ~ O(n)
       Space: O(2n) // string indices of buckets

       Appraoch 3.1: Radix sort the elements in decreasing order. Only sort up
       until partitions containing kth largest element.
       Time: O( 14n )
       Space: O(2n)

       Approach 4: Use partitioning algorithm from quick sort.
       Time: O(n^2)
       Space: O(1)

       Approach 5: Research grade algorithms with guranteed O(n) runtime
       https://en.wikipedia.org/wiki/Selection_algorithm
       https://en.wikipedia.org/wiki/Quickselect

       This problem is worth exploring in detail provided you have time
    **/
    a.sort( (a, b) => b-a );
    return a[k-1];
};

let swap = ( a, i, j ) => {
    // swap values @i and @j in a
    let A = a.length;
    if ( !( 0 <= i && i < A && 0 <= j && j < A ) )
        raise: Error("Invalid index");
    let tmp = a[i];
    a[i] = a[j];
    a[j] = tmp;
};

let seep_down = (a, i) => {
    /** seep down element @i until heap property
        satisfied in subtree **/
    let A = a.length;

    if ( !( 0 <= i && i < A ) )
        raise: Error("invalid index");

    while ( true ) {
        let lc = i * 2 + 1;
        let rc = i * 2 + 2;
        let largest = i;

        if ( lc < A && a[lc] > a[largest] )
            largest = lc;
        if ( rc < A && a[rc] > a[largest] )
            largest = rc;

        if ( largest !== i ) {
            swap( a, i, largest );
            i = largest;
        }
        else break;
    }
};


let heapify = ( a ) => {
    /** create a max heap out of the array **/
    let A = a.length;
    for ( let i = Math.floor( A/2 ) - 1 ; i >= 0; i-- )
        seep_down(a, i);
};

let extract_max = ( a ) => {
    /** extract maximum element out of a max heap **/
    let A = a.length;
    // swap the first element so it is at
    swap( a, 0, A-1 );
    let largest = a.pop();
    // seep down the elements until max heap valid again
    seep_down( a, 0 );
    return largest;
};

var findKthLargest = function(a, k) {
    /**
       Approach 2: Implement healify algorithm and get the largest algorithm
       repetedly.

       For this task, we must implement 2 operations on the heap.
       1. heapify: convert the given array into a max heap
       2. extract max: get the maximum element from the max heap
       Time: O( n + k log n )
       Space: O(1)
    **/
    // create a max heap
    heapify( a );

    // extract max element k times
    let res;
    for ( ; k > 0 ; k-- ) res = extract_max( a );

    return res;
};


/** Implementation of a deque. This is required for faster implementation of
 * a queue. For the radix sort. **/
function MyDeque(capacity) {
    this._capacity = getCapacity(capacity);
    this._length = 0;
    this._front = 0;
    if (isArray(capacity)) {
        var len = capacity.length;
        for (var i = 0; i < len; ++i) {
            this[i] = capacity[i];
        }
        this._length = len;
    }
}

MyDeque.prototype.toArray = function MyDeque$toArray() {
    var len = this._length;
    var ret = new Array(len);
    var front = this._front;
    var capacity = this._capacity;
    for (var j = 0; j < len; ++j) {
        ret[j] = this[(front + j) & (capacity - 1)];
    }
    return ret;
};

MyDeque.prototype.push = function MyDeque$push(item) {
    var argsLength = arguments.length;
    var length = this._length;
    if (argsLength > 1) {
        var capacity = this._capacity;
        if (length + argsLength > capacity) {
            for (var i = 0; i < argsLength; ++i) {
                this._checkCapacity(length + 1);
                var j = (this._front + length) & (this._capacity - 1);
                this[j] = arguments[i];
                length++;
                this._length = length;
            }
            return length;
        }
        else {
            var j = this._front;
            for (var i = 0; i < argsLength; ++i) {
                this[(j + length) & (capacity - 1)] = arguments[i];
                j++;
            }
            this._length = length + argsLength;
            return length + argsLength;
        }

    }

    if (argsLength === 0) return length;

    this._checkCapacity(length + 1);
    var i = (this._front + length) & (this._capacity - 1);
    this[i] = item;
    this._length = length + 1;
    return length + 1;
};

MyDeque.prototype.pop = function MyDeque$pop() {
    var length = this._length;
    if (length === 0) {
        return void 0;
    }
    var i = (this._front + length - 1) & (this._capacity - 1);
    var ret = this[i];
    this[i] = void 0;
    this._length = length - 1;
    return ret;
};

MyDeque.prototype.shift = function MyDeque$shift() {
    var length = this._length;
    if (length === 0) {
        return void 0;
    }
    var front = this._front;
    var ret = this[front];
    this[front] = void 0;
    this._front = (front + 1) & (this._capacity - 1);
    this._length = length - 1;
    return ret;
};

MyDeque.prototype.unshift = function MyDeque$unshift(item) {
    var length = this._length;
    var argsLength = arguments.length;


    if (argsLength > 1) {
        var capacity = this._capacity;
        if (length + argsLength > capacity) {
            for (var i = argsLength - 1; i >= 0; i--) {
                this._checkCapacity(length + 1);
                var capacity = this._capacity;
                var j = (((( this._front - 1 ) &
                    ( capacity - 1) ) ^ capacity ) - capacity );
                this[j] = arguments[i];
                length++;
                this._length = length;
                this._front = j;
            }
            return length;
        }
        else {
            var front = this._front;
            for (var i = argsLength - 1; i >= 0; i--) {
                var j = (((( front - 1 ) &
                    ( capacity - 1) ) ^ capacity ) - capacity );
                this[j] = arguments[i];
                front = j;
            }
            this._front = front;
            this._length = length + argsLength;
            return length + argsLength;
        }
    }

    if (argsLength === 0) return length;

    this._checkCapacity(length + 1);
    var capacity = this._capacity;
    var i = (((( this._front - 1 ) &
        ( capacity - 1) ) ^ capacity ) - capacity );
    this[i] = item;
    this._length = length + 1;
    this._front = i;
    return length + 1;
};

MyDeque.prototype.peekBack = function MyDeque$peekBack() {
    var length = this._length;
    if (length === 0) {
        return void 0;
    }
    var index = (this._front + length - 1) & (this._capacity - 1);
    return this[index];
};

MyDeque.prototype.peekFront = function MyDeque$peekFront() {
    if (this._length === 0) {
        return void 0;
    }
    return this[this._front];
};

MyDeque.prototype.get = function MyDeque$get(index) {
    var i = index;
    if ((i !== (i | 0))) {
        return void 0;
    }
    var len = this._length;
    if (i < 0) {
        i = i + len;
    }
    if (i < 0 || i >= len) {
        return void 0;
    }
    return this[(this._front + i) & (this._capacity - 1)];
};

MyDeque.prototype.isEmpty = function MyDeque$isEmpty() {
    return this._length === 0;
};

MyDeque.prototype.clear = function MyDeque$clear() {
    var len = this._length;
    var front = this._front;
    var capacity = this._capacity;
    for (var j = 0; j < len; ++j) {
        this[(front + j) & (capacity - 1)] = void 0;
    }
    this._length = 0;
    this._front = 0;
};

MyDeque.prototype.toString = function MyDeque$toString() {
    return this.toArray().toString();
};

MyDeque.prototype.valueOf = MyDeque.prototype.toString;
MyDeque.prototype.removeFront = MyDeque.prototype.shift;
MyDeque.prototype.removeBack = MyDeque.prototype.pop;
MyDeque.prototype.insertFront = MyDeque.prototype.unshift;
MyDeque.prototype.insertBack = MyDeque.prototype.push;
MyDeque.prototype.enqueue = MyDeque.prototype.push;
MyDeque.prototype.MyDequeue = MyDeque.prototype.shift;
MyDeque.prototype.toJSON = MyDeque.prototype.toArray;

Object.defineProperty(MyDeque.prototype, "length", {
    get: function() {
        return this._length;
    },
    set: function() {
        throw new RangeError("");
    }
});

MyDeque.prototype._checkCapacity = function MyDeque$_checkCapacity(size) {
    if (this._capacity < size) {
        this._resizeTo(getCapacity(this._capacity * 1.5 + 16));
    }
};

MyDeque.prototype._resizeTo = function MyDeque$_resizeTo(capacity) {
    var oldCapacity = this._capacity;
    this._capacity = capacity;
    var front = this._front;
    var length = this._length;
    if (front + length > oldCapacity) {
        var moveItemsCount = (front + length) & (oldCapacity - 1);
        arrayMove(this, 0, this, oldCapacity, moveItemsCount);
    }
};


var isArray = Array.isArray;

function arrayMove(src, srcIndex, dst, dstIndex, len) {
    for (var j = 0; j < len; ++j) {
        dst[j + dstIndex] = src[j + srcIndex];
        src[j + srcIndex] = void 0;
    }
}

function pow2AtLeast(n) {
    n = n >>> 0;
    n = n - 1;
    n = n | (n >> 1);
    n = n | (n >> 2);
    n = n | (n >> 4);
    n = n | (n >> 8);
    n = n | (n >> 16);
    return n + 1;
}

function getCapacity(capacity) {
    if (typeof capacity !== "number") {
        if (isArray(capacity)) {
            capacity = capacity.length;
        }
        else {
            return 16;
        }
    }
    return pow2AtLeast(
        Math.min(
            Math.max(16, capacity), 1073741824)
    );
}
/** End: Implementation Deque **/


// get the bit @n index from right, assuming 0 indexing
let BIT = ( num, n ) => ( num >> n ) & 1;

/** Sort all partitions based on bit_pos'th bit from the right. Within each
 * partition, to the left you will accumulate numbers with bit 0 and on the
 * right you will have numbers with bit 1 at the nth position. **/
let sort_partitions = (     a,
                            bit_pos,
                            partition_queue,
                            desc = false,
                            neg = false ) => {
    /** MSB radix sort with partitioning/bucketing based on bits.
        Sorting is based on absolute values. Negarive numbers are sorted by
        modding them. Does not support flating point numbers.
    **/
    let L = partition_queue.length;

    for ( let i=0; i < L; i++ ) {
        let partition = partition_queue.shift();

        let i = partition[0],
            j = partition[1],
            ival, jval;

        if ( i == j ) continue;

        while ( i < j ) {
            ival = a[i]; jval = a[j];
            if ( neg ) { ival = -ival; jval = -jval; }

            let left =  BIT( ival, bit_pos ),
                right = BIT( jval, bit_pos );

            if ( desc ) {
                if      ( left == 1 && right == 0 ) { i++; j--; }
                else if ( left == 1 && right == 1 ) i++;
                else if ( left == 0 && right == 0 ) j--;
                else    { swap( a, i, j ); i++; j--; }
            }
            else {
                if      ( left == 0 && right == 1 ) { i++; j--; }
                else if ( left == 0 && right == 0 ) i++;
                else if ( left == 1 && right == 1 ) j--;
                else    { swap( a, i, j ); i++; j--; }
            }
        }

        ival = a[i]; jval = a[j];
        if ( neg ) { ival = -ival; jval = -jval; }

        if ( desc ) {
            if ( BIT( ival, bit_pos ) == 0 ) i--;
            if ( BIT( jval, bit_pos ) == 1 ) j++;
        }
        else {
            if ( BIT( ival, bit_pos ) == 1 ) i--;
            if ( BIT( jval, bit_pos ) == 0 ) j++;
        }
        if ( 0 <= i )         partition_queue.push( [partition[0], i] );
        if ( j < a.length  )  partition_queue.push( [j, partition[1]] )
    }
};

let radix_sort = ( a, desc = true ) => {
    let A = a.length;
    let i=0, j=A-1;

    let min_val = Number.MAX_SAFE_INTEGER,
        max_val = Number.MIN_SAFE_INTEGER;

    while ( i < A && 0 <= j && i < j ) {
        let left = a[i], right = a[j];
        min_val = Math.min(min_val, left, right);
        max_val = Math.max(max_val, left, right);

        if ( desc ) {
            if ( left >= 0 && right < 0 )         { i++; j--; }
            else if ( left >= 0 && right >= 0 )   i++;
            else if ( left < 0 && right < 0 )     j--;
            else    { swap( a, i, j ); i++; j--; }
        }
        else {
            if ( left < 0 && right >= 0 )         { i++; j--; }
            else if ( left < 0 && right < 0 )     i++;
            else if ( left >= 0 && right >= 0 )   j--;
            else    { swap( a, i, j ); i++; j--; }
        }

    }

    if ( desc ) {
        if ( a[i] < 0 ) i--;
        if ( a[j] >= 0 ) j++;
    }
    else {
        if ( a[i] > 0 ) i--;
        if ( a[j] <= 0 ) j++;
    }

    if ( 0 <= i && i < A ) {
        min_val = Math.min(min_val, a[i]);
        max_val = Math.max(max_val, a[i]);
    }

    if ( 0 <= j && j < A ) {
        min_val = Math.min(min_val, a[j]);
        max_val = Math.max(max_val, a[j]);
    }

    let pos_partitions = new MyDeque();
    let neg_partitions = new MyDeque();

    if ( desc ) {
        if ( 0 <= i )   pos_partitions.push( [0, i] );
        if ( j < A )    neg_partitions.push( [j, A-1] );
    }
    else {
        if ( 0 <= i )   neg_partitions.push( [0, i] );
        if ( j < A )    pos_partitions.push( [j, A-1] );
    }

    let POS_BITS = max_val.toString(2).length;
    let NEG_BITS = (-1 * min_val).toString(2).length;

    if (desc) {
        for ( let lbit = POS_BITS-1; lbit >= 0; lbit-- )
            sort_partitions( a, lbit, pos_partitions, true,  false );
        for ( let lbit = NEG_BITS-1; lbit >= 0; lbit-- )
            sort_partitions( a, lbit, neg_partitions, false,  true );
    }
    else {
        for ( let lbit = NEG_BITS-1; lbit >= 0; lbit-- )
            sort_partitions( a, lbit, neg_partitions, true,  true );

        for ( let lbit = POS_BITS-1; lbit >= 0; lbit-- )
            sort_partitions( a, lbit, pos_partitions, false,  false );
    }
};

var findKthLargest = function(a, k) {
    /**
       Approach 3: Radix sort the elements. Since the number of elements are in
       the range [-10_000, +10_000], the largest integer can be 10,000 with
       binary representation of length 14. Therefore, it is possible to get
       get the answer with 14 passes of the original array.

       Time: O( C * n) // where C = number of bits in largest element. 14 here
       Space: O( n ) // to store partitions
    **/
    radix_sort(a);
    return a[k-1];
};

let sort_partitions_until_k = (     a,
                            bit_pos,
                            partition_queue,
                            desc = false,
                            neg = false, k ) => {
    let L = partition_queue.length;

    for ( let i=0; i < L ; i++ ) {
        let partition = partition_queue.shift();

        let i = partition[0],
            j = partition[1],
            ival, jval;

        // skip single element partitions and partitions beyond kth index
        if ( i == j || i > k ) continue;

        while ( i < j ) {
            ival = a[i]; jval = a[j];
            if ( neg ) { ival = -ival; jval = -jval; }

            let left =  BIT( ival, bit_pos ),
                right = BIT( jval, bit_pos );

            if ( desc ) {
                if      ( left == 1 && right == 0 ) { i++; j--; }
                else if ( left == 1 && right == 1 ) i++;
                else if ( left == 0 && right == 0 ) j--;
                else    { swap( a, i, j ); i++; j--; }
            }
            else {
                if      ( left == 0 && right == 1 ) { i++; j--; }
                else if ( left == 0 && right == 0 ) i++;
                else if ( left == 1 && right == 1 ) j--;
                else    { swap( a, i, j ); i++; j--; }
            }
        }

        ival = a[i]; jval = a[j];
        if ( neg ) { ival = -ival; jval = -jval; }

        if ( desc ) {
            if ( BIT( ival, bit_pos ) == 0 ) i--;
            if ( BIT( jval, bit_pos ) == 1 ) j++;
        }
        else {
            if ( BIT( ival, bit_pos ) == 1 ) i--;
            if ( BIT( jval, bit_pos ) == 0 ) j++;
        }
        if ( 0 <= i )         partition_queue.push( [partition[0], i] );
        if ( j < a.length  )  partition_queue.push( [j, partition[1]] )
    }
};

let radix_sort_until_k = ( a, desc = true, k ) => {
    let A = a.length;
    let i=0, j=A-1;

    let min_val = Number.MAX_SAFE_INTEGER,
        max_val = Number.MIN_SAFE_INTEGER;

    while ( i < A && 0 <= j && i < j ) {
        let left = a[i], right = a[j];
        min_val = Math.min(min_val, left, right);
        max_val = Math.max(max_val, left, right);

        if ( desc ) {
            if ( left >= 0 && right < 0 )         { i++; j--; }
            else if ( left >= 0 && right >= 0 )   i++;
            else if ( left < 0 && right < 0 )     j--;
            else    { swap( a, i, j ); i++; j--; }
        }
        else {
            if ( left < 0 && right >= 0 )         { i++; j--; }
            else if ( left < 0 && right < 0 )     i++;
            else if ( left >= 0 && right >= 0 )   j--;
            else    { swap( a, i, j ); i++; j--; }
        }

    }

    if ( desc ) {
        if ( a[i] < 0 ) i--;
        if ( a[j] >= 0 ) j++;
    }
    else {
        if ( a[i] > 0 ) i--;
        if ( a[j] <= 0 ) j++;
    }

    if ( 0 <= i && i < A ) {
        min_val = Math.min(min_val, a[i]);
        max_val = Math.max(max_val, a[i]);
    }

    if ( 0 <= j && j < A ) {
        min_val = Math.min(min_val, a[j]);
        max_val = Math.max(max_val, a[j]);
    }

    let pos_partitions = new MyDeque();
    let neg_partitions = new MyDeque();

    if ( desc ) {
        if ( 0 <= i )   pos_partitions.push( [0, i] );
        if ( j < A )    neg_partitions.push( [j, A-1] );
    }
    else {
        if ( 0 <= i )   neg_partitions.push( [0, i] );
        if ( j < A )    pos_partitions.push( [j, A-1] );
    }

    let POS_BITS = max_val.toString(2).length;
    let NEG_BITS = (-1 * min_val).toString(2).length;

    if (desc) {
        for ( let lbit = POS_BITS-1; lbit >= 0; lbit-- )
            sort_partitions_until_k( a, lbit,
                                     pos_partitions, true,  false, k );
        for ( let lbit = NEG_BITS-1; lbit >= 0; lbit-- )
            sort_partitions_until_k( a, lbit,
                                     neg_partitions, false,  true, k );
    }
    else {
        for ( let lbit = NEG_BITS-1; lbit >= 0; lbit-- )
            sort_partitions_until_k( a, lbit,
                                     neg_partitions, true,  true, k );

        for ( let lbit = POS_BITS-1; lbit >= 0; lbit-- )
            sort_partitions_until_k( a, lbit,
                                     pos_partitions, false,  false, k );
    }
};

var findKthLargest = function(a, k) {
    /**
       Approach 3.1: Radix sort up until the partition containing kth largest
       element. After sorting, the kth largest element will be situated at a[k-1]
       which means that if all partitions that start with index greater than k-1
       are useless to us. Consequently, we can ignore to sort these elements.

       Time: O( C * n) // where C = number of bits in largest element. 14 here
       Space: O( n ) // to store partitions
    **/
    radix_sort_until_k(a, true, k);
    return a[k-1];
};
