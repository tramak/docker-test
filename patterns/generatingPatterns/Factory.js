"use strict";
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
class Product {
    getName() {
        return this.name;
    }
}
class ConcreteProductA extends Product {
    constructor() {
        super(...arguments);
        this.name = 'ProductA1';
    }
}
class ConcreteProductB extends Product {
    constructor() {
        super(...arguments);
        this.name = 'productB';
    }
}
class FactoryBase {
    constructor(name) { }
}
class ConcreteFactoryA extends FactoryBase {
    Create() {
        return new ConcreteProductA();
    }
}
class ConcreteFactoryB extends FactoryBase {
    Create() {
        return new ConcreteProductB();
    }
}
const productFactoryA = new ConcreteFactoryA('Фабрика 1 типа А');
const productA = productFactoryA.Create();
const productFactoryB = new ConcreteFactoryB('Фабрика 1 типа B');
const productB = productFactoryB.Create();
console.log(productA);
console.log(productB);
console.log('------------');
const creators = [new ConcreteFactoryA(), new ConcreteFactoryB()];
const products = creators.map(creator => creator.Create().getName());
console.log(products);
