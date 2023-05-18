import React from 'react';
import {IUser} from "../../models/user";
import {IRound} from "../../models/game";
import {selectMembers} from "../../store/slices/chatSlice";
import {useAppSelector} from "../../hooks/useStore";
import {Box, FlatList, Heading} from "native-base";
import {getRoundWinnerMessage} from "../../utils/round-helpers";
import GameMove from "./GameMove";

interface TruthDareRoundProps {
    round: IRound;
    user: IUser;
    activeRound: any;
}

const TruthDareRound: React.FC<TruthDareRoundProps> = ({round, activeRound, user}) => {
    const members = useAppSelector(selectMembers);
    return (
        <>
            <FlatList data={round.moves} renderItem={({item}) => <GameMove move={item} my={user.id === item.player.id} />} keyExtractor={(item) => item.id.toString()} />
            {activeRound.round_winner ||
                (round.id !== activeRound?.id && (
                    <Box w={'100%'} alignItems={'center'}>
                        <Heading fontSize={'18'}>{getRoundWinnerMessage(round, members, "truth or dare")}</Heading>
                    </Box>
                ))}
        </>
    );
};

export default TruthDareRound;