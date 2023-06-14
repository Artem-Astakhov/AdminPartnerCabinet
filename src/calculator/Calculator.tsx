import * as React from 'react';
import { RadioGroup, RadioButton, ReversedRadioButton } from 'react-radio-buttons';
import { Box, Typography, useMediaQuery, Theme } from '@mui/material';
import { useState, useEffect } from 'react';
import {
    Form,
    required,
    TextInput,
    useTranslate,
    useLogin,
    useNotify,
    regex,
    NumberInput
} from 'react-admin';
import {
    Avatar,
    Button,
    Card,
    CardActions,
    CircularProgress,
} from '@mui/material';
import { TextArea } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import { string } from 'prop-types';
import { NavLink } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


interface FormValues {
    amount?: number
}

const ListActions = () => {
    const isXSmall = useMediaQuery<Theme>(theme =>
        theme.breakpoints.down('sm')
    );
    return (<div>
            {isXSmall ? (
            <span style={{marginLeft:'0', marginRight:"auto"}}><NavLink to={'/'}><ArrowBackIcon fontSize='large' color='success'  /></NavLink></span>
            ) : (<span></span>)
            } 
            </div>              
        )
};

const Calculator = ()=> {
    const [loading, setLoading] = useState(false);
    const [LoanProduct, setLoanProduct] = useState<{ name: string }[]>([]);
    const [verticalButtonValue, setVerticalButtonValue] = useState("");
    const [horizontalButtonValue, setHorizontalButtonValue] = useState(0);
    
    const [monthlyPayment, setMonthlyPayment] = useState("");
    const [creditBody, setCreditBody] = useState("");

    const getServerUrl = ()=>{
            return fetch('config.json').then((res)=>res.json()).then(async (data)=>{
            return  data;
           })
    }

    useEffect(() => {
        getLoanProducts();             
    }, []);

    const getLoanProducts = async ()=>{
        var data = await getServerUrl();
        var url = data.SERVER_URL;

        const token = localStorage.getItem('token');
            const requestOptions = {
                method: 'GET',
                headers: {'Content-Type': 'application/json', 'Authorization' : `Bearer ${token}`},                
            }           
            
            const response = fetch(url + '/LoanProduct/Get', requestOptions)
            .then(result=>result.json())
            .then(({value})=>{
               setLoanProduct(value);
            });
    }

    const handleSubmit = async (calcProps: FormValues) => {
        setLoading(true);
        
        var query = JSON.stringify({name:verticalButtonValue, month:horizontalButtonValue, amount: calcProps.amount});

        var data = await getServerUrl();
        var url = data.SERVER_URL;

        const token = localStorage.getItem('token');
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'Authorization' : `Bearer ${token}`},
                body: query                
            }           
            
            const response = fetch(url + '/LoanProduct/Calculate', requestOptions)
            .then(result=>result.json())
            .then(({value})=>{
                setMonthlyPayment("Місячний платіж: " + value.monthlyPayment);
                setCreditBody("Загальна Сума: " + value.creditBody)
                setLoading(false); 
            });
        
           
    }
    const onChangeVertical = (value:string) => {
        setVerticalButtonValue(value);
    }
    const onChangeHorizontal = (value:number) => {
        setHorizontalButtonValue(value);
    }

    const Spacer = () => <Box m={1}>&nbsp;</Box>;
    return(
        <div>
        <ListActions/>
        <Form onSubmit={handleSubmit} noValidate>           
            <Card>           
                <Box maxWidth="50em">                   
                    <div  style={ { padding: 16 } }>
                        <Typography variant="h6" gutterBottom>
                            {"Оберіть пакет:"}
                        </Typography>
                        <RadioGroup vertical="true" onChange={ onChangeVertical }>
                        {LoanProduct.map((item, index: number) => (                           
                            <RadioButton key={index} iconSize={20} pointColor={'green'}  value={item}>
                            {item}
                            </RadioButton>                          
                        ))}               
                        </RadioGroup>
                        
                        <Typography variant="h6" gutterBottom>
                            {"Оберіть строк:"}
                        </Typography>
                        <RadioGroup horizontal onChange={ onChangeHorizontal }>
                            <RadioButton iconSize={20} pointColor={'green'}  value={3}>
                                3 міс
                            </RadioButton>
                            <RadioButton iconSize={20} pointColor={'green'}  value={6}>
                                6 міс
                            </RadioButton>
                            <RadioButton iconSize={20} pointColor={'green'}  value={12}>
                                12 міс
                            </RadioButton>                           
                        </RadioGroup>
                        <br/>
                        <br/>
                        <div >
                            <NumberInput
                                    autoFocus                                
                                    source="amount"
                                    label={"Потрібно коштів"}
                                    disabled={loading}
                                    validate={required()}
                                    fullWidth = {false}                               
                            />
                            <CardActions>
                                <Button
                                    variant="contained"
                                    type="submit"
                                    color="success"
                                    disabled={loading}
                                    fullWidth 
                                >
                                    {loading && (
                                        <CircularProgress size={25} thickness={2} />
                                    )}
                                    {"Порахувати"}
                                </Button>                       
                            </CardActions>
                        </div>
                        <br/>
                        <Typography variant="h6" gutterBottom>
                            {monthlyPayment}
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            {creditBody}
                        </Typography>
                                          
                    </div>                                                                                                              
                </Box>
            </Card>        
        </Form>
        </div>
    )
}

export default Calculator;