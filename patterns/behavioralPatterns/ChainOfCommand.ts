/**
 * Цепочка вызовов
 */
interface IMiddleware {
  nextMiddleware: IMiddleware | undefined;
  next(item: IMiddleware): IMiddleware;
  handle(request: any): any;
}

abstract class AbstractMiddleware implements IMiddleware {
  public nextMiddleware: IMiddleware | undefined;
  next(mid: IMiddleware): IMiddleware {
    mid.nextMiddleware = this;
    return mid;
  }
  handle(request: any) {
    if (this.nextMiddleware) {
      return this.nextMiddleware.handle(request);
    }

    return;
  }
}

class AuthMiddleware extends AbstractMiddleware {
  override handle(request: any): any {
    console.log('AuthMiddleware');
    if (request.userId === 1) {
      return super.handle(request);
    }

    return {
      error: 'Вы не авторизованны'
    }
  }
}

class ValidateMiddleware extends AbstractMiddleware {
  override handle(request: any): any {
    console.log('ValidateMiddleware');
    if (request.body) {
      return super.handle(request);
    }

    return {
      error: 'нет body',
    }
  }
}

class Controller extends AbstractMiddleware {
  override handle(request: any): any {
    console.log('Controller');
    return {
      success: request,
    }
  }
}


const controller = new Controller();
const validate = new ValidateMiddleware()
const auth = new AuthMiddleware();

console.log(
  controller.next(auth).next(validate).handle({
    userId: 1,
    body: 'test22'
  })
);

// console.log(validate.handle({
//   userId: 1,
//   body: 'test'
// }));
