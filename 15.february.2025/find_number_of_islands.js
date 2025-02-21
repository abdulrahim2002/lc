class Solution:
    def mark_island(self, grid, i, j, m, n):
        # Mark out the right, left blocks recursively.
        # Until all '1's  are marked none horizontally
        # and vertically hence nulling the island
        # if  i >= m or j >= n return
        if grid[i][j] == '1':
            grid[i][j] = 'x'
        else:
            return

        if i+1 < m:
            self.mark_island( grid, i+1, j, m, n )
        if j+1 < n:
            self.mark_island( grid, i, j+1, m, n )

        # check for left and right also. 'x' means we went
        # there already. and it could also be out of range
        if i-1 >= 0 and grid[i-1][j] != 'x':
            self.mark_island( grid, i-1, j, m, n )
        if j-1 >= 0 and grid[i][j-1] != 'x':
            self.mark_island( grid, i, j-1, m, n )


    def numIslands(self, grid: List[List[str]]) -> int:
        """
        Done, this method is faster than 88% but can be made
        faster by early stopping the recursion tree.

        Also, one puzzling thing to me:

        the maximum recursion depth in most programming languages
        is 256.

        If there are more than 256 '1's in a single line,
        would stack overflow crash the program.
        experiemnt time!!
        """
        m, n = len(grid), len(grid[0])
        iland = 0

        for i in range(m):
            for j in range(n):
                if grid[i][j] == '1':
                    iland += 1
                    self.mark_island(grid, i, j, m, n)
        return iland
