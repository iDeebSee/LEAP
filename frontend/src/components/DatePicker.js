import 'date-fns';
import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import addDays from 'date-fns/addDays'
import { format, compareAsc } from 'date-fns'
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

export default function DatePicker(props) {

    const [selectedDate, setSelectedDate] = React.useState(new Date());

    const formatDate = (date) => {
        try {
            let year = date.getFullYear();
            let month = date.getMonth();
            let day = date.getDate();
            let fullDate = format(new Date(year, month, day), 'dd/MM/yyyy') //year + '-' + (month + 1) + '-' + day;
            return fullDate;
        } catch (error) {
            console.error(error);
        }
    }

    const handleDateChange = (date) => {

        console.log("1: " + date);
        setSelectedDate(date);
        console.log("selectedDate state: " + selectedDate);
        console.log("handleDate change " + formatDate(date));
        props.date(formatDate(date));
    };

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
                <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label={props.name}
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
            </Grid>
        </MuiPickersUtilsProvider>
    );

}