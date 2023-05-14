import React from 'react';
import {HStack} from "native-base";
import {useAppDispatch, useAppSelector} from "../../hooks/useStore";
import {menuType, selectMenuType, setType} from "../../store/slices/menuSlice";
import ChatTypeTab from "./ChatTypeTab";

const tabs = [
    'All',
    'Game',
    'Direct',
    'Group'
]

const Tabs = () => {
    const dispatch = useAppDispatch();
    const selectedType = useAppSelector(selectMenuType);

    const changeType = (type: any) => {
        dispatch(setType(type));
    }

    return (
        <HStack w={'100%'} justifyContent={'center'}>
            {tabs.map((item, i) =>  <ChatTypeTab selectedType={selectedType} changeType={changeType} name={item} key={i} />)}
        </HStack>
    );
};

export default Tabs;