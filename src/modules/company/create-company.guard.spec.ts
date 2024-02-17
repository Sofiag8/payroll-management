import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CreateCompanyGuard } from './create-company.guard';
import {
  CAN_ACTIVATE_REQUEST_MOCK,
  CREATE_COMPANY_DTO_MOCK,
  MOCK_USER_ID,
} from '../../../test/mocks';

describe('CreateCompanyGuard', () => {
  let guard: CreateCompanyGuard;
  let reflector: Reflector;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateCompanyGuard],
    }).compile();

    guard = module.get<CreateCompanyGuard>(CreateCompanyGuard);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  describe('canActivate', () => {
    it('should return true if user is present in request', async () => {
      const mockContext = {
        switchToHttp: jest.fn().mockReturnValue({
          getRequest: jest.fn().mockReturnValue(CAN_ACTIVATE_REQUEST_MOCK),
        }),
      } as unknown as ExecutionContext;

      const result = await guard.canActivate(mockContext);

      expect(result).toEqual(true);
      expect(CAN_ACTIVATE_REQUEST_MOCK.user.userId).toEqual(MOCK_USER_ID);
    });
  });
});
