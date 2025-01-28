var isIsomorphic = function(s, t) {
    let n = s.length;
    let s_map = new Map();
    let t_map = new Map();

    for (let i=0; i < n; i++) {
        /* check if s can be mapped to t isomprphically */
        if ( s_map.has(s[i]) && (s_map.get(s[i]) != t[i]) )
            return false;
        else s_map.set( s[i], t[i] );

        /* check if t can isomorphically map to s */
        if ( t_map.has(t[i]) && (t_map.get(t[i]) != s[i]) )
            return false;
        else t_map.set( t[i], s[i] );
    }

    return true;

};
