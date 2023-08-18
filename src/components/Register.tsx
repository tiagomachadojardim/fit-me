import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Register.scss';
import { Link, useNavigate  } from 'react-router-dom';
import Header from './Header';
import Menu from './Menu';


interface RegisterProps {
  handlePageTitleChange: (newTitle: string) => void;
  hideHeader: boolean;
  hideMenu: boolean;
}

const Register: React.FC<RegisterProps> = ({ handlePageTitleChange, hideHeader, hideMenu }) => {
  handlePageTitleChange("Register");

   const [alertMessage, setAlertMessage] = useState<string | null>(null);
   const navigate = useNavigate();


  useEffect(() => {
    handlePageTitleChange("Register");
    return () => {
      handlePageTitleChange("Título Padrão Register");
    };
  }, [handlePageTitleChange]);

  const initialValues = {
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object({
    fullName: Yup.string().required('Required'),
    username: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), ''], 'Passwords must match')
      .required('Required'),
  });

  

 const handleSubmit = async (values: any) => {
    try {
      const response = await fetch('https://parseapi.back4app.com/users', {
        method: 'POST',
        headers: {
          'X-Parse-Application-Id': 'DSiIkHz2MVbCZutKS7abtgrRVsiLNNGcs0L7VsNL',
          'X-Parse-Master-Key': '0cpnqkSUKVkIDlQrNxameA6OmjxmrA72tsUMqVG9',
          'X-Parse-Client-Key': 'zXOqJ2k44R6xQqqlpPuizAr3rs58RhHXfU7Aj20V',
          'X-Parse-Revocable-Session': '1',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: values.username,
          password: values.password,
          
        }),
      });

      if (response.ok) {
        setAlertMessage('Registration successful!');
         setTimeout(() => {
          navigate('/Login'); 
        }, 2000);
      } else {
        setAlertMessage('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setAlertMessage('An error occurred. Please try again.');
    }
  };
 

  return (

    <div className='register'>
 {hideHeader ? null : <Header pageTitle="Register" />}
 {hideMenu ? null : <Menu pageTitle="Register" />}
    <div className='register-container'>

     
      <p> <strong>Please fill out the form to register!</strong></p>

      <Formik  initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        <Form className='register-forms'>
          <div className="form-group">
            <label htmlFor='fullName'>Full Name</label>
            <Field type='text' id='fullName' name='fullName' />
            <ErrorMessage name='fullName' component='div' className='error' />
          </div>

          <div className="form-group">
            <label htmlFor='username'>Username</label>
            <Field type='text' id='username' name='username' />
            <ErrorMessage name='username' component='div' className='error' />
          </div>

          <div className="form-group">
            <label htmlFor='email'>E-mail</label>
            <Field type='email' id='email' name='email' />
            <ErrorMessage name='email' component='div' className='error' />
          </div>

          <div className="form-group">
            <label htmlFor='password'>Password</label>
            <Field type='password' id='password' name='password' />
            <ErrorMessage name='password' component='div' className='error' />
          </div>

          <div className="form-group">
            <label htmlFor='confirmPassword'>Confirm Password</label>
            <Field type='password' id='confirmPassword' name='confirmPassword' />
            <ErrorMessage name='confirmPassword' component='div' className='error' />
          </div>
          {alertMessage && <div className="alert">{alertMessage}</div>}
          <button type='submit'>Register</button>
        </Form>
      </Formik>
      <div>
        <p>Yes i have an account?<Link className='login-register' to="/Login"> <strong>Login</strong> </Link></p>
         
      </div>
     
    </div>
    </div>
  );
};

export default Register;
