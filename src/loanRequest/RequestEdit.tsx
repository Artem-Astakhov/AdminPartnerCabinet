import * as React from 'react';
import {
    BooleanInput,
    DateField,
    Edit,
    Form,
    Labeled,
    ReferenceField,
    SelectInput,
    TextField,
    Toolbar,
    useRecordContext,
    useTranslate,
} from 'react-admin';
import { Link as RouterLink } from 'react-router-dom';
import { Card, CardContent, Box, Grid, Typography, Link } from '@mui/material';
import VerticalLinearStepper from './LinearStepper';

import { Order, Customer, LoanRequest } from '../types';

import RequestInfo from './RequestInfo';

const RequestEdit = () => (
    <Edit title={<OrderTitle />} component="div">
        <OrderForm />
    </Edit>
);

const OrderTitle = () => {
    const translate = useTranslate();
    const record = useRecordContext<LoanRequest>();
    return record ? (
        <span>
            {translate('resources.commands.title', {
                carName: record.carName,
            })}
        </span>
    ) : null;
};

const Spacer = () => <Box m={1}>&nbsp;</Box>;

const OrderForm = () => {
    const translate = useTranslate();
    const record = useRecordContext<LoanRequest>();
    return (
        <Form>
            <Box maxWidth="50em">
                <Card>
                    <CardContent>
                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={12} md={8}>
                                <Grid container>
                                    <Grid item xs={12} sm={12} md={6}>
                                        <Labeled source="дата">
                                            <DateField source="createdOn" />
                                        </Labeled>
                                    </Grid>
                                    {/* <Grid item xs={12} sm={12} md={6}>
                                        <Labeled source="carName">
                                            <TextField source="carName" />
                                        </Labeled>
                                    </Grid> */}
                                </Grid>
                                <Grid container>
                                    <Grid item xs={12} sm={12} md={6}>
                                        <SelectInput
                                            source="status"
                                            label="Статус" 
                                            choices={[
                                                {
                                                    id: 'InProgress',
                                                    name: 'В прогресі',

                                                },
                                                {
                                                    id: 'Done',
                                                    name: 'Виконаний',
                                                    disabled: true,
                                                },
                                                {
                                                    id: 'Canceled',
                                                    name: 'Відмінений',
                                                    disabled: true,
                                                },
                                            ]}                                          
                                        />
                                    </Grid>                                   
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={12} md={4}>
                                <Typography variant="h6" gutterBottom>
                                    {'Клієнт'}
                                </Typography>
                                <TextField
                                    source="contactName"
                                >
                                </TextField>                              
                            </Grid>
                        </Grid>
                        <Spacer />
                        <Typography variant="h6" gutterBottom>
                            {"Інформація про запит"}
                        </Typography>
                        <div>
                            <RequestInfo name={record.carName} price={record.carPrice} quantity={1} firstPayment={record.firstPayment} />
                        </div>
                        <Spacer />
                        <Grid item xs={12} sm={12} md={4}>
                            <Typography variant="h6" gutterBottom>
                                {'Кроки'}
                            </Typography>
                            <div>
                                <VerticalLinearStepper activeStep={record.step} data ={record.requestHistoryDates}/> 
                            </div>
                        </Grid> 
                        <Spacer />
                        <Spacer /> 
                                             
                    </CardContent>                    
                    <Toolbar />
                </Card>               
            </Box>
        </Form>
    );
};

export default RequestEdit;
