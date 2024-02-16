import { Injectable } from '@nestjs/common';
import { Client } from '@hubspot/api-client';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/infrastructure/database/entities/user.entity';
import { HubspotContactCreatedResponse } from './interfaces/contact-object.interface';

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
}
