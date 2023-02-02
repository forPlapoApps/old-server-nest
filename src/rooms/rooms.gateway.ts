import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway({
  cors: {
    origin: "*"
  }
})
export class RoomsGateway {
  @SubscribeMessage('message')
  // handleMessage(client: any, payload: any) {
  handleMessage() {
    const rooms = [
      { id: 'hogehoge', name: 'myFirstRoom' },
      { id: 'foobar', name: 'mySecondRoom'}
    ]

    return rooms;
  }
}
