import { Test, TestingModule } from '@nestjs/testing';
import { CompanyService } from './company.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Company } from '../../infrastructure/database/entities/company.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import {
  COMPANY_MOCK,
  CREATE_COMPANY_DTO_MOCK,
  USER_MOCK,
} from '../../../test/mocks';
import { InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../infrastructure/database/entities/user.entity';

describe('CompanyService', () => {
  let service: CompanyService;
  let companyRepository: Repository<Company>;
  let userService: UserService;

  beforeEach(async () => {
    const mockRepository = {
      find: jest.fn(),
      findOne: jest.fn(),
      save: jest.fn(),
      create: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompanyService,
        UserService,
        JwtService,
        {
          provide: getRepositoryToken(Company),
          useValue: mockRepository,
        },
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<CompanyService>(CompanyService);
    companyRepository = module.get<Repository<Company>>(
      getRepositoryToken(Company),
    );
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createCompany', () => {
    it('should create a company', async () => {
      jest.spyOn(userService, 'getUserById').mockResolvedValue(USER_MOCK);
      jest.spyOn(companyRepository, 'create').mockReturnValue(COMPANY_MOCK);
      jest.spyOn(companyRepository, 'save').mockResolvedValue(COMPANY_MOCK);

      const result = await service.createCompany(CREATE_COMPANY_DTO_MOCK);

      expect(userService.getUserById).toHaveBeenCalledWith(
        CREATE_COMPANY_DTO_MOCK.userId,
      );
      expect(companyRepository.create).toHaveBeenCalledWith(
        CREATE_COMPANY_DTO_MOCK,
      );
      expect(companyRepository.save).toHaveBeenCalledWith(COMPANY_MOCK);
      expect(result).toEqual(COMPANY_MOCK);
    });

    it('should throw InternalServerErrorException if an error occurs', async () => {
      jest
        .spyOn(userService, 'getUserById')
        .mockRejectedValue(new Error('Error message'));

      await expect(
        service.createCompany(CREATE_COMPANY_DTO_MOCK),
      ).rejects.toThrowError(InternalServerErrorException);
    });
  });
});
