"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const POSITIVE_METADATA_KEY = Symbol('POSITIVE_METADATA_KEY');
class UserService {
    constructor() {
        this.count = 3;
    }
    // @Log
    getCount() {
        return this.count;
    }
    setCount(value) {
        this.count = value;
    }
}
__decorate([
    Validate,
    __param(0, Positive),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserService.prototype, "setCount", null);
const user = new UserService();
user.setCount(-15);
console.log(user.getCount());
function Positive(target, propertyKey, parameterIndex) {
    const existsParams = Reflect.getOwnMetadata(POSITIVE_METADATA_KEY, target, propertyKey) || [];
    existsParams.push(parameterIndex);
    Reflect.defineMetadata(POSITIVE_METADATA_KEY, existsParams, target, propertyKey);
}
function Validate(target, propertyKey, descriptor) {
    const method = descriptor.value;
    descriptor.value = function (...args) {
        const positiveParams = Reflect.getOwnMetadata(POSITIVE_METADATA_KEY, target, propertyKey);
        if (positiveParams) {
            for (let index of positiveParams) {
                if (args[index] < 0) {
                    args[index] = Math.abs(args[index]);
                }
            }
        }
        return method === null || method === void 0 ? void 0 : method.apply(this, args);
    };
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
class Flight {
    constructor(strings) {
        this.strings = strings;
    }
    fly(to) { }
}
const f = new Flight(['T', 'M']);
f.fly('H');
function input(text, type) {
}
