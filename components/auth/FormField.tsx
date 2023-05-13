import React from 'react';
import {FormControl, Input, WarningOutlineIcon} from "native-base";
import {useFormContext} from "react-hook-form";

interface FormFieldProps {
    name: string;
    textColor?: string;
    bgColor?: string;
    label: string;
    type?: string;
    placeholder?: string;
    variant?: string;
    children?: React.ReactNode;
}

const FormField: React.FC<FormFieldProps> = ({textColor, name, bgColor, label, type, placeholder,variant, children}) => {
    const { register, formState } = useFormContext();

    return (
        <FormControl>
            <FormControl.Label _text={{color: textColor || 'white'}}>{label}</FormControl.Label>
            <Input  {...register(name)} placeholder={placeholder} bg={bgColor} variant={variant || 'outline'} _focus={{
                backgroundColor: bgColor || 'primary.700',
            }} color={'gray.100'} />
            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                At least 6 characters are required.
            </FormControl.ErrorMessage>
            {children}
        </FormControl>
    );
};

export default FormField;