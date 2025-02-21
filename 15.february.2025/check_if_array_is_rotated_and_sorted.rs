impl Solution {
    pub fn check(a: Vec<i32>) -> bool {
        /*
            There is exactly one number of dip, in a rotated sorted array. 
            Considering a cyclic structure, where a dip is defined as decrease
            in magnitude when travelling from t=t to t=t+Δ 
        */
        if ( a.len() == 0 ) {
            return true;
        }

        let mut n_dips = 0;
        let A = a.len();
        for i in 0..A {
            if a[ i%A ] > a[ (i+1)%A ] {
                n_dips += 1;
                if n_dips > 1 {return false;}
            }
        }

        true
    }
}
