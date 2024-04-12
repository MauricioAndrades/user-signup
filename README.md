#UserSignUpForm
Mauricio Andrades
https://www.linkedin.com/in/mauricio-andrades/

Work is in: `src/UserSignupForm.jsx`

### State Management

- I used separate `useState` hooks for each form field to independently track their values. Allows for individual field validation and updates.
- The `formErrors` state holds validation messages that may need to be displayed to the user.
- The `isSubmitted` state determines whether the form has been submitted to toggle between showing the form or a success message.
- In order to not over engineer the form I opted for simple implementation instead of custom useLocalStorage Hook.

### Local Storage

- `getInitialValue` fetches the values for the form fields from localStorage. This ensures that input persists across sessions until the form is submitted.
- A `useEffect` hook observes the form fields. If changes occur and the form hasn't been submitted yet, it updates localStorage with the new data.

### Validation

- `validateForm` is run on submission, checks all fields have valid inputs and sets error messages in the `formErrors` state if any.

### Submission

- if the form is submitted with no errors, we show a success message and clear localStorage.
- The choice to clear localStorage after form submission is meant to simulate a user's desired workflow.