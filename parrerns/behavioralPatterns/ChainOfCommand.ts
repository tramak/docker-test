/**
 * Цепочка вызовов
 */
interface IMiddleware {
  next(item: IMiddleware): IMiddleware;
  handle(request: any): any;
}

abstract class AbstractMiddleware implements IMiddleware {
  private nextMiddleware: IMiddleware | undefined;
  next(mid: IMiddleware): IMiddleware {
    this.nextMiddleware = mid;
    return this.nextMiddleware;
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
    if (request.userId === 1) {
      return super.handle(request);
    }

    return {
      error: 'Вы не оавторизованны'
    }
  }
}

class ValidateMiddleware extends AbstractMiddleware {
  override handle(request: any): any {
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
    return {
      success: request,
    }
  }
}


const controller = new Controller();
const validate = new ValidateMiddleware()
const auth = new AuthMiddleware();

console.log(
  validate.next(auth).next(controller).handle({
    userId: 1,
    body: 'test22'
  })
);

// console.log(validate.handle({
//   userId: 1,
//   body: 'test'
// }));
