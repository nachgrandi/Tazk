import { auth, signUp } from '../../src/controllers/user.controller';
import { getMockReq, getMockRes } from '@jest-mock/express';
import UserService from '../../src/core/service/user/index';

describe('POST - Create user', () => {
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

describe('POST - Auth user', () => {
  test('Test user authentication on successfully case', async () => {
    UserService.authUser = jest.fn().mockReturnValue(true);
    const req = getMockReq({
      body: { email: 'some@email.com' }
    });
    const { res } = getMockRes();

    await auth(req, res).then(
      (r) => {
        expect(r.json).toHaveBeenCalledWith(
          expect.objectContaining({
            msg: 'User authenticated successfully.',
          }),
        );
      }
    );
  });

  test('Test user authentication email not found', async () => {
    UserService.authUser = jest.fn().mockReturnValue(true);
    const req = getMockReq({
      body: {}
    });
    const { res } = getMockRes();

    await auth(req, res).then(
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