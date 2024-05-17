export const checkValidData = (name, email, password, isSignin, pin) => {
    const isEmailValid = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
    const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
    const isPinValid = /^\d{6}$/.test(pin);
    const isNameValid = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/.test(name);
  
    if (!isEmailValid) return "Email is not valid. Please try again.";
    if (!isPasswordValid) return "Password is not valid. Please try again.";  
    if (!isPinValid) return "Pin is not Valid. Please entry a 6-digit number";
    if (!isSignin && (!name || !isNameValid|| !isPinValid)) {
      return "Name or Pin is not valid. Please provide a valid name.";
    }
  
    return null; // Validation successful
  };
  