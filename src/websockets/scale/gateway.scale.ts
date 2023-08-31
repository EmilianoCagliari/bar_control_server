import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";



@WebSocketGateway(8081, {
    cors: { origin: '*' }
})


export class ScaleGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer() server: Server;


    afterInit(server: any) {

        console.log("Esto se ejecuta cuando inicia");

    }
    handleConnection(client: any, ...args: any[]) {

        console.log("Esto se ejecuta cuando alguien se conecto al socket");
        // console.log("==== CLIENTE INFO ====", client.handshake);


    }
    handleDisconnect(client: any) {
        console.log("Esto se ejecuta cuando alguien se desconecto del socket");

    }

    //Eventos de ingreso, mensajes y desconexion
    @SubscribeMessage('event_join')
    handleJoinRoom(
        client: Socket,
        payload: { room: string }

    ) {
        const { room } = payload;
        console.log("Ingreso a room", payload);        
        client.join(`${room}`);
    }

    @SubscribeMessage('event_message') //TODO Backend
    handleIncommingMessage(
        client: Socket,
        payload: { data: number, room: string },
    ) {
        const { data, room } = payload;
        // console.log("=========== Handle Message =========== DATA:", payload)

        if( data !== 0) {
        console.log("=== Data peso ===", data);

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