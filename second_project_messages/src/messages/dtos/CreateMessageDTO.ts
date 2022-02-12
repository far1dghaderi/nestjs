import { IsString } from 'class-validator';

export default class CreateMessageDTO {
  @IsString()
  content: string;
}
