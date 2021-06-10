import { TextField } from '@material-ui/core';
import PropTypes from 'prop-types';

export function NameField({value, setValue, fieldValidity, setFieldValidity}) {
    const changeName = (nameToValidate) => {
        setValue(nameToValidate);
        if(nameToValidate && nameToValidate.length >= 3) {
            
            if(!fieldValidity) {
                setFieldValidity(true);
            }
        } else {
            if(fieldValidity) {
                setFieldValidity(false)
            }
        }
    }

    return (
        <TextField
            label="Name"
            type="text"
            variant="outlined"
            margin="normal"
            color="primary"
            required
            fullWidth
            error={!fieldValidity}
            helperText={!fieldValidity ? "Name is too short!" : null}
            minLength={3}
            value={value}
            onChange={e => changeName(e.target.value)}
        />
    );
}

NameField.propTypes = {
    value: PropTypes.string.isRequired,
    setValue: PropTypes.func.isRequired,
    fieldValidity: PropTypes.bool.isRequired,
    setFieldValidity: PropTypes.func.isRequired
}

export function EmailField({value, setValue, fieldValidity, setFieldValidity}) {
    const changeEmail = (emailToValidate) => {
        setValue(emailToValidate);
        if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailToValidate)) {
            if(!fieldValidity) {
                setFieldValidity(true);
            }
        } else {
            if(fieldValidity) {
                setFieldValidity(false)
            }
        }
    }

    return (
        <TextField
            label="Email"
            type="email"
            variant="outlined"
            margin="normal"
            color="primary"
            required
            fullWidth
            error={!fieldValidity}
            helperText={!fieldValidity ? "Invalid email!" : null}
            value={value}
            onChange={e => changeEmail(e.target.value)}
        />
    );
}

EmailField.propTypes = {
    value: PropTypes.string.isRequired,
    setValue: PropTypes.func.isRequired,
    fieldValidity: PropTypes.bool.isRequired,
    setFieldValidity: PropTypes.func.isRequired
}


export function PasswordField({value, setValue, fieldValidity, setFieldValidity}) {
    const changePassword = (passwordToValidate) => {
        setValue(passwordToValidate);
        if(passwordToValidate && passwordToValidate.length >= 8) {
            if(!fieldValidity) {
                setFieldValidity(true);
            }
        } else {
            if(fieldValidity) {
                setFieldValidity(false)
            }
        }
    }

    return (
        <TextField
            label="Password"
            type="text"
            variant="outlined"
            margin="normal"
            color="primary"
            required
            fullWidth
            error={!fieldValidity}
            helperText={!fieldValidity ? "Password too short!" : null}
            minLength={8}
            value={value}
            onChange={e => changePassword(e.target.value)}
        />
    );
}

PasswordField.propTypes = {
    value: PropTypes.string.isRequired,
    setValue: PropTypes.func.isRequired,
    fieldValidity: PropTypes.bool.isRequired,
    setFieldValidity: PropTypes.func.isRequired
}
