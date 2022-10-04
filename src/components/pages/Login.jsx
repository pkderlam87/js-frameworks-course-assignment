import React from 'react'
import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { BASE_URL, TOKEN_PATH } from "../../constants/api";
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import Heading from '../layout/Heading';
import { Container, FloatingLabel, Form } from 'react-bootstrap';


const url = BASE_URL + TOKEN_PATH;


const schema = yup.object().shape({
    username: yup.string().required("Please enter your username"),
    password: yup.string().required("Please enter your password"),
});

function Login() {
    const [submitting, setSubmitting] = useState(false);
    const [loginError, setLoginError] = useState(null);

    const history = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const [auth, setAuth] = useContext(AuthContext);

    async function onSubmit(data) {
        setSubmitting(true);
        setLoginError(null);

        try {
            const response = await axios.post(url, data);
            console.log("response", response.data);
            setAuth(response.data);
            history("/admin");

        } catch (error) {
            console.log("error", error);
            setLoginError(error.toString());
        } finally {
            setSubmitting(false);
        }
    }

    return (<>
        <Container>
            <Heading>Log in</Heading>
            <form onSubmit={handleSubmit(onSubmit)}>
                {loginError && <span>{loginError}</span>}
                <FloatingLabel
                    controlId="floatingInput"
                    label="Username"
                    className="mb-3"
                >
                    <Form.Control type="username" name="username" placeholder="Username" {...register("username")} />
                    {errors.username && <span>{errors.username.message}</span>}
                </FloatingLabel>

                <FloatingLabel controlId="floatingPassword" label="Password">
                    <Form.Control type="password" name="password" placeholder="Password" {...register("password")} />
                    {errors.password && <span>{errors.password.message}</span>}
                </FloatingLabel>
                <button className='btn btn-primary'>{submitting ? "Login in..." : "Login"}</button>
            </form>
        </Container>
    </>
    );

}

export default Login