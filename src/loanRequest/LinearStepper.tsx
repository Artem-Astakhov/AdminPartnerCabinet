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
//import {makeStyles} from "@material-ui/core";
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
  useTheme,
  useTranslate,
} from 'react-admin';
import { LoanRequest, RequestHistoryDates } from '../types';

const steps = [
    {name: 'Отримали запит', step: 1},
    {name: 'Робота з клієнтом', step: 2},
    {name: 'Є позитивне рішення', step: 3},
    {name: 'Гроші отримані', step: 4},
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

const VerticalLinearStepper = ({activeStep, data}: any) => {
  var a: any[] = [];
  if (data != undefined){
    a = data;
  }
  // function App() {
  //   const useStyles = makeStyles(() => ({
  //     root: {
  //       "& .MuiStepIcon-active": { color: "red" },
  //       "& .MuiStepIcon-completed": { color: "green" },
  //       "& .Mui-disabled .MuiStepIcon-root": { color: "cyan" }
  //     }
  //   }))};
  
  // const c = useStyles();

  return (
    <Box sx={boxCss}>
      <Stepper
        activeStep={activeStep}
        orientation="vertical"
      >
        {steps.map((label) => {
          var stepTime = new Date(a.find(s=>s.step === label.step)?.approveStep);
          return (         
          <Step key={label.name}>
            <Typography sx={TypographySx}>
              {stepTime.toLocaleString()}
              <DateField style={{fontSize:'11px'}} className='requestCardTextStyle' source="approveStep" showTime>{stepTime}</DateField>
            </Typography>
            <StepLabel><span className='requestCardTextStyle'>{label.name}</span></StepLabel>
          </Step>
        )})}

      </Stepper>     
    </Box>
  );
}
export default VerticalLinearStepper;