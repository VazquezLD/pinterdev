import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export const FormWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center; 
    gap: 20px;
    justify-content: center;
    height: 100vh;
    & p{
      color: white;
    }
`;
export const StyledForm = styled(Form)`
  display: flex; 
  flex-direction: column; 
  gap: 15px; 
  width: 100%; 
  max-width: 400px; 
  padding: 2rem; 
  border-radius: 8px; 
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  color: white;
`;


export const StyledField = styled(Field)`
  padding: 10px; 
  border-radius: 5px; 
  border: 1px solid #ccc;
`;
export const StyledButton = styled.button`
  padding: 10px; 
  border-radius: 5px; 
  border: none; 
  background-color: #4c5966; 
  color: white; 
  cursor: pointer;
`;

const RegisterPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const RegisterSchema = Yup.object().shape({
    nombre: Yup.string().required('El nombre es obligatorio'),
    email: Yup.string().email('Email inválido').required('El email es obligatorio'),
    contrasena: Yup.string().min(6, 'La contraseña debe tener al menos 6 caracteres').required('La contraseña es obligatoria'),
  });

  return (
    <FormWrapper>
      <h2>Crear Cuenta</h2>
      <Formik
        initialValues={{ nombre: '', email: '', contrasena: '' }}
        validationSchema={RegisterSchema}
        onSubmit={async (values) => {
          try {
            setError(null);
            const apiUrl = 'https://pinterdev-api.vercel.app/api/usuarios';
            await axios.post(apiUrl, values);
            alert('¡Usuario creado con éxito! Ahora podés iniciar sesión.');
            navigate('/login');
          } catch (err) {
            setError(err.response?.data?.msg || 'Error al crear el usuario.');
          }
        }}
      >
        {() => (
          <StyledForm>
            <StyledField name="nombre" type="text" placeholder="Nombre completo" />
            <ErrorMessage name="nombre" component="div" style={{color: 'red'}} />
            
            <StyledField name="email" type="email" placeholder="Email" />
            <ErrorMessage name="email" component="div" style={{color: 'red'}} />

            <StyledField name="contrasena" type="password" placeholder="Contraseña" />
            <ErrorMessage name="contrasena" component="div" style={{color: 'red'}} />
            
            <StyledButton type="submit">Registrarse</StyledButton>
            {error && <p style={{color: 'red'}}>{error}</p>}
          </StyledForm>
        )}
      </Formik>
      <p>¿Ya tenés cuenta? <Link to="/login">Iniciá sesión</Link></p>
    </FormWrapper>
  );
};

export default RegisterPage;