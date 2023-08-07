"use strict";
/**
 * Шаблон мост (англ. Bridge) — структурный шаблон проектирования,
 * используемый в проектировании программного обеспечения,
 * чтобы «разделять абстракцию и реализацию так, чтобы они могли изменяться независимо».
 * Шаблон мост использует инкапсуляцию, агрегирование и может использовать наследование для того,
 * чтобы разделить ответственность между классами.
 */
class Notif {
    // protected provider: IProvider;
    constructor(provider) {
        this.provider = provider;
    }
    send(message) { }
    ;
}
class TelegramProvider {
    connect() {
        console.log('connect Telegram');
    }
    disconnect() {
        console.log('disconnect Telegram');
    }
    sendMessage(message) {
        console.log(`Telegram: ${message}`);
    }
}
class WhatsUpProvider {
    connect() {
        console.log('connect WhatsUp');
    }
    disconnect() {
        console.log('disconnect WhatsUp');
    }
    sendMessage(message) {
        console.log(`WhatsUp: ${message}`);
    }
}
class NotificationSender extends Notif {
    constructor(provider) {
        super(provider);
        this.provider = provider;
    }
    send(message) {
        this.provider.connect();
        this.provider.sendMessage(`NotificationSender: ${message}`);
        this.provider.disconnect();
    }
}
class DelayNotificationSender extends Notif {
    constructor(provider) {
        super(provider);
        this.provider = provider;
    }
    send(message) {
        this.provider.connect();
        this.provider.sendMessage(`DelayNotificationSender: ${message}`);
        this.provider.disconnect();
    }
}
// Использование
const sender1 = new NotificationSender(new TelegramProvider());
sender1.send('test');
const sender2 = new DelayNotificationSender(new WhatsUpProvider());
sender2.send('test');
