class User {
  githubToken: string | undefined;
  jwtToken: string | undefined;
}

interface AuthStrategy {
  auth(user: User): boolean;
}

class Auth {
  constructor(private strategy: AuthStrategy) {}

  public setStrategy(strategy: AuthStrategy) {
    this.strategy = strategy;
  }

  public authUser(user: User): boolean {
    return this.strategy.auth(user);
  }
}

class JWTStrategy implements AuthStrategy {
  auth(user: User): boolean {
    if (user.jwtToken) {
      return true;
    }
    return false;
  }
}

class GithubStrategy implements AuthStrategy {
  auth(user: User): boolean {
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
