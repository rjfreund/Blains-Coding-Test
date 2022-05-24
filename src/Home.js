import React, { useState, useEffect } from 'react';

const Home = () => {
    const [err, setErr] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        fetch("http://www.boredapi.com/api/activity/")
            .then(res => res.json())
            .then(
                (response) => {
                    setIsLoaded(true);
                    setActivities(response);
                },
                (error) => {
                    setIsLoaded(true);
                    setErr(error);
                }
            )
    }, [])
    if (err) {
        return <div>Error: {err.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <ul>
                {activities.map(activity => (
                    <li key={activity.id}>
                        {activity.name}
                    </li>
                ))}
            </ul>
        );
    }
}
export default Home;