import React, { useState, useEffect} from 'react';
import {Link, Redirect} from 'react-router-dom';
import Base from './Base';
import {getProjects} from './helper/coreapicalls'
import {signup, isAuthenticated,addTaskFunc} from '../auth/helper/index'


const AddTask = () =>{
    const [values, setValues] = useState({
        task_name : '',
        task_description : '',
        project : '',
        task_start : '',
        task_end : '',
        error : '',
        success : false,
    });

    const [timer, setTimer] = useState(false)
    const [allProjects, setAllProjects] = useState([])

    const {task_name, task_description, project, task_start, task_end,error, success} = values;
    const id = isAuthenticated && isAuthenticated().user.id;

  //   useEffect(() => {
  //     projectGetter(id);
  // })

    const handleChange = (name) => (event) =>{
        setValues({...values, error:false, [name]: event.target.value});
    };

    const onSubmit = (event) =>{
        event.preventDefault();
        if (task_start === '' && task_end === ''){setValues({...values, task_start : null , task_end : null,error:false});}
        
        addTaskFunc({task_name, task_description, project, task_start, task_end}, id)
        .then((data) => {
            console.log('DATA', data);
            if (data.success){
                setValues({
                    ...values,
                    task_name:'',
                    task_description:'',
                    task_start:'',
                    task_end:'',
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
                        New Task created successfully. <Link to = '/'>Go To Home</Link>
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
    
    const projectGetter = (id) =>{
      getProjects(id)
      .then((data) => {
        console.log('DATA', JSON.stringify(data));
        if (data){
          setAllProjects(data)};      
      }).catch((e) => console.log(e))
    };

    const setTimerFunc = () =>{
      // event.preventDefault();
      // set_timer = !set_timer
      setTimer(!timer)
    }

    const signUpForm = () => {
        return (
            <div className = 'row'>
                <div className ='col-md-6 offset-sm-3 text-left'>
                    <form>
                        <div className = 'form-group'>
                            <label className = 'text-light'>Task Name</label>
                            <input 
                            className = 'form-control'
                            value = {task_name}
                            onChange = {handleChange('task_name')}
                            type = 'text'/>
                        </div>
                        <div className = 'form-group'>
                            <label className = 'text-light'>Task Description</label>
                            <input 
                            className = 'form-control input-lg'
                            value = {task_description}
                            onChange = {handleChange('task_description')}
                            type = 'text'/>
                        </div>
                        <div className = 'form-group'>
                            <label className = 'text-light lead'>Project</label><br/>
                            <select className="form-control form-select" onChange = {handleChange('project')} aria-label="Default select example">
                            {allProjects.map((proj) =>{
                              return(
                                <option  key = {proj.id} value={proj.id}>{proj.name}</option>
                              )
                            }) }
                            </select>
                        </div>
                        <div className="form-check">
                        <input className="form-check-input lg" type="checkbox" onChange = {setTimerFunc} id="Check1"/>
                        <label className="form-check-label" for="Check1">
                          Set timer for this task
                        </label>
                        </div><br/>
                        {(!timer) ?                        
                          (<div>
                          <label for="daytime-start">Task started at (date and time):</label>
                          <div className = 'form-group'>
                          <input type="datetime-local" onChange = {handleChange('task_start')} id="daytime-start" name="daytime-start"/>
                          </div><br/>
                          <label for="daytime-end">Task ended at (date and time):</label>
                          <div className = 'form-group'>
                          <input type="datetime-local" onChange = {handleChange('task_end')} id="daytime-end" name="daytime-end"/>
                          </div>
                          </div>
                          ):
                          <div>

                          </div>
                            
                        }
                        <button onClick={onSubmit} className = 'btn btn-success btn-block'>Submit</button>
                    </form>
                </div>
            </div>
        )
    };

    return(
      <div>
          {!isAuthenticated() ? (<Redirect to = '/signin' />) :
      (<Base title = 'Add tasks' description = "Add your task's here !">
          {projectGetter(id)}
          {successMessage()}
          {errorMessage()}
          {signUpForm()}
          <p className = 'text-white text-center'>
          </p> 
      </Base>)}
      </div>
    );
}

export default AddTask
