import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Company from 'src/infrastructure/database/entities/company.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import CreateCompanyDto from './dtos/create-company.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
    private userService: UserService,
  ) {}

  async createCompany(company: CreateCompanyDto): Promise<Company> {
    try {
      const user = await this.userService.getUserById(company.userId);
      const createdCompany = await this.companyRepository.create(company);
      createdCompany.user = user;
      return this.companyRepository.save(createdCompany);
    } catch (error) {
      throw new InternalServerErrorException(
        `Error while creating Company: ${(<Error>error).message}`,
      );
    }
  }
}
