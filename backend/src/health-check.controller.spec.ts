import { Test, TestingModule } from '@nestjs/testing';

import { HealthCheckController } from '~/src/health-check.controller';

describe('appController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [HealthCheckController],
      providers: [],
    }).compile();
  });

  describe('getHello', () => {
    it('should return "Hello World!"', () => {
      const healthCheckController = app.get<HealthCheckController>(HealthCheckController);
      expect(healthCheckController.healthcheck()).toBe('I am Healthy!');
    });
  });
});
