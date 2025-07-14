var SummaryRanges = function() {
    /**
       Arrange elements into buckets.
    **/
    this.buckets = [];
};

/**
 * @param {number} value
 * @return {void}
 */
SummaryRanges.prototype.addNum = function(value) {
    const buckets = this.buckets;

    for ( let i=0; i < buckets.length; i++ ) {

        /* the number can be inserted into one of the existing
         * buckets, if number lies between range of a bucket. */
        if ( buckets[i][0] <= value && value <= buckets[i][1] )
            return;

        /* if the incoming value is adjacent to current bucket, it
         * must expand the current bucket. */

        // value just smaller than current bucket
        if ( value === buckets[i][0]-1 ) {
            // expand left.
            buckets[i][0] = value;

            // Check if it can be merged with previous
            // bucket.
            if ( i > 0 && buckets[i-1][1] === buckets[i][0]-1 ) {
                buckets[i-1][1] = buckets[i][1];
                buckets.splice( i, 1 );
            }
            return;
        }

        // value is just greater than current bucket
        if ( value === buckets[i][1]+1 ) {
            // ezpand right
            buckets[i][1] = value;

            // check if can be merged with next bucket.
            if ( i < buckets.length-1 && buckets[i][1]+1 === buckets[i+1][0] ) {
                buckets[i+1][0] = buckets[i][0];
                buckets.splice( i, 1 );
            }
            return;
        }
    }

    // you must insert at the right position
    for ( let i=0; i < buckets.length; i++ ) {
        if ( value < buckets[i][0] ) {
            buckets.splice( i, 0, [value, value] );
            return;
        }
    }

    buckets.push( [value, value] );
};

/**
 * @return {number[][]}
 */
SummaryRanges.prototype.getIntervals = function() {
    return this.buckets;
};

/**
 * Your SummaryRanges object will be instantiated and called as such:
 * var obj = new SummaryRanges()
 * obj.addNum(value)
 * var param_2 = obj.getIntervals()
 */
