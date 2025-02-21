var MinStack = function() {
    /**
       The real challenge here is to get teh minium in O(1) time.
       For this we must use 2 lists. One to keep track of the elements
       and the other to keep track of the minium elements.
       The length of teh 2 lists must remain same at all times, so that
       evemn after successive popping, there is always a minium element
       for remainign elements of the list
    */
    this.stack = new Array();
    this.track_min = new Array();
};

MinStack.prototype.push = function(val) {
    this.stack.push(val);
    if ( !this.track_min.length || val < this.track_min[this.track_min.length-1] )
        this.track_min.push(val);
    else this.track_min.push( this.track_min[this.track_min.length-1] );

};

MinStack.prototype.pop = function() {
    this.stack.pop();
    this.track_min.pop();
};

MinStack.prototype.top = function() {
    return this.stack[this.stack.length-1];
};

MinStack.prototype.getMin = function() {
    return this.track_min[this.track_min.length-1];
};
