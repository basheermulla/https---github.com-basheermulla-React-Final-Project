import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import { memo, useState } from 'react';

function DateFieldComp({ callbackDateInput }) {

    const handleDate = (newDate) => {
        !newDate ? callbackDateInput(null) : newDate['$y'] > 2000 ? callbackDateInput(newDate) : null;
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            {console.log('DateFieldComp page')}
            <DemoContainer components={['DateField']} sx={{ p: 0 }}>
                <DateField label="Input Purchased Date" onChange={handleDate} />
            </DemoContainer>
        </LocalizationProvider>
    );
}

export default memo(DateFieldComp)