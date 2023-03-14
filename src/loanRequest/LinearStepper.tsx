import React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Moment from "react-moment";
import Typography from '@mui/material/Typography';
import StepContent from '@mui/material/StepContent';
import 'moment-timezone';
import { autocompleteClasses } from '@mui/material';
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

const steps = [
    'Отримали запит',
    'Робота з клієнтом',
    'Є позитивне рішення',
    'Гроші отримані',
];

const TypographySx = {
  zIndex: "2",
  display: "inline",
  
  right: "90%",
  top: "29px",
  padding: "0 15px"
};

const boxCss = {
  display: "flex",
  textAlign: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}

export default function VerticalLinearStepper({activeStep, data}:any) {
    
  return (
    <Box sx={boxCss}>
      <Stepper
        activeStep={activeStep}
        orientation="vertical"
      >
        {steps.map((label) => (
          <Step key={label}>
            <Typography sx={TypographySx}>
              <DateField style={{fontSize:'11px'}} className='requestCardTextStyle' source="createdOn" showTime></DateField>
            </Typography>
            <StepLabel><span className='requestCardTextStyle'>{label}</span></StepLabel>
          </Step>
        ))}
      </Stepper>     
    </Box>
  );
}