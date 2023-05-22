import React, {useState} from 'react';
import {Box, Button, FormControl, Heading, Input, Text} from "native-base";
import {isEmail} from "../../utils/validation";

interface EditableTextProps {
    oldValue: string;
    onSubmit: Function
    placeholder?: string;
    label?: string;
}

const EditableText: React.FC<EditableTextProps> = ({ onSubmit, placeholder, oldValue, label}) => {
    const [value, setValue] = React.useState<string>(oldValue)
    const [isEditable, setIsEditable] = useState(true);
    const handleIconClick = () => {
        if (isEditable && onSubmit) {
            onSubmit(value);
        }
        if(label === 'Email' && !isEmail(value)) {
            setIsEditable(true)
            setValue(oldValue)
        }
        setIsEditable(!isEditable);
    };

    return (
        <Box>
            <FormControl>
                <FormControl.Label>{label}</FormControl.Label>
                <Input w="100%" py="0" isDisabled={!isEditable} placeholder={placeholder} value={value} onChangeText={(text) => setValue(text)} InputRightElement={
                    <Button onPress={handleIconClick}  w="1/4" h="full">{isEditable ? 'Update' : 'Edit'}</Button>
                } />
            </FormControl>
        </Box>
    );
};

export default EditableText;