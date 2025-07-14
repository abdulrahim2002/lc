class SegmentTree {
    constructor ( arr ) {
        let N = arr.length;

        // pad arr array with 0s to make length power of 2
        arr.push( ...new Array( _next_power(N)-N ).fill(0) );

        // 2^0 + 2^1 + 2^2 + ... 2^(N-1) = 2^(N) - 1
        this.seg = new Array( (next_power(N)<<1) - 1 ).fill(0);

        _build(0, 0, this.list_len());
    }

    _next_power(n) {
        if ( ~(n & -n) & n === 0 ) return n;
        n |= n >> 1
        n |= n >> 2
        n |= n >> 4
        n |= n >> 8
        n |= n >> 16
        return n+1;
    }

    _build( i, l, r ) => {
        /* build the segment tree top down. i is the index of node and [l, r] is
        range of node */
        if ( l == r ) { this.seg[i] = arr[l]; return; }
        const mid = l + Math.floor( (r-l)/2 );

        _build( 2*i + 1, l, mid );
        _build( 2*i + 2, mid+1, r );

        this.seg[i] = this.seg[i*2+1] + this.seg[i*2+2];
    }

    _range_sum( i, l, r ) {
        const mid = l + Math.floor( (r-l)/2 );

        // my range does not deal with this interval
        if ( r < left || right < l )
            return 0;

        // this interval completely contains my range completely
        if ( left <= l && r <= right )
            return this.seg[i];

        // query left and right child recursively
        return  _range_sum( 2*i+1, l, mid ) + _range_sum( 2*i+2, mid+1, r );
    }

    _list_len() {
        return this.seg.length-(this.seg.length>>1)-1;
    }

    update(index, val) {
        let i = (this.seg.length>>1) + index;
        this.seg[i] = val;
        while ( i > 0 ) {
            const p = Math.floor( (i-1)/2 );
            this.seg[p] =  this.seg[p * 2 + 1] + this.seg[p * 2 + 2];
            i = p;
        }
    }

    range_sum( left, right ) {
	if ( right < left ) return 0;
	// clamp the range
	right = Math.min( right, this._list_len() );
	left = Math.max( left, 0 );

        return _range_sum(0,0,this._list_len());
    }
}
