export class SerializedMap<Key extends object, Value> implements Iterable<[Key, Value]>{
    private map: Map<string, Value>

    constructor(entries?: SerializedMap<Key, Value>) {
        this.map = new Map<string, Value>()

        if (entries) {
            for (const [ key, value ] of entries) {
                this.map.set(this.serializeKey(key), value)
            }
        }
    }

    *[Symbol.iterator](): Iterator<[Key, Value]> {
        for (const [ serializedKey, value ] of this.map.entries()) {
            yield [JSON.parse(serializedKey) as Key, value]
        }
    }

    private serializeKey(key: Key): string {
        return JSON.stringify(key)
    }

    delete(key: Key): boolean {
        return this.map.delete(this.serializeKey(key));
    }

    get(key: Key): Value | undefined {
        return this.map.get(this.serializeKey(key));
    }

    has(key: Key): boolean {
        return this.map.has(this.serializeKey(key));
    }

    set(key: Key, value: Value): this {
        this.map.set(this.serializeKey(key), value);

        return this
    }
}