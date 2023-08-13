/**
 * Адаптер (англ. Adapter) — структурный шаблон проектирования,
 * предназначенный для организации использования функций объекта,
 * недоступного для модификации, через специально созданный интерфейс.
 *
 * Другими словами — это структурный паттерн проектирования,
 * который позволяет объектам с несовместимыми интерфейсами работать вместе.
 */

class IndependentDeveloper1
{
  public calc(a: number, b: number) {
    return a + b;
  }
}

class IndependentDeveloper2
{
  public nameIsVeryLongAndUncomfortable(a: number, b: number) {
    return a + b;
  }
}

interface IAdapter
{
  sum(a: number, b: number): number;
}

class ConcreteAdapter1 implements IAdapter
{
  protected object;

  constructor() {
    this.object = new IndependentDeveloper1();
  }
  public sum(a: number, b: number) {
    return this.object.calc(a, b);
  }
}

class ConcreteAdapter2 implements IAdapter
{
  protected object;

  constructor() {
    this.object = new IndependentDeveloper2();
  }
  public sum(a: number, b: number) {
    return this.object.nameIsVeryLongAndUncomfortable(a, b);
  }
}
//в одном месте мы создаем конкретный адаптер а потом пользуемся интерфейсом
const adapter1 = new ConcreteAdapter1();
const adapter2 = new ConcreteAdapter2();

/**
 * Везде в коде мы не используем классы напрямую а через интерфейс
 * этой функции нет разницы какой класс мы используем, так как мы опираемся на интерфейс
 *
 * @param IAdapter $adapter
 */
function sum(adapter: IAdapter) {
  console.log(adapter.sum(2, 2));
}

sum(adapter1);
sum(adapter2);
