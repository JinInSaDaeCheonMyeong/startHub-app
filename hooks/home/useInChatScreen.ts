import { Client, Frame } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useEffect, useRef, useState, useCallback } from 'react';
import { getMe, } from '../../api/user';
import { ChatMessage } from '../../type/chat/messages.type';
import { isAxiosError } from 'axios';
import { ErrorResponse } from '../../type/util/response.type';
import { ShowToast, ToastType } from '../../util/ShowToast';

const SOCKET_URL = process.env.EXPO_PUBLIC_API_URL + '/ws';

export function useInChatScreen(roomId : number, chatLst: ChatMessage[]) {
    const [msgs, setMsgs] = useState<ChatMessage[]>(chatLst);
    const clientRef = useRef<Client | null>(null);
    const [senderId, setSenderId] = useState<number | null>(null);

    useEffect(() => {
        let client: Client;

        const setupStompClient = async () => {
            try {
                const user = await getMe();
                const fetchedSenderId = user?.data?.id;

                if (!fetchedSenderId) throw new Error("No sender ID found");
                setSenderId(fetchedSenderId);

                client = new Client({
                    webSocketFactory: () => new SockJS(SOCKET_URL),
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

            } catch (error : unknown) {
                if(isAxiosError(error)){
                    const response = error.response?.data
                    const errorData = response as ErrorResponse
                    ShowToast("오류 발생", errorData.message, ToastType.ERROR)
                }
                console.error("Failed to initialize STOMP client:", error);
            }
        };

        setupStompClient();

        return () => {
            if (clientRef.current?.active) {
                clientRef.current.deactivate()
                .then(() => {
                })
                .catch((e) => {
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
