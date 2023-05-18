import React from 'react';
import {useAppSelector} from "../../hooks/useStore";
import {selectUser} from "../../store/slices/userSlice";
import {selectActiveRound} from "../../store/slices/roundSlice";
import {selectMembers} from "../../store/slices/chatSlice";
import {Box, Heading, Text} from "native-base";
import {getGuesser, getStatusForCurrentUser} from "../../utils/round-helpers";

interface RoundDataProps {
    count?: number;
    gameType?: string | null;
}

const RoundData: React.FC<RoundDataProps> = ({count, gameType}) => {
    const user = useAppSelector(selectUser)
    const activeRound = useAppSelector(selectActiveRound)
    const members = useAppSelector(selectMembers);
    return (
        <Box bgColor={'primary.500'} position={'absolute'} top={0} left={0} w={'100%'} p={3} zIndex={2}>
            <Box flexDir={'row'} justifyContent={'space-between'}>
                <Heading mb={2} fontSize={18} color={'coolGray.200'} fontWeight={'bold'}>Round {count}</Heading>
                <Box flexDir={'row'}>
                    <Text mr={2}>Riddler: {activeRound?.riddler?.fullName}</Text>
                    <Text>Guesser: {activeRound.riddler &&
                        user &&
                        getGuesser(members, user, activeRound.riddler)}</Text>
                </Box>
            </Box>
            <Text>
                {activeRound.id &&
                    user && gameType &&
                    getStatusForCurrentUser(activeRound, user, gameType)}
            </Text>
        </Box>
    );
};

export default RoundData;