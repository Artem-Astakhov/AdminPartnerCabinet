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
                return 'gray';
            case 3:
                return 'blue';
            case 5:
                return 'green';
            case 4:
                return 'olive';
            default: return 'gray';

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
                                {translate('resources.reviews.fields.date')}
                                :&nbsp;
                                <DateField source="createdOn" showTime />
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                {translate(
                                    'resources.commands.fields.basket.total'
                                )}
                                :&nbsp;
                                <NumberField
                                    source="carPrice"
                                    options={{
                                        style: 'currency',
                                        currency: 'UAH',
                                    }}
                                />
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                {translate('resources.commands.fields.status')}
                                :&nbsp;
                                <TextField source="status" />
                            </Typography>
                            <Typography variant="body2">
                                {'Name'}
                                :&nbsp;
                                <TextField source="contactName" />
                            </Typography>
                            <Typography variant="body2">
                            &nbsp;
                                <Progress progress='ratio' value={record.step} total={5} active size='medium' color={setProgressBarColor(record.step) as any}></Progress>
                            </Typography>
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
