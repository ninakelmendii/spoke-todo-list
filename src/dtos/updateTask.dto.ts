import { IsString } from 'class-validator';

export class UpdateTaskDto {
  id: number;

  @IsString()
  name: string;

  @IsString()
  description: string;

  status: number;
}
