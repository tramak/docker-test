/**
 * Компоновщик (англ. Composite pattern) — структурный шаблон проектирования,
 * объединяющий объекты в древовидную структуру для представления иерархии от частного к целому.
 * Компоновщик позволяет клиентам обращаться к отдельным объектам и к группам объектов одинаково.
 */
abstract class DeliveryItem {
  items: DeliveryItem[] = [];
  addItem(item: DeliveryItem) {
    this.items.push(item);
  }

  getItemPrices() {
    return this.items.reduce((sum: number, item: DeliveryItem) => sum + item.getPrice(), 0)
  }

  abstract getPrice(): number;
}

export class DeliveryShop extends DeliveryItem {
  constructor(private deliveryFee: number) {
    super();
  }

  getPrice(): number {
    return this.getItemPrices() + this.deliveryFee;
  }
}

export class Package extends DeliveryItem {
  getPrice(): number {
    return this.getItemPrices();
  }
}

export class Product extends DeliveryItem {
  constructor(private price: number) {
    super();
  }
  getPrice(): number {
    return this.price;
  }
}

const shop = new DeliveryShop(100);
shop.addItem(new Product(1000))
const pack1 = new Package();
shop.addItem(pack1);
pack1.addItem(new Product(200))
pack1.addItem(new Product(300))

console.log(shop.getPrice());
