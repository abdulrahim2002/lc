var hIndex = function(papers) {
    /**
       H-index: It is the maximum h such that a researcher has
       received more than h citation on more than h papers.

       Since the citations are sorted, it is possible to tell
       in constant time, the number of papers that have received
       citations for a particular paper.

       The next step is to binary search to maximize citations.

           returns true if h index is valid

           since the h index ranges bw -> [0, no. of papers]
           eliminate non valid first

           case 1:
           if h index is P = no. of papers, then there are P
           number of papers = all papers that have more than
           P citations. Since the papers are sorted, if the
           citations of paper with minium citations are more
           than P than all other papers will have citations
           more than P and P is the answer.
           Hence, condition is:
           papers[0] >= P

           case 2:
           h index is between [0,  P-1]. For an index i, the number
           of papers with more than papers[i] citaions are all the
           papers to its right. Hence,

           for "i". the number of papers with more or equal than papers[i]
           citaion are: i, i+1, i+1, ... P-1

           = P-1 - i

           in this case, we can run binary search on the indexes. Any index
           between [0, P-1] is valid h index if:

           papers[i] <= P-1 - i (no. of papers with more than papers[i] citation)
    **/
    let P = papers.length;
    if ( papers[0] >= P ) return P; // case 1

    let lo = 0, hi = P-1;

    while ( lo <= hi ) {
        let mid = lo + Math.floor( (hi - lo)>>1 );

        /** Check if papers[mid] is a valid h index
            we can easily check for papers[mid] because
            we have citations = papers[mid] and number of
            papers that have more than papers[mid] citations
            = P - mid. Which are the 2 things required to calculate
            citation.

            If papers with more than x citations > x
            try increasing x. You might find higher number

            if papers with more than x citations < x
            x cannot become h index. we need to decrease x

            if papers with more than x citation = x
            this is the maximum h number because if you
            increase x. no. of papers with more than x citations
            will decrease by 1 while x may increase.
            Hence, it will be invalid h index for sure.

            But what if a valid h index is not in the list.
         **/

        let x = papers[mid];

        // papers wth more than current citation
        let more_than_x = P-mid;

        // h index tested is mid
        // more than @mid papers are required with
        // more than mid citations

        if ( more_than_x == x ) return x;
        else if ( more_than_x > x ) lo = mid+1;
        else hi = mid-1;
    }

    // but why will P-lo contain the answer.
    return P-lo;
};
