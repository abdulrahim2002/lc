class RandomizedCollection {
    private array: number[] = [];
    private imap = new Map< number,Set<number> >();

    insert(val: number): boolean {
        const isFirst = !this.imap.has(val);

        if ( isFirst ) this.imap.set( val, new Set() );
        this.imap.get( val )!.add( this.array.length );
        this.array.push( val );

        return isFirst;
    }

    remove(val: number): boolean {
        if ( !this.imap.has(val) ) return false;

        const removeIndex = this.imap.get(val)!.values().next().value;
        this.imap.get(val)!.delete(removeIndex);;

        if ( this.imap.get(val)!.size === 0 )
            this.imap.delete(val);

        const   lastIndex = this.array.length-1,
                lastElem  = this.array[lastIndex];

        if ( lastIndex !== removeIndex ) {
            this.array[removeIndex] = lastElem;

            this.imap.get(lastElem)!.delete( lastIndex );
            this.imap.get(lastElem)!.add( removeIndex );
        }

        this.array.pop();

        return true;
    }

    getRandom(): number {
        const rand_idx=Math.floor(Math.random()*this.array.length);
        return this.array[rand_idx];
    }
}
