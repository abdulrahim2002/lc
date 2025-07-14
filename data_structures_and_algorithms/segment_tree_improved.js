function Node( character = null, children = new Map() ) {
    this.character = character;
    // children are stored in a map where the key is the character
    // of the next word and the value is the node with that character
    this.children  = children;
    // word consisting of characters from root up until this node's
    // character is present in this trie (it was inserted). We must store
    // it's index in the main list. Or we can also use an exists flag.
    this.index     = undefined;
    this.exists    = false;
}

class Tri {
    constructor ( list_of_words ) {
        /** construct a Tri, optionally inserts all the words in
         * list_of_words **/
        this.root = new Node();

        if ( list_of_words !== undefined )
            list_of_words.forEach( (word, index) => {
                this.insert( word, index );
            } );
    }

    insert( word, ind ) {
        // insert Word (with index=ind in the original list) in the Tri.
        let W = word.length,
            i=0,
            node = this.root;

        // find the nodes until which the characters are present
        while ( i < W && node.children.has(word[i]) ) {
            node = node.children.get(word[i]);
            i++;
        }
        // create new nodes until string is exhausted
        while ( i < W ) {
            node.children.set(  word[i], new Node( word[i] )  );
            node = node.children.get( word[i] );
            i++;
        }
        // the word from root up until the last character of word
        // is present. set the index and set flag exists
        node.index = ind;
        node.exists = true;
    }

    search( word ) {
        // return the index of the word in the original list if word is present
        // in the tri else return -1
        let W = word.length,
            i=0,
            node = this.root;

        // find thes node until characters are exhausted
        while ( i < W && node.children.has( word[i] ) ) {
            node = node.children.get( word[i] );
            console.log( node.character, node.index );
            i++;
        }
        // all characters exists, return index
        if ( i === W && node.exists )
            return node.index;
        // word is not preset, return -1
        return -1;
    };

    incremental_search( node ) {
        /**
           At the current node, conduct DFS, and find all the paths that are
           palindrome. For each such path, store the, ending index.
        **/
        ;
    }
}

String.prototype.reverse = function() {
    let res = "";
    for ( let i=this.length-1; i >= 0; i-- )
        res += this[i];
    return res;
}

String.prototype.isPalindrome = function() {
    let i=0,
        j=this.length;
    while ( i < j ) {
        if ( this[i] !== this[j] ) return false;
        i++; j--;
    }
    return true;
}
