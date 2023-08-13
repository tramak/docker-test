class Driver {
  // protected engine: Engine;
  protected history: CommandHistory = new CommandHistory();

  constructor(protected engine: Engine) {
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
  protected state;
  protected speed: number = 0;
  constructor() {
    this.state = false;
  }
  on() {
    this.state = true;
  }
  off() {
    this.state = false;
  }
  setSpeed(speed: number) {
    this.speed = speed
  }
  getSpeed() {
    return this.speed;
  }
}

class CommandHistory {
  public commands: Command[] = [];
  public push(command: Command) {
    this.commands.push(command);
  }
  public remove(command: Command) {
    this.commands = this.commands.filter(item => item.commandId === command.commandId);
  }
  public undo() {
    const command = this.commands.shift();
    if (command) {
      command.undo();
      this.remove(command);
    }
  }
}

abstract class Command {
  public commandId: number;
  abstract execute(): void;
  abstract undo(): void;

  protected constructor(protected history: CommandHistory) {
    this.commandId = Math.random();
  }
}

class OnStartCommand extends Command {
  constructor(protected engine: Engine, protected history: CommandHistory) {
    super(history);
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
  constructor(protected engine: Engine, protected history: CommandHistory) {
    super(history);
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
  protected oldSpeed: number | undefined;
  protected speed: number;
  constructor(speed: number, protected engine: Engine, protected history: CommandHistory) {
    super(history);
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
