"use strict";
class User {
}
class Auth {
    constructor(strategy) {
        this.strategy = strategy;
    }
    setStrategy(strategy) {
        this.strategy = strategy;
    }
    authUser(user) {
        return this.strategy.auth(user);
    }
}
class JWTStrategy {
    auth(user) {
        if (user.jwtToken) {
            return true;
        }
        return false;
    }
}
class GithubStrategy {
    auth(user) {
        if (user.githubToken) {
            return true;
        }
        return false;
    }
}
// -----------
const user = new User();
user.jwtToken = 'token';
const authStrategy = new Auth(new JWTStrategy());
console.log(authStrategy.authUser(user));
authStrategy.setStrategy(new GithubStrategy());
console.log(authStrategy.authUser(user));
