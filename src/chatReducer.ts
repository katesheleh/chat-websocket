import {api} from "./api";

const initialState = {
    messages: []
}


export const chatReducer = (state: any, action: any) => {
    switch (action.type) {
        case 'MESSAGES-RECEIVED': {
            return {...state, messages: action.messages}
        }
        case 'NEW-MESSAGE-RECEIVED': {
            return {...state, messages: [...state.messages, action.message]}
        }
        case 'TYPING-USER-ADDED': {
            return {...state, typingUser: [...state.typingUser.filter(u => u.id !== action.user.id), action.user]}
        }
        default:
            return state;
    }
}

const messagesReceived = (messages: any) => ({type: 'MESSAGES-RECEIVED', messages})
const newMessageReceived = (message: any) => ({type: 'NEW-MESSAGE-RECEIVED', message})
const typingUserReceived = (typingUser: any) => ({type: 'TYPING-USER-ADDED', typingUser})

export const createConnection = () => (dispatch: any) => {
    api.createConnection()
    api.subscribe((messages: any) => dispatch(messagesReceived(messages)),
        (message) => dispatch(messagesReceived(message)),
        () => dispatch(messagesReceived(message)))
}

export const destroyConnection = () => (dispatch: any) => {
    api.destroyConnection()
}

export const setClientName = (name: string) => (dispatch: any) => {
    api.sendName(name)
}

export const setClientMessage = (message: string) => (dispatch: any) => {
    api.sendMessage(message)
}

export const typeMessage = (name: string) => (dispatch: any) => {
    api.typeMessage()
}