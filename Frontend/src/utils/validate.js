export const checkValidData = (username, email, password, isSignin, pin) => {
  const isEmailValid = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
  const isPinValid = /^\d{6}$/.test(pin);
  const isUserNameValid = /^[a-zA-Z0-9]{3,20}$/.test(username);

  if (isSignin) {
    if (!(isEmailValid || isUserNameValid)) {
      return { isValid: false, message: "Either email or username must be valid. Please try again." };
    }
    if (!isPasswordValid) return { isValid: false, message: "Password is not valid. Please try again." };
  } else {
    if (!isEmailValid) return { isValid: false, message: "Email is not valid. Please try again." };
    if (!isUserNameValid) return { isValid: false, message: "Username is not valid. Please try again." };
    if (!isPasswordValid) return { isValid: false, message: "Password is not valid. Please try again." };
    if (!isPinValid) return { isValid: false, message: "Pin is not valid. Please enter a 6-digit number." };
  }

  return { isValid: true, message: null }; 
};
