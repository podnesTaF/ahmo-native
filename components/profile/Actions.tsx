import React from 'react';
import {Icon, IconButton, VStack} from "native-base";
import {Ionicons} from "@expo/vector-icons";

interface ActionsProps {
    onChange: (action: any) => void;
    action: any
}

const Actions: React.FC<ActionsProps> = ({onChange,action}) => {
    return (
        <VStack space={2}>
            <IconButton onPress={() => onChange('photo')} borderRadius={999} variant={action === 'photo' ? 'outline' : "solid"} icon={<Icon as={Ionicons} name={'add-circle-outline'} size={'md'} />} />
            <IconButton onPress={() => onChange('edit')} borderRadius={999}  variant={action === 'edit' ? 'outline' : "solid"} icon={<Icon as={Ionicons} name={'pencil-outline'} size={'md'} />} />
            <IconButton onPress={() => onChange('change')} borderRadius={999}  variant={action === 'change' ? 'outline' : "solid"} icon={<Icon as={Ionicons} name={'lock-closed-outline'} size={'md'} />} />
        </VStack>
    );
};

export default Actions;