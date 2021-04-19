import React, { useState, useEffect } from 'react'
import {getTimeEntry} from './helper/coreapicalls'
import { isAuthenticated } from '../auth/helper';

import Base from './Base';
import Card from './Card';
import '../styles.css';

export default function Home (){
    const [timeEntrys, setTimeEntrys] = useState([]);
    const [filterDate, setFilterDate] = useState([Date.now()]);
    const [error, setError] = useState(false)

    const id = isAuthenticated && isAuthenticated().user.id

    const loadTimeEntry = (id) => {
        getTimeEntry(id)
        .then(data =>{
            if (data.error) {
                setError(data.error);
                console.log(error);
            }else {
                setTimeEntrys(data);
            }
        }
        );
    };

    useEffect(() => {
        loadTimeEntry(id);
    })


    const SetDateFilter = (event) =>{
        setFilterDate(event.target.value);
    };


    return(
        <Base title = 'Task' description = 'management'>
            <div className = 'row'>
                {timeEntrys.map((timeEntry) => {
                    return(
                        <div key = {timeEntry.id} className = 'col-12 mb-12'>
                            <Card timeEntry = {timeEntry}/>
                        </div>
                    )
                })}

            </div>
        </Base>
    )
}