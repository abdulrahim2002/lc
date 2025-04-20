let M, N;
let saves;

/**
 * For this problem, we need the capability to search
 * incrementally, i.e. for each cell on the board, we
 * trigger an incremental search. This incremental search
 * should mark all words in the tri that starts at that cell.
 **/
function Tri( node_char, children ) {
    this.node_char = (node_char === undefined) ?
                        null : node_char ;
    // word consisting of characters from root up until this node's
    // character is present in this trie (it was inserted).
    this.exists = false;
    /**
      * This is required because we might add the same words again when we are
      * supposed to avoid duplicates
     **/
    this.already_added = false;
    // children are stored in a map where the key is the character
    // of the next word and the value is the node with that character
    this.children = (children === undefined) ? new Map() : children;
}

var WordDictionary = function() {
    this.root = new Tri();
};

WordDictionary.prototype.addWord = function(word) {
    let W = word.length;
    let i=0;
    let node = this.root;
    // find the nodes until which the characters are present
    while ( i < W && node.children.has(word[i]) ) {
        node = node.children.get(word[i]);
        i++;
    }
    // create new nodes until string is exhausted
    while ( i < W ) {
        node.children.set( word[i], new Tri(word[i]) );
        node = node.children.get( word[i] );
        i++;
    }
    // the word from root up until the last character of word
    // is present
    node.exists = true;
};

WordDictionary.prototype.incremental_search = function(board, i, j, node, cur_word = "" ) {
    /**
     * @board, @i, @j: the board and indexing variables
     * @node: The node which matches the current character.
     *
     * Function: If the character @board(i, j) exists in node's map. Then
     * nullify the character @board(i, j) find if the neighbours contain any
     * character in the trie
     **/
    let cur_char = board[i][j];

    if (  node.children.has( cur_char ) ) {
        board[i][j] = null;

        let child = node.children.get( cur_char );
        if ( child.exists && !child.already_added ) {
            saves.push( cur_word + child.node_char );
            child.already_added = true;
        }

        // upper cell
        if ( i-1 >= 0 && board[i-1][j] !== null && child.children.has( board[i-1][j] ) )
            this.incremental_search( board, i-1, j, child, cur_word + cur_char );

        // lower cell
        if ( i+1 < M && board[i+1][j] !== null &&  child.children.has( board[i+1][j] ))
            this.incremental_search( board, i+1, j, child, cur_word + cur_char );

        // left cell
        if ( j-1 >= 0 && board[i][j-1] !== null && child.children.has( board[i][j-1] ) )
        this.incremental_search( board, i, j-1, child, cur_word + cur_char );

        // right cell
        if ( j+1 < N && board[i][j+1] !== null && child.children.has( board[i][j+1] ) )
            this.incremental_search( board, i, j+1, child, cur_word + cur_char );
    }

    board[i][j] = cur_char;
    return;
};

var findWords = function(board, words) {
    /**
     * This implementation avoids dfs on the trie to collect found words at the
     * end by storing words on the fly while they are being searched for in the
     * trie.
     **/
    M = board.length;
    N = board[0].length;
    saves = new Array();

    let tri_words = new WordDictionary();
    words.forEach( (word) => tri_words.addWord( word ) );

    // for each cell on the board, mark all words that begin
    // with the first character of the cell in the tri
    for ( let i=0; i < M ; i++ )
       for ( let j=0; j < N ; j++ )
           tri_words.incremental_search( board, i, j,
                                         tri_words.root  );

    return saves;
};


/**
 * For this problem, we need the capability to search
 * incrementally, i.e. for each cell on the board, we
 * trigger an incremental search. This incremental search
 * should mark all words in the tri that starts at that cell.
 **/
function Tri( node_char, children ) {
    this.node_char = (node_char === undefined) ?
                        null : node_char ;
    // word consisting of characters from root up until this node's
    // character is present in this trie (it was inserted).
    this.exists = false;
    /**
      * another flag is added. this flag denotes
      * weather the word in the Tri exists in the board.
      * While working through the board we would update this
      * variable whenever a word would be found.
     **/
    this.exists_on_board = false;
    // children are stored in a map where the key is the character
    // of the next word and the value is the node with that character
    this.children = (children === undefined) ? new Map() : children;
}

var WordDictionary = function() {
    this.root = new Tri();
};

WordDictionary.prototype.addWord = function(word) {
    let W = word.length;
    let i=0;
    let node = this.root;
    // find the nodes until which the characters are present
    while ( i < W && node.children.has(word[i]) ) {
        node = node.children.get(word[i]);
        i++;
    }
    // create new nodes until string is exhausted
    while ( i < W ) {
        node.children.set( word[i], new Tri(word[i]) );
        node = node.children.get( word[i] );
        i++;
    }
    // the word from root up until the last character of word
    // is present
    node.exists = true;
};

WordDictionary.prototype.incremental_search = function(board, i, j, node) {
    /**
     * @board, @i, @j: the board and indexing variables
     * @node: The node which matches the current character.
     *
     * Function: If the character @board(i, j) exists in
     * node's map. Then nullify the character @board(i, j)
     * Find if any characters of neighbouring cells matches
     * the next character.
     **/
    let cur_char = board[i][j];

    if (  node.children.has( cur_char ) ) {
        board[i][j] = null;

        let child = node.children.get( cur_char );
        if ( child.exists )
            child.exists_on_board = true;

        // upper cell
        if ( i-1 >= 0 && board[i-1][j] !== null )
            this.incremental_search( board, i-1, j, child );

        // lower cell
        if ( i+1 < M && board[i+1][j] !== null )
            this.incremental_search( board, i+1, j, child );

        // left cell
        if ( j-1 >= 0 && board[i][j-1] !== null )
        this.incremental_search( board, i, j-1, child );

        // right cell
        if ( j+1 < N && board[i][j+1] !== null )
            this.incremental_search( board, i, j+1, child );
    }

    board[i][j] = cur_char;
    return;
};

var findWords = function(board, words) {
    /**
     * Great! now in this second attempt, lets try to
     * utilize tri data structure. The idea is to trigger
     * the backtracking function at each cell on the board.
     * And the function should clear out all the words
     * starting from that cell
     **/
    M = board.length;
    N = board[0].length;

    let tri_words = new WordDictionary();
    words.forEach( (word) => tri_words.addWord( word ) );

    // for each cell on the board, mark all words that begin
    // with the first character of the cell in the tri
   for ( let i=0; i < M ; i++ )
       for ( let j=0; j < N ; j++ )
           tri_words.incremental_search( board, i, j,
                                         tri_words.root  );

    let ans = [];

    // initiate a depth first search in the tri to find all
    // words that were found on the board.
    let dfs = ( node, cur_word = "" ) => {
        if ( node.exists_on_board ) ans.push( cur_word  );

        for ( let i = "a".charCodeAt(0); i <= "z".charCodeAt(0); i++ ) {
            let c = String.fromCharCode(i);
            if ( node.children.has(c) ) {
                let child = node.children.get(c);
                dfs( child, cur_word + child.node_char );
            }
        }
    };

    dfs( tri_words.root );

    return ans;
};


let bt_search = ( board, i, j, word, x ) => {
    /**
     * @board: board
     * @i, @j: indexing in board
     * @word, @x: word and indexing in word
     *
     * Description: Return true if word is in the board, and false otherwise
     *
     * Algorithm:
     * Step 1: base case: If x == word.length-1 return true
     * Step 2: nullify the current character on the board
     * Step 3: check if any any adjacent character matches
     * the x+1th character
     *         For each such character, recursively call
     *         on that cell and the next word index
     *         if call returns true return true
     * Step 4: If none of the characters match, make the current
     * cell non null and return false
     *
     * The indices of adjacent cells is given by:
     * ┌────────────┬────────────┬────────────┐
     * │ (i-1, j-1) │ (i-1, j)   │ (i-1, j+1) │
     * ├────────────┼────────────┼────────────┤
     * │ (i,   j-1) │ (i,   j)   │ (i,   j+1) │
     * ├────────────┼────────────┼────────────┤
     * │ (i+1, j-1) │ (i+1, j)   │ (i+1, j+1) │
     * └────────────┴────────────┴────────────┘
     **/
    if ( board[i][j] !== word[x] ) return false;
    if ( x == word.length - 1 ) return true;

    // nullify the current cell on the board
    let cur_char = board[i][j];
    board[i][j] = null;

    // check for upper cell
    if ( i-1 >= 0 && board[i-1][j] !== null && board[i-1][j] == word[x+1] ) {
        let up = bt_search( board, i-1, j, word, x+1 );
        if ( up ) { board[i][j] = cur_char; return true; }
    }

    // check for lower cell
    if ( i+1 < M && board[i+1][j] !== null && board[i+1][j] == word[x+1] ) {
        let down = bt_search( board, i+1, j, word, x+1 );
        if ( down ) { board[i][j] = cur_char; return true; }
    }

    // check left column
    if ( j-1 >= 0 && board[i][j-1] !== null && board[i][j-1] == word[x+1] ) {
        let left = bt_search( board, i, j-1, word, x+1 );
        if ( left ) { board[i][j] = cur_char; return true; }
    }

    // check right column
    if ( j+1 < N && board[i][j+1] !== null && board[i][j+1] == word[x+1] ) {
        let right = bt_search( board, i, j+1, word, x+1 );
        if ( right ) { board[i][j] = cur_char; return true; }
    }

    board[i][j] = cur_char;
    return false;
};

var findWords = function(board, words) {
    /**
     *  First lets try to form a working backtracking implementation. For this
     *  we need to be able to tell weather a particular word is within the board
     *  or not. Then we run this funciton on all the words to filter the words.
     **/
    M = board.length;
    N = board[0].length;

    let ans = [];

    for ( let w of words ) {
        let found = false;

        for ( let i=0; i < M && !found ; i++ )
            for ( let j=0; j < N && !found ; j++ )
                if ( bt_search( board, i, j, w, 0 ) ) {
                    ans.push(w); found = true;
                }
    }

    return ans;
};
