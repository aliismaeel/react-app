import * as YUP from "yup";

export const validationSchema  =
    YUP.object({
        firstName: YUP.string().min(3).required("FirstName Required"),
        lastName: YUP.string().min(3).required("LastName requird"),
        password: YUP.string().min(5).required("Password required"),
        email: YUP.string().email()
    })