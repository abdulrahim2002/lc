/* Doubly Linked List Node structure  */
struct Node {
        int val;
        struct Node* next;
        struct Node* prev;
};
/* create new Node  */
struct Node* newNode(int, struct Node*, struct Node*);

/* Double Linked List structure  */
struct List {
        int size;
        struct Node* start;
        struct Node* end;
};
typedef struct List MyLinkedList;


struct List* myLinkedListCreate()
{
        struct List* list = (struct List*) malloc( sizeof(struct List) );
        list->start = newNode( INT_MIN, NULL, NULL );
        list->end = newNode( INT_MAX, NULL, NULL );
        list->start->next = list->end;
        list->end->prev = list->start;
        list->size = 0;
        return list;
}

int myLinkedListGet(struct List* list, int index)
{
        if ( list->size < 0 || list->size <= index ) return -1;
        struct Node* node = list->start->next;
        while ( index ) {
            node = node->next;
            index--;
        }
        return node->val;
}

void myLinkedListAddAtHead(struct List* list, int val)
{
        struct Node* cur_first = list->start->next;
        struct Node* new_first = newNode( val, list->start, cur_first );
        list->start->next = cur_first->prev = new_first;
        list->size++;
}

void myLinkedListAddAtTail(struct List* list, int val)
{
        struct Node* cur_last = list->end->prev;
        struct Node* new_last = newNode( val, cur_last, list->end );
        cur_last->next = list->end->prev = new_last;
        list->size++;
}

void myLinkedListAddAtIndex(struct List* list, int index, int val)
{
        if ( index < 0 || list->size < index )  return;
        if ( list->size == index ) return myLinkedListAddAtTail( list, val );

        struct Node* after_node = list->start->next;
        while ( index ) {
            after_node = after_node->next;
            index--;
        }

        struct Node* before_node = after_node->prev;
        struct Node* new_node = newNode( val, before_node, after_node );
        before_node->next = after_node->prev = new_node;
        list->size++;
}

void myLinkedListDeleteAtIndex(struct List* list, int index)
{
        if ( index < 0 || list->size <= index ) return;

        struct Node* delete_node = list->start->next;
        while ( index ) {
            delete_node = delete_node->next;
            index--;
        }

        struct Node* before = delete_node->prev;
        struct Node* after  = delete_node->next;

        before->next = after;
        after->prev = before;
        free(delete_node); delete_node = NULL;
        list->size--;
}

void myLinkedListFree(struct List* list)
{
        struct Node* node = list->start;
        struct Node* behind = NULL;

        while ( node ) {
                behind = node;
                node = node->next;
                free(behind);
                behind = NULL;
        }

        free(behind);  free(list);
        behind = NULL; list = NULL;
        return;
}

struct Node* newNode(int val, struct Node* prev, struct Node* next)
{
        struct Node* node = (struct Node*) malloc( sizeof(struct Node) );
        *node = (struct Node) { .val=val, .next=next, .prev=prev };
        return node;
}
