import 'reflect-metadata';

const POSITIVE_METADATA_KEY = Symbol('POSITIVE_METADATA_KEY');

class UserService {
  public count = 3;

  // @Log
  getCount(): number {
    return this.count;
  }

  @Validate
  setCount(@Positive value: number) {
    this.count = value;
  }
}

const user = new UserService();
user.setCount(-15);
console.log(user.getCount());

function Positive(
  target: Object,
  propertyKey: string | symbol,
  parameterIndex: number
) {
  const existsParams: number[] = Reflect.getOwnMetadata(POSITIVE_METADATA_KEY, target, propertyKey) || [];
  existsParams.push(parameterIndex);
  Reflect.defineMetadata(POSITIVE_METADATA_KEY, existsParams, target, propertyKey);
}

function Validate(
  target: Object,
  propertyKey: string | symbol,
  descriptor: TypedPropertyDescriptor<(...args: any[]) => any>
) {
  const method = descriptor.value;
  descriptor.value = function(...args: any) {
    const positiveParams: number[] = Reflect.getOwnMetadata(POSITIVE_METADATA_KEY, target, propertyKey);
    if (positiveParams) {
      for (let index of positiveParams) {
        if (args[index] < 0) {
          args[index] = Math.abs(args[index]);
        }
      }
    }

    return method?.apply(this, args);
  }
}

// function Log(
//   target: Object,
//   propertyKey: string | symbol,
//   descriptor: TypedPropertyDescriptor<(...args: any[]) => any>
// ): any {
//   console.log(target)
//   console.log(propertyKey)
//   console.log(descriptor)
//
//   const method = descriptor.value;
//   descriptor.value = async (...args: any[]) => {
//     console.log('222')
//     try {
//       const res = await method?.apply(target, args);
//     } catch (e) {
//       console.log(1111);
//       throw e;
//     }
//   }
// }

class Flight<T> {
  constructor(private strings: T[]) {

  }

  fly(to: T) {}
}

const f = new Flight(['T', 'M']);

f.fly('H');


interface TypeP {
  ALERT: 'alert',
  PROMPT: 'prompt',
  CONFIRM: 'confirm',
}

function input(text: string, type: TypeP) {

}
