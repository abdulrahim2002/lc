#include <stdio.h>
#include <stdlib.h>
#include <errno.h>
#include <stdbool.h>

/*
 * Design of the hash table:
 * - hash table is an array of pointers
 * - each entry in the hash table is a linked list
 * - hash function is simple modulo
 * - collisions are handled by inserting at the tail of linked list
 * - not all features are implemented, like deleting a particular node
*/

struct node;
struct table;

static inline unsigned int hash(int value, int end);
struct node* create_index_value(int index, int value);
static inline void init_map(struct table* table);
void insert(struct table* table, int index, int value);
int query_index_by_value(struct table* table, int value, int at_count);
void free_table(struct table* table);
static inline void delete_list(struct node*);

struct node
{
	/*
	 * - A node in the linked list
	 * - each node stores index value pair, which
	 *   provides the required value <-> index map
	 * - next pointer points to next node in the list
	 */
        int index;
	int value;
        struct node* next;
};

struct table
{
	/*
	 * @size: size of the table
	 * @map: hash map (array) containing pointers to head
	 * 	 nodes of linked lists
	 */
	int size;
	struct node** map;
};

static inline unsigned int hash(int value, int end)
{
        /*
         * A simple hash function that maps universe U space to range [0,end);
         * 0 <= returned_value < end
	 * This works for us since the index are supposed to be in range
	 * [0,size) which is suitable for index values
         */
        return abs(value%end);
}

struct node* create_index_value(int index, int value)
{
	struct node* iv = (struct node*) malloc( sizeof(struct node) );
	if (!iv)
		return NULL;

	iv->index= index;
	iv->value = value;
	iv->next = NULL;
	return iv;
}

static inline void init_map(struct table* table)
{
	for (int i=0; i<table->size; i++)
		table->map[i] = NULL;
}

void insert(struct table* table, int index, int value)
{
	unsigned int hashed_index = hash(value, table->size);
	struct node* index_value = create_index_value(index, value);
	if (!index_value)
		exit(-ENOMEM);

	if (table->map[hashed_index] == NULL)
		table->map[hashed_index] = index_value;
	else {
		struct node* tmp =
			table->map[hashed_index];

		while (tmp->next != NULL) {
			tmp = tmp->next;
		}
		tmp->next = index_value;
	}
}

int query_index_by_value(struct table* table, int value, int at_count)
{
	/*
	 * gets the @at_count'th index of value. For example if at_count
	 * is 3 then get the index of third occurence of @value
	 * -1 if value is not present in the array
	 */
	unsigned int hashed_index = hash(value, table->size);
	if ( table->map[hashed_index] == NULL)  {
		return -1;
	}
	else {
		/*
		 * Value might be present but we need to ignore the
		 * first @at_count-1 occurences hence we iterate this
		 * bucket until we have seen exhaust the list of
		 * @at_count becomes 0 (we will decrement it). Behaviour
		 * is undefined when number_of_occurences < @at_count
		 * in which case, either the last index containing that
		 * entry is returned or -1 depending on what was the
		 * value at last node
		 */
		struct node* tmp = table->map[hashed_index];
		while (at_count && tmp->next!=NULL) {
			if (tmp->value==value)
				at_count--;
			if (at_count)
				tmp = tmp->next;
		}
		if (tmp->value == value)
			return tmp->index;
	}

	return -1;
}

void free_table(struct table* table)
{
	for (int i=0; i < table->size; i++)
		delete_list(table->map[i]);
}

static inline void delete_list(struct node* head)
{
	while (head != NULL) {
		struct node* tmp = head;
		head = head->next;
		free(tmp);
	}
}

int* twoSum(int* nums, int numsSize, int target, int* returnSize)
{
	/*
	 * We create a hash map, where you can query the hashmap for
	 * index using a value.
	 *
	 * After we create the hashmap, we traverse the array. For each element,
	 * we find if -FÄ = target - this_element exists in the array, using our
	 * hashmap_query. If it does, then return :: else Add this index-value
	 * pair to hashmap, with the hope that if this is the solution, when
	 * it's corresponding pair will be checked in the future. It will be
	 * there in the hashmap.
	 */
	struct node* map[numsSize];

	struct table table = {
		.size = numsSize,
		.map = map,
	};

	init_map(&table);

	*returnSize = 2;

	for (int i = 0; i < table.size; i++) {
		int delta = target - nums[i];
		int j;
		if ( (j = query_index_by_value(&table, delta, 1)) != -1) {
			int *x_y = (int *) malloc(*returnSize * sizeof(int));
			if (!x_y)
				printf("nomem");
			x_y[0] = i;
			x_y[1] = j;
			return x_y;
		}
		insert(&table, i, nums[i]);
	}

	free_table(&table);
	return NULL;
}
