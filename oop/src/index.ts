class Store<T> {
  private items: T[] = [];

  public addItem(item: T): void {
    this.items.push(item);
  }

  public getItem(index: number): T | undefined {
    return this.items[index];
  }

  public removeItem(index: number): void {
    if (index >= 0 && index < this.items.length) {
      this.items.splice(index, 1);
    }
  }

  public getAllItems(): T[] {
    return this.items;
  }
}

const numberStorage = new Store<number>();
numberStorage.addItem(1);
numberStorage.addItem(2);
console.log(numberStorage.getAllItems()); // [1, 2]
console.log(numberStorage.getItem(0)); // 1
numberStorage.removeItem(0);
console.log(numberStorage.getAllItems()); // [2]

// Example with strings:
const stringStorage = new Store<string>();
stringStorage.addItem("Hello");
stringStorage.addItem("World");
console.log(stringStorage.getAllItems()); // ['Hello', 'World']
console.log(stringStorage.getItem(1)); // 'World'
stringStorage.removeItem(1);
console.log(stringStorage.getAllItems()); // ['Hello']
