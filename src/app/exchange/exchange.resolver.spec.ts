import { Test, TestingModule } from '@nestjs/testing';
import { ExchangeResolver } from './exchange.resolver';

describe('ExchangeResolver', () => {
  let resolver: ExchangeResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExchangeResolver],
    }).compile();

    resolver = module.get<ExchangeResolver>(ExchangeResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
