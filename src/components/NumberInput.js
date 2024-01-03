import React from 'react';
import { TextField } from '@mui/material';

export default function NumberInput(props) {

  // Custom onChange handler to prevent negative values
  const handleChange = (event) => {
    const value = event.target.value;
    if (value < 0) {
      event.target.value = 0; // Reset value to 0 if negative
    }

    // Call any onChange handler passed in through props
    if (props.onChange) {
      props.onChange(event);
    }
  };


  return <TextField
    type="number"
    variant="outlined"
    fullWidth
    sx={{
      color: 'white',
      '& .MuiInputBase-input': {
        color: 'white', // Input text color
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'white', // Default border color
        },
        '&:hover fieldset': {
          borderColor: 'var(--text)', // Border color on hover
        },
        '&.Mui-focused fieldset': {
          borderColor: 'var(--text)',
        },
      },
      '& .MuiInputLabel-root': {  // Styles for the label
        color: 'white',  // Label color when not focused
      },
      '& .Mui-focused': {
        color: 'var(--text)', // Label color when the input is focused
      },
      ':-webkit-autofill': {
        backgroundColor: 'var(--text)'
      }
    }}
    {...props}
    onChange={handleChange}
  />;
}

/*

MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-fullWidth MuiInputBase-formControl css-md26zr-MuiInputBase-root-MuiOutlinedInput-root
MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-fullWidth MuiInputBase-formControl css-md26zr-MuiInputBase-root-MuiOutlinedInput-root"
*/