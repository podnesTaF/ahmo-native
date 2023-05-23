import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  AlertDialog,
  Avatar,
  Box,
  Button,
  FlatList,
  FormControl,
  Heading,
  HStack,
  Icon,
  IconButton,
  Input,
  Menu,
  Modal,
  Pressable,
  Spacer,
  Text,
  VStack,
} from "native-base";
import React, { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/useStore";
import { IChat, IMember } from "../../models/chat";
import {
  useDeleteChatMutation,
  useRemoveMemberMutation,
  useUpdateChatMutation,
} from "../../services/chatService";
import { removeActiveChat } from "../../store/slices/chatSlice";
import { selectUser } from "../../store/slices/userSlice";
import { getDirectName } from "../../utils/chat-helpers";

interface ChatSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  chat: IChat;
}

const ChatSettings: React.FC<ChatSettingsProps> = ({
  isOpen,
  onClose,
  chat,
}) => {
  const navigation = useNavigation();
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const [openAlertDialog, setOpenAlertDialog] = React.useState(false);
  const [confirm, setConfirm] = React.useState<boolean | null>();
  const [typeOfConfirm, setTypeOfConfirm] = React.useState<string>();
  const [memberId, setMemberId] = React.useState<number>();
  const [imageDialogOpen, setImageDialogOpen] = React.useState(false);
  const [image_url, setImage_url] = React.useState("");

  const [removeMember, result] = useRemoveMemberMutation();
  const [deleteChat, deleteResult] = useDeleteChatMutation();
  const [updateChat, updateResult] = useUpdateChatMutation();

  const openConfirmation = (action: string) => {
    setTypeOfConfirm(action);
    setOpenAlertDialog(true);
  };

  const leaveGroup = useCallback(async () => {
    if (user?.id) {
      const member = chat.members.find((m) => m.user.id === user.id);
      if (member) {
        await removeMember(member.id);
        // @ts-ignore
        navigation.navigate("Menu");
      }
      onClose();

      dispatch(removeActiveChat());
    }
  }, [user?.id, chat.members, removeMember, dispatch]);

  const closeImageDialog = () => {
    setImageDialogOpen(false);
    setImage_url("");
  };

  const deleteGroup = useCallback(async () => {
    try {
      await deleteChat(chat.id);
      // @ts-ignore
      navigation.navigate("Menu");
      dispatch(removeActiveChat());
      onClose();
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, chat.id, deleteChat]);

  const deletePerson = useCallback(async () => {
    if (memberId) {
      await removeMember(memberId);
      onClose();
    }
    setConfirm(null);
  }, [setConfirm, memberId, removeMember]);

  const updateImage = async () => {
    if (image_url.length > 5) {
      await updateChat({ chatId: chat.id, image_url });
      closeImageDialog();
    }
  };

  React.useEffect(() => {
    if (confirm) {
      if (typeOfConfirm === "leave") {
        leaveGroup();
      } else if (typeOfConfirm === "delete") {
        deleteGroup();
      } else {
        deletePerson();
      }
    }
  }, [confirm, typeOfConfirm, leaveGroup, deleteGroup, deletePerson]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Modal.Content w={"90%"} maxW={"100%"}>
          <Modal.CloseButton />
          <Modal.Header bgColor={"primary.700"} p={3}>
            Settings
          </Modal.Header>
          <Modal.Body px={3} py={0}>
            <Box
              flexDir={"row"}
              py={4}
              mb={4}
              alignItems={"center"}
              borderBottomWidth={1}
              borderBottomColor={"coolGray.100"}
            >
              <Pressable
                position={"relative"}
                onPress={() => setImageDialogOpen(true)}
              >
                <Avatar
                  mr={4}
                  colorScheme={"secondary"}
                  source={{ uri: chat.image_url }}
                >
                  {chat?.name?.slice(0, 2) ||
                    getDirectName(user!.id, chat.members)?.fullName.slice(0, 2)}
                </Avatar>
                {chat.type === "group" && (
                  <Icon
                    as={Ionicons}
                    name={"add"}
                    position={"absolute"}
                    bottom={-6}
                    right={2}
                    size={"xl"}
                    color={"secondary.500"}
                    borderRadius={999}
                  />
                )}
              </Pressable>
              <Heading size={"md"}>
                {chat.name || getDirectName(user!.id, chat.members)?.fullName}
              </Heading>
              <Spacer />
              <Menu
                w="190"
                trigger={(triggerProps: any) => {
                  return (
                    <IconButton
                      icon={
                        <Icon
                          as={Ionicons}
                          name={"ellipsis-vertical-circle"}
                          size={"lg"}
                        />
                      }
                      {...triggerProps}
                    />
                  );
                }}
              >
                {user?.id === chat.admin.id || chat.type === "direct" ? (
                  <Menu.Item
                    onPress={() => openConfirmation("delete")}
                    alignItems={"center"}
                  >
                    <Icon as={Ionicons} name={"trash"} size={"md"} />
                    <Heading size={"md"}>Delete {chat.type}</Heading>
                  </Menu.Item>
                ) : (
                  <Menu.Item
                    onPress={() => openConfirmation("leave")}
                    alignItems={"center"}
                  >
                    <Icon as={Ionicons} name={"log-out"} size={"md"} />
                    <Heading size={"md"}>Leave {chat.type}</Heading>
                  </Menu.Item>
                )}
              </Menu>
            </Box>
            <HStack mb={3} alignItems={"center"}>
              <Icon as={Ionicons} name={"people"} size={"lg"} mr={3} />
              <Heading size={"md"}>Members</Heading>
            </HStack>
          </Modal.Body>
          <FlatList
            w={"100%"}
            px={3}
            data={chat.members}
            renderItem={({ item }) => (
              <ChatMemberItem
                navigation={navigation}
                item={item}
                isAdmin={
                  chat.admin.id === user?.id && item.user.id !== user?.id
                }
                onRemove={() => {
                  openConfirmation("remove");
                  setMemberId(item.id);
                }}
              />
            )}
            keyExtractor={(item: IMember) => item.id.toString()}
          />
        </Modal.Content>
      </Modal>
      <SettingAlert
        open={openAlertDialog}
        setConfirm={setConfirm}
        setOpen={setOpenAlertDialog}
        title={"Are you sure?"}
      />
      <Modal isOpen={imageDialogOpen} onClose={closeImageDialog}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Change Group Image</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Image url</FormControl.Label>
              <Input
                value={image_url}
                onChangeText={(text) => setImage_url(text)}
              />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={closeImageDialog}
              >
                Cancel
              </Button>
              <Button onPress={updateImage}>Save</Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};

interface SettingAlertProps {
  title: string;
  open: boolean;
  setOpen: Function;
  setConfirm: Function;
}

const SettingAlert: React.FC<SettingAlertProps> = ({
  title,
  open,
  setOpen,
  setConfirm,
}) => {
  const cancelRef = React.useRef(null);

  const cancel = () => {
    setOpen(false);
    setConfirm(false);
  };

  const confirm = () => {
    setOpen(false);
    setConfirm(true);
  };

  return (
    <AlertDialog leastDestructiveRef={cancelRef} onClose={cancel} isOpen={open}>
      <AlertDialog.Content>
        <AlertDialog.CloseButton />
        <AlertDialog.Header>{title}</AlertDialog.Header>
        <AlertDialog.Footer>
          <Button.Group space={2}>
            <Button
              variant="unstyled"
              colorScheme="coolGray"
              onPress={cancel}
              ref={cancelRef}
            >
              Cancel
            </Button>
            <Button colorScheme="danger" onPress={confirm}>
              Confirm
            </Button>
          </Button.Group>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  );
};

interface ChatMemberItemProps {
  item: IMember;
  isAdmin?: boolean;
  onRemove?: () => void;
  navigation: any;
}
const ChatMemberItem: React.FC<ChatMemberItemProps> = ({
  item,
  navigation,
  isAdmin,
  onRemove,
}) => {
  return (
    <>
      <Pressable
        onPress={() => navigation.navigate("Profile", { userId: item.user.id })}
        borderBottomWidth="1"
        _dark={{
          borderColor: "muted.50",
        }}
        borderColor="coolGray.200"
        pl={["0", "4"]}
        pr={["0", "5"]}
        py="2"
      >
        <HStack space={[2, 3]} justifyContent="space-between">
          <Avatar
            size="48px"
            source={{
              uri: item.user.image_url,
            }}
          />
          <VStack>
            <Text
              _dark={{
                color: "warmGray.50",
              }}
              color="coolGray.800"
              bold
            >
              {item.user.fullName}
            </Text>
            <Text
              color="coolGray.600"
              _dark={{
                color: "warmGray.200",
              }}
            >
              {item.user.email}
            </Text>
          </VStack>
          <Spacer />
          {isAdmin && (
            <IconButton
              icon={<Icon as={Ionicons} name={"person-remove"} size={"md"} />}
              onPress={onRemove}
            />
          )}
        </HStack>
      </Pressable>
    </>
  );
};

export default ChatSettings;
