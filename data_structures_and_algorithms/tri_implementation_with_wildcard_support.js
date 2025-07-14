// /***
//    This simple solution of keeping words in a list works
//    but we need better structure to allow best speed at the
//    cost of space;

//    Solutions with array and set are fine but for production levcel
//    engineering. we need somethign really really goood.

//    How can we implement the dot operators with trie??
//    The idea is that we recursively search all words in all
//    the trie node childrens whenever we encounter a dot.

//    We also need the capability to set the root node for a search
// ***/

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


WordDictionary.prototype.subsearch = function(word, root) {
    /** search with the capability to set root node **/
    let W = word.length; if (!W) return root.exists;

    let node = root;
    let i;


    // find these node until characters are exhausted
    for ( i=0; i < W; i++ ) {

        // all character pattern
        if ( word[i] === "." ) {
            let map = node.children;
            // get all the nodes that are child to current node
            for ( let x=97; x < 97+26; x++ ) {
                let c = String.fromCharCode(x);

                if ( map.has(c) ) {
                    // get the node and search for the next part as it being node
                    let check = map.get( c );

                    let ret = this.subsearch(  word.slice(i+1, W),  check  );

                    if ( ret ) return true;
                }
            }
            return false;
        }

        else if ( node.children.has( word[i] ) )
            node = node.children.get( word[i] );
        else return false;
    }

    if ( i == W && node.exists ) return true;
    else return false;
};

WordDictionary.prototype.search = function( word ) {
    return this.subsearch( word, this.root );
};
