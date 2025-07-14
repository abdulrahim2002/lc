function Tri( node_char, children ) {
    /**
       This structure denotes a node in a tri structure. Each child
       of this node contains a single character. and a children. the
       depth indicates the position of character in a word.

       We also need a exists flag to distinguish word that are just
       prefix and actual words ever inserted into the trie.
    **/
    // this node's character
    this.node_char = (node_char === undefined) ?
                        null : node_char ;

    // word consisting of characters from root up until this node's
    // character is present in this trie (it was inserted).
    this.exists = false;

    // this node's children
    this.children = (children === undefined) ?
                        new Array(26).fill(null) : children;
}

// return index for a lowercase alphabet
let idx = (c) => {

    if ( typeof c !== 'string' ) {
        console.log( "not a character" );
        raise: Error("Not a string");
    }

    let code = c.charCodeAt(0) - 97;

    if ( !(0 <= code && code < 26) ) {
        console.log( 'illegal character' );
        raise: Error("Illegal character");
    }

    return code;
};

var Trie = function() {
    this.root = new Tri();
};

Trie.prototype.insert = function(word) {
    let W = word.length;
    let i=0;
    let node = this.root;

    // find the nodes until which the characters are present
    while ( i < W && node.children[ idx(word[i]) ] ) {
        node = node.children[ idx(word[i]) ];
        i++;
    }
    // create new nodes until string is exhausted
    while ( i < W ) {
        node.children[ idx(word[i]) ] = new Tri( word[i] );
        node = node.children[ idx(word[i]) ];
        i++;
    }

    // the word from root up until the last character of word
    // is present
    node.exists = true;
};

Trie.prototype.search = function(word) {
    let W = word.length; if (!W) return true;
    let i=0;
    let node = this.root;

    // find thes node until characters are exhausted
    while ( i < W && node.children[ idx(word[i]) ] ) {
        node = node.children[ idx(word[i]) ];
        i++;
    }
    // all characters are exists
    return i === W && node.exists;
};

Trie.prototype.startsWith = function(word) {
    let W = word.length; if (!W) return true;
    let i=0;
    let node = this.root;

    // find thes node until characters are exhausted
    while ( i < W && node.children[ idx(word[i]) ] ) {
        node = node.children[ idx(word[i]) ];
        i++;
    }
    // all characters are present
    return i === W;
};















/**
   This is the version I used for a problem that required incremental search.
   please update this implementation to be generaic
 **/


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
