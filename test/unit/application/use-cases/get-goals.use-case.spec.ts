import { Test, TestingModule } from '@nestjs/testing';
import { GetGoalsUseCase } from '../../../src/application/use-cases/goal/get-goals.use-case';
import { GoalRepositoryPort } from '../../../src/application/ports/repositories/goal.repository.port';
import { GoalDto } from '../../../src/application/dto/goal.dto';

describe('GetGoalsUseCase', () => {
  let useCase: GetGoalsUseCase;
  let mockGoalRepository: Partial<GoalRepositoryPort>;

  beforeEach(async () => {
    mockGoalRepository = {
      findAll: jest.fn(),
      findById: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetGoalsUseCase,
        {
          provide: 'GoalRepositoryPort', // Make sure this matches the token used in the app module
          useValue: mockGoalRepository,
        },
      ],
    }).compile();

    useCase = module.get<GetGoalsUseCase>(GetGoalsUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should return all goals', async () => {
    const mockGoals: GoalDto[] = [
      {
        id: '1',
        name: 'Retirement',
        createdAt: new Date(),
        updatedAt: new Date(),
        targetAmount: 100000,
        currentAmount: 25000,
        targetDate: new Date('2050-01-01'),
        investments: ['1', '2', '3'],
      },
      {
        id: '2',
        name: 'House',
        createdAt: new Date(),
        updatedAt: new Date(),
        targetAmount: 50000,
        currentAmount: 10000,
        targetDate: new Date('2030-01-01'),
        investments: ['4', '5'],
      },
    ];

    (mockGoalRepository.findAll as jest.Mock).mockResolvedValue(mockGoals);

    const result = await useCase.execute();
    expect(result).toBe(mockGoals);
    expect(mockGoalRepository.findAll).toHaveBeenCalledTimes(1);
  });
});
