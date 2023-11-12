import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { ScaleService } from "./service.scale";



@WebSocketGateway(8081, {
    cors: { origin: '*' }
})


export class ScaleGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

    isZero: boolean = false;


    constructor(private readonly scaleService: ScaleService) { }

    @WebSocketServer() server: Server;



    afterInit(server: any) {
        console.log("Esto se ejecuta cuando inicia");
    }

    handleConnection(client: any, ...args: any[]) {

        console.log("Esto se ejecuta cuando alguien se conecto al socket");

        console.log("==== CLIENTE INFO ====", client.handshake.headers['user-agent']);
        const data = client.handshake.headers['user-agent'];

        if (data == 'arduino-WebSocket-Client') {
            this.scaleService.setIsDeviceConnected(true);
            this.server.emit('scaleStatus', this.scaleService.getIsDeviceConnected());
        } else {
            this.server.emit('scaleStatus', this.scaleService.getIsDeviceConnected());
        }

        console.log("=== IsConnectedDevice ===", this.scaleService.getIsDeviceConnected());

    }

    handleDisconnect(client: any) {
        console.log("Esto se ejecuta cuando alguien se desconecto del socket");


        const data = client.handshake.headers['user-agent'];

        if (data == 'arduino-WebSocket-Client') {
            this.scaleService.setIsDeviceConnected(false);
            this.server.emit('scaleStatus', this.scaleService.getIsDeviceConnected());
        }

        console.log("=== IsConnectedDevice ===", this.scaleService.getIsDeviceConnected());

    }

    //Eventos de ingreso, mensajes y desconexion
    @SubscribeMessage('event_join')
    handleJoinRoom(
        client: Socket,
        payload: { room: string }

    ) {
        const { room } = payload;
        console.log("Ingreso a room", room);
        client.join(`${room}`);
    }

    @SubscribeMessage('event_message') //TODO Backend
    handleIncommingMessage(
        client: Socket,
        payload: { data: number, room: string },
    ) {
        const { data, room } = payload;
        // console.log("=========== Handle Message =========== DATA:", payload)

        if (!this.isZero) {
            this.server.to(`${room}`).emit('new_weight', data);
            this.isZero = true;
        }

        if (data !== 0) {
            this.isZero = false;
            // console.log("=== Data peso ===", data);

            this.server.to(`${room}`).emit('new_weight', data);
        }

    }

    @SubscribeMessage('event_leave')
    handleRoomLeave(
        client: Socket,
        payload: { room: string }
    ) {
        const { room } = payload;
        console.log(`chao ${room}`)
        client.leave(`${room}`);
    }


}