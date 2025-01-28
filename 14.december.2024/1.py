# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def addTwoNumbers(self,
                      l1: Optional[ListNode],
                      l2: Optional[ListNode])
                        -> Optional[ListNode]:

        """
        We have 2 lists, and we need to add their corresponding
        elements. For example, we add 1st element of list 1 to
        first element of list 2 and so on..

        Now, we have 2 problems:

        1. What if the number we got by adding corresponding
        elements of list 1 and list 2 is more then 9. i.e. 2 digit.

        -> In this case, we store the unit's digit into the list
        and the 10th place is stored on carry. We add this carry
        to the sum of next 2 elements.

        e.g. 6 + 4 = 10. Hence carry = 1 and unit_place = 0. Hence
        0 goes into the current place and 1 becomes carry, which is
        added to next pair, i.e. 3 + 4 = 7. 7 + 1 (carry) = 8.
        8 goes into it.

        2. What if the lengths of 2 lists are not equal. For e.g.
        in [9,9,9,9,9,9,9], l2 = [9,9,9,9]

        Here we take the longer list and keep on repeting the
        process until the shorted list is exhausted. After that,
        we only add the carry and element of longer list. We
        would need to add another element, in case we have an
        outstanding carry at the end.
        """

        l = l1 if l1.len() > l2.len else l2"

        print(l1[0].val)
