import React from 'react';
import {FormControl, Input} from "native-base";


interface GameInputProps {
    onChangeText: (text: string) => void;
    value: string;
    placeholder: string;
    label: string;
}

const GameInput: React.FC<GameInputProps> = ({onChangeText, value, placeholder, label}) => {
    return (
        <FormControl w={'70%'}>
            <FormControl.Label>{label}</FormControl.Label>
            <Input
                onChangeText={onChangeText}
                value={value}
                placeholder={placeholder}
                variant={'underlined'}
                colorScheme={'warning'}
                _focus={{
                    backgroundColor: "warning.700",
                }}
                color={"gray.100"}
                type={"text"}
                size={'lg'}
            />
        </FormControl>
    );
};

export default GameInput;