/**
 * @param {string[][]} tickets
 * @return {string[]}
 */
var findItinerary = function(tickets) {
    /**
       Turn the airport codes into numbers based on lexicographical ordering.

       Step 1: Build an adjacency list, where the neighbours of each node are
       sorted lexicographically

       Step 2: Traverse using DFS starting from "JFK" airport.
       add node to seen list
       find the next smallest unseen neighbour and visit it


       So, the question is slightly different. We are not being asked We actually
       need to use all the edges. to reconstruct the full path. And we can visit
       the same node more than once.

       Out strategy would be:
       - conduct dfs (do not keep visited list)
       - remove an edge as soon as you go from that path
       - at each node, go to the next available lexicographically node

       Boy, this is a research problem. Better start reading Eulerian path's...
    **/
    const graph = {};

    for ( const [from, to] of tickets ) {
        if ( !graph[from] ) graph[from] = [];
        graph[from].push(to);
    }

    for ( const node of Object.keys(graph) )
        graph[node].sort();

    const path = [];

    const dfs = ( node = "JFK" ) => {
        path.push(node);

        const woher = graph[node] || [];

        while ( woher.length ) {
            // remove the edge and visit the next smallest
            dfs( woher.shift() );
        }

    };

    dfs();
    return path;
};

/**
 * @param {string[][]} tickets
 * @return {string[]}
 */
var findItinerary = function(tickets) {
    /**
       An Eulerian trail or Euler walk, in an undirected graph is a walk that
       uses each edge exactly once.

       Fleury's algorithm:

       1. The algorithm starts at arbitrarily chosen vertex.

       2. At each step it chooses the next edge in the path to be one whose
       **deletion would not disconnect the graph**, unless there is no such
       edge, in which case it picks the remaining edge left.

       3. It then moves to the other endpoint of that edge and deletes the edge.

       4. the sequence of chosen edges forms an Eulerian cycle or Eulerian
       trail.

       Complexity: At each edge we must detect weather deletion of an edge would
       disconnect the graph (i.e. bridge). It can be done in linear time.

       Time: O( E^2 )
       Space: O( V*E ) // storing the graph

       Hierholzer's algorithm

       1. Choose any starting vertex v, and follow a trail of edges from that
       vertex until returning to v.

       2. The tour formed in this way is a closed tour, but may not cover all
       the vertices and edges of the initial graph.

       3. As long as there exists a vertex u that belongs to the current tour
       but that has adjacent edges not part of the tour, start another trail
       from u, following unused edges until returning to u, and join the tour
       formed in this way to the previous tour.

       4. Since we assume the original graph is connected, repeating the
       previous step will exhaust all edges of the graph.

       Time: O(E)
       Space: O(1) // excluding graph storage
    **/
    const graph = {};

    for ( const [from, to] of tickets ) {
        if ( !graph[from] ) graph[from] = [];
        graph[from].push(to);
    }

    for ( const node of Object.keys(graph) )
        graph[node].sort();

    const path = [];

    const dfs = ( node = "JFK" ) => {
        const woher = graph[node] || [];
        while ( woher.length )
            dfs( woher.shift() );
        path.push(node);
    };

    dfs();
    return path.reverse();
};
