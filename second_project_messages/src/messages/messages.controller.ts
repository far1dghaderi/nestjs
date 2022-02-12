import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  NotFoundException,
} from '@nestjs/common';
import CreateMessageDTO from 'src/messages/dtos/CreateMessageDTO';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(public messagesService: MessagesService) {}

  @Get()
  listMessages() {
    return this.messagesService.findAll();
  }

  @Get('/:id')
  async getMessage(@Param('id') id: string) {
    const message = await this.messagesService.findOne(id);
    if (!message) {
      throw new NotFoundException('message not found');
    }
    return message;
  }

  @Post()
  createMessage(@Body() body: CreateMessageDTO) {
    return this.messagesService.create(body.content);
  }
}
