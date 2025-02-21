impl Solution {
    pub fn can_place_flowers(mut a: Vec<i32>, mut n: i32) -> bool {
        if n <= 0 {
            return true
        }

        let A = a.len();
        /*
            Greedy strategy. To place as many plants as possible,
            place them as soon as you find a relavant place to
            place them. This works for some reason when you start
            with the index 0
        */
        for i in 0..A {
            if ( a[i]==1 ) ||
            /*
                This code over here does not work, because (i) is unsigned integer. i.e. u_size
                when i==0 then i-1 is negative causing it to underflow.

                Also, rust does not allow comparisons between signed and unsigend integers.
            */
//               ( i-1 >= 0 && a[i-1] == 1 ) ||
//               ( i+1 <= A-1  && a[i+1] == 1 ) {
//                continue;
//            }

              /*
              corrected code
              */
              ( i != 0 && a[i-1] == 1 ) ||
              ( i != A-1 && a[i+1] == 1 ) {
              continue;
            }

            a[i] = 1;
            n -= 1;
            if n == 0 {
                return true;
            }
        }

        n <= 0
    }
}
