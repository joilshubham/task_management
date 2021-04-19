import React, { useState } from 'react';
import moment from 'moment';
import Timer from './Timer';
import {Redirect} from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';


const Card = ({
    timeEntry,
    endTask = false,
    reload = undefined,
    setReload = f => f,
  }) => {

    const [redirect, setRedirect] = useState(false)

    const cardTaskName = timeEntry ? timeEntry.task_name : 'No task name'
    const cardTaskDescription = timeEntry ? timeEntry.task_description : 'No description'
    const cardProjectName = timeEntry ? timeEntry.project_name : 'No Project selected'
    const cardTaskStart = timeEntry ? timeEntry.task_start : 'No Task start time'
    const cardTaskEnd = timeEntry ? timeEntry.task_end : 'No Task end time'

    const showTimer1 = () => {
    
      const tempDate= cardTaskStart
      const dateAdded = moment(tempDate).valueOf();
      const hours = moment.duration(moment(new Date().toISOString()).valueOf() - dateAdded).minutes();
      if (!cardTaskEnd){
        return(
          <button type="button" class="btn btn-primary">{hours}</button>
        )
        }
    }

    const showTimer = (taskStart) => {
      if (!cardTaskEnd){
        return(
          <Timer tempDate = {taskStart}></Timer>
        )
        };
    };
    

    const endTaskFunc = () => {};

    const showEndTaskBttn = endTask =>{
      if (isAuthenticated() && !cardTaskEnd){
          return(
            endTask && (
                  <button
                  onClick={endTaskFunc}
                  className="btn btn-block btn-outline-success mt-2 mb-2"
                >
                  End Task
                </button>
              )
          )
        }
    }
    

    const getAredirect = (redirect) => {
        if(redirect){
            return <Redirect to='/cart'/>;
        }
    };

    
    return (
      <div class="col-sm-12">
      <div className="card text-white bg-dark border border-info  ">
        <div className="card-header lead">{cardTaskName}</div>
        <div className="card-body">
          {getAredirect(redirect)}
          <p className="lead bg-success font-weight-normal text-wrap">{cardTaskDescription}</p>
          <p className="btn btn-success rounded  btn-sm px-4">{cardProjectName}</p><br/>
          <p className="btn btn-success rounded  btn-sm px-4">{cardTaskStart}</p>
          {(cardTaskEnd)?
          (<p className="btn btn-success rounded  btn-sm px-4">{cardTaskEnd}</p>):
          null}
          <div className="row">
            <div className="col-12">
              {showTimer(timeEntry.task_start)}
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  };

  export default Card