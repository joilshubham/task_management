import { useEffect, useState } from 'react';
import moment from 'moment'

const Timer = (tempDate) => {

    const [time, setTime] = useState(0);

    const hourCheck = (tempDate) => {
        const dateAdded = moment(tempDate).toISOString();
        const now = moment().toISOString();
        const ms = moment(now).diff(moment(dateAdded));
        const d = moment.duration(ms);
        const hours = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");
        console.log(d)
        return hours;
    }

    // const showTime = () => {
    //     let time = new Date();
    //     let hour = time.getHours();
    //     let min = time.getMinutes();
    //     let sec = time.getSeconds();
    //     let am_pm = "AM";

    //     if (hour > 12) {
    //         hour -= 12;
    //         am_pm = "PM";
    //     }
    //     if (hour == 0) {
    //         hour = 12;
    //         am_pm = "AM";
    //     }

    //     hour = hour < 10 ? "0" + hour : hour;
    //     min = min < 10 ? "0" + min : min;
    //     sec = sec < 10 ? "0" + sec : sec;

    //     let currentTime = hour + ":" + min + ":" + sec + am_pm;

    //     return currentTime;
    // }

    useEffect(() => {
        const interval = setInterval(() => setTime(hourCheck(tempDate)), 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <div>
            <h1> Last updated {time} hrs ago. </h1>
        </div>
    );
}

export default Timer;