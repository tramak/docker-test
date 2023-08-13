"use strict";
class DocumentItem {
    constructor() {
        this.setState(new DraftState());
    }
    getState() {
        return this.state;
    }
    setState(state) {
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
class State {
    constructor() {
        this.name = '';
    }
    setContext(context) {
        this.context = context;
    }
}
class DraftState extends State {
    constructor() {
        super();
        this.name = 'Draft';
    }
    publish() {
        this.context.setState(new PublishState());
    }
    delete() {
        console.log('Удаляем');
    }
}
class PublishState extends State {
    constructor() {
        super();
        this.name = 'Publish';
    }
    publish() {
        console.log('Документ уже опубликован');
    }
    delete() {
        this.context.setState(new DraftState());
    }
}
const item = new DocumentItem();
item.text = 'test';
console.log(item.getState());
item.publishDoc();
item.publishDoc();
console.log(item.getState());
item.deleteDoc();
console.log(item.getState());
