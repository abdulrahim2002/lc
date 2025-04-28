function Node( val, next, prev ) {
    this.val  = (val === undefined)  ? 0:val;
    this.next = (next === undefined) ? null:next;
    this.prev = (prev === undefined) ? null:prev;
}

/**
   Implementation of a doubly linked list
 **/
function Dlist() {
    /**
        Generates an empty doubly linked list.
        2 nodes: start and end keep record of start
        and the end of the list.
    **/
    constructor () {
        this.start = new Node();
        this.end = new Node();

        this.start.next = this.end;
        this.end.prev = this.start;

        this.size = 0;
    }

    push( val ) {
        /** add value to the end of the list **/
        let node = new Node(val);

        // insert it at the end
        let last = this.end.prev;
        last.next = node;
        node.prev = last;

        node.next = this.end;
        this.end.prev = node;

        this.size++;
    }

    pop() {
        /** pops an element from the end of the list, returns it **/
        // if list is empty, return undefined
        if ( this.start.next === this.end ) return undefined;

        const node_to_remove = this.end.prev;
        const second_last = node_to_remove.prev;

        // make second last as last
        second_last.next = this.end;
        this.end = second_last;

        this.size--;

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

        this.size--;

        return node_to_remove.val;
    }

    unshift( val ) {
        /** add value to the front of the list **/
        let node = new Node(val);

        let first = this.start.next;
        node.next = first;
        first.prev = node;

        this.start.next = node;
        node.prev = this.start;

        this.size++;
    }

    splice ( node, num_del, in_val ) {
        /**
           Given a random node in the list, delete @num_del number
           of nodes starting from and including @node
           insert in_val at the positiion where node was present.
        **/
        let before = node.prev;

        for ( let i=0; i < num_del && node.next !== null; i++ )
            node = node.next;

        let after = node;

        // insert the node
        let new_node = new Node( in_val );
        before.next = new_node;
        new_node.prev = before;

        // connect the new node and the after node
        new_node.next = after;
        after.prev = new_node;

        // return the pointer to the new node
        return new_node
    }

    size() {
        return this.size;
    }


}

const find_height = ( root ) => {
    /* find the height of a graph rooted @root using BFS */
    const queue = new Dlist(),
          seen  = new Set();
    queue.push( root );

    let height = 0;

    while ( queue.size() ) {
        const list_node = queue.shift();
        height++;

        // quite obscure because Dlist node values are nodes of Graph
        seen.add( list_node.val );

        let L = queue.size();

        // traverse nodes at this level
        for ( let i=0; i < L; i++ ) {
            const next = queue.shift();

            // for each neighbour of ng, if it is not in seen add it
            for ( const ng of graph[next.val] )
                if ( !seen.has(ng) )
                    queue.push( ng );
        }
    }

    return height;
};


var findMinHeightTrees = function(n, edges) {
    /**
      * The height of a tree is the number of edges from root node to the
      * longest path down. We are given a tree, where you are not confined to a
      * specific root. i.e. the root of the tree can be any node.
      *
      * For a tree formed by any node of the tree as root. That particular tree
      * is MHT (minium height tree) -> if the height of that tree is the minium
      * possible in the search space of all the tree nodes as root.
      *
      * We need to find the each such tree (by saving the root node).
      *
      * The approach to solve this problem will be: We will try to make each
      * node of the tree as root. For each tree we will calculate it's height
      * using BFS algorithm. When all such trees are explored, we save them in a
      * list of (root, height). Let's say that the minium height in this list is
      * H_MIN. Then we will extract all the trees who have height exactly H_MIN.
      *
      * Implementation details. For each node, we should be able to find its
      * neighbours fast. Hence we use an adjacency list. Also we are given nodes
      * numbered from [0 , n-1] hence it makes sense to keep an array of lists
      * as adjacency list.
      **/
    const graph = new Array(n).fill([]);

    for ( const [i, j] of edges ) {
        graph[i].push(j);
        graph[j].push(i);
    }

    const res = [];
    let min_height_until_now = 1e9;

    for ( let root=0; root < n; root++ ) {
        const cur_height = find_height(root);
        min_height_until_now = Math.min( min_height_until_now, cur_height );
        res.push( [root, cur_height] );
    }

    return res.filter( (x) => x[1] === min_height_until_now ).map( (x) => x[0] );
};
