var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var AbstractMiddleware = /** @class */ (function () {
    function AbstractMiddleware() {
    }
    AbstractMiddleware.prototype.next = function (mid) {
        // this.nextMiddleware = mid;
        mid.nextMiddleware = this;
        return mid;
    };
    AbstractMiddleware.prototype.handle = function (request) {
        if (this.nextMiddleware) {
            return this.nextMiddleware.handle(request);
        }
        return;
    };
    return AbstractMiddleware;
}());
var AuthMiddleware = /** @class */ (function (_super) {
    __extends(AuthMiddleware, _super);
    function AuthMiddleware() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AuthMiddleware.prototype.handle = function (request) {
        console.log('AuthMiddleware');
        if (request.userId === 1) {
            return _super.prototype.handle.call(this, request);
        }
        return {
            error: 'Вы не авторизованны'
        };
    };
    return AuthMiddleware;
}(AbstractMiddleware));
var ValidateMiddleware = /** @class */ (function (_super) {
    __extends(ValidateMiddleware, _super);
    function ValidateMiddleware() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ValidateMiddleware.prototype.handle = function (request) {
        console.log('ValidateMiddleware');
        if (request.body) {
            return _super.prototype.handle.call(this, request);
        }
        return {
            error: 'нет body',
        };
    };
    return ValidateMiddleware;
}(AbstractMiddleware));
var Controller = /** @class */ (function (_super) {
    __extends(Controller, _super);
    function Controller() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Controller.prototype.handle = function (request) {
        console.log('Controller');
        return {
            success: request,
        };
    };
    return Controller;
}(AbstractMiddleware));
var controller = new Controller();
var validate = new ValidateMiddleware();
var auth = new AuthMiddleware();
console.log(controller.next(auth).next(validate).handle({
    userId: 1,
    body: 'test22'
}));
// console.log(validate.handle({
//   userId: 1,
//   body: 'test'
// }));
