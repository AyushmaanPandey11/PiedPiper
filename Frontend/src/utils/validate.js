export const checkValidData = (name, email, password, isSignin) => {
    const isEmailValid = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
    const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

    // Regular expression for name validation (at least one alphabet character)
    const isNameValid = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/.test(name);
  
    if (!isEmailValid) return "Email is not valid. Please try again.";
    if (!isPasswordValid) return "Password is not valid. Please try again.";  

    // Perform name validation only during sign-up
    if (!isSignin && (!name || !isNameValid)) {
      return "Name is not valid. Please provide a valid name.";
    }
  
    return null; // Validation successful
  };
  