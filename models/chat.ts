import {IUser} from "./user";
import {IMessage} from "./message";
import {IMove, IRound} from "./game";


export type IChat = {
    id: number;
    name?: string;
    type: "game" | "group" | "direct";
    admin: IUser;
    members: IMember[];
    messages: IMessage[];
    lastMessage: IMessage | null;
    createdAt: string;
    game: string | null;
    rounds: IRound[];
    status?: string;
    image_url?: string;
    lastMove?: IMove

}

export type IMember = {
    id: number;
    user: IUser;
    chat: IChat;
    score: number;
}

export type IMenuItem = {
    id: number,
    game: string | null,
    lastMessage: IMessage | null,
    members: IMember[],
    name: string,
    type: string,
    image_url?: string;
    createdAt: string
}