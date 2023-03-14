import {
    Create,
    DateInput,
    SimpleForm,
    TextInput,
    useTranslate,
    PasswordInput,
    email,
} from 'react-admin';
import { Box, Typography } from '@mui/material';
import { Form, Accordion } from 'semantic-ui-react'
import React, {useState} from 'react';

export const validateForm = (
    values: Record<string, any>
): Record<string, any> => {
    const errors = {} as any;

    if (!values.email) {
        errors.email = 'ra.validation.required';
    } else {
        const error = email()(values.email);
        if (error) {
            errors.email = error;
        }
    }
    
    return errors;
};


const RequestCreate = () => {
    const [activeIndex, SetactiveIndex] = useState<number>(-1);

    const AcForm = (
        <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
            <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                <TextInput source="firstPayment" label='Початковий внесок'  fullWidth helperText={false}/>
                <TextInput source="passport" label='Паспорт'  fullWidth helperText={false}/>
            </Box>
        </Box>        
    ) 
    const acClick = (titleProps:any) =>{
        var index = titleProps;
        const newIndex = activeIndex === index ? -1 : index;
        SetactiveIndex(newIndex);
    }
    
return(

    <Create>
        <SimpleForm
            sx={{ maxWidth: 500 }}
            validate={validateForm}
        >
            <SectionTitle label="resources.customers.fieldGroups.identity" />
            <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
                <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                    <TextInput source="contactName" label="Прізвище, ім'я та по батькові" isRequired fullWidth helperText={false}/>
                </Box>
                <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                <TextInput type="email" source="email" label ='Email' isRequired fullWidth helperText={false}/>
                </Box>
                <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                <TextInput source="contactPhone" label='Телефон' isRequired fullWidth helperText={false}/>
                </Box>
            </Box>
            <TextInput source="contactIpn"  fullWidth/>
            <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
                <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                    <TextInput source="carName" label='Машина' fullWidth helperText={false} />
                </Box>
                <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                    <TextInput
                        source="carNumber"
                        label = 'Держ. номер авто'
                        fullWidth
                        helperText={false}
                    />
                </Box>
                <Box flex={2}>
                    <TextInput source="carPrice" label='Ціна' fullWidth helperText={false} />
                </Box>
            </Box>
            <Separator />
            <Accordion as={Form.Field}>                       
                    <Accordion.Title active = {activeIndex === 0} onClick={() =>{acClick(0)}} content='Додатково (за бажанням)' index={0}/>
                    <Accordion.Content active = {activeIndex === 0} content={AcForm}/>                                           
            </Accordion>
        </SimpleForm>
    </Create>
);
}
const SectionTitle = ({ label }: { label: string }) => {
    const translate = useTranslate();

    return (
        <Typography variant="h6" gutterBottom>
            {translate(label as string)}
        </Typography>
    );
};

const Separator = () => <Box pt="0.5em" />;

export default RequestCreate;
