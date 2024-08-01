import { BadRequestException, Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RoomService } from '@model/postgres/room/room.service';
import { JwtService } from '@nestjs/jwt';

@WebSocketGateway({ cors: true })
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(ChatGateway.name);
  private clients: Map<string, { socket: Socket; user: any }> = new Map();

  constructor(private readonly jwtService: JwtService, private readonly roomService: RoomService) {
  }

  @WebSocketServer() server: Server;

  afterInit() {
    this.logger.log('Initialized');
  }

  async handleConnection(client: Socket, ..._args: any[]) {
    const token = client.handshake.headers.authorization?.split(' ')[1];
    const user = await this.jwtService.verify(token);
    if (!token || !user) {
      client.disconnect();
      this.logger.log(`Unauthorized client id: ${client.id}`);
      return;
    }
    this.clients.set(client.id, { socket: client, user });
    this.logger.log(`Client id: ${client.id} connected`);
  }

  handleDisconnect(client: any) {
    this.clients.delete(client);
    this.logger.log(`Client id:${client.id} disconnected`);
    return {
      event: 'disconnected',
      data: 'You are disconnected',
    };
  }

  // @SubscribeMessage('ping')
  // handleMessage(client: any, data: any) {
  //   this.logger.log(`Message received from client id: ${client.id}`);
  //   this.logger.debug(`Payload: ${data}`);
  //   return {
  //     event: 'pong',
  //     data,
  //   };
  // }

  @SubscribeMessage('message')
  handleMessages(@MessageBody() message: { text: string }, @ConnectedSocket() client: Socket): void {
    this.logger.log(`Message received from client id: ${client.id}`);
    this.logger.log(`Received message: ${message.text}`);
    this.server.emit('message', message);
  }

  @SubscribeMessage('createRoom')
  async handleCreateRoom(@MessageBody() { name, code }: {
    name: string;
    code: string
  }, @ConnectedSocket() client: Socket): Promise<any> {
    await this.roomService.create({ name: name, code: code });
    client.join(code);
    this.logger.log(`Client ${client.id} joined room ${name}`);
    return {
      event: 'createRoomNotice',
      data: `You have created room ${name} successfully`,
    };
  }

  @SubscribeMessage('joinRoom')
  async handleJoinRoom(
    @MessageBody() { code, name }: { code: string, name: string },
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    const isValid = await this.roomService.validateRoomCode(code);
    if (!isValid) {
      throw new BadRequestException('Invalid room code');
    }
    client.join(code); // Join the room if the code is valid
    this.logger.log(`Client ${client.id} joined room ${name}`);
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(@MessageBody() room: string, @ConnectedSocket() client: Socket): void {
    client.leave(room); // Leave a specific room
    this.logger.log(`Client ${client.id} left room ${room}`);
  }

  @SubscribeMessage('sendMessage')
  async handleSendMessage(
    @MessageBody() { code, name, text }: { code: string; name: string; text: string },
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    const clientData = this.clients.get(client.id);
    if (!clientData) {
      this.logger.warn(`Client id: ${client.id} is not authenticated`);
      return;
    }
    // Check if the room exists and the client is in that room
    const isRoomValid = await this.roomService.validateRoomCode(code); // Assuming room validation uses code
    if (!isRoomValid) {
      this.logger.warn(`Client ${client.id} tried to send message to invalid room ${name}`);
      return;
    }
    this.server.to(code).emit('message', {
      user: clientData.user.username, // Assuming user has a username property
      text,
    });
    this.logger.log(`Message from user ${clientData.user.username} sent to room ${name}`);
  }

  @SubscribeMessage('roomMessage')
  handleRoomMessage(@MessageBody() { room, text }: { room: string, text: string }): void {
    this.server.to(room).emit('message', { text }); // Broadcast message to a specific room
  }
}