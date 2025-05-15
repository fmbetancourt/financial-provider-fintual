import { Injectable, Inject } from '@nestjs/common';
import { UserDto, UpdateUserDto } from '../../dto/user.dto';
import { FintualApiPort } from '../../ports/fintual-api.port';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject('FintualApiPort')
    private readonly fintualApiPort: FintualApiPort,
  ) {}

  async execute(userId: string, userData: UpdateUserDto): Promise<UserDto> {
    return this.fintualApiPort.updateUser(userId, userData);
  }
}
