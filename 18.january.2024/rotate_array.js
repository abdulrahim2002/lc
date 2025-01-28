var rotate = function(a, k) {
       /** Algorithm: (array, k \in [0,A-1])
        1. Reverse the array
        2. Reverse the first k elements
        3. Reverse the last A-k elements

        Example: 1,2,3,4,5,6,7 && k=2
        7,6,5,4,3,2,1 (reverse)
        6,7, 5,4,3,2,1 (reverse first k elements. i.e. 0 to k-1)
        6,7, 1,2,3,4,5 (reverse all elements after that: from k to A-1)
    */
    let A = a.length;

    let rev = (i,j) => {
        /* reverse a[i] <--> a[j] */
        while ( i <= j ) {
            let tmp = a[i];
            a[i] = a[j];
            a[j] = tmp;
            i ++;j--;
        }
    };

    k = k%A;
    a.reverse();
    rev(0,k-1);
    rev(k,A-1);
};


var rotate = function(a, k) {

	/** This algorithm does not work. The problem with it is that it
	 * can go into a deadlock. When the element that current element
	 * displaces  will displace current element  */
	
     /**
       We can solve the dirty bit problem by using a tmp variable that
       holds the next displaced element and places it in the right
       position. Initially, t=a[0], 0. which implies a[0] is displaced.
       put a[0] in it's right place and the place where a[0] goes, will
       be the next displaced element. repeat this process until a[0] is
       displaced again.
     */
	let A = a.length; let dis = [a[0], 0];

    for (let i=0; i <= A; i++) {
        let [val, ind] = dis;
        new_ind = (ind+k)%A;        /* Index where value is placed after
                                       rotation */
        let new_val = a[new_ind];   /* save the value at new index */
        a[new_ind] = val;
	dis[0] = new_val;
	dis[1] = new_ind;

        /* deadlock avoidance:
           Let a,i be a value to be placed. And, i+k % A = j.
           So we put a at j and the value at j (say b) will be
           placed next. a,i : b,j -> a,i : a,j
           now if b,j is placed again, and j+k % A is i. Then we are
           in a deadlock.
           a,i : a,j -> b,i : a,j
           Next iteration will give.
           b,i : b,j -> a,i : b,j (initial condition)

           To avoid this issue, we check if the new_ind+k %A is ind (initial)
           if yes, we put new_ind + 1 in the next value to be replaced.
         */        
    }
}

