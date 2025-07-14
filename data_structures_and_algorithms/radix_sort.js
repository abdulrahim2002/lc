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
