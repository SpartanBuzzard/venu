//Chris Solinsky
// 3/25/21

import React, { useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import * as EmailValidator from 'email-validator';

function Login({ user, setUser }) {
	const [values, setValues] = useState({
		firstname: '',
		lastname: '',
		email: '',
	});

	const [errors, setErrors] = useState({});

	function handleChange(e) {
		setValues({ ...values, [e.target.name]: e.target.value });
	}

	function login(e) {
		//Simulate login, locally validate firstname, lastname and valid email address
		e.preventDefault();
		let errors = {};
		if (values.firstname == '') {
			errors.firstname = 'First Name is required.';
		}
		if (values.lastname == '') {
			errors.lastname = 'Last Name is required.';
		}
		if (!EmailValidator.validate(values.email)) {
			errors.email = 'Please enter a valid email address.';
		}

		if (Object.entries(errors).length === 0) {
			//No errors, --> login
			setUser({ ...values });
			localStorage.setItem('firstname', values.firstname);
			localStorage.setItem('lastname', values.lastname);
			localStorage.setItem('email', values.email);
		} else {
			setErrors(errors);
		}
	}

	return (
		<Card id="login">
			<Card.Title className="text-center">
				Sign up to check the Headlines!
			</Card.Title>
			<Form onSubmit={login}>
				<Form.Group controlId="firstname">
					<Form.Label>First Name:</Form.Label>
					<Form.Control
						type="text"
						name="firstname"
						onChange={handleChange}
						value={values.firstname}
						isInvalid={errors.firstname}
					/>
					<Form.Control.Feedback type="invalid">
						{errors.firstname}
					</Form.Control.Feedback>
				</Form.Group>{' '}
				<Form.Group controlId="lastname">
					<Form.Label>Last Name:</Form.Label>
					<Form.Control
						type="text"
						name="lastname"
						onChange={handleChange}
						value={values.lastname}
						isInvalid={errors.lastname}
					/>
					<Form.Control.Feedback type="invalid">
						{errors.lastname}
					</Form.Control.Feedback>
				</Form.Group>{' '}
				<Form.Group controlId="email">
					<Form.Label>Email:</Form.Label>
					<Form.Control
						type="text"
						name="email"
						onChange={handleChange}
						value={values.emailname}
						isInvalid={errors.email}
					/>
					<Form.Control.Feedback type="invalid">
						{errors.email}
					</Form.Control.Feedback>
				</Form.Group>{' '}
				<Form.Control as={Button} type="submit">
					Login
				</Form.Control>
			</Form>
		</Card>
	);
}

export default Login;
