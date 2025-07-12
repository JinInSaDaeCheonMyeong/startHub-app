import { Client, Frame } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useEffect, useRef, useState, useCallback } from 'react';
import { getUser } from '../../api/user';
import { ChatMessage } from '../../type/chat/messages.type';

const SOCKET_URL = 'https://api.start-hub.kr/ws';

export function useInChatScreen(roomId : number, chatLst: ChatMessage[]) {
    const [msgs, setMsgs] = useState<ChatMessage[]>(chatLst);
    const clientRef = useRef<Client | null>(null);
    const [senderId, setSenderId] = useState<string | null>(null);

    useEffect(() => {
        let client: Client;

        const setupStompClient = async () => {
            try {
                const user = await getUser();
                const fetchedSenderId = user?.data?.id;

                if (!fetchedSenderId) throw new Error("No sender ID found");
                setSenderId(fetchedSenderId);

                client = new Client({
                    webSocketFactory: () => new SockJS(SOCKET_URL),
                    debug: (str) => console.log('STOMP_DEBUG:', str),
                    reconnectDelay: 5000,
                    onConnect: (frame: Frame) => {
                        client.subscribe(`/sub/chat/${roomId}`, (message) => {
                            try {
                                const body = JSON.parse(message.body);
                                setMsgs((prev) => [...prev, body]);
                            } catch (e) {
                                console.error('Failed to parse message:', e);
                            }
                        }, { id: `sub-${roomId}` });
                    },
                });

                client.activate();
                clientRef.current = client;

            } catch (error) {
                console.error("Failed to initialize STOMP client:", error);
            }
        };

        setupStompClient();

        return () => {
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
        if(message.trim().length === 0) return
        const client = clientRef.current;

        if (!client?.connected) return;
        
        if (!senderId) return;
        

        const payload = {
            roomId : roomId,
            senderId : senderId,
            message : message,
        };

        client.publish({
            destination: '/pub/send',
            body: JSON.stringify(payload),
        });
    }, [roomId, senderId]);

    return { msgs, sendMessage, senderId };
}
