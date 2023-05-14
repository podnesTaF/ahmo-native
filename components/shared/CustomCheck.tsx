import React from 'react';
import {Checkbox, HStack, Spacer} from "native-base";

interface CustomCheckProps {
    value: string;
    setValue: any;
    label?: string;
    size?: string;
}
const CustomCheck: React.FC<CustomCheckProps> = ({value, setValue, label, size}) => {

    return (
        <HStack space={3} mb={2} p={3} w={'100%'} bgColor={'primary.900'} borderRadius={8} borderWidth={1} borderColor={'secondary.600'}>
            <Checkbox value={value} onChange={setValue} size={size} _text={{
                fontSize: 20,
                color: 'white'
            }} colorScheme="success"
            >
                <Spacer />
                {label}
            </Checkbox>
        </HStack>
    );
};

export default CustomCheck;