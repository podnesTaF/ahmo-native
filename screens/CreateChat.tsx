import React, {useState} from 'react';
import {Center, Text, Heading, VStack, Box, Button, HStack, Input, Radio, Icon, FlatList, Spinner} from "native-base";
import CustomCheck from "../components/shared/CustomCheck";
import {useAppSelector} from "../hooks/useStore";
import {selectUser} from "../store/slices/userSlice";
import {useCreateGroupMutation, useGetChatByTypeQuery} from "../services/chatService";
import {useSearchUsersQuery} from "../services/authService";
import CustomRadio from "../components/shared/CustomRadio";
import {Ionicons} from "@expo/vector-icons";
import {IUser} from "../models/user";

interface CreateChatProps {
    route: any;
    navigation: any;
}

const CreateChat: React.FC<CreateChatProps> = ({route, navigation}) => {
    const [activeStep, setActiveStep] = useState(0);
    const userData = useAppSelector(selectUser)!;
    const [name, setName] = useState<string>("");
    const [query, setQuery] = useState<string>("");
    const [members, setMembers] = useState<number[]>([]);
    const [directMember, setDirectMember] = useState<number>();
    const [chosenGame, setChosenGame] = useState<string>("");
    const [chatType, setChatType] = useState<"group" | "direct" | "game">();
    const {
        data: directChats,
        isLoading: isDirectChatsLoading,
        error: directError,
    } = useGetChatByTypeQuery("direct");
    const { data, isLoading, error, isFetching } = useSearchUsersQuery({
        query,
        type: "direct",
    });
    const [createGroup, chatsResult] = useCreateGroupMutation();

    const handleBack = () => {
        if (activeStep > 0) {
            setActiveStep(activeStep - 1);
        }
    }

    const handleNext = async () => {
        if (activeStep < 3) {
            if (activeStep === 1 && chatType !== "game") {
                setActiveStep((prev) => prev + 2);
            } else if (activeStep === 0 && chatType === "direct") {
                setActiveStep((prev) => prev + 3);
            } else {
                setActiveStep(activeStep + 1);
            }
        } else {
            if (chatType === "game") {
                // if (!chosenGame || members.length < 1 || !name) return;
                // await createGame({
                //     members: [userData?.id, ...members].join(","),
                //     game: chosenGame,
                //     type: "game",
                //     name,
                // });
                // if (gameResult.data) {
                //     setChats((prev: IChat[]) => [...prev, chatsResult.data]);
                // }
            } else if (chatType === "direct") {
                let chat;
                if (directChats) {
                    chat = directChats.find(
                        (chat) =>
                            chat.members.find((m) => m.user.id !== userData?.id)?.user.id ===
                            directMember
                    );
                }

                if (chat) {
                    alert("direct chat with that user already exist");
                } else {
                    await createGroup({
                        type: "direct",
                        members: [directMember, userData?.id].join(","),
                    });
                    // if (chatsResult.data) {
                    //     setChats((prev: IChat[]) => [...prev, chatsResult.data]);
                    // }
                }
            } else {
                if (members.length < 1 || !name) return;
                await createGroup({
                    type: "group",
                    name,
                    members: [userData?.id, ...members].join(","),
                });
                // if (chatsResult.data) {
                //     setChats((prev: IChat[]) => [...prev, chatsResult.data]);
                // }
            }
            navigation.navigate("Menu");
        }
    };

    return (
        <Center flex={1} bgColor={'primary.700'}>
           <Box w={'90%'}>
               <Text color={'coolGray.400'} textAlign={'left'}>Step 1</Text>
           </Box>
           <VStack space={2} w={"90%"}>
               {activeStep === 0 && (
                   <>
                       <Heading size={'lg'} color={"primary.200"} my={3}>Choose type of chat</Heading>
                       <Radio.Group name={'chatType'} value={chatType} onChange={(nextValue: any) => {
                           setChatType(nextValue);
                       }}>
                           {['direct', 'group', 'game'].map((type) => (
                               <CustomRadio value={type} label={type.toUpperCase()}/>
                           ))}
                       </Radio.Group>
                   </>
               )}
               {activeStep === 1 && (
                   <>
                       <Heading size={'lg'} color={"primary.200"} my={3}>Choose name of chat</Heading>
                       <Input
                           value={name}
                           onChangeText={(text) => setName(text)}
                           w={'100%'}
                           borderWidth={1}
                           borderColor={'secondary.600'}
                           _focus={{borderColor: 'secondary.500'}}
                           placeholder={'write a name...'}
                           backgroundColor={'primary.500'}
                           color={'coolGray.50'}
                           fontSize={'lg'}
                           padding={3}
                       />
                   </>
               )}
               {chatType === "game" && activeStep === 2 && (
                    <>
                        <Heading size={'lg'} color={"primary.200"} my={3}>Choose a game</Heading>
                        <Radio.Group value={chosenGame} name={'game'} onChange={(prev: any) => setChosenGame(prev) }>
                            {["guess a word", "truth or dare", "words"].map((game, i) => (
                                <CustomRadio value={game} label={game} key={i}  />
                            ))}
                        </Radio.Group>
                    </>
               )}
               {activeStep === 3 && (
                   <>
                      <Box>
                          <Heading size={'lg'} color={"primary.200"} my={3}>Select chat members</Heading>
                          <Input
                              value={query}
                              onChangeText={(text) => setQuery(text)}
                              w={'100%'}
                              borderWidth={1}
                              borderColor={'secondary.600'}
                              _focus={{borderColor: 'secondary.500'}}
                              placeholder={'search a person...'}
                              InputRightElement={
                                  <Icon as={Ionicons} name={'search'} size={6} color={'coolGray.600'} mr={4} />
                              }
                              backgroundColor={'primary.500'}
                              color={'coolGray.50'}
                              fontSize={'lg'}
                              padding={3}
                          />
                      </Box>
                       {(!data?.length && !isFetching) ?
                          <Box h={'70%'}>
                              <Text  color={'coolGray.400'}>No users found</Text>
                          </Box>
                           : isFetching ? (
                               <Center h={'70%'}>
                                      <Spinner color={'secondary.500'} size={'lg'} />
                               </Center>
                           ) : (
                                <FlatList h={'70%'} data={data} renderItem={(itemData: {item: IUser, index: number}) => (
                                    <CustomCheck value={itemData.item.id.toString()} label={itemData.item.fullName} setValue={() => {}}  />
                                )}
                                          keyExtractor={(item) => item.id.toString()}
                                />
                           )
                       }
                   </>
               )}
           </VStack>
            <HStack my={4} w={'90%'} justifyContent={'space-between'}>
                <Button disabled={activeStep <= 0} onPress={handleBack} maxW={20} w='100%' variant={'outline'} colorScheme={'warning'}>
                    Prev
                </Button>
                <Button onPress={handleNext} maxW={20} w='100%'>
                    Next
                </Button>
            </HStack>
        </Center>
    );
};

export default CreateChat;