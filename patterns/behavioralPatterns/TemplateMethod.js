"use strict";
/**
 * Шаблонный метод (англ. Template method) — поведенческий шаблон проектирования,
 * определяющий основу алгоритма и позволяющий наследникам переопределять некоторые шаги алгоритма,
 * не изменяя его структуру в целом.
 */
class Form {
    constructor(name) {
        this.name = name;
    }
}
class SaveForm {
    save(form) {
        const res = this.fill(form);
        this.log(res);
        this.send(res);
    }
    log(res) {
        console.log(res);
    }
}
class FirstApi extends SaveForm {
    fill(form) {
        return form.name;
    }
    send(res) {
        this.log(`Отправляю ${res}`);
    }
}
class SecondApi extends SaveForm {
    fill(form) {
        return { fio: form.name };
    }
    send(res) {
        this.log(res);
    }
}
const form1 = new FirstApi();
form1.save(new Form('Ира'));
const form2 = new SecondApi();
form2.save(new Form('Даша'));
