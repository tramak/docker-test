/**
 * Шаблон фасад (англ. Facade) — структурный шаблон проектирования,
 * позволяющий скрыть сложность системы путём сведения всех возможных внешних вызовов к одному объекту,
 * делегирующему их соответствующим объектам системы.
 */


/**
 * Реализации отдельных частей компьютера.
 * У каждого метода классов имеется какая-то реализация, в данном примере она опущена.
 */

/**
 * Class CPU, отвечает за работу процессора
 */
class CPU
{
  public freeze() {}
  public jump(position: number) {}
  public execute() {}
}

/**
 * Class Memory, отвечает за работу памяти
 */
class Memory
{
  BOOT_ADDRESS = 0x0005;
  public load(position: number, data: number) {}
}

/**
 * Class HardDrive, отвечает за работу жёсткого диска
 */
class HardDrive
{
  public BOOT_SECTOR = 0x001;
  public SECTOR_SIZE = 64;
  public read(lba: number, size: number): number {
    return size;
  }
}

/**
 * Пример шаблона "Фасад"
 * В качестве унифицированного объекта выступает Компьютер.
 * За этим объектом будут скрыты все детали работы его внутренних частей.
 */
class Computer
{
  protected cpu;
  protected memory;
  protected hardDrive;

  /**
   * Computer constructor.
   * Инициализируем части
   */
  public constructor()
  {
    this.cpu = new CPU();
    this.memory = new Memory();
    this.hardDrive = new HardDrive();
  }

  /**
   * Упрощённая обработка поведения "запуск компьютера"
   */
  public startComputer()
  {
    this.cpu.freeze();
    this.memory.load(
      this.memory.BOOT_ADDRESS,
      this.hardDrive.read(this.hardDrive.BOOT_SECTOR, this.hardDrive.SECTOR_SIZE)
    );
    this.cpu.jump(this.memory.BOOT_ADDRESS);
    this.cpu.execute();
}
}

/**
 * Пользователям компьютера предоставляется Фасад (компьютер),
 * который скрывает все сложность работы с отдельными компонентами.
 */
const computer = new Computer();
computer.startComputer();
