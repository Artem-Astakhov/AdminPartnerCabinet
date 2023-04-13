// in src/comments.js
import * as React from 'react';
import { Box, Card, CardHeader, CardContent, Typography } from '@mui/material';
import { Progress } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

import {
    DateField,
    EditButton,
    NumberField,
    TextField,
    BooleanField,
    useTranslate,
    useListContext,
    RaRecord,
    RecordContextProvider,
} from 'react-admin';

import CustomerReferenceField from '../visitors/CustomerReferenceField';
import { Order } from '../types';
import { string } from 'prop-types';

interface MobileGridProps {
    data?: RaRecord[];
}

const MobileGrid = (props: MobileGridProps) => {
    const { data, isLoading } = useListContext<Order>();
    const translate = useTranslate();

    function setProgressBarColor(number:any){
        switch(number){
            case 1:
                return 'grey';
            case 2:
                return 'yellow';
            case 3:
                return 'olive';
            case 4:
                return 'green';
            default: return 'grey';

        }
    }

    if (isLoading || data.length === 0) {
        return null;
    }
    return (
        
        <Box margin="0.5em">
            {data.map(record => (
                <RecordContextProvider key={record.id} value={record}>
                    <Card sx={{ margin: '0.5rem 0' }}>
                        <CardHeader
                            title={
                                <>
                                    {translate('resources.commands.name', 1)} #
                                    <TextField
                                        source="carName"
                                        variant="body1"
                                    />
                                </>
                            }
                            titleTypographyProps={{ variant: 'body1' }}
                            action={<EditButton />}
                        />
                        <CardContent sx={{ pt: 0 }}>
                            <CustomerReferenceField
                                sx={{ display: 'block', mb: 1 }}
                            />
                            <Typography variant="body2" gutterBottom>
                                {"Дата"}
                                :&nbsp;
                                <DateField source="createdOn" showTime />
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                {"Ціна"}
                                :&nbsp;
                                <NumberField
                                    source="carPrice"
                                    options={{
                                        style: 'currency',
                                        currency: 'UAH',
                                    }}
                                />
                            </Typography>
                            {/* <Typography variant="body2" gutterBottom>
                                {"Статус"}
                                :&nbsp;
                                <TextField source="status" />
                            </Typography>
                            <Typography variant="body2">
                                {"Ім'я"}
                                :&nbsp;
                                <TextField source="contactName" />
                            </Typography> */}
                            <Typography variant="body2">
                            &nbsp;                        
                            </Typography>
                            <Progress progress='ratio' value={record.step} total={4} active size='medium' color={setProgressBarColor(record.step) as any}></Progress>
                        </CardContent>
                    </Card>
                </RecordContextProvider>
            ))}
        </Box>
    );
};

MobileGrid.defaultProps = {
    data: {},
    ids: [],
};

export default MobileGrid;
