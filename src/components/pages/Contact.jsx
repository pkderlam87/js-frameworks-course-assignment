import React, { useState } from 'react'
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Container, FloatingLabel } from 'react-bootstrap';
import { Form, Alert } from 'react-bootstrap';
import { DEFAULT_VALUES, SUBJECT_VALUES } from '../../constants/registration';
import Select from 'react-select';
import Heading from '../layout/Heading';

/**
 * YUP will verify the data requirements and show an error message if something is wrong 
 */
const schema = yup.object().shape({
    firstName: yup.string().required("Please enter your first name").min(3, "Your first name must be at least 3 characters"),
    lastName: yup.string().required("Please enter your last name").min(4, "Your last name must be at least 4 characters"),
    email: yup.string().required("Please enter an email address").email("Please enter a valid email address"),
    subject: yup.mixed().required("Please select the subject"),
    message: yup.string().required("Please enter your message").min(10, "The message must be at least 10 characters"),
});

/**
 * This function will provide the form
 * @returns <Form>
 */

function Contact() {
    const [submitted, setSubmitted] = useState(false);
    const { register, handleSubmit, control, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });
    function onSubmit(data) {
        setSubmitted(true);
        reset(DEFAULT_VALUES);
    }
    console.log(errors);

    return (
        <Container className="wrapper">
            <section className='welcome__other--pages'>
            </section>
            <Heading>Send your message to us &#128515;</Heading>
            {submitted && <Alert variant="success">Your message was sent!</Alert>}
            <form onSubmit={handleSubmit(onSubmit)}>
                <FloatingLabel
                    controlId="floatingInput"
                    label="Fist Name"
                    className="mb-3"
                >
                    <Form.Control placeholder="First name" {...register("firstName")} />
                    {errors.firstName && <span>{errors.firstName.message}</span>}
                </FloatingLabel>
                <FloatingLabel
                    controlId="floatingInput"
                    label="Last Name"
                    className="mb-3"
                >
                    <Form.Control placeholder="Last name"{...register("lastName")} />
                    {errors.lastName && <span>{errors.lastName.message}</span>}
                </FloatingLabel>
                <FloatingLabel
                    controlId="floatingInput"
                    label="Email"
                    className="mb-3"
                >
                    <Form.Control placeholder="Email" {...register("email")} />
                    {errors.email && <span>{errors.email.message}</span>}
                </FloatingLabel>
                <FloatingLabel
                    controlId="floatingInput"
                    className="mb-3"
                >
                    <Controller
                        name="subject"
                        control={control}
                        render={({ field }) => <Select isMulti options={SUBJECT_VALUES} {...field} placeholder="Subject" />}
                    />
                    {errors.subject && <span>{errors.subject.message}</span>}
                </FloatingLabel>
                <FloatingLabel controlId="floatingTextarea" label="Message" className="mb-6">
                    <Form.Control as="textarea" {...register("message")} style={{ height: '150px' }} placeholder="Message" />
                    {errors.message && <span>{errors.message.message}</span>}
                </FloatingLabel>
                <button type="submit" className="btn btn-secondary">Send</button>
            </form>
        </Container>
    );
}


export default Contact;