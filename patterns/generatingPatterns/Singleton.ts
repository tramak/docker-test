class Singleton {
  private static instance: Singleton;

  public map: Map<number, string> = new Map();
  private constructor() {}

  public static get() {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }

    return Singleton.instance;
  }
}

const instance = Singleton.get();
