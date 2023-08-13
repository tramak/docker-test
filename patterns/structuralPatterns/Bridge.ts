/**
 * Шаблон мост (англ. Bridge) — структурный шаблон проектирования,
 * используемый в проектировании программного обеспечения,
 * чтобы «разделять абстракцию и реализацию так, чтобы они могли изменяться независимо».
 * Шаблон мост использует инкапсуляцию, агрегирование и может использовать наследование для того,
 * чтобы разделить ответственность между классами.
 */

interface IProvider {
  connect(): void;
  disconnect(): void;
  sendMessage(message: string): void;
}

abstract class Notif {
  // protected provider: IProvider;
  protected constructor(protected provider: IProvider) {}
  send(message: string): void {};
}

class TelegramProvider implements IProvider {
  connect() {
    console.log('connect Telegram');
  }
  disconnect() {
    console.log('disconnect Telegram');
  }
  sendMessage(message: string) {
    console.log(`Telegram: ${message}`);
  }
}

class WhatsUpProvider implements IProvider {
  connect() {
    console.log('connect WhatsUp');
  }
  disconnect() {
    console.log('disconnect WhatsUp');
  }
  sendMessage(message: string) {
    console.log(`WhatsUp: ${message}`);
  }
}

class NotificationSender extends Notif {
  public constructor(protected provider: IProvider) {
    super(provider);
  }
  send(message: string) {
    this.provider.connect();
    this.provider.sendMessage(`NotificationSender: ${message}`);
    this.provider.disconnect();
  }
}

class DelayNotificationSender extends Notif {
  constructor(protected provider: IProvider) {
    super(provider);
  }
  send(message: string) {
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
