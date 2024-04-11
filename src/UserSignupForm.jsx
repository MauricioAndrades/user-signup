import React, { useState, useEffect } from "react";
import "./styles.css";

// Exercise Instructions:
// 1. Complete this exercise before sending it back.
// 2. Use ReactJS with hooks for this exercise. Do not use any third-party libraries.
// 3. Focus on demonstrating state management within the form.
// 4. Keep the solution simple; avoid overengineering.
// 5. Since there is no database, persist the form state in local storage or session storage.
// 6. Make sure to include your LinkedIn profile link when submitting this exercise.

// User Signup Form Prototype Requirements:
// 1. The form should have 3 input fields: username, password, and confirm password.
// 2. The state of the input fields should be persisted in local storage or session storage.
// 3. The password and confirm password fields should validate by comparing both values.
// 4. Provide output to the user indicating whether the password fields match or do not match.
// 5. Bonus: Style the form to improve its appearance.

// Function to get data from localStorage or return an empty string
const getInitialValue = (key) => {
  const savedValue = localStorage.getItem("signupFormData");
  if (savedValue) {
    const data = JSON.parse(savedValue);
    return data[key] || "";
  }
  return "";
};

export default function UserSignupForm() {
  // Separate useState calls for each input field
  const [username, setUsername] = useState(() => getInitialValue("username"));
  const [password, setPassword] = useState(() => getInitialValue("password"));
  const [confirmPassword, setConfirmPassword] = useState(() =>
    getInitialValue("confirmPassword")
  );

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Load data from local storage on component mount
  useEffect(() => {
    console.log("Loading data from local storage...");
    const savedData = localStorage.getItem("signupFormData");
    if (savedData) {
      const { username, password, confirmPassword } = JSON.parse(savedData);
      setUsername(username || "");
      setPassword(password || "");
      setConfirmPassword(confirmPassword || "");
    }
  }, []);

  // Update local storage whenever the username, password, or confirmPassword changes
  useEffect(() => {
    if (!isSubmitted) {
      const savedData = localStorage.getItem("signupFormData");
      const formData = { username, password, confirmPassword };
      localStorage.setItem("signupFormData", JSON.stringify(formData));
    }
  }, [username, password, confirmPassword, isSubmitted]);

  // Handle change for each input field
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  // Validate form fields
  const validateForm = () => {
    const errors = {};
    if (!username) errors.username = "Username is required";
    if (!password) errors.password = "Password is required";
    if (password !== confirmPassword)
      errors.confirmPassword = "Passwords do not match";
    return errors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      setIsSubmitted(true);
      localStorage.removeItem("signupFormData"); // Clear the form data from local storage once form is submitted
    } else {
      setFormErrors(errors);
    }
  };

  // Show success message or the form based on isSubmitted
  return isSubmitted ? (
    <div className="App">Thank you for signing up!</div>
  ) : (
    <div className="App">
      <h2>Signup Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            name="username"
            type="text"
            value={username}
            onChange={handleUsernameChange}
          />
          {formErrors.username && (
            <p className="error">{formErrors.username}</p>
          )}
        </div>
        <div>
          <label>Password:</label>
          <input
            name="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
          {formErrors.password && (
            <p className="error">{formErrors.password}</p>
          )}
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          {formErrors.confirmPassword && (
            <p className="error">{formErrors.confirmPassword}</p>
          )}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
