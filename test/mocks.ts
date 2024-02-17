import { Company } from 'src/infrastructure/database/entities/company.entity';
import CreateCompanyDto from 'src/modules/company/dtos/create-company.dto';

export const CREATE_COMPANY_DTO_MOCK: CreateCompanyDto = {
  name: 'Another Company To Contact Hubspot',
  contactName: 'Sofia Garcia',
  contactPhone: '+573117528821',
  contactEmail: 'sofiagarcia@email.com',
  userId: 'b9fa7fc8-8be1-4ed7-8cd4-9f4322da7012',
};

export const COMPANY_MOCK: Company = {
  name: 'Another Company To Contact Hubspot',
  contactName: 'Sofia Garcia',
  contactPhone: '+573117528821',
  contactEmail: 'sofiagarcia@email.com',
  user: {
    id: '163465e2-b6af-4638-ae8c-4db99e6432c7',
    name: 'Aura Maria',
    lastName: 'Garcia Caicedo',
    email: 'aura@email.com',
    password: '$2b$10$6IFR6w0LxQMXPdYk5MEMF.HYKykDbxTF.Vv8B1MlV/lL1CvegrVf2',
    phoneNumber: '+573117528821',
    address: '70 Quinta Camacho Street',
    crmId: '151',
    hashPassword: jest.fn(),
  },
  crmId: null,
  id: 'b9fa7fc8-8be1-4ed7-8cd4-9f4322da7012',
};
