import { Client, Frame } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useEffect, useRef, useState, useCallback } from 'react';
import { messages } from '../../api/chat';
import { getUser } from '../../api/user';
import { ChatMessage } from '../../type/chat/messages.type';

const SOCKET_URL = 'https://api.start-hub.kr/ws';

export function useInChatScreen(roomId: number) {
    const [msgs, setMsgs] = useState<ChatMessage[]>([]);
    const clientRef = useRef<Client | null>(null);
    const [senderId, setSenderId] = useState<string | null>(null);

    useEffect(() => {
        let client: Client;

        const initMessages = async () => {
            try {
                const msgLst = await (await messages(roomId)).data
                setMsgs(msgLst)
            } catch (error) {
                console.log(error)
            }
        }

        const setupStompClient = async () => {
            try {
                const user = await getUser();
                const fetchedSenderId = user?.data?.id;

                if (!fetchedSenderId) throw new Error("No sender ID found");
                setSenderId(fetchedSenderId);

                setMsgs([]); // roomId가 바뀌면 메시지 초기화

                client = new Client({
                    webSocketFactory: () => new SockJS(SOCKET_URL),
                    debug: (str) => console.log('STOMP_DEBUG:', str),
                    reconnectDelay: 5000,
                    onConnect: (frame: Frame) => {
                        console.log('Connected to STOMP:', frame.headers);

                        client.subscribe(`/sub/chat/${roomId}`, (message) => {
                            try {
                                const body = JSON.parse(message.body);
                                setMsgs((prev) => [...prev, body]);
                            } catch (e) {
                                console.error('Failed to parse message:', e);
                            }
                        }, { id: `sub-${roomId}` });

                        console.log(`Subscribed to /sub/chat/${roomId}`);
                    },
                    onStompError: (frame) => {
                        console.error('STOMP Protocol Error:', frame.headers['message'], frame.body);
                    },
                    onWebSocketError: (evt) => {
                        console.error('WebSocket Error:', evt);
                    },
                    onDisconnect: () => {
                        console.log('Disconnected from STOMP');
                    }
                });

                client.activate();
                clientRef.current = client;
                console.log("STOMP client activated.");

            } catch (error) {
                console.error("Failed to initialize STOMP client:", error);
            }
        };

        initMessages()
        setupStompClient();

        return () => {
            console.log("Cleaning up STOMP client...");
            if (clientRef.current?.active) {
                clientRef.current.deactivate().then(() => {
                    console.log("STOMP client deactivated.");
                }).catch((e) => {
                    console.error("Error during deactivation:", e);
                });
            }
            clientRef.current = null;
        };
    }, [roomId]);

    const sendMessage = useCallback((message: string) => {
        const client = clientRef.current;

        if (!client?.connected) {
            console.warn('Cannot send: STOMP client not connected.');
            return;
        }
        if (!senderId) {
            console.warn('Cannot send: Sender ID missing.');
            return;
        }

        const payload = {
            roomId : roomId,
            senderId : senderId,
            message : message,
        };

        console.log("Sending message:", payload);

        client.publish({
            destination: '/pub/send',
            body: JSON.stringify(payload),
        });
    }, [roomId, senderId]);
    return { msgs, sendMessage };
}
