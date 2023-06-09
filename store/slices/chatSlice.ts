import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "../../models/user";
import {IChat, IMember} from "../../models/chat";
import {IRound} from "../../models/game";

interface chatState {
    activeChat: number | null;
    name: string | null;
    admin: IUser | null;
    members: IMember[];
    type: "game" | "group" | "direct" | null;
    rounds: IRound[];
    image_url: string | null;
    game: string | null;
}

const initialState: chatState = {
    activeChat: null,
    name: null,
    admin: null,
    members: [],
    type: null,
    rounds: [],
    image_url: null,
    game: null,
}
export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setActiveChat: (state, action: PayloadAction<IChat>) => {
            state.activeChat = action.payload.id
            state.members = action.payload.members
            state.admin = action.payload.admin
            state.type = action.payload.type;
            state.image_url = action.payload.image_url || null
            state.name = action.payload.name || null;
        },
        setGameChat: (state, action: PayloadAction<IChat>) => {
            state.activeChat = action.payload.id
            state.members = action.payload.members
            state.admin = action.payload.admin
            state.type = action.payload.type
            state.rounds = action.payload.rounds || []
            state.game = action.payload.game
            state.name = action.payload.name || null;
            state.image_url = action.payload.image_url || null
        },
        addRound: (state, action: PayloadAction<any>) => {
            state.rounds.push(action.payload)
        },
        addScore: (state, action: PayloadAction<{winner: number}>) => {
            state.members.forEach((member: IMember) => {
                if (member.user.id === action.payload.winner) {
                    member.score += 1
                }
            })
        },
        removeActiveChat: (state) => {
            state.activeChat = null
            state.members = []
            state.admin = null
            state.type = null
            state.image_url = null
            state.name = null
        }
    },
})

export const {setActiveChat, addRound, addScore, setGameChat, removeActiveChat} = chatSlice.actions

export const selectActiveChat = (state: any) => state.chat
export const selectMembers = (state: any) => state.chat.members

export const chatReducer = chatSlice.reducer