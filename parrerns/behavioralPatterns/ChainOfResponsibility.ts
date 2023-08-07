/**
 * Chain-of-responsibility pattern
 * В объектно-ориентированном проектировании паттерн цепочки ответственности — это поведенческий паттерн проектирования,
 * состоящий из источника командных объектов и ряда обрабатывающих объектов .
 * Если объект может выполнить обработку запроса, то он его выролняет иначе передаёт следующему по цепочке
 */
abstract class Account {
  protected incomer: Account | undefined;
  protected balance: number = 0;
  protected name: string = '';

  protected constructor(balance: number) {
    this.balance = balance;
  }
  pay(price: number) {
    if (this.canPay(price)) {
      console.log(`Оплата прошла успешно с системы "${name}"`)
    } else if(this.incomer) {
      this.incomer.pay(price);
    } else {
      console.log('У вас нет денег');
    }
  }
  canPay(amount: number) {
    return amount <= this.balance;
  }
  setNext(incomer: Account) {
    this.incomer = incomer;
  }
}

class MasterCard extends Account {
  constructor(balance: number) {
    super(balance);
    this.name = 'Master Card';
  }
}

class PayPal extends Account {
  constructor(balance: number) {
    super(balance);
    this.name = 'PayPal';
  }
}

class Qiwi extends Account {
  constructor(balance: number) {
    super(balance);
    this.name = 'Qiwi';
  }
}

const master = new MasterCard(100);
const paypal = new PayPal(300);
const qiwi = new Qiwi(900)

master.setNext(paypal);
paypal.setNext(qiwi);

master.pay(400);
