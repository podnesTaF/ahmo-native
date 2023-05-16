import React from 'react';
import {
    Avatar,
    Box,
    FlatList,
    HamburgerIcon,
    Heading,
    HStack,
    Icon,
    IconButton, Menu,
    Modal,
    Pressable,
    Spacer,
    Text,
    VStack
} from "native-base";
import {IChat, IMember} from "../../models/chat";
import {Ionicons} from "@expo/vector-icons";
import {getDirectName} from "../../utils/chat-helpers";
import {useAppSelector} from "../../hooks/useStore";
import {selectUser} from "../../store/slices/userSlice";
import chatItems from "./ChatItems";

interface ChatSettingsProps {
    isOpen: boolean;
    onClose: () => void;
    chat: IChat;
}

const ChatSettings: React.FC<ChatSettingsProps> = ({isOpen, onClose, chat}) => {
    const user = useAppSelector(selectUser)
    const deleteChat = () => {
        console.log('delete chat')
    }

    const leaveChat = () => {
        console.log('leave chat')
    }

    const removeUser = () => {
        console.log('remove user')
    }


    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <Modal.Content w={'90%'} maxW={'100%'}>
                <Modal.CloseButton />
                <Modal.Header bgColor={'primary.700'} p={3}>Settings</Modal.Header>
                <Modal.Body px={3} py={0}>
                    <Box flexDir={'row'} py={4} mb={4} alignItems={'center'} borderBottomWidth={1} borderBottomColor={'coolGray.100'}>
                        <Pressable position={'relative'}>
                            <Avatar mr={4} colorScheme={'secondary'} source={{uri: chat.image_url}}>{chat?.name?.slice(0, 2) || getDirectName(user!.id,chat.members)?.fullName.slice(0,2)}</Avatar>
                            {chat.type === "group" &&
                                <Icon as={Ionicons} name={'add'} position={'absolute'} bottom={-6} right={2} size={'xl'} color={'secondary.500'} borderRadius={'50%'}  />}
                        </Pressable>
                        <Heading size={'md'}>{chat.name || getDirectName(user!.id,chat.members)?.fullName}</Heading>
                        <Spacer />
                        <Menu w="190" trigger={(triggerProps: any) => {
                            return  <IconButton icon={<Icon as={Ionicons} name={'ellipsis-vertical-circle'} size={'lg'} />} {...triggerProps} />
                        }}>
                            <Menu.Item onPress={deleteChat} alignItems={'center'}>
                                {user?.id === chat.admin.id || chat.type === "direct" ? (
                                      <>
                                          <Icon as={Ionicons} name={'trash'} size={'md'} />
                                          <Heading size={'md'}>Delete {chat.type}</Heading>
                                      </>
                                ) : (
                                   <>
                                       <Icon as={Ionicons} name={'log-out'} size={'md'} />
                                       <Heading size={'md'}>Leave {chat.type}</Heading>
                                   </>
                                )}
                            </Menu.Item>
                        </Menu>
                    </Box>
                    <HStack mb={3} alignItems={'center'}>
                        <Icon as={Ionicons} name={'people'} size={'lg'} mr={3} />
                        <Heading size={'md'}>Members</Heading>
                    </HStack>
                </Modal.Body>
                <FlatList w={'100%'} px={3} data={chat.members} renderItem={({item}) => <ChatMemberItem item={item} isAdmin={chat.admin.id === user?.id && item.user.id !== user?.id} onRemove={removeUser} />} keyExtractor={(item) => item.id.toString()} />
            </Modal.Content>
        </Modal>
    );
};

interface ChatMemberItemProps {
    item: IMember,
    isAdmin?: boolean
    onRemove?: () => void
}
const ChatMemberItem: React.FC<ChatMemberItemProps> = ({item,isAdmin, onRemove}) => {
    return (
        <Pressable borderBottomWidth="1" _dark={{
            borderColor: "muted.50"
        }} borderColor="coolGray.200" pl={["0", "4"]} pr={["0", "5"]} py="2">
            <HStack space={[2, 3]} justifyContent="space-between">
                <Avatar size="48px" source={{
                    uri: item.user.image_url
                }} />
                <VStack>
                    <Text _dark={{
                        color: "warmGray.50"
                    }} color="coolGray.800" bold>
                        {item.user.fullName}
                    </Text>
                    <Text color="coolGray.600" _dark={{
                        color: "warmGray.200"
                    }}>
                        {item.user.email}
                    </Text>
                </VStack>
                <Spacer />
                {isAdmin && (
                        <IconButton icon={<Icon as={Ionicons} name={'person-remove'} size={'md'} />} onPress={onRemove} />
                    )}
            </HStack>
        </Pressable>
    )
}

export default ChatSettings;