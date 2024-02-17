import { Injectable } from '@nestjs/common';
import { HubspotService } from 'src/providers/hubspot/hubspot.service';
import Company from 'src/infrastructure/database/entities/company.entity';
import { EntitySubscriberInterface, InsertEvent, DataSource } from 'typeorm';
import { HubspotCompanyCreatedResponse } from 'src/providers/hubspot/interfaces/company-object.interface';

@Injectable()
export default class CompanySubscriber
  implements EntitySubscriberInterface<Company>
{
  constructor(
    dataSource: DataSource,
    readonly hubspot: HubspotService,
  ) {
    dataSource.subscribers.push(this);
  }

  listenTo(): ReturnType<EntitySubscriberInterface['listenTo']> {
    return Company;
  }

  async afterInsert(event: InsertEvent<Company>) {
    const { entity, manager } = event;
    if (entity.crmId !== null) return;

    try {
      const hubspot: HubspotCompanyCreatedResponse =
        await this.hubspot.createCompany(entity);

      if (hubspot.id) {
        await manager.update(
          Company,
          { id: entity.id },
          {
            crmId: hubspot.id,
          },
        );
      }
    } catch (error) {
      // TODO: handle error at subcribers
      console.error('Error at Company Subscriber: ', error.message);
    }
  }
}
