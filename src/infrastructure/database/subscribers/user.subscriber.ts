import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { HubspotService } from 'src/providers/hubspot/hubspot.service';
import { DataSource, EntitySubscriberInterface, InsertEvent } from 'typeorm';
import { HubspotContactCreatedResponse } from 'src/providers/hubspot/interfaces/contact-object.interface';

@Injectable()
export default class UserSubscriber implements EntitySubscriberInterface<User> {
  constructor(
    dataSource: DataSource,
    readonly hubspot: HubspotService,
  ) {
    dataSource.subscribers.push(this);
  }

  listenTo(): ReturnType<EntitySubscriberInterface['listenTo']> {
    return User;
  }

  async afterInsert(event: InsertEvent<User>) {
    const { entity, manager } = event;

    if (entity.crmId !== null) return;

    try {
      const hubspot: HubspotContactCreatedResponse =
        await this.hubspot.createContact(entity);
      if (hubspot.id) {
        await manager.update(User, { id: entity.id }, { crmId: hubspot.id });
      }
    } catch (error) {
      console.error('Error at User Subscriber:', error.message);
    }
  }
}
