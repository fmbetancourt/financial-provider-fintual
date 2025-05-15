import { Injectable, Inject } from '@nestjs/common';
import { UserDto } from '../../dto/user.dto';
import { FintualApiPort } from '../../ports/fintual-api.port';

@Injectable()
export class GetUserByIdUseCase {
  constructor(
    @Inject('FintualApiPort')
    private readonly fintualApiPort: FintualApiPort,
  ) {}

  async execute(userId: string): Promise<UserDto> {
    return this.fintualApiPort.getUserById(userId);
  }
}
