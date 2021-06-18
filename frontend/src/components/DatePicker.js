import 'date-fns';
import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { format } from 'date-fns'
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

export default function DatePicker(props) {

    const [selectedDate, setSelectedDate] = React.useState(null);//(props.addDate) ? new Date() : props.value


    /**
     * De datum die is gekozen door de gebruiker uit een datepicker wordt geformatteerd.
     * @param date een datum gekozen door de gebruiker.
     * @return de gekozen datum wordt geconverteerd naar het formaat 'yyyy-MM-dd'.
     */
    const formatDate = (date) => {
        try {
            let year = date.getFullYear();
            let month = date.getMonth();
            let day = date.getDate();
            let fullDate = format(new Date(year, month, day), 'yyyy-MM-dd'); //year + '-' + (month + 1) + '-' + day;
            return fullDate;
        } catch (error) {
            console.error(error);
        }
    }


    /**
     * Zorgt ervoor dat de datum bij veranderingen steeds in de juiste formaat staat.
     * @param date een datum gekozen door de gebruiker.
     */
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
                    format="yyyy-MM-dd"
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