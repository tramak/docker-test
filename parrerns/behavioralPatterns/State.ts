class DocumentItem {
  public text: string | undefined;
  private state!: State;

  constructor() {
    this.setState(new DraftState());
  }

  getState() {
    return this.state;
  }

  setState(state: State) {
    this.state = state;
    this.state.setContext(this);
  }

  publishDoc() {
    this.state.publish();
  }

  deleteDoc() {
    this.state.delete();
  }
}

abstract class State {
  public name: string = '';
  protected context!: DocumentItem;

  public setContext(context: DocumentItem) {
    this.context = context;
  }

  public abstract publish(): void;
  public abstract delete(): void;
}

class DraftState extends State {
  constructor() {
    super();
    this.name = 'Draft';
  }

  public publish() {
    this.context.setState(new PublishState());
  }

  public delete() {
    console.log('Удаляем')
  }
}

class PublishState extends State {
  constructor() {
    super();
    this.name = 'Publish';
  }

  public publish() {
    console.log('Документ уже опубликован');
  }

  public delete() {
    this.context.setState(new DraftState());
  }
}

const item = new DocumentItem();
item.text = 'test';
console.log(item.getState())
item.publishDoc();
item.publishDoc();
console.log(item.getState())
item.deleteDoc();
console.log(item.getState())
