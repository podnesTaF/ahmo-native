import React, {ReactNode, useCallback, useEffect} from 'react';
import {Alert, CloseIcon, HStack, IconButton, VStack, Text, Collapse} from "native-base";

interface StatusAlertProps {
    status?: any;
    children: ReactNode;
    open: boolean;
    setOpen: Function;
    setAlertContent: Function;
}

const StatusAlert: React.FC<StatusAlertProps> = ({status, open, setOpen, setAlertContent, children}) => {
    const handleCloseAlert = useCallback(() => {
        setOpen(false);
        setAlertContent("");
    }, [setOpen, setAlertContent]);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (open) {
            timer = setTimeout(() => {
                handleCloseAlert();
            }, 3000);
        }
        return () => {
            clearTimeout(timer);
        };
    }, [open, handleCloseAlert]);

    return (
        <Collapse isOpen={open}>
            <Alert variant={'left-accent'} w="100%" status={status}>
                <VStack space={2} flexShrink={1} w="100%">
                    <HStack flexShrink={1} space={2} justifyContent="space-between">
                        <HStack space={2} flexShrink={1}>
                            <Alert.Icon mt="1" />
                            <Text fontSize="md" color="coolGray.800">
                                {children}
                            </Text>
                        </HStack>
                        <IconButton variant="unstyled" _focus={{
                            borderWidth: 0
                        }} icon={<CloseIcon size="3" />} _icon={{
                            color: "coolGray.600"
                        }} />
                    </HStack>
                </VStack>
            </Alert>
        </Collapse>
    );
};

export default StatusAlert;