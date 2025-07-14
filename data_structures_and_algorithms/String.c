#define MAX(a,b) ( (a) > (b) ? (a) : (b) )
#define MIN(a,b) ( (a) < (b) ? (a) : (b) )

struct String* create_string( size_t size );
struct String* push_string( struct String*, char );
struct String* slice_string( struct String*, int, int );
void free_string( struct String* );

struct String {
    char* string;
    int length;
};

struct String* create_string( size_t size ) 
{
    struct String* str = (struct String*) malloc( sizeof(struct String) );
    if ( !str ) return NULL;
    *str = (struct String) { NULL, 0 };
    // size + 1 is allocated. The extra char is for '\0'
    str -> string = ( char* ) reallocarray( str -> string, size+1, sizeof(char) );
    
    if ( !str -> string ) { free( str ); return NULL; }
    
    str -> length = size;
    str -> string[ str -> length ] = '\0';
    return str;
}

struct String* push_string( struct String* str, char c )
{
    // allocate 1 char extra for null termination
    str -> string = ( char* ) reallocarray( str -> string, str -> length + 2, sizeof(char) );
    if ( !str -> string ) return NULL; 
    str -> string[ str -> length ]  = c;
    str -> length++;
    str -> string[ str -> length ] = '\0';
    return str;
}

struct String* slice_string( struct String* str, int start, int end ) 
{
    // return a copy of string, of str[start:end)
    // clamp the values to be within range
    start = MAX( 0, start ); end = MIN( str -> length, end );
    struct String* copy = create_string( 0 );
    for ( int i=start; i < end; i++ )
        push_string( copy, str -> string[i] );
    return copy;
}

void free_string( struct String* str ) {
    free( str -> string );
    str -> string = NULL;
    free( str );
    str = NULL;
}
