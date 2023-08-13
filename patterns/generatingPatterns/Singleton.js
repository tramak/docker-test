"use strict";
class Singleton {
    constructor() {
        this.map = new Map();
    }
    static get() {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
        }
        return Singleton.instance;
    }
}
const instance = Singleton.get();
