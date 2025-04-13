/**
   The idea behind an LRU cache is that:
   :Assuming cache is a list of values:
   - each element element is added at the
   end/right if it is "used"
   - each element is removed from the start/left
   - if and element is added when cache is full
   the last element is removed

   Here the "used" is defined as:
   - an element is added to the cache
   - an element is accessed from the cache
   - an elment is updated

   Example walkthrough:
   1
   1,2
   1,2,3
   1,3,2        -> access 2
   1,3,2,4      -> put(4)
   1,2,4,3      -> access 3
   1,2,4,3,5
   2,4,3,5,6    -> put(6) -> overflow, so remove 1 (LRU)
   4,3,5,6,7    -> put(7) -> remove 2
 */

/**
   Create a doubly linked list data structure
   to act as a cache. The benefit of it is that
   any arbitrary element can be moved first or last
   in constant time.
 **/
function Cache( key, val, next, prev ) {
    this.key = (key === undefined) ? -1:key;
    this.val = (val === undefined) ? 0:val;
    this.next = (next === undefined) ? null:next;
    this.prev = (prev === undefined) ? null:prev;
}


/**
 * @param {number} capacity
 */
var LRUCache = function(capacity) {
    // stores the value <--> node mapping
    this.key_node = new Map();
    this.len = 0;
    this.cap = capacity;

    // Initialize the doubly ended queue
    this.end = new Cache(-1, -1);
    this.start = new Cache(-1, -1);
    this.start.next = this.end;
    this.end.prev = this.start;
};

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {
    if ( !this.key_node.has(key) ) return -1;

    // get the node reference
    let node = this.key_node.get(key);

    // already at the end
    if ( node.next === this.end ) return node.val;

    // otherwise put the node in the end
    let before = node.prev;
    let after = node.next;

    // remove the node from the structure
    before.next = after;
    after.prev = before;

    // insert it at the end
    let last = this.end.prev;
    last.next = node;
    node.prev = last;

    node.next = this.end;
    this.end.prev = node;

    return node.val;
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, value) {
    // if key exists, update its value
    // consider it as use!!
    if ( this.key_node.has(key) ) {
        // get the node
        let node = this.key_node.get(key);

        // update value
        node.val = value;

        // put it at the last position, as if "used"
        this.get(key);

        return;
    }

    // number of values smaller than size -> can add more
    if ( this.len < this.cap ) {
        // simply add at the end position
        let node = new Cache(key, value);

        let last = this.end.prev;
        last.next = node;
        node.prev = last;

        node.next = this.end;
        this.end.prev = node;

        this.len++;
        this.key_node.set( key, node );
    }
    else {
        let node = new Cache(key, value);

        // remove the first node -> least recently used
        let first = this.start.next;
        let new_first = first.next;

        this.start.next = new_first;
        new_first.prev = this.start;

        // forget the first node
        this.key_node.delete(first.key);

        // insert the node at the end
        let last = this.end.prev;
        last.next = node;
        node.prev = last;

        node.next = this.end;
        this.end.prev = node;

        this.key_node.set(key, node);
    }

};
