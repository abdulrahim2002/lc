/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
var findOrder = function( N, prereq ) {
    /**
     * Courses from 0 to N-1 needs to be taken. For each
     * course, prereq = [ x,y ] implies that x requires y.
     * i.e. y is needed to be taken before x can be taken.
     *
     * Approach: Build a graph in the form of adjacency
     * matrix. Where graph[i][j] implies that i is needed
     * before j can b taken, also, there is an edge from i
     * to j. Also, build an Array, which tracks the number
     * of incoming edges.
     *
     * Use modified Kahn's algorithm to determine weather a
     * topological sort traversal exists.
     **/

    let graph = new Array( N ).fill(null).map(
        () => new Array( N ).fill( false ) );

    // how many incoming edges does course at index i have
    let edges = new Array( N ).fill(0);

    for ( let p of prereq ) {
        let i = p[1];
        let j = p[0];
        graph[i][j] = true;
        edges[j]++;
    }

    // return kahn(graph, edges);
    return dfs_ts(graph, N);
};


let dfs_ts = ( graph, N ) => {
    /**
       * Return the topological sort based on DFS algorithm.
       * https://en.wikipedia.org/wiki/Topological_sorting
       *
       * Algorithm depth first search topological sort traversal:
       *
       * define: list // to store the traversal
       *
       * while ( node left )
       *    visit( node )
       *
       * visit( node )
       *    if ( node has permanenet mark ) return
       *    if ( node has temporary mark )
       *        raise Error("Cycle detected, NO ts possible" )
       *
       *    mark node as temporary
       *
       *    For each node m with edge n -> m
       *        visit( m )
       *
       *    mark node as permananent
       *    add n to front of list
       *
       * return list
       *
       * Description:
       * Each node n gets prepended to the output list L
       * only after considering all other nodes that depend
       * on n (all descendants of n in the graph).
       * Specifically, when the algorithm adds node n, we
       * are guaranteed that all nodes that depend on n are
       * already in the output list L: they were added to L
       * either by the recursive call to visit() that ended
       * before the call to visit n, or by a call to visit()
       * that started even before the call to visit n. Since
       * each edge and node is visited once, the algorithm
       * runs in linear time.
    **/

    // nodes with permanent mark
    let perm = new Set();
    // nodes with temporary mark
    let tmp  = new Set();
    // nodes nodes
    let nodes = new Array( N ).fill(null).map( (_, idx) => idx );
    // topological sort traversal
    let ts = new Array();

    let visit = ( node ) => {
        // return true, if a topological sort is possible else false
        if ( perm.has(node) ) return true;
        if ( tmp.has(node) ) {
            // graph has a cycle. Return false
            return false;
        }

        tmp.add( node );

        for ( let m=0; m < N; m++ ) {
            if ( graph[ node ][ m ]  ) {
                if ( !visit(m) ) return false;
            }
        }

        tmp.delete( node );
        perm.add( node );

        ts.push( node );
        return true;
    };

    while ( nodes.length ) {
        if ( !visit( nodes.pop() ) )
            return [];
    }

    return ts.reverse();
};


let kahn = (graph, edges) => {
    /**
     * Basic idea behind Kahn's algorithm: For each course
     * with no pending dependency, take the course and
     * remove all dependencies that other cources have on
     * this course. This ensures that all courses are taken
     * once all their coresponding dependencies are
     * resolved.
     *
     * Algorithm:
     *
     * Step 1: Find all starting nodes. i.e. nodes with no incoming edges. This
     * can be done by finding all vertices in edges array with 0 number of
     * incoming edges.
     * Step 2:

     Initialize list of visited courses
     while ( there are still elements in start_nodes ) {
     n = get a node from start_node
     add n to list of visited courses
     for all nodes m with an edge n -
     > m. remove the edge i.e. remove the dependency
        if the number of incoming edges to m are 0. m now becomes a start_node
     }

     * Step 3: Check if there are still any edges left in the graph. If there
     * are, then the graph has unresolvable dependencies aka cycle. Othervise
     * the graph has no cycle and a topological sort traversal is possible.
     * Return the visited courses
    ***/
    let N = edges.length;
    let start_nodes = [];
    let visited = [];

    for ( let i=0; i < N; i++ )
        if ( edges[i] === 0 )
            start_nodes.push( i );

    while ( start_nodes.length ) {
        let node = start_nodes.pop();
        visited.push(node);

        // for all nodes m, having edge node -> m, remove the edge and decrease
        // number of incoming edges to m. If no_incomign_edges to m are 0, then
        // add m into the start_node list
        for ( let m=0; m < N; m++ ) {
            if ( graph[node][m] === true ) {
                graph[node][m] = false;
                edges[m]--;
                if ( edges[m] <= 0 )
                    start_nodes.push( m );
            }
        }
    }

    // if graph has edges left, it is a cyclic graph. Hence no topological sort
    // ordering is available. It can also be infered that there are nodes with
    // unsolved dependencies, and they cannot be visited.
    for ( let i=0; i < N; i++ )
        if ( edges[i] > 0 )
            return [];

    return visited;
};
