import { randomUUID } from "crypto";
import { Socket } from "net";
import { MessagingEvent, publish, subscribe, unsubscribe } from "../transport";
import { IMessaging, SubscribeCallback } from "../types";

export class Messaging implements IMessaging {
    private socket: Socket;
    public listeners: Map<string, SubscribeCallback[]>;

    constructor(socket: Socket) {
        this.socket = socket;
        this.listeners = new Map();
    }

    private genId() {
        return randomUUID();
    }

    publish(topic: string, data: string) {
        const queryId = this.genId();

        this.socket.write(publish(queryId, topic, data));
    }

    subscribe(topic: string, callback: SubscribeCallback) {
        const queryId = this.genId();

        this.socket.write(subscribe(queryId, topic));

        const listeners = this.listeners.get(topic);

        if (!listeners) {
            this.listeners.set(topic, [callback]);
        } else {
            listeners.push(callback);
        }
    }

    unsubscribe(topic: string) {
        const queryId = this.genId();

        this.socket.write(unsubscribe(queryId, topic));
    }

    trigger(message: MessagingEvent) {
        if (!this.listeners.has(message.topic)) {
            return;
        }
        this.listeners.get(message.topic)
            ?.forEach((callback) => callback(message.data));
    }
}