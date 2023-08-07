"use strict";
class MyIterator {
    constructor(data, iterateFunc) {
        this.data = data;
        this.iterateFunc = iterateFunc;
        this.done = false;
        this.iterate = this.iterateFunc(data);
    }
    next() {
        if (this.done) {
            return false;
        }
        this.currentState = this.iterate();
        this.done = this.currentState.done;
        return !this.done;
    }
    current() {
        var _a;
        return (_a = this.currentState) === null || _a === void 0 ? void 0 : _a.value;
    }
}
// ----------
class Task {
    constructor(value, priority) {
        this.value = value;
        this.priority = priority;
    }
}
class Tasks {
    constructor() {
        this.tasks = [];
    }
    addTask(task) {
        this.tasks.push(task);
    }
    getTasks() {
        return this.tasks;
    }
}
const tasks = new Tasks();
tasks.addTask(new Task('blue', 3));
tasks.addTask(new Task('white', 10));
tasks.addTask(new Task('green', 5));
tasks.addTask(new Task('red', 8));
const tasksIterate = new MyIterator(tasks, (data) => {
    const tasks = data.getTasks().sort((a, b) => {
        return a.priority === b.priority
            ? 0
            : a.priority > b.priority ? 1 : -1;
    });
    let currentIndex = -1;
    const lastIndex = tasks.length - 1;
    return () => {
        if (currentIndex < lastIndex) {
            currentIndex++;
            return {
                value: tasks[currentIndex],
                done: false,
            };
        }
        return {
            done: true,
        };
    };
});
while (tasksIterate.next()) {
    const current = tasksIterate.current();
    console.log(current === null || current === void 0 ? void 0 : current.value);
}
//-------------------
console.log('--------');
const obj = {
    to: 3,
    from: 10,
};
const objIterator = new MyIterator(obj, (me) => {
    let current = me.to;
    const from = me.from;
    return () => {
        if (current <= from) {
            return {
                value: current++,
                done: false,
            };
        }
        return {
            done: true
        };
    };
});
while (objIterator.next()) {
    const current = objIterator.current();
    console.log(current);
}
// ----------
console.log('--------');
const infinityIterator = new MyIterator(2, (me) => {
    let current = me;
    return () => ({
        value: current++,
        done: false,
    });
});
infinityIterator.next();
console.log(infinityIterator.current());
infinityIterator.next();
console.log(infinityIterator.current());
infinityIterator.next();
console.log(infinityIterator.current());
