import * as React from 'react';
import { Fragment } from 'react';
import Button from '@mui/material/Toolbar';
import CancelIcon from '@mui/icons-material/Cancel';
import {
    SaveButton,
    DeleteButton,
    Toolbar,
    ToolbarProps,
    useRecordContext,
    useNotify,
    useRedirect,
} from 'react-admin';
//import AcceptButton from './AcceptButton';
//import RejectButton from '../reviews/RejectButton';
import { LoanRequest } from '../types';

const CreateToolbar = (props: ToolbarProps) => {
    const { resource } = props;
    const redirect = useRedirect();
    const notify = useNotify();

    const record = useRecordContext<LoanRequest>();
    const back = ()=>{
        redirect('/');
    }

    return (
        <Toolbar
        sx={{
            backgroundColor: 'light-gray',
            justifyContent: 'space-between',
        }}>
                <SaveButton label='Надіслати'/>
                <SaveButton onClick={back} label='Відмінити' color='error' alwaysEnable icon={<CancelIcon/>}/>                
        </Toolbar>
    );
};

export default CreateToolbar;
