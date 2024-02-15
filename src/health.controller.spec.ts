import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';

describe('HealthController', () => {
  let appController: HealthController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [],
    }).compile();

    appController = app.get<HealthController>(HealthController);
  });

  describe('root', () => {
    it('should return "App health service"', () => {
      expect(appController.getHealthService()).toBe('App health service');
    });
  });
});
