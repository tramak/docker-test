/**
 * Фабричный метод (англ. Factory Method), или виртуальный конструктор (англ. Virtual Constructor)
 * — порождающий шаблон проектирования,
 * предоставляющий подклассам (дочерним классам, субклассам) интерфейс для создания экземпляров некоторого класса.
 *
 * В момент создания наследники могут определить, какой класс создавать.
 * Иными словами, данный шаблон делегирует создание объектов наследникам родительского класса.
 *
 * Это позволяет использовать в коде программы не конкретные классы,
 * а манипулировать абстрактными объектами на более высоком уровне.
 */
abstract class Product
{
  protected abstract name: string;
  public getName() {
    return this.name;
  }
}

class ConcreteProductA extends Product
{
  protected name = 'ProductA1';
}

class ConcreteProductB extends Product
{
  protected name = 'productB'
}

abstract class FactoryBase {
  constructor(name?: string) {}

  public abstract Create(): Product;
}


class ConcreteFactoryA extends FactoryBase
{
  public override Create() {
    return new ConcreteProductA();
  }
}

class ConcreteFactoryB extends FactoryBase
{
  public override Create() {
    return new ConcreteProductB();
  }
}

const productFactoryA = new ConcreteFactoryA('Фабрика 1 типа А');
const productA = productFactoryA.Create();

const productFactoryB = new ConcreteFactoryB('Фабрика 1 типа B');
const productB = productFactoryB.Create();


console.log(productA);
console.log(productB);
console.log('------------')

const creators = [new ConcreteFactoryA(), new ConcreteFactoryB()];
const products = creators.map(creator => creator.Create().getName());
console.log(products);
