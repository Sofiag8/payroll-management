import { Test, TestingModule } from '@nestjs/testing';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { COMPANY_MOCK, CREATE_COMPANY_DTO_MOCK } from '../../../test/mocks';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { Company } from '../../infrastructure/database/entities/company.entity';
import { User } from '../../infrastructure/database/entities/user.entity';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

describe('CompanyController', () => {
  let controller: CompanyController;
  let service: CompanyService;

  beforeEach(async () => {
    const mockRepository = {
      find: jest.fn(),
      findOne: jest.fn(),
      save: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
      controllers: [CompanyController],
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

    controller = module.get<CompanyController>(CompanyController);
    service = module.get<CompanyService>(CompanyService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createCompany', () => {
    it('should create a company', async () => {
      jest.spyOn(service, 'createCompany').mockResolvedValue(COMPANY_MOCK);

      const result = await controller.createCompany(CREATE_COMPANY_DTO_MOCK);

      expect(result).toBe(COMPANY_MOCK);
    });
  });
});
