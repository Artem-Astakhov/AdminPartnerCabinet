import * as React from 'react';
import { Card, CardHeader, List } from '@mui/material';
import { useTranslate } from 'react-admin';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { Link, To } from 'react-router-dom';


import { LoanRequest, Order } from '../types';
import { PendingOrder } from './PendingOrder';

interface Props {
    orders?: LoanRequest[];
}

const PendingOrders = (props: Props) => {
    const { orders = [] } = props;
    const translate = useTranslate();

    return (
        <Card sx={{ flex: 1 }}>
            <div style={{display:'flex', flexDirection:'row'}}><CardHeader title={translate('pos.dashboard.pending_orders')}/>
                <div style={{marginTop:'auto', marginBottom:'auto', marginLeft:'auto', marginRight:'3%'}}><Link to={'/loanRequest'}><PlayCircleOutlineIcon color='success' fontSize='large'/></Link></div>
            </div>
            <List dense={true}>
                {orders.map(record => (
                    <PendingOrder key={record.id} order={record} />
                ))}
            </List>
        </Card>
    );
};

export default PendingOrders;
