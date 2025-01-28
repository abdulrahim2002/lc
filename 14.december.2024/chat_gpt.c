// /**
//  * Struct ListNode {
//  *     int val;
//  *     struct ListNode *next;
//  * };
//  */
// struct ListNode* addTwoNumbers(struct ListNode* l1,
//                                struct ListNode* l2)
// {
//         struct ListNode* sum = (struct ListNode*) malloc(sizeof(struct ListNode));
//         struct ListNode* head = &*sum;
//         int carry = 0;
//         /*
//          * While either of the list is not exhausted: add l1.val and l2.val to
//          * sum.val and if sum.val > 10 then carry is sum.val%10.
//          */
//         while ( l1 != NULL || l2  != NULL  ) {
//                 sum->val = l1->val + l2->val + carry;
//                 if (sum->val > 9) {
//                         carry = (sum->val - sum->val%10)/10; /* Tenths place */
//                         sum->val = sum->val%10; /* Units place */
//                 }
//
//                 struct ListNode* next_number = (struct ListNode*) \
//                         malloc(sizeof(struct ListNode));
//
//                 next_number->val = -1;
//                 next_number->next = NULL;
//
//                 sum -> next = next_number;
//                 sum = sum->next;
//                 l1 = l1 -> next;
//                 l2 = l2 -> next;
//         }
//
//         /* Which one did we exhaust; get the remaining elemens of the other one */
//         if (l1 == NULL) {
//                 while (l2!=NULL) {
//                         sum->val = l2->val + carry;
//                         if (sum->val > 9) {
//                                 carry = (sum->val - sum->val%10)/10; /* Tenths place */
//                                 sum->val = sum->val%10; /* Units place */
//                         }
//
//                         struct ListNode next_number = {
//                                 .val = -1,
//                                 .next = NULL,
//                         };
//
//                         sum -> next = &next_number;
//                         sum = &next_number;
//                         l2 = l2 -> next;
//                 }
//         }
//         else {
//                 while (l1!=NULL) {
//                         sum->val = l1->val + carry;
//                         if (sum->val > 9) {
//                                 carry = (sum->val - sum->val%10)/10; /* Tenths place */
//                                 sum->val = sum->val%10; /* Units place */
//                         }
//
//                         struct ListNode next_number = {
//                                 .val = -1,
//                                 .next = NULL,
//                         };
//
//                         sum -> next = &next_number;
//                         sum = &next_number;
//                         l1 = l1 -> next;
//                 }
//         }
//
//         free(sum);
//         sum=NULL;
//
//         return head;
// }
//
//
//

struct ListNode* addTwoNumbers(struct ListNode* l1, struct ListNode* l2) {
    struct ListNode start = {
        .val = -1,
        .next = NULL,
    };
    struct ListNode* sum = &start;
    struct ListNode* head = sum;
    int carry = 0;

    while (l1 != NULL || l2 != NULL) {
        int val1 = (l1 != NULL) ? l1->val : 0;
        int val2 = (l2 != NULL) ? l2->val : 0;

        int total = val1 + val2 + carry;
        carry = total / 10;

        struct ListNode* next_number = (struct ListNode*)malloc(sizeof(struct ListNode));
        next_number->val = total % 10;
        next_number->next = NULL;

        sum->next = next_number;
        sum = next_number;

        if (l1 != NULL) l1 = l1->next;
        if (l2 != NULL) l2 = l2->next;
    }

    if (carry > 0) {
        struct ListNode* next_number = (struct ListNode*)malloc(sizeof(struct ListNode));
        next_number->val = carry;
        next_number->next = NULL;
        sum->next = next_number;
    }

    return head->next;  // Skip the dummy node
}
