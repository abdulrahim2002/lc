/********************************* PROTOTYPES ************************************/
struct NodeInt {
        int    val;
        struct NodeInt* next;
        struct NodeInt* prev;
};
struct NodeInt* newNodeInt(int, struct NodeInt*, struct NodeInt*);

struct ListInt {
        size_t size;        
        struct NodeInt* start;
        struct NodeInt* end;
};
struct ListInt* newListInt    ();
int             getListInt    (struct ListInt* list, int index);
void            appendLeftListInt (struct ListInt* list, int val);
void            appendListInt (struct ListInt* list, int val);
int             popListInt    (struct ListInt* list);
int             popLeftListInt(struct ListInt* list );
void            insertListInt (struct ListInt* list, int index, int val);
int             removeListInt (struct ListInt* list, int index);
void            freeListInt   (struct ListInt* list);
/********************************* PROTOTYPES ************************************/

/******************************* DEFINE ALIASES **********************************/
void (*pushListInt)  (struct ListInt*, int) = appendListInt;
void (*unshift)      (struct ListInt*, int) = appendLeftListInt;
/******************************* DEFINE ALIASES **********************************/


/**************************** YOUR CODE STARTS  **********************************/
//
//
//
/*A*************************** YOUR CODE ENDS  **********************************/


/******************************* IMPLEMENTATIONS **********************************/
struct ListInt* newListInt()
{
        struct ListInt* list = (struct ListInt*) malloc( sizeof(struct ListInt) );
        list->start = newNodeInt( INT_MIN, NULL, NULL );
        list->end =   newNodeInt( INT_MAX, NULL, NULL );
        list->start->next = list->end;
        list->end->prev = list->start;
        list->size = 0;
        return list;
}

int getListInt(struct ListInt* list, int index)
{
        if ( list->size < 0 || list->size <= index ) return -1;
        struct NodeInt* node = list->start->next;
        while ( index ) {
            node = node->next;
            index--;
        }
        return node->val;
}

void appendLeftListInt(struct ListInt* list, int val)
{
        struct NodeInt* cur_first = list->start->next;
        struct NodeInt* new_first = newNodeInt( val, list->start, cur_first );
        list->start->next = cur_first->prev = new_first;
        list->size++;
}

void appendListInt(struct ListInt* list, int val)
{
        struct NodeInt* cur_last = list->end->prev;
        struct NodeInt* new_last = newNodeInt( val, cur_last, list->end );
        cur_last->next = list->end->prev = new_last;
        list->size++;
}

void insertListInt(struct ListInt* list, int index, int val)
{
        if ( index < 0 || list->size < index )  return;
        if ( list->size == index ) return appendListInt( list, val );

        struct NodeInt* after_node = list->start->next;
        while ( index ) {
            after_node = after_node->next;
            index--;
        }
        struct NodeInt* before_node = after_node->prev;
        struct NodeInt* new_node = newNodeInt( val, before_node, after_node );
        before_node->next = after_node->prev = new_node;
        list->size++;
}

int removeListInt(struct ListInt* list, int index)
{
        if ( index < 0 || list->size <= index ) return INT_MIN;

        struct NodeInt* delete_node = list->start->next;
        while ( index ) {
            delete_node = delete_node->next;
            index--;
        }
        int ret_val = delete_node->val;

        struct NodeInt* before = delete_node->prev;
        struct NodeInt* after  = delete_node->next;

        before->next = after;
        after->prev = before;
        free(delete_node); delete_node = NULL;
        list->size--;
        return ret_val;
}

void freeListInt(struct ListInt* list)
{
        struct NodeInt* node = list->start;
        struct NodeInt* behind = NULL;

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

int popListInt( struct ListInt* list )
{
        if ( list->size == 0 ) return INT_MIN;
        struct NodeInt* delete_node = list->end->prev;
        int ret_val = delete_node->val;

        struct NodeInt* before = delete_node->prev;
        struct NodeInt* after  = delete_node->next;

        before->next = after;
        after->prev = before;
        free(delete_node); delete_node = NULL;
        list->size--;

        return ret_val;
}

int popLeftListInt( struct ListInt* list )
{
        if ( list->size == 0 ) return INT_MIN;
        int ret_val = list->start->next->val;
        removeListInt(list, 0);
        return ret_val;
}

struct NodeInt* newNodeInt(int val, struct NodeInt* prev, struct NodeInt* next)
{
        struct NodeInt* node = (struct NodeInt*) malloc( sizeof(struct NodeInt) );
        *node = (struct NodeInt) { .val=val, .next=next, .prev=prev };
        return node;
}
/******************************* IMPLEMENTATIONS **********************************/
