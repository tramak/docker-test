"use strict";
class Driver {
    constructor(engine) {
        this.engine = engine;
        // protected engine: Engine;
        this.history = new CommandHistory();
        // this.engine = engine;
    }
    run() {
        const onStartCommand = new OnStartCommand(this.engine, this.history);
        const onSwitchOffCommand = new OnSwitchOffCommand(this.engine, this.history);
        const setSpeedCommand = new SetSpeedCommand(200, this.engine, this.history);
        onStartCommand.execute();
        setSpeedCommand.execute();
        this.history.undo();
        onSwitchOffCommand.execute();
    }
}
class Engine {
    constructor() {
        this.speed = 0;
        this.state = false;
    }
    on() {
        this.state = true;
    }
    off() {
        this.state = false;
    }
    setSpeed(speed) {
        this.speed = speed;
    }
    getSpeed() {
        return this.speed;
    }
}
class CommandHistory {
    constructor() {
        this.commands = [];
    }
    push(command) {
        this.commands.push(command);
    }
    remove(command) {
        this.commands = this.commands.filter(item => item.commandId === command.commandId);
    }
    undo() {
        const command = this.commands.shift();
        if (command) {
            command.undo();
            this.remove(command);
        }
    }
}
class Command {
    constructor(history) {
        this.history = history;
        this.commandId = Math.random();
    }
}
class OnStartCommand extends Command {
    constructor(engine, history) {
        super(history);
        this.engine = engine;
        this.history = history;
    }
    execute() {
        this.engine.on();
        this.history.push(this);
    }
    undo() {
        this.engine.off();
        this.history.remove(this);
    }
}
class OnSwitchOffCommand extends Command {
    constructor(engine, history) {
        super(history);
        this.engine = engine;
        this.history = history;
    }
    execute() {
        this.engine.off();
        this.history.push(this);
    }
    undo() {
        this.engine.on();
        this.history.remove(this);
    }
}
class SetSpeedCommand extends Command {
    constructor(speed, engine, history) {
        super(history);
        this.engine = engine;
        this.history = history;
        this.speed = speed;
    }
    execute() {
        this.oldSpeed = this.engine.getSpeed();
        this.engine.setSpeed(this.speed);
        this.history.push(this);
    }
    undo() {
        if (this.oldSpeed) {
            this.engine.setSpeed(this.oldSpeed);
        }
        this.history.remove(this);
    }
}
const driver = new Driver(new Engine());
driver.run();
