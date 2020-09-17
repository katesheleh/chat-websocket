import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import {setClientMessage, setClientName} from "./chatReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "./index";


function App() {
    const messages = useSelector((state: AppStateType) => state.chat.messages)
    const dispatch = useDispatch()

    useEffect(() => {
    }, [])


    /* const [messages, setMessages] = useState([
            {message: 'Hello', id: '234358454h0', user: {id: '2peoijd', name: 'Katia'}},
            {message: 'Hi!', id: '234358454hsdf0', user: {id: '2peodfijd', name: 'Test'}}
        ]);*/

    // const [messages, setMessages] = useState<Array<any>>([])
    const [message, setMessage] = useState('Hi!!!!')
    const [name, setName] = useState('Katia')
    const [autoScrollActive, setAutoScrollActive] = useState(true)
    const [lastScrollTop, setLastScrollTop] = useState(0)

    useEffect(() => {
        if (autoScrollActive) {
            messagesAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
        }

    }, [messages])

    // scroll to last messages
    const messagesAnchorRef = useRef<HTMLDivElement>(null);

    return (

        <div className="App">
            <div className="chatWrap">
                <div className="chatWrapInner" onScroll={(e) => {
                    let elem = e.currentTarget
                    let maxScrollPosition = elem.scrollHeight - elem.clientHeight
                    if (e.currentTarget.scrollTop > lastScrollTop && Math.abs(maxScrollPosition - elem.scrollTop) < 10) {
                        setAutoScrollActive(true)
                    } else {
                        setAutoScrollActive(false)
                    }
                    setLastScrollTop(e.currentTarget.scrollTop)
                }}>
                    {messages.map(m => {
                        return (
                            <div key={m.id}>
                                <b>{m.user.name}:</b>
                                <span>{m.message}</span>
                                <hr/>
                            </div>
                        )
                    })}
                    <div ref={messagesAnchorRef}></div>
                </div>
                <input
                    type='text'
                    value={name}
                    onChange={(e) => setName(e.currentTarget.value)}
                />
                <button onClick={() => dispatch(setClientName(name))}>Send</button>

                <textarea
                    value={message}
                    onKeyPress={() => {
                        dispatch(typeMessage())
                    }}
                    onChange={(e) => setMessage(e.currentTarget.value)}></textarea>

                <button
                    onClick={() => {
                        dispatch(setClientName(name))
                        dispatch(setClientMessage(message))
                        /*socket.emit('client-name-sent', name);
                        socket.emit('client-message-sent', message);*/
                        setMessage('');
                    }}>Send
                </button>
            </div>
        </div>
    );
}

export default App;
