var cloneGraph = function ( starting_node ) {
    if ( !starting_node ) return null;

    let queue = [ starting_node ];
    let map = new Map();
    map.set(starting_node,new Node(starting_node.val));

    while ( queue.length > 0 ) {
        let n = queue.pop();

        for ( let nbr of n.neighbors ) {
            if ( !map.has(nbr) ) {
                map.set( nbr, new Node(nbr.val) );
                queue.push(nbr); // this is the tricky part
            }
            map.get(n).neighbors.push( map.get(nbr) );
        }
    }

    return map.get( starting_node );
}
