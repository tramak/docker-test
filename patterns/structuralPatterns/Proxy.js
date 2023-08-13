"use strict";
/**
 * Proxy — это структурный паттерн проектирования, предоставляющий объект,
 * который, в свою очередь, контролирует доступ к другому объекту путем перехвата всех вызовов.
 * Также можно сказать, что шаблон "Заместитель" выполняет функцию контейнера.
 *
 * https://otus.ru/nest/post/2441/
 */
class LabDoor {
    open() {
        console.log('Opening lab door');
    }
    close() {
        console.log('Closing the lab door');
    }
}
class SecurityDoorProxy {
    constructor(door) {
        this.door = door;
    }
    authenticate(password) {
        return password === '$yes';
    }
    open(password) {
        if (this.authenticate(password)) {
            this.door.open();
        }
        else {
            console.log('not access');
        }
    }
    close() {
        this.door.close();
    }
}
const door = new SecurityDoorProxy(new LabDoor());
door.open('invalid');
door.open('$yes');
door.close();
