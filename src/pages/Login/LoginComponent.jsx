import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext'
import { FormWrapper, StyledForm, StyledField, StyledButton } from './Register';

const LoginPage = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [error, setError] = useState(null);

    const LoginSchema = Yup.object().shape({
        email: Yup.string().email('Email inválido').required('El email es obligatorio'),
        contrasena: Yup.string().required('La contraseña es obligatoria'),
    });

    return (
        <FormWrapper>
        <h2>Iniciar Sesión</h2>
        <Formik
            initialValues={{ email: '', contrasena: '' }}
            validationSchema={LoginSchema}
            onSubmit={async (values) => {
            try {
                setError(null);
                const apiUrl = 'https://pinterdev-api.vercel.app/api/usuarios/login';
                const response = await axios.post(apiUrl, values);
                login(response.data.token);
                navigate('/');
            } catch (err) {
                setError(err.response?.data?.msg || 'Error al iniciar sesión.');
            }
            }}
        >
            {() => (
            <StyledForm>
                <StyledField name="email" type="email" placeholder="Email" />
                <ErrorMessage name="email" component="div" style={{color: 'red'}} />

                <StyledField name="contrasena" type="password" placeholder="Contraseña" />
                <ErrorMessage name="contrasena" component="div" style={{color: 'red'}} />

                <StyledButton type="submit">Ingresar</StyledButton>
                {error && <p style={{color: 'red'}}>{error}</p>}
            </StyledForm>
            )}
        </Formik>
        <p>¿No tenés cuenta? <Link to="/register">Registrate</Link></p>
        </FormWrapper>
    );
};

export default LoginPage;