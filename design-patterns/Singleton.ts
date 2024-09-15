class Singleton {
  private static instance: Singleton;

  private constructor() {
    console.log("Singleton instance created");
  }

  public static getInstance(): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }

    return Singleton.instance;
  }

  public someBusinessLogic(): void {
    console.log("Executing some business logic...");
  }
}

const singleton1 = Singleton.getInstance(); // Singleton instance will be created
const singleton2 = Singleton.getInstance();

singleton1.someBusinessLogic();

console.log(singleton1 === singleton2); // true
