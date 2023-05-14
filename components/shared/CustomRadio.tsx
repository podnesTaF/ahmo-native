import React from 'react';
import {Checkbox, HStack, Radio, Spacer} from "native-base";

interface CustomRadioProps {
    value: string;
    label?: string;
    size?: string;
}

const CustomRadio: React.FC<CustomRadioProps> = ({value, label, size}) => {
    return (
        <HStack space={3} mb={3} p={3} w={'100%'} bgColor={'primary.900'} borderRadius={8} borderWidth={1} borderColor={'secondary.600'}>
            <Radio value={value} size={size} _text={{
                fontSize: 20,
                color: 'white'
            }} colorScheme="success"
            >
                <Spacer />
                {label}
            </Radio>
        </HStack>
    );
};

export default CustomRadio;