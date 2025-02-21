let dec_list = function(limit=100) {
    this.list = [];
    this.limit = limit;
};

dec_list.prototype.add = function(val) {
    while ( this.list.length &&
            this.list[this.list.length-1] < val )
        this.list.pop();
    this.list.push(val);
};

var maxSlidingWindow = function(a, k) {
    /**
       So you need to find the maximum number in each sliding window. This is
       quite a simple problem, You can easily do it in O(n*k). By iterating over
       the windows, and for each window finding the maximum in that window and
       appending it result.

       And elegent solution can do it in O(n) time. You can use the fact that
       each iteration, 1 number is lost and 1 new number is added. So you need
       to keep track of weather the removed number was maximum and if the added
       number is maximum.

       There is a special data structure that we use here. It is called
       decreasing list. The idea is to keep the list in increasing order, by
       mudifying the push operation. The push operation is such that each time
       an element is pushed into the list. It removes all elements in the list
       that are smaller than it.
    */
    let A = a.length;
    let mon_list = new dec_list(k);
    let res = [];

    for (let i=0; i < k-1; i++) mon_list.add(a[i]);
    for (let i=k-1; i < A; i++) {
        mon_list.add(a[i]);
        /* remove the elements that are not required */
        if ( mon_list.list[0] === a[i-k] ) mon_list.list.shift();
        res.push(mon_list.list[0]);
    }
    return res;
};
