const ErrorPopup = (props) => {
  const message = props.error.message;
  const error = props.error.error;

  return (
    <div className='error' >
      <div className='error-notification' >
        <p> {error} </p>
        <p> {message} </p>
      </div>
    </div>
  )
}

export default ErrorPopup
