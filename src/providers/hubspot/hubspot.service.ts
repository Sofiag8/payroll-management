import { Injectable } from '@nestjs/common';
import { Client } from '@hubspot/api-client';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/infrastructure/database/entities/user.entity';
import { HubspotContactCreatedResponse } from './interfaces/contact-object.interface';
import { Company } from 'src/infrastructure/database/entities/company.entity';
import { HubspotCompanyCreatedResponse } from './interfaces/company-object.interface';
import {
  HUBSPOT_COMPANY_OBJECT_TYPE,
  HUBSPOT_CONTACT_OBJECT_TYPE,
} from 'src/utils/constants';

@Injectable()
export class HubspotService {
  client: Client;

  constructor(private readonly configService: ConfigService) {
    this.client = new Client({
      accessToken: this.configService.get<string>('HUBSPOT_ACCESS_TOKEN'),
    });
  }

  async createContact(data: User): Promise<HubspotContactCreatedResponse> {
    try {
      const createContactResponse =
        (await this.client.crm.contacts.basicApi.create({
          properties: {
            email: data.email,
            firstname: data.name,
            lastname: data.lastName,
            phone: data.phoneNumber,
          },
          associations: [],
        })) as HubspotContactCreatedResponse;
      return createContactResponse;
    } catch (error) {
      throw new Error(
        `Error creating hubspot contact: ${JSON.stringify(error.body)}`,
      );
    }
  }

  async createCompany(data: Company): Promise<HubspotCompanyCreatedResponse> {
    const properties = {
      name: data.name,
      phone: data.contactPhone,
      contact_name: data.contactName,
      contact_email: data.contactEmail,
    };

    const SimplePublicObjectInputForCreate = {
      properties,
      associations: [],
    };
    try {
      const createCompanyResponse =
        (await this.client.crm.companies.basicApi.create(
          SimplePublicObjectInputForCreate,
        )) as HubspotCompanyCreatedResponse;

      const objectType = HUBSPOT_COMPANY_OBJECT_TYPE;
      const objectId = createCompanyResponse.id;
      const toObjectType = HUBSPOT_CONTACT_OBJECT_TYPE;
      const toObectjId = data.user.crmId;
      const associationSpec = [];

      await this.client.crm.associations.v4.basicApi.create(
        objectType,
        objectId,
        toObjectType,
        toObectjId,
        associationSpec,
      );
      return createCompanyResponse;
    } catch (error) {
      throw new Error(
        `Something went wrong creating hubspot company: ${JSON.stringify(error.body)}`,
      );
    }
  }
}
