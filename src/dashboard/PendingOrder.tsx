import * as React from 'react';
import {
    ListItem,
    ListItemSecondaryAction,
    ListItemAvatar,
    ListItemText,
    Avatar,
    Box,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslate, useReference } from 'react-admin';

import { Customer, Order, LoanRequest } from '../types';

interface Props {
    order: LoanRequest;
}

export const PendingOrder = (props: Props) => {
    const { order } = props;
    const translate = useTranslate();
    const { referenceRecord: customer, isLoading } = useReference<Customer>({
        reference: 'customers',
        id: order.customer_id,
    });

    return (
        <ListItem button component={Link} to={`/loanRequest/${order.id}`}>
            <ListItemText
                primary={new Date(order.createdOn).toLocaleString('en-GB')}
                secondary={translate('pos.dashboard.order.items', {
                    smart_count: 1,
                    nb_items: 1,
                    customer_name: order.contactName,
                })}
            />
            <ListItemSecondaryAction>
                <Box
                    component="span"
                    sx={{
                        marginRight: '1em',
                        color: 'text.primary',
                    }}
                >
                    {order.total}$
                </Box>
            </ListItemSecondaryAction>
        </ListItem>
    );
};
