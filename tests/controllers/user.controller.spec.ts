import { signInOrSignUp } from '../../src/controllers/user.controller';
import { getMockReq, getMockRes } from '@jest-mock/express';
import UserService from '../../src/core/service/user/index';
import ElementNotFoundError from '../../src/errors/elementNotFoundError';

describe('POST - signInOrSignUp', () => {
  test('Test create user successfully', async () => {
    UserService.signInOrSignUp = jest.fn().mockReturnValue(true);
    const req = getMockReq();
    const { res } = getMockRes({
      locals: {
        userEmail: 'test@test.com'
      }
    });

    await signInOrSignUp(req, res).then(
      (r) => {
        expect(r.json).toHaveBeenCalledWith(
          expect.objectContaining({
            msg: 'User login successfully.',
          }),
        );
      }
    );
  });

  test('Test create user fails trying to save user', async () => {
    UserService.signInOrSignUp = jest.fn().mockReturnValue(false);
    const req = getMockReq();
    const { res } = getMockRes({
      locals: {
        userEmail: 'test@test.com'
      }
    });

    await signInOrSignUp(req, res).then(
      (r) => {
        expect(r.json).toHaveBeenCalledWith(
          expect.objectContaining({
            msg: 'A problem occurred trying to login.',
          }),
        );
      }
    );
  });

  test('Test create user throw error', async () => {
    UserService.signInOrSignUp = jest.fn().mockRejectedValue(new Error());
    const req = getMockReq();
    const { res } = getMockRes();

    await signInOrSignUp(req, res).then(
      (r) => {
        expect(r.json).toHaveBeenCalledWith(
          expect.objectContaining({
            msg: 'A problem occurred trying to login.',
          }),
        );
      }
    );
  });
});