"use strict";
/**
 * Посредник (англ. Mediator) — поведенческий шаблон проектирования,
 * обеспечивающий взаимодействие множества объектов,
 * формируя при этом слабое зацепление и избавляя объекты от необходимости явно ссылаться друг на друга.
 */
/**
 * ОПИСАНИЕ
 * "Посредник" определяет интерфейс для обмена информацией с объектами "Коллеги", "Конкретный посредник"
 * координирует действия объектов "Коллеги".
 * Каждый класс "Коллеги" знает о своем объекте "Посредник",
 * все "Коллеги" обмениваются информацией только с посредником,
 * при его отсутствии им пришлось бы обмениваться информацией напрямую.
 * "Коллеги" посылают запросы посреднику и получают запросы от него.
 * "Посредник" реализует кооперативное поведение, пересылая каждый запрос одному или нескольким "Коллегам".
 */
class Colleague {
    constructor(mediator) {
        this.mediator = mediator;
    }
    send(message) {
        this.mediator.send(message, this);
    }
}
class ConcreteColleague1 extends Colleague {
    constructor(mediator) {
        super(mediator);
    }
    notify(message) {
        console.log("Colleague1 gets message: " + message);
    }
}
class ConcreteColleague2 extends Colleague {
    constructor(mediator) {
        super(mediator);
    }
    notify(message) {
        console.log("Colleague2 gets message: " + message);
    }
}
class ConcreteMediator {
    setColleague1(colleague) {
        this.colleague1 = colleague;
    }
    setColleague2(colleague) {
        this.colleague2 = colleague;
    }
    send(message, sender) {
        if (this.colleague1) {
            this.colleague1.notify(message);
        }
        if (this.colleague2) {
            this.colleague2.notify(message);
        }
    }
}
// ---------------
const m = new ConcreteMediator();
const c1 = new ConcreteColleague1(m);
const c2 = new ConcreteColleague2(m);
m.setColleague1(c1);
m.setColleague2(c2);
c1.send("How are you?");
c2.send("Fine, thanks");
