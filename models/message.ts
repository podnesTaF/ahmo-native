import {IChat} from "./chat";
import {IUser} from "./user";

export type IMessage = {
    id: number;
    text: string;
    chat?: IChat;
    sender: IUser;
    createdAt: Date;
    chatId?: number;
}

export type ArrivingMessage = {
    id: number;
    text: string;
    chatId: number;
    sender: IUser;
    createdAt: Date;
}

export type createMessageDto = {
    text: string;
    chatId: number;
}
