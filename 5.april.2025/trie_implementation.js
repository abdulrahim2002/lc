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
        raise: Error("Not a string");
    }

    let code = c.charCodeAt(0) - 97;

    if ( !(0 <= code && code < 26) ) {
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
