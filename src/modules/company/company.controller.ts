import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { CompanyService } from './company.service';
import { Company } from '../../infrastructure/database/entities/company.entity';
import { AuthGuard } from '@nestjs/passport';
import { CreateCompanyGuard } from './create-company.guard';
import CreateCompanyDto from './dtos/create-company.dto';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request, some of the fields did not pass the validation',
  })
  @UseGuards(AuthGuard(), CreateCompanyGuard)
  async createCompany(@Body() company: CreateCompanyDto): Promise<Company> {
    return await this.companyService.createCompany(company);
  }
}
