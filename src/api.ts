import io from "socket.io-client";

const socket = io('https://samurai-chat-back.herokuapp.com');




export const api = {
    socket: null as null | SocketIOClient.Socket,
    createConnection() {
        this.socket = io('https://samurai-chat-back.herokuapp.com');
    },
    subscribe(initMessagesCallback: (messages: any) => void,
              newMessageSentHandler: (messages: any) => void,
              userTypingHandler: (user: any) => void) {
        this.socket?.on('init-messages-published', initMessagesCallback)
        this.socket?.on('new-message-sent', newMessageSentHandler)
        this.socket?.on('user-typing', userTypingHandler)
    },
    destroyConnection() {
        this.socket?.disconnect();
        this.socket = null;
    },
    sendName(name: string) {
        this.socket?.emit('client-name-sent', name);
    },
    sendMessage(message: string) {
        this.socket?.emit('client-message-sent', message);
    },
    typeMessage() {
        this.socket?.emit('client-typed');
    }
}