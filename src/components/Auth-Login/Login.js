import React, { useState } from 'react'

const Login = validate => {
    const accountUser = JSON.parse(localStorage.getItem("user"));
    const [values, setValues] = useState({
        email: '',
        password: '',
    })
    const [errors, setErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const handleChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
    };
    const handleSubmit = e => {
        e.preventDefault();
        setErrors(validate(values))
        setIsSubmitting(true)

        for (let i = 0; i < accountUser.length; i++) {
            if (values.email === accountUser[i].email && values.password === accountUser[i].password) {
                alert('dang nhap thanh cong');
                break;
            } else if ((values.email === "" || values.password === "")) {
                alert("vui long nhap tk");
                break;
            } else {
                alert("khong ton tai tk");
                break;
            }

        }


    }
    return { handleChange, values, handleSubmit, errors };
}
export default Login;
