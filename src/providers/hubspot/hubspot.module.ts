import { Module } from '@nestjs/common';
import { HubspotService } from './hubspot.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [],
  controllers: [],
  providers: [ConfigService, HubspotService],
  exports: [HubspotService],
})
export class HubspotModule {}
