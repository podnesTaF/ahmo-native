import React from 'react';
import {FormControl, Input, WarningOutlineIcon, Text} from "native-base";
import {Controller, useFormContext} from "react-hook-form";

interface FormFieldProps {
    name: string;
    textColor?: string;
    bgColor?: string;
    label: string;
    type?: "text" | "password" | undefined;
    placeholder?: string;
    variant?: string;
    children?: React.ReactNode;
}

const FormField: React.FC<FormFieldProps> = ({textColor, name, bgColor, label, type, placeholder,variant, children}) => {
    const { control, formState } = useFormContext();


    return (
        <FormControl isInvalid={!!formState.errors[name]}>
            <FormControl.Label _text={{color: textColor || 'white'}}>{label}</FormControl.Label>
            <Controller
                control={control}
                rules={{required: true}}
                render={({ field: { onChange, onBlur, value } }) => (
                <Input
                    placeholder={placeholder}
                    bg={bgColor}
                    variant={variant || "outline"}
                    _focus={{
                        backgroundColor: bgColor || "primary.700",
                    }}
                    color={"gray.100"}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    type={type || "text"}
                    autoCapitalize="none"
                />
                )}
                name={name}
                defaultValue=""
                    />
            {formState.errors[name] && (
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                    <Text color="red.500">{formState.errors[name]?.message?.toString() || 'something went wrong'}</Text>
                </FormControl.ErrorMessage>
            )}
            {children}
        </FormControl>
    );
};

export default FormField;