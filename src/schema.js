import * as yup from "yup";
import { range } from "./helpers/utils"

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


// const mmRange = range(1,12);

export const personalDetailsSchema = yup.object().shape({
    gender: yup.string(),
    dob_dd: yup.mixed().when(["dob_mm","dob_yyyy"],{
        is: (dob_mm,dob_yyyy) => {
            return((dob_mm >= 1 && dob_mm <= 12) || (dob_yyyy >= 1980 && dob_yyyy <= 2022));
        },
        then: yup.mixed().test("dob_dd","date is required",(value) => !isNaN(value) ? (value >= 1 && value <= 31) : false),
        otherwise: yup.mixed().notRequired()
    }),
    dob_mm: yup.mixed().when(["dob_dd","dob_yyyy"],{
        is: (dob_dd,dob_yyyy) => (dob_dd >= 1 && dob_dd <= 31) || (dob_yyyy >= 1980 && dob_yyyy <= 2022),
        then: yup.mixed().test("dob_mm","month is required",(value) => !isNaN(value) ? (value >= 1 && value <= 12) : false),


        otherwise: yup.mixed().notRequired()
    }),
    dob_yyyy: yup.mixed().when(["dob_dd","dob_mm"],{
        is: (dob_dd,dob_mm) => (dob_dd >= 1 && dob_dd <= 31) || (dob_mm >= 1 && dob_mm <= 12),
        then: yup.mixed().test("dob_yyyy","year is required",(value) => !isNaN(value) ? (value >= 1980 && value <= 2022) : false),
        otherwise: yup.mixed().notRequired()
    })
},[
    ["dob_dd","dob_mm"],
    ["dob_dd","dob_yyyy"],
    ["dob_mm","dob_yyyy"]
])