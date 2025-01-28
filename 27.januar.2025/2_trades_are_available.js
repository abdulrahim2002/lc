var maxProfit = function(a) {
    /**
       You can execute at most 2 trades, so ihr needs to be
       careful which trades you will execute.

       I can think of a 2 pass solution, well first we find
       the, maximum range. and then we can calculate another
       maximum out of that range. the only problem we will have
       is that these ranges might overlap.

       The 2 pass solution.: first search for the maximum profit you can make
       executing at most one trade. Store this trades starting and ending index.

       Now you again search the same array to find the maxmimum profit you can
       make but this time excluding this range.

       This approach does not make, since we might have choice to divide the maximum
       profit range into multiple ranges, to maximize our overall profit.

       For example consider the case: [6,1,3,2,4,7]

       Here is one solution that I found online, it uses state machines:
       https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/solutions/149383/easy-dp-solution-using-state-machine-o-n-time-complexity-o-1-space-complexity/
    */


};
