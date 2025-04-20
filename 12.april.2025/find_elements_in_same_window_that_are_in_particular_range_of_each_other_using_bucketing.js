var containsNearbyAlmostDuplicate = function(nums, indexDiff, valueDiff) {
    /**
       Find a pair of indices (i, j) such that:
       * i != j,
       * abs(i - j) <= indexDiff.
       * abs(nums[i] - nums[j]) <= valueDiff, and
       Return true if such pair exists or false otherwise.

       Approach 1: Try all possible pairs.
       Time: O(n^2)
       Space: O(1)

       Approach 2: Optimize the above algorithm

       Approach 3: The first window is defined in the range [0, indexDiff] all
       other windows can be obtained by the next element and removing the
       leftmost element from the window. In general the window is defined by
       [i, i + indexDiff].

       - Within each such window, all elements are unique. so i != j all
       - elements are withing index difference of indexDiff. The maximum
       - difference is between first and last element which is exactly indexDiff
       - NOW. For all elements in the window, we need the minium valueDiff. i.e.
       - we need to find 2 elements for which nums[i]-nums[j] is minium. This
       - can only happen when we keep the elements in sorted order.

       Achieving O( n log k ) is easy. We maintain a window of numbers in a
       sorted data structure. With the knowledge of the minimum number
       difference.

       Achieving O( n ) is even easier using bucketing of numbers. The idea is
       that create buckets as a Map. The size of the buckets is valueDiff+1,
       which implies that if 2 elements are in the same bucket, they much be
       within range valueWidth of each other.

       This is really an elegent solution.

       This question is worth revisiting again..
    **/
    // bucket sort appraoch by chat gpt
    const bucketSize = valueDiff + 1;
    const buckets = new Map();

    for (let i = 0; i < nums.length; i++) {
        const num = nums[i];
        const bucketId = Math.floor(num / bucketSize);

        if (
            buckets.has(bucketId) || // Same bucket
            (buckets.has(bucketId - 1) && Math.abs(num - buckets.get(bucketId - 1)) < bucketSize) ||
            (buckets.has(bucketId + 1) && Math.abs(num - buckets.get(bucketId + 1)) < bucketSize)
        ) {
            return true;
        }

        buckets.set(bucketId, num);

        // Keep window size
        if (i >= indexDiff) {
            const oldBucketId = Math.floor(nums[i - indexDiff] / bucketSize);
            buckets.delete(oldBucketId);
        }
    }

    return false;
//   let N = nums.length;
//   for ( let i=0; i < N; i++ ) {
//       for ( let j=i+1; j < N; j++ ) {
//           if ( j-i > indexDiff ) break;
//           if ( Math.abs( nums[j]-nums[i] ) <= valueDiff  )
//               return true;
//       }
//   }
//    return false;

//   let N = nums.length;
//   for ( let i=0; i < N; i++ ) {
//       for ( let j=i+1; j < N; j++ ) {
//           if ( j-i <= indexDiff &&
//                Math.abs( nums[j]-nums[i] ) <= valueDiff  )
//               return true;
//       }
//   }
//   return false;
};


/**
   Some gentle men's BST implementation:


class Node(object):
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None
        self.height = 1


class AVLTree(object):
    def __init__(self):
        self.root = None
        self.size = 0


    def height(self, node):
        if node:
            return node.height
        return 0


    def setHeight(self, node):
        if node is None:
            return 0
        return 1 + max(self.height(node.left), self.height(node.right))


    def rightRotate(self, node):
        new_root = node.left
        node.left = node.left.right
        new_root.right = node
        node.height = self.setHeight(node)
        new_root.height = self.setHeight(new_root)
        return new_root


    def leftRotate(self, node):
        new_root = node.right
        node.right = node.right.left
        new_root.left = node
        node.height = self.setHeight(node)
        new_root.height = self.setHeight(new_root)
        return new_root


    def insert(self, node, val):
        if node == self.root:
            self.size += 1
        # Returns a Node pointing to updated subtree
        if node is None:
            return Node(val)
        if node.val < val:
            node.right = self.insert(node.right, val)
        else:
            node.left = self.insert(node.left, val)
        balance = self.height(node.left) - self.height(node.right)
        if balance > 1:
            if self.height(node.left.left) > self.height(node.left.right):
                node = self.rightRotate(node)
            else:
                node.left = self.leftRotate(node.left)
                node = self.rightRotate(node)
        elif balance < -1:
            if self.height(node.right.right) > self.height(node.right.left):
                node = self.leftRotate(node)
            else:
                node.right = self.rightRotate(node.right)
                node = self.leftRotate(node)
        else:
            node.height = self.setHeight(node)
        return node


    def getMinValNode(self, node):
        if node is None or node.left is None:
            return node
        return self.getMinValNode(node.left)


    def remove(self, node, val):
        if node is None:
            return None
        if node.val < val:
            node.right = self.remove(node.right, val)
        elif node.val > val:
            node.left = self.remove(node.left, val)
        else:
            if node.left is None:
                return node.right
            elif node.right is None:
                return node.left
            else:
                right_min_val_node = self.getMinValNode(node.right)
                node.val = right_min_val_node.val
                node.right = self.remove(node.right, right_min_val_node.val)

        node.height = self.setHeight(node)
        balance = self.height(node.left) - self.height(node.right)
        if balance > 1:
            if self.height(node.left.left) > self.height(node.left.right):
                node = self.rightRotate(node)
            else:
                node.left = self.leftRotate(node.left)
                node = self.rightRotate(node)
        elif balance < -1:
            if self.height(node.right.right) > self.height(node.right.left):
                node = self.leftRotate(node)
            else:
                node.right = self.rightRotate(node.right)
                node = self.leftRotate(node)
        else:
            node.height = self.setHeight(node)
        return node


    def predecessor(self, node, val):
        if node is None:
            return None
        if node.val == val:
            return val
        elif node.val > val:
            return self.predecessor(node.left, val)
        else:
            right_res = self.predecessor(node.right, val)
            return right_res if right_res else node.val


    def successor(self, node, val):
        if node is None:
            return None
        if node.val == val:
            return val
        elif node.val < val:
            return self.successor(node.right, val)
        else:
            left_res = self.successor(node.left, val)
            return left_res if left_res else node.val


class Solution(object):
    def containsNearbyAlmostDuplicate(self, nums, k, t):
        """
        :type nums: List[int]
        :type k: int
        :type t: int
        :rtype: bool
        """
        avltree = AVLTree()
        root = avltree.root
        for i, num in enumerate(nums):
            predecessor = avltree.predecessor(root, num)
            if predecessor is not None and abs(predecessor - num) <= t:
                return True
            successor = avltree.successor(root, num)
            if successor is not None and abs(successor - num) <= t:
                return True

            root = avltree.insert(root, num)

            if avltree.size > k:
                root = avltree.remove(root, nums[i-k])

        return False
 **/
