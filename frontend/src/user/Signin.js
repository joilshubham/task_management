import React, {useState} from 'react';
import { Link, Redirect } from 'react-router-dom'
import { authenticate, isAuthenticated, signin } from '../auth/helper';

import Base from '../core/Base';


const Signin = () =>{

    const [values, setValues] = useState({
        username : '',
        password : '',
        error : '',
        success : false,
        loading: false,
        didRedirect: false,
    });

    const {username, password, error, success, loading, didRedirect} = values;

    const handleChange = (name) => (event) =>{
        setValues({...values, error:false, [name]: event.target.value});
    };

    const onSubmit = (event) =>{
        event.preventDefault();
        setValues({...values, error:false, loading:true})

        signin({username, password})
        .then(data => {
            console.log('DATA', data);
            if(data.token){
                // let sessionToken = data.token;
                authenticate(data, () =>{
                    console.log('TOKEN ADDED')
                    setValues({
                        ...values,
                        didRedirect: true,
                    })
                })
            }else{
                setValues({
                    ...values,
                    loading:false,
                })
            }
        })
        .catch((e) => console.log(e));
    };

    const performRedirect = () =>{
        if (isAuthenticated()) {
            return <Redirect to = '/' />
        }
    };

    const loadingMessage = () =>{
        return (
            loading && (
                <div className = 'alert alert-info'>
                    <h2>Loading.....</h2>
                </div>
            )
        )
    }

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

    const signInForm = () => {
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



    return (
        <Base title = 'Sign-in' description = 'Sign-in into your task manager account'>
            {loadingMessage()}
            {signInForm()}
            <p className = 'text-center'></p>
            {performRedirect()}
        </Base>
    )
}

export default Signin