import {
    Create,
    DateInput,
    SimpleForm,
    TextInput,
    useTranslate,
    PasswordInput,
    email,
    FileInput, 
    FileField
} from 'react-admin';
import { Box, Typography } from '@mui/material';
import { Form, Accordion } from 'semantic-ui-react'
import React, {useState} from 'react';
import CreateToolbar from './CreateToolbar';

// export const validateForm = (
//     values: Record<string, any>
// ): Record<string, any> => {
//     const errors = {} as any;

//     if (!values.email) {
//         errors.email = 'ra.validation.required';
//     } else {
//         const error = email()(values.email);
//         if (error) {
//             errors.email = error;
//         }
//     }
    
//     return errors;
// };


const RequestCreate = () => {
    const [activeIndex, SetactiveIndex] = useState<number>(-1);

    const AcForm = (
        <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
            <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                <TextInput source="firstPayment" label='Початковий внесок (за наявності)'  fullWidth helperText={false}/>
                <TextInput source="passport" label='Паспорт (серія та номер)' fullWidth helperText={false}/>
            </Box>
        </Box>        
    ) 
    const acClick = (titleProps:any) =>{
        var index = titleProps;
        const newIndex = activeIndex === index ? -1 : index;
        SetactiveIndex(newIndex);
    }
    const OrderTitle = () => {
        return(
            <span>
                Створення запиту
            </span> 
        )      
    };    
return(

    <Create title={<OrderTitle/>} component="div">
        <SimpleForm
            sx={{ maxWidth: 500 }}
            //validate={validateForm}
            toolbar={<CreateToolbar/>}
        >
            <SectionTitle label="Внесіть наступні дані:" />
            <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
                <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                    <TextInput source="contactName" label="ПІБ, або просто ім'я" isRequired fullWidth helperText={false}/>
                </Box>
                {/* <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                <TextInput type="email" source="email" label ='Email' isRequired fullWidth helperText={false}/>
                </Box> */}
                <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                <TextInput source="contactPhone" label='Контактний телефон' isRequired fullWidth helperText={false}/>
                </Box>
            </Box>
            <TextInput source="contactIpn" label='Ідентифікаційний код' fullWidth/>
            <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
                <Box flex={2} mr={{ xs: 0, sm: '0.5em' }}>
                    <TextInput source="carName" label='Марка та модель авто' fullWidth helperText={false} />
                </Box>        
                <Box flex={2}>
                    <TextInput source="carPrice" label='Повна вартість' fullWidth helperText={false} />
                </Box>
            </Box>
            <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>                
                <Box flex={4} mr={{ xs: 0, sm: '0.5em' }}>
                    <TextInput
                        source="carNumber"
                        label = 'Держ. номер авто (приклад АА 1234 ББ)'
                        fullWidth
                        helperText={false}
                    />
                </Box>                
            </Box>
            <Separator />
            <Accordion as={Form.Field}>                       
                    <Accordion.Title active = {activeIndex === 0} onClick={() =>{acClick(0)}} content='Додатково (за бажанням)' index={0}/>
                    <Accordion.Content active = {activeIndex === 0} content={AcForm}/>                                           
            </Accordion>
            <FileInput source="attachments" label="вкладення" multiple labelMultiple='Перенесіть файл або натисніть для завантаження'>
                <FileField source="src" title="title" />
            </FileInput>
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
