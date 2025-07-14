/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     struct TreeNode *left;
 *     struct TreeNode *right;
 * };
 */

#define MAX(a,b) ( ( (a)>(b) ) ? (a):(b) )

void pre_order( struct TreeNode* node, int* loots, int distance )
{
        /*
         * @loots: array of size 2.
         * At index 0 -> store loots from even nodes
         * At 1 -> store loots from odd distance nodes
         *
         * @node: currenet node
         * @distance: current nodes distance from root
         */

        if ( node == NULL )
                return;

        if ( distance % 2 == 0  )
                loots[0] += node -> val;
        else
                loots[1] += node -> val;

        pre_order( node -> left, loots, distance + 1 );
        pre_order( node -> right, loots, distance + 1 );

        return;
}

int rob(struct TreeNode* root)
{
        /* The thief only has 2 options, either rob the houses at even distance
         * to the root or either rob the houses at odd distance to the root.
         *
         * We keep 2 variabes, even_loot and odd_loot.
         *
         * @even_loot: considers looting the houses that are at even distance to
         * the root. This includes the root itself.
         *
         * @odd_loot: considers houses that are at odd distance to the root.
         *
         * finaly we return the maximum of the 2 loots.
         *
         * */
        int loots[] = { 0, 0 };
        pre_order( root, loots, 0 );
        return MAX( loots[0], loots[1] );
}
