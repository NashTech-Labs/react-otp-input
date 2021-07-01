import React from 'react';
import './App.css';
import OtpInput from "./otp-input-field/otp-input.component";

function App() {
  const [userInput, setUserInput] = React.useState({value: '', valid: false});
  const [otpVerificationFailedStatus, setOtpVerificationFailedStatus] = React.useState('');
  const otpLength = 4
  const validOtpCode = '1234'
  let message;

    React.useEffect(() => {
      if (!userInput.valid) {
        setOtpVerificationFailedStatus('')
      }
    }, [userInput])

  function verifyOtp() {
    if (userInput.value === validOtpCode && userInput.valid) {
      setOtpVerificationFailedStatus(false)
    } else {
      setOtpVerificationFailedStatus(true);
    }
  }

  if (otpVerificationFailedStatus && userInput.valid) {
    message = <p className='errorMsg'>Invalid OTP, please try again!</p>
  } else if (otpVerificationFailedStatus === false && userInput.valid) {
    message = <p className='successMsg'>Verified!</p>
  }

  return (
    <div className="App">
      <h1>Enter the OTP code</h1>
        <p>valid code: 1234</p>
      <OtpInput
          otpValidationFailed={otpVerificationFailedStatus}
          length={otpLength}
          changed={(e) => setUserInput({ value: e.otp, valid: e.valid })}
      />
      <button disabled={!userInput.valid} className='verifyBtn' onClick={() => verifyOtp()}>Verify</button>
      {message}
    </div>
  );
}

export default App;
