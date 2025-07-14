function Node(val, left, right) {
    this.val = val;
    this.left = left;
    this.right = right;
}

var isValidSerialization = function(preorder) {
    const nodes = preorder.split(',');
    let valid = true;

    const build = () => {
        const next_val = nodes.shift();

        if ( next_val === "#" ) return null;
        else if ( next_val === undefined ) return undefined;

        const node = new Node( next_val , null, null );
        node.left = build();
        node.right = build();

        // left and right trees must not be undefined
        if ( node.left === undefined ||
             node.right === undefined )
            valid = false;

        return node;
    }

    const root = build();
    return valid && nodes.length == 0;
};


var isValidSerialization = function(preorder) {
    /**
       We can make some optimizations to the code. We can avoid making a new
       node an return some placeholder valud to imply a node was present. Node
       that we are only suppose to discern a valid returned value from an
       invalid one.

       We also employ an early exit optimization if the tree has been known to
       be invalid. The values are spliced into string numbers. We can use the
       integer number 0 to imply that tree has been known to be invalid. and we
       must immediately return.
     **/
    const nodes = preorder.split(',');
    let valid = true;

    const build = () => {
        // early return if ! valid
        if ( !valid ) return 0;

        const next_val = nodes.shift();

        if ( next_val === "#" ) return null;
        else if ( next_val === undefined ) return undefined;

        left = build();     if ( left === 0 ) return 0;
        right = build();    if ( right === 0 ) return 0;

        // left and right trees must not be undefined
        if ( left === undefined ||
             right === undefined ) {
            valid = false;
            return 0;
        }

        return next_val;
    }

    build();
    return valid && nodes.length == 0;
};
