import React, { useState } from 'react';
import {Link, Redirect} from 'react-router-dom';
import Base from '../core/Base';
import {signup, isAuthenticated} from '../auth/helper/index'


const Signup = () =>{
    const [values, setValues] = useState({
        username : '',
        email : '',
        password : '',
        error : '',
        success : false,
    });

    const {username, email, password, error, success} = values;

    const handleChange = (name) => (event) =>{
        setValues({...values, error:false, [name]: event.target.value});
    };

    const onSubmit = (event) =>{
        event.preventDefault();
        setValues({...values, error:false});
        signup({username, email, password})
        .then((data) => {
            console.log('DATA', data);
            if (data.email ===email){
                setValues({
                    ...values,
                    username:'',
                    email:'',
                    password:'',
                    error:'',
                    success: true
                })
            }else{
                setValues({
                    ...values,
                    error: true,
                    success: false
                })
            }
        })
        .catch((e) => console.log(e));
    };

    const successMessage = () => {
        return (
            <div className = 'row'>
                <div className = 'col-md-6 offset-sm-3 text-left'>
                    <div className = 'alert alert-success' style = {{display : success ? "" : "none"}}>
                        New account created successfully. <Link to = '/signin'>Login Now</Link>
                    </div>
                </div>
            </div>
        );
    };

    const errorMessage = () => {
        return (
            <div className = 'row'>
                <div className = 'col-md-6 offset-sm-3 text-left'>
                    <div className = 'alert alert-danger' style = {{display : error ? "" : "none"}}>
                        Check all fields again
                    </div>
                </div>
            </div>
        );
    };

    const signUpForm = () => {
        return (
            <div className = 'row'>
                <div className ='col-md-6 offset-sm-3 text-left'>
                    <form>
                        <div className = 'form-group'>
                            <label className = 'text-light'>Username</label>
                            <input 
                            className = 'form-control'
                            value = {username}
                            onChange = {handleChange('username')}
                            type = 'text'/>
                        </div>
                        <div className = 'form-group'>
                            <label className = 'text-light'>Email</label>
                            <input 
                            className = 'form-control'
                            value = {email}
                            onChange = {handleChange('email')}
                            type = 'text'/>
                        </div>
                        <div className = 'form-group'>
                            <label className = 'text-light'>Password</label>
                            <input 
                            className = 'form-control'
                            value = {password}
                            onChange = {handleChange('password')}
                            type = 'password'/>
                        </div><br/>
                        <button onClick={onSubmit} className = 'btn btn-success btn-block'>Submit</button>
                    </form>
                </div>
            </div>
        )
    }

    return(
        <div>
            {isAuthenticated() ? (<Redirect to = '/user/dashboard' />) :
        (<Base title = 'Sign Up' description = 'Signup to create a task manager account'>
            {successMessage()}
            {errorMessage()}
            {signUpForm()}
            <p className = 'text-white text-center'>
            </p> 
        </Base>)}
        </div>
    )
}

export default Signup
