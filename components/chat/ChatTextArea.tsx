import React, {useState} from 'react';
import {useMutateMessageMutation} from "../../services/messageService";
import {useAppDispatch, useAppSelector} from "../../hooks/useStore";
import {selectUser} from "../../store/slices/userSlice";
import {socket} from "../../utils/socket";
import {messageAdded} from "../../store/slices/menuSlice";
import {HStack, Icon, IconButton, Input, useTheme} from "native-base";
import {Ionicons} from "@expo/vector-icons";

interface ChatTextAreaProps {
    activeChatId: number;
    receivers: number[];
}

const ChatTextArea: React.FC<ChatTextAreaProps> = ({activeChatId, receivers}) => {
    const theme = useTheme()
    const [message, setMessage] = useState<string>('')
    const [mutateMessage, {isLoading: sendLoading}] = useMutateMessageMutation()


    const user = useAppSelector(selectUser)!
    const dispatch = useAppDispatch()

    const sendMessage = async () => {
        if(message.length > 0 && user) {
            const res = await mutateMessage({chatId: activeChatId, text: message})
            setMessage('')

            // @ts-ignore
            const postedMessage = res.data
            if(postedMessage) {
                socket.emit('sendMessage', {
                    id: postedMessage.id,
                    sender: user,
                    receivers: [...receivers, user.id],
                    chatId: activeChatId,
                    text: message,
                })
                dispatch(messageAdded({message: postedMessage, chatId: activeChatId}))
            }
        }
    }

    const onChange = (text: string) => {
        setMessage(text)
    }

    return (
        <HStack mb={3} px={2} pb={2}>
            <Input size={'lg'} value={message} onChangeText={onChange} placeholder={'Your message'} variant={'filled'} flex={1}/>
            <IconButton disabled={sendLoading} onPress={sendMessage} icon={<Icon as={Ionicons} name={'send-outline'} size={5} color={theme.colors.secondary[600]} />} borderRadius="full"
                        _hover={{opacity: 0.7}}
                        _pressed={{opacity: 0.7}}
            />
        </HStack>
    );
};

export default ChatTextArea;