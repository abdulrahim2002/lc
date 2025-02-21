/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var reverseKGroup = function(head, k) {
    /**
       Approch 1: store the array elements in an array
       reverse the nodes in the list k at a time using a
       window
       Time: O(n)
       Space: O(n)

       Approach 2: iterate through in list in group of k elmenets
       reverse the lists in place.

       Time: O(n)
       Space: O(1)
    **/
    if ( !head || k < 2 ) return head;

    let res = new ListNode(-1, head);
    let p = res;

    while ( p.next ) {
        let i = p.next;

        let c = 0, x = i;
        while ( c < k && x ) {
            x = x.next; c++;
        }

        if ( x === null && c != k) break;

        let h = i.next;
        while ( h !== x ) {
            let t = h.next;
            h.next = i;
            i = h;
            h = t;
        }

        let tmp = p.next;
        tmp.next = h;
        p.next = i;
        p = tmp;
    }

    return res.next;
    //// initialize the nodes array
    //let a = new Array();
    //for ( let i=head; i; i = i.next ) a.push(i)
    //let A = a.length;
    //
    //let reverse = (i, j) => {
    //    // reverse elements of a list from i to j (inclusive)
    //    let [start, end] = [i, j];
    //    while ( start < end ) {
    //        [ a[start], a[end] ] = [ a[end], a[start] ];
    //        start++; end--;
    //    }
    //};
    //
    //// iterate through the array in window of size k
    //for ( let i=0; i + k <= A; i += k ) reverse( i, i+k-1 );
    //
    //// fix the connections
    //for ( let i=0; i < A-1; i++ ) a[i].next = a[i+1];
    //a[A-1].next = null;
    //
    //return a[0];
};
