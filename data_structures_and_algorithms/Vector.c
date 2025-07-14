/* START ---- dynamic list functions ---- START */
struct List* newListInt( size_t size );
struct List* pushListInt( struct List*, int val );
int popListInt( struct List* );

struct List {
    size_t length;
    size_t limit;
    int*   data;
};
/* END ---- dynamic list functions ---- END */

/* START ---- dynamic list functionality ---- START */
struct List* newListInt( size_t size )
{
    struct List* x = (struct List*) malloc( sizeof(struct List) );
    if ( !x ) return NULL;

    *x = (struct List) {
        .length = 0,
        .limit = (int) fmax(100, size),
        .data = NULL,
    };

    x->data = (int*) malloc( x->limit * sizeof(int) );
    if ( !x->data ) {
        free(x); return NULL;
    }

    return x;
}

struct List* pushListInt( struct List* x, int val )
{
    x->length++;
    if ( x->length == x->limit ) {
        x->limit *= 2;
        x->data = (int*) reallocarray( x->data, x->limit, sizeof(int) );
        if (!x->data) {
            free(x); return NULL;
        }
    }

    x->data[x->length-1] = val;
    return x;
}

int popListInt( struct List* x )
{
    int res = x->data[x->length-1];
    if ( 2 * x->length == x->limit ) {
        x -> limit /= 2;
        x->data = (int*) reallocarray( x->data, x->limit, sizeof(int) );
        if ( !x ) {
            free(x); return res;
        }
    }
    x->length--;
    return res;
}
/* END ---- dynamic list functionality ---- END */
