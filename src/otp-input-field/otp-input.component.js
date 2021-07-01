import React from 'react';
import PropTypes from 'prop-types';
import classes from './otp-input.module.css';

const OtpInput = (props) => {
  const [otp, setOtp] = React.useState(new Array(props.length).fill(''));
  let otpFieldStyles;

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;
    setOtp([
      ...otp.map((otpDigit, idx) =>
        idx === index ? setOtpDigit(element.value) : otpDigit,
      ),
    ]);

    if (element.value.length > 1) {
      handleMultipleInput(element.value.slice(1), index + 1);
    }

    //Focus next input
    if (element.nextSibling && element.value !== '') {
      element.nextSibling.focus();
    } else if (element.previousSibling && element.value === '') {
      element.previousSibling.focus();
      document.getElementById('otpField' + (index - 1)).value = otp[
        index
      ].toString();
    }
  };

  const setOtpDigit = (value) => {
    if (value[0]) {
      return value[0];
    } else {
      return '';
    }
  };

  const handleMultipleInput = (value, index) => {
    setOtp((prevOtp) => [
      ...prevOtp.map((digit, idx) => (idx === index ? value[0] : digit)),
    ]);

    if (value.length > 1 && otp.length !== index + 1) {
      handleMultipleInput(value.slice(1), index + 1);
    }
  };

  const handleKeyDown = (event, index) => {
    const isEmpty = otp[index] ? false : true;
    if (
      event.key.toLowerCase() === 'backspace' &&
      isEmpty &&
      event.target.previousSibling
    ) {
      event.target.previousSibling.focus();
    } else if (
      event.key.toLowerCase() === 'arrowright' &&
      event.target.nextSibling
    ) {
      event.target.nextSibling.focus();
    } else if (
      event.key.toLowerCase() === 'arrowleft' &&
      event.target.previousSibling
    ) {
      event.target.previousSibling.focus();
    }
  };

  React.useEffect(() => {
    const valid = otp.findIndex((x) => x === '') === -1;
    props.changed({ otp: otp.join(''), valid: valid });
  }, [otp]);

  if (props.otpValidationFailed) {
    otpFieldStyles = [classes.otpField, classes.otpInvalid];
  } else {
    otpFieldStyles = [classes.otpField];
  }

  return (
    <div className={classes.otpInputFieldWrapper}>
      {otp.map((data, index) => {
        return (
          <input
            required
            pattern='[0-9]*'
            type='number'
            className={otpFieldStyles.join(' ')}
            name='otp'
            id={'otpField' + index}
            key={index}
            value={data}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onChange={(e) => handleChange(e.target, index)}
            onFocus={(e) => e.target.select()}
          />
        );
      })}
    </div>
  );
};

OtpInput.propTypes = {
  changed: PropTypes.func,
  length: PropTypes.number,
  otpValidationFailed: PropTypes.bool,
};

export default OtpInput;
