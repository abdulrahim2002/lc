struct ListNode {
    int val;
    struct ListNode *next;
};




struct ListNode* addTwoNumbers(struct ListNode* l1,
                               struct ListNode* l2)
{
        struct ListNode start = {
                .val = -1;
                .next = NULL;
        };
        struct ListNode* sum = &start;
        struct ListNode* head = sum;

        int carry = 0;
        /*
         * While either of the list is not exhausted: add l1.val and l2.val to
         * sum.val and if sum.val > 10 then carry is sum.val%10.
         *
         */
        while ( l1 != NULL || l2  != NULL  ) {
                sum->val = l1->val + l2->val + carry;
                if (sum->val > 9) {
                        carry = (sum->val - sum->val%10)/10; /* Tenths place */
                        sum->val = sum->val%10; /* Units place */
                }

                struct ListNode next_number = {
                        .val = -1
                        .next = NULL
                };

                sum -> next = &next_number;
                sum = &next_number;
                l1 = l1 -> next;
                l2 = l2 -> next;
        }

        /* Which one did we exhaust; get the remaining elemens of the other one */
        if (l1 == NULL) {
                while (l2!=NULL) {
                        sum->val = l2->val + carry;
                        if (sum->val > 9) {
                                carry = (sum->val - sum->val%10)/10; /* Tenths place */
                                sum->val = sum->val%10; /* Units place */
                        }

                        struct ListNode next_number = {
                                .val = -1
                                .next = NULL
                        };

                        sum -> next = &next_number;
                        sum = &next_number;
                        l2 = l2 -> next;
                }
        }
        else {
                while (l1!=NULL) {
                        sum->val = l1->val + carry;
                        if (sum->val > 9) {
                                carry = (sum->val - sum->val%10)/10; /* Tenths place */
                                sum->val = sum->val%10; /* Units place */
                        }

                        struct ListNode next_number = {
                                .val = -1
                                .next = NULL
                        };

                        sum -> next = &next_number;
                        sum = &next_number;
                        l1 = l1 -> next;
                }
        }

        sum = NULL;

        return result;
}
