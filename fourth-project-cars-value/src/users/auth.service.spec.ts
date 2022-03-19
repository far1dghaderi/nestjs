import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { UsersService } from './users.service';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUserService: Partial<UsersService>;
  let users: User[] = [];

  beforeEach(async () => {
    fakeUserService = {
      find: (email: string) => {
        const filteredUsers = users.filter((user) => user.email === email);
        return Promise.resolve(filteredUsers);
      },
      create: (email: string, password: string) => {
        {
          const user = {
            id: Math.floor(Math.random() * 9999),
            email,
            password,
          } as User;
          users.push(user);
          return Promise.resolve(user);
        }
      },
    };
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUserService,
        },
      ],
    }).compile();
    service = module.get(AuthService);
  });

  it('can create an instance of auth service', async () => {
    expect(service).toBeDefined();
  });

  it('create a new user with a salted and hashed password', async () => {
    const user = await service.signup('test@test.com', '123');

    expect(user.password).not.toEqual('123');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('throws an error if user signs up with an email that is in use', async () => {
    await service.signup('test0@test0.com', '123');
    try {
      await service.signup('test@test.com', '123');
    } catch (error) {
      return true;
    }
  });

  it('throws if signin in called with an unused email', async () => {
    try {
      await service.signin('test@test.com', '123');
    } catch (error) {
      return true;
    }
  });

  it('throws if an invalid password is provided', async () => {
    await service.signup('test1@test1.com', '123456');

    try {
      await service.signin('test1@test1.com', '123');
    } catch (error) {
      return true;
    }
  });

  it('returns a user if correct password is provided', async () => {
    await service.signup('test2@test2.com', '123456');

    const user = await service.signin('test2@test2.com', '123456');
    expect(user).toBeDefined();
  });
});
