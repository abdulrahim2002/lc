impl Solution {
    pub fn is_subsequence(t: String, s: String) -> bool {
        let (S, T) = ( s.len(), t.len() );

        let new_s = s.as_bytes();
        let new_t = t.as_bytes(); // convert this into an array of UTF-8 bytes.
                                  // allows us to access these characters by indexing 
        
        if T == 0 {return true;}
        if S == 0 {return false;}

        let (mut h, mut g) = ( 0, 0 );

        while h < S && g < T {
            if new_s[h] == new_t[g] {
                g += 1;
            }
            h += 1;
        }

        g == T
    }
}
