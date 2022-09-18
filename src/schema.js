import * as yup from "yup";

export const siginSchema = yup.object({
    username_email: yup.string().required("Username or Email is required"),
    password: yup.string().required("Password is required")
}).required();

export const sigupSchema = yup.object({
    username: yup.string().required("Username is required").min(3,"Username should have at least 3 letters"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required").matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
    cPassword: yup.string().required("Please re-enter password").oneOf([yup.ref("password"),null])
}).required();