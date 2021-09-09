import { singIn, signUp } from '../../src/controllers/user.controller';
import { getMockReq, getMockRes } from '@jest-mock/express';
import UserService from '../../src/core/service/user/index';
import ElementNotFoundError from '../../src/errors/elementNotFoundError';

describe('POST - SingUp', () => {
  test('Test create user successfully', async () => {
    UserService.createUser = jest.fn().mockReturnValue(true);
    const req = getMockReq({
      body: { email: 'some@email.com' }
    });
    const { res } = getMockRes();

    await signUp(req, res).then(
      (r) => {
        expect(r.json).toHaveBeenCalledWith(
          expect.objectContaining({
            msg: 'User created successfully.',
          }),
        );
      }
    );
  });

  test('Test create user fails trying to save user', async () => {
    UserService.createUser = jest.fn().mockReturnValue(false);
    const req = getMockReq({
      body: { email: 'some@email.com' }
    });
    const { res } = getMockRes();

    await signUp(req, res).then(
      (r) => {
        expect(r.json).toHaveBeenCalledWith(
          expect.objectContaining({
            msg: 'A problem occurred trying to create the user.',
          }),
        );
      }
    );
  });

  test('Test create user fails for empty email', async () => {
    UserService.createUser = jest.fn().mockReturnValue(true);
    const req = getMockReq({
      body: {}
    });
    const { res } = getMockRes();

    await signUp(req, res).then(
      (r) => {
        expect(r.json).toHaveBeenCalledWith(
          expect.objectContaining({
            msg: 'Email not found.',
          }),
        );
      }
    );
  });
});

describe('POST - SingIn', () => {
  test('Test sing in user successfully', async () => {
    UserService.singIn = jest.fn().mockReturnValue('somejwt');
    const req = getMockReq({
      body: { email: 'some@email.com' }
    });
    const { res } = getMockRes();

    await singIn(req, res).then(
      (r) => {
        expect(r.json).toHaveBeenCalledWith(
          expect.objectContaining({
            jwt: 'somejwt',
          }),
        );
      }
    );
  });

  test('Test sing in user fails for empty email', async () => {
    const req = getMockReq({
      body: {}
    });
    const { res } = getMockRes();

    await singIn(req, res).then(
      (r) => {
        expect(r.json).toHaveBeenCalledWith(
          expect.objectContaining({
            msg: 'Email not found.',
          }),
        );
      }
    );
  });

  test('Test sing in user fails for user not found', async () => {
    UserService.singIn = jest.fn().mockRejectedValue(new ElementNotFoundError());
    const req = getMockReq({
      body: { email: 'some@email.com' }
    });
    const { res } = getMockRes();

    await singIn(req, res).then(
      (r) => {
        expect(r.json).toHaveBeenCalledWith(
          expect.objectContaining({
            msg: 'Element not found.',
          }),
        );
      }
    );
  });

  test('Test sing in user fails for unhandled error', async () => {
    UserService.singIn = jest.fn().mockRejectedValue(new Error());
    const req = getMockReq({
      body: { email: 'some@email.com' }
    });
    const { res } = getMockRes();

    await singIn(req, res).then(
      (r) => {
        expect(r.json).toHaveBeenCalledWith(
          expect.objectContaining({
            msg: 'A problem occurred trying to authenticate the user.',
          }),
        );
      }
    );
  });
});