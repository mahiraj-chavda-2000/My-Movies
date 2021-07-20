const validateInfo = (values) => {
  let errors = {};

  
  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 6) {
    errors.password = "Password needs to be 6 characters or more";
  }

  if (!values.cpassword) {
    errors.cpassword = "Password is required";
  } else if (values.cpassword !== values.password) {
    errors.cpassword = "Passwords do not match";
  }

  return errors;
}
export default validateInfo;