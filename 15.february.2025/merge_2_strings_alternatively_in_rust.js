impl Solution {

    pub fn merge_alternately(s1: String, 
                             s2: String) -> String {
        
        let mut res = String::new();
        
        /* make iterators */
        let mut s1 = s1.chars();
        let mut s2 = s2.chars();

        let (mut i, mut j) = (0, 0);

        loop {
            if let Some(i) =  s1.next() {
                res.push(i);
            }
            else {break;}

            if let Some(j) = s2.next() {
                res.push(j);
            }
            else {break;}
        }

        res.extend(s1);
        res.extend(s2);

        res
    }
    
    
    
    
    // pub fn merge_alternately(s1: String, 
    //                          s2: String) -> String {
        
    //     let mut res = String::new();
        
    //     /* convert to vectors of characters for O(1) access */
    //     let s1: Vec<char> = s1.chars().collect();
    //     let s2: Vec<char> = s2.chars().collect();

    //     let (mut i, mut j) = (0, 0);

    //     while i < s1.len() && j < s2.len() {
    //         res.push(s1[i]);
    //         res.push(s2[j]);
    //         i += 1;
    //         j += 1;
    //     }

    //     /* collect the left over */
    //     while i < s1.len() {
    //         res.push(s1[i]);
    //         i += 1;
    //     }

    //     while j < s2.len() {
    //         res.push(s2[j]);
    //         j += 1;
    //     }

    //     res
    // }
}
