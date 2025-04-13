/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function( N, prereq ) {
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

    return kahn(graph, edges);
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

     while ( there are still elements in start_nodes ) {
     n = get a node from start_node
     for all nodes m with an edge n -> m. remove the edge i.e. remove the dependency
        if the number of incoming edges to m are 0. m now becomes a start_node
     }

     * Step 3: Check if there are still any edges left in the graph. If there
     * are, then the graph has unresolvable dependencies aka cycle. Othervise
     * the graph has no cycle and a topological sort traversal is possible.
    ***/
    let N = edges.length;
    let start_nodes = [];

    for ( let i=0; i < N; i++ )
        if ( edges[i] === 0 ) start_nodes.push( i );

    while ( start_nodes.length ) {
        let node = start_nodes.pop();

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
            return false;

    return true;
};
