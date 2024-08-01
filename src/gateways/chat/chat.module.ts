import { Module } from '@nestjs/common';
import { ChatGateway } from '@gateway/chat/chat.gateway';
import { RoomModule } from '@model/postgres/room/room.module';

@Module({
  imports:[RoomModule],
  providers: [ChatGateway],
})
export class ChatModule {
}
