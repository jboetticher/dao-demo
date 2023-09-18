import React, { useState } from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
    border: 1px solid #ccc;
    padding: 10px;
    font-size: 16px;
    border-radius: 4px;
    outline: none;
    transition: border 0.3s ease;

    &:focus {
        border-color: #0077b6;  // change this to your desired focus color
    }
`;

function IntegerInput({ onChange, ...props }) {
    const [value, setValue] = useState(1);  // default value set to 1

    const handleInputChange = (e) => {
        const inputValue = e.target.value;

        // Use a regular expression to check if the input value is an integer or empty
        if (/^([1-9]\d*)?$/.test(inputValue)) {  // Ensure only positive integers, starting from 1
            setValue(inputValue);
            if (onChange) onChange(inputValue);
        }
    };

    return <StyledInput value={value} onChange={handleInputChange} {...props} />;
}

export default IntegerInput;
