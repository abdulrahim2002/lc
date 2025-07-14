/** Implementation of a doubly linked list **/

/** Doubly linked list node **/
function DNode( val, next, prev ) {
    this.val  = (val === undefined)  ? Number.MIN_SAFE_INTEGER:val;
    this.next = (next === undefined) ? null:next;
    this.prev = (prev === undefined) ? null:prev;
}

class Dlist {
    constructor( list ) {
        /**
           Generates a doubly linked list from an array if provided. 2 nodes:
           start and end keep record of start and the end of the list.
        **/
        this.start = new DNode();
        this.end =   new DNode();

        this.start.next = this.end;
        this.end.prev = this.start;

        this.length = 0;

        if ( Array.isArray(list) && list.length )
            for ( const i of list ) this.push(i);
    }

    push( val ) {
        /** add a value to the end of the list, returns a reference to the new
         * node. If an array of values are provided, all are inserted **/
        if ( !Array.isArray(val) ) {
            let node = new DNode(val);

            let last = this.end.prev;
            last.next = node;
            node.prev = last;

            node.next = this.end;
            this.end.prev = node;

            this.length++;

            return node;
        }
        else {
            let ret = null;
            for ( const num of val )
                ret = this.push(num);
            return ret;
        }
    }

    pop() {
        /** pops an element from the end of the list, returns it **/
        if ( this.start.next === this.end ) return undefined;

        const node_to_remove = this.end.prev;
        const second_last = node_to_remove.prev;

        // make second last as last
        second_last.next = this.end;
        this.end.prev = second_last;

        this.length--;

        node_to_remove.next = node_to_remove.prev = null;

        return node_to_remove.val;
    }

    shift() {
        /** same as popping from front. Remove the first node in the list **/
        if ( this.start.next === this.end ) return undefined;

        const node_to_remove = this.start.next;
        const second = node_to_remove.next;

        // connect second node to start
        this.start.next = second;
        second.prev = this.start;

        this.length--;

        node_to_remove.next = node_to_remove.prev = null;

        return node_to_remove.val;
    }

    unshift( val ) {
        /** add value to the front of the list, returns a reference to the new
         * node. **/
        if ( !Array.isArray( val ) ) {
            let node = new DNode(val);

            let first = this.start.next;
            node.next = first;
            first.prev = node;

            this.start.next = node;
            node.prev = this.start;

            this.length++;
            return node;
        }
        else {
            let ret = null;
            for ( const num of val )
                ret = this.unshift( num );
            return ret;
        }
    }

    splice ( node, num_del, in_val ) {
        /**
           Given reference to a random node in the list, delete @num_del number
           of nodes starting from and including @node insert in_val at the
           positiion where node was present. Retuns a pointer to the newly
           inserted node.
        **/
        if ( typeof node !== "object" || node.val === undefined ||
             node.next == undefined || node.prev === undefined )
            throw Error("Supply a node reference in the list");

        if ( (num_del === 0 || num_del === undefined) && in_val === undefined )
            return;

        let before = node.prev;

        let i;
        for ( i=0; i < num_del && node.next !== null; i++ )
            node = node.next;

        let after = node;
        this.length -= i;

        if ( in_val === undefined ) {
            // there are nodes to delete and no new node should be inserted.
            // therefore just delete nodes and connect before to after
            before.next = after;
            after.prev = before;
            return null;
        }

        // both insertion value is present and more than 0 nodes deleted
        // insert the node
        let new_node = new DNode( in_val );
        before.next = new_node;
        new_node.prev = before;

        // connect the new node and the after node
        new_node.next = after;
        after.prev = new_node;

        this.length++;
        // return the pointer to the new node
        return new_node;
    }

    first() {
        return this.start.next;
    }

    last() {
        return this.last.prev;
    }

    toArray() {
        let list = new Array();
        for ( let i=this.start.next; i !== this.end; i = i.next )
            list.push( i.val );
        return list;
    }

    forEach( callback ) {
        let cur = this.start.next,
            i = 0;

        while ( cur !== this.end ) {
            callback( cur.val, i, cur );
            cur = cur.next;
            i++;
        }
    }

    size() {
        return this.length;
    }
}
