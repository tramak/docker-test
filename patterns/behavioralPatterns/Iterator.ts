interface IterateValue<T> {
  value?: T;
  done: boolean;
}
type IterateFunc<T = any, G = any> = (data: T) => () => IterateValue<G>;

class MyIterator<T = any, G = any> {
  protected iterate: () => IterateValue<G>;
  protected currentState: IterateValue<G> | undefined;
  protected done = false;

  constructor(private data: T, protected iterateFunc: IterateFunc<T, G>) {
    this.iterate = this.iterateFunc(data);
  }

  next(): boolean {
    if (this.done) {
      return false;
    }

    this.currentState = this.iterate();
    this.done = this.currentState.done;
    return !this.done;
  }

  current(): G | undefined {
    return this.currentState?.value;
  }
}

// ----------
class Task {
  constructor(public value: string, public priority: number) {}
}

class Tasks {
  private tasks: Task[] = [];

  public addTask(task: Task) {
    this.tasks.push(task);
  }

  public getTasks() {
    return this.tasks;
  }
}

const tasks = new Tasks();
tasks.addTask(new Task('blue', 3));
tasks.addTask(new Task('white', 10));
tasks.addTask(new Task('green', 5));
tasks.addTask(new Task('red', 8));

const tasksIterate = new MyIterator(tasks, (data: Tasks) => {
  const tasks = data.getTasks().sort((a, b) => {
    return a.priority === b.priority
      ? 0
      : a.priority > b.priority ? 1: -1;
  });
  let currentIndex: number = -1;
  const lastIndex = tasks.length - 1;

  return () => {
    if (currentIndex < lastIndex) {
      currentIndex++;
      return {
        value: tasks[currentIndex] as Task,
        done: false,
      }
    }

    return {
      done: true,
    }
  }
});


while (tasksIterate.next()) {
  const current = tasksIterate.current();
  console.log(current?.value);
}

//-------------------
console.log('--------')
const obj = {
  to: 3,
  from: 10,
}

const objIterator = new MyIterator(obj, (me) => {
  let current = me.to;
  const from = me.from;

  return () => {
    if (current <= from) {
      return {
        value: current++,
        done: false,
      }
    }

    return {
      done: true
    }
  }
});

while (objIterator.next()) {
  const current = objIterator.current();
  console.log(current);
}

// ----------
console.log('--------')
const infinityIterator = new MyIterator(2, (me) => {
  let current = me;
  return () => ({
    value: current++,
    done: false,
  })
});

infinityIterator.next();
console.log(infinityIterator.current());
infinityIterator.next();
console.log(infinityIterator.current());
infinityIterator.next();
console.log(infinityIterator.current());
