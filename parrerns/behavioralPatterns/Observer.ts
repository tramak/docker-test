/**
 * Наблюдатель (англ. Observer) — поведенческий шаблон проектирования.
 * Также известен как «подчинённые» (англ. Dependents).
 * Реализует у класса механизм,
 * который позволяет объекту этого класса получать оповещения об изменении состояния других объектов и тем самым наблюдать за ними[2].
 *
 * Классы, на события которых другие классы подписываются, называются субъектами (Subjects),
 * а подписывающиеся классы называются наблюдателями (англ. Observers)[3].
 */
interface Observer {
  update(subject: Subject): void;
}

interface Subject {
  attach(observer: Observer): void;
  detach(observer: Observer): void;
  notify(): void;
}

class Lead {
  constructor(public name: string, public phone: string) {}
}

class NewLead implements Subject {
  private observers: Observer[] = [];
  public state: Lead | undefined;

  attach(observer: Observer) {
    if (this.observers.includes(observer)) {
      return;
    }

    this.observers.push(observer);
  }

  detach(observer: Observer) {
    this.observers = this.observers.filter(item => item === observer);
  }

  notify(): void {
    for(const observer of this.observers) {
      observer.update(this);
    }
  }
}

class NotificationService implements Observer {
  update(subject: Subject) {
    console.log(`NotificationService: ${subject}`);
  }
}


class LeadService implements Observer {
  update(subject: Subject) {
    console.log(`LeadService: ${subject}`);
  }
}

const subject = new NewLead();
subject.state = new Lead('Anton', '8916 666 23 44');

const s1 = new NotificationService();
const s2 = new LeadService();

subject.attach(s1);
subject.attach(s2);
subject.notify();

subject.detach(s1);
subject.notify();
