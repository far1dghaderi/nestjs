import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import CreateMessageDTO from 'src/messages/dtos/CreateMessageDTO';
import { MessagesService } from './messages.service';
@Controller('messages')
export class MessagesController {
  messagesService: MessagesService;

  constructor() {
    this.messagesService = new MessagesService();
  }

  @Get()
  listMessages() {
    return this.messagesService.findAll();
  }

  @Get('/:id')
  getMessage(@Param('id') id: string) {
    return this.messagesService.findOne(id);
  }

  @Post()
  createMessage(@Body() body: CreateMessageDTO) {
    return this.messagesService.create(body.content);
  }
}
