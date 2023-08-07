/**
 * Proxy — это структурный паттерн проектирования, предоставляющий объект,
 * который, в свою очередь, контролирует доступ к другому объекту путем перехвата всех вызовов.
 * Также можно сказать, что шаблон "Заместитель" выполняет функцию контейнера.
 *
 * https://otus.ru/nest/post/2441/
 */

interface IDoor {
  open(): void;
  close(): void;
}

class LabDoor implements IDoor {
  public open() {
    console.log('Opening lab door')
  }

  public close() {
    console.log('Closing the lab door')
  }
}

class SecurityDoorProxy {
  protected door: IDoor;

  constructor(door: IDoor) {
    this.door = door;
  }

  protected authenticate(password: string) {
    return password === '$yes';
  }

  public open(password: string) {
    if (this.authenticate(password)) {
      this.door.open();
    } else {
      console.log('not access');
    }
  }

  public close() {
    this.door.close();
  }
}


const door = new SecurityDoorProxy(new LabDoor());
door.open('invalid');
door.open('$yes');
door.close();
