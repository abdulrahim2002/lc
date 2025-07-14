/* START ---- string functions ---- START */
struct String* newString( size_t size );
struct String* newStringFromInt( int num );
struct String* pushString( struct String*, char c );
char           popString( struct String* );

struct String {
    size_t length;
    size_t limit;
    char*   data;
};
/* END ---- list functions ---- END */

int maximumSwap(int num)
{
    struct String* s = newStringFromInt( num );
    int last_index[10]; // last index of numbers from 0 -> 9

    for ( int i=0; i < s->length; i++ ) {
        last_index[ s->data[i] - '0' ] = i;
    }

    for ( int i=0; i < 10; i++ ) {
        printf("%d ", last_index[i]);
    }

    return -1;
}

/* START ---- string functionality ---- START */
struct String* newString( size_t size )
{
    struct String* x = (struct String*) malloc( sizeof(struct String) );
    if ( !x ) return NULL;
    *x = (struct String) {
        .length = 0,
        .limit = (int) fmax(10, size),
        .data = NULL,
    };
    x->data = (char*) calloc( x->limit, sizeof(char) );
    if ( !x->data ) { free(x); return NULL; }
    return x;
}

struct String* pushString( struct String* x, char c )
{
    x->length++;
    if ( x->length == x->limit ) {
        x->limit *= 2;
        x->data = (char*) reallocarray( x->data, x->limit, sizeof(char) );
        if (!x->data) {
            free(x); return NULL;
        }
    }
    x->data[x->length-1] = c;
    x->data[x->length] = '\0';
    return x;
}

char popString( struct String* x )
{
    if ( x->length == 0 ) return '\0';
    char res = x->data[x->length-1];
    if ( 2 * x->length == x->limit ) {
        x -> limit /= 2;
        x->data = (char*) reallocarray( x->data, x->limit, sizeof(char) );
        if ( !x ) {
            free(x); return res;
        }
    }
    x->length--;
    x->data[x->length] = '\0';
    return res;
}

struct String* newStringFromInt( int num )
{
    struct String* x = (struct String*) malloc( sizeof(struct String) );
    if ( !x ) return NULL;

    char numString[50];
    sprintf( numString, "%d", num );
    const int NL = strlen( numString );

    *x = (struct String) {
        .length = NL,
        .limit = 2*(NL),
        .data = NULL,
    };

    x->data = (char*) calloc( x->limit, sizeof(char) );
    if ( !x->data ) { free(x); return NULL; }
    strcpy( x->data, numString );
    return x;
}
/* END ---- String functionality ---- END */































=++++++++++++++++++++++++++++



/* START ---- string functions ---- START */
struct String* newString( size_t size );
struct String* newStringFromInt( int num );
struct String* pushString( struct String*, char c );
char           popString( struct String* );
void           freeString( struct String* );

struct String {
    size_t length;
    size_t limit;
    char*   data;
};
/* END ---- list functions ---- END */

bool is_mono( int num );

int monotoneIncreasingDigits(int n)
{
        while ( n ) {
                if ( is_mono(n) )
                        return n;
                n--;
        }
        return 0;
}

/* START ---- string functionality ---- START */
struct String* newString( size_t size )
{
    struct String* x = (struct String*) malloc( sizeof(struct String) );
    if ( !x ) return NULL;
    *x = (struct String) {
        .length = 0,
        .limit = (int) fmax(10, size),
        .data = NULL,
    };
    x->data = (char*) calloc( x->limit, sizeof(char) );
    if ( !x->data ) { free(x); return NULL; }
    return x;
}

struct String* pushString( struct String* x, char c )
{
    x->length++;
    if ( x->length == x->limit ) {
        x->limit *= 2;
        x->data = (char*) reallocarray( x->data, x->limit, sizeof(char) );
        if (!x->data) {
            free(x); return NULL;
        }
    }
    x->data[x->length-1] = c;
    x->data[x->length] = '\0';
    return x;
}

char popString( struct String* x )
{
    if ( x->length == 0 ) return '\0';
    char res = x->data[x->length-1];
    if ( 2 * x->length == x->limit ) {
        x -> limit /= 2;
        x->data = (char*) reallocarray( x->data, x->limit, sizeof(char) );
        if ( !x ) {
            free(x); return res;
        }
    }
    x->length--;
    x->data[x->length] = '\0';
    return res;
}

struct String* newStringFromInt( int num )
{
    struct String* x = (struct String*) malloc( sizeof(struct String) );
    if ( !x ) return NULL;

    char numString[50];
    sprintf( numString, "%d", num );
    const int NL = strlen( numString );

    *x = (struct String) {
        .length = NL,
        .limit = 2*(NL),
        .data = NULL,
    };

    x->data = (char*) calloc( x->limit, sizeof(char) );
    if ( !x->data ) { free(x); return NULL; }
    strcpy( x->data, numString );
    return x;
}

void freeString( struct String* s )
{
        free( s->data );
        s->data = NULL;
        free( s );
        s = NULL;
}
/* END ---- String functionality ---- END */
