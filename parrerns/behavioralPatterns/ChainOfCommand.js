"use strict";
class AbstractMiddleware {
    next(mid) {
        this.nextMiddleware = mid;
        return this.nextMiddleware;
    }
    handle(request) {
        if (this.nextMiddleware) {
            return this.nextMiddleware.handle(request);
        }
        return;
    }
}
class AuthMiddleware extends AbstractMiddleware {
    handle(request) {
        if (request.userId === 1) {
            return super.handle(request);
        }
        return {
            error: 'Вы не оавторизованны'
        };
    }
}
class ValidateMiddleware extends AbstractMiddleware {
    handle(request) {
        if (request.body) {
            return super.handle(request);
        }
        return {
            error: 'нет body',
        };
    }
}
class Controller extends AbstractMiddleware {
    handle(request) {
        return {
            success: request,
        };
    }
}
const controller = new Controller();
const validate = new ValidateMiddleware();
const auth = new AuthMiddleware();
console.log(validate.next(auth).next(controller).handle({
    userId: 1,
    body: 'test22'
}));
// console.log(validate.handle({
//   userId: 1,
//   body: 'test'
// }));
