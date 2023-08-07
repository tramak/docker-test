/**
 * Шаблонный метод (англ. Template method) — поведенческий шаблон проектирования,
 * определяющий основу алгоритма и позволяющий наследникам переопределять некоторые шаги алгоритма,
 * не изменяя его структуру в целом.
 */

class Form {
  constructor(public name: string) {}
}

abstract class SaveForm<T> {
  public save(form: Form) {
    const res = this.fill(form);
    this.log(res);
    this.send(res);
  }

  protected log(res: T): void {
    console.log(res);
  }

  protected abstract fill(form: Form): T;
  protected abstract send(res: T): void;
}

class FirstApi extends SaveForm<string> {
  protected fill(form: Form): string {
    return form.name;
  }
  protected send(res: string) {
    this.log(`Отправляю ${res}`);
  }
}

class SecondApi extends SaveForm<{ fio: string }> {
  protected fill(form: Form): { fio: string } {
    return { fio: form.name };
  }
  protected send(res: { fio: string }) {
    this.log(res);
  }
}

const form1 = new FirstApi();
form1.save(new Form('Ира'));

const form2 = new SecondApi();
form2.save(new Form('Даша'));
