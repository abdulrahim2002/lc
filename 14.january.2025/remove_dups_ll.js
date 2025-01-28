var deleteDuplicates = function(head) {
    if (!head) return head;

    const ret  = new ListNode();;

    var real_list = ret;
    var fake_list = head;

    while (fake_list) {
        if (!fake_list.next  || fake_list.next && fake_list.val != fake_list.next.val) {
            real_list.next = fake_list;
            real_list = real_list.next;
        }

        fake_list = fake_list.next;
    }

    return ret.next;

};
