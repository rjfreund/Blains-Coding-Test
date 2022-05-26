import React, { useState, useEffect } from 'react';

const Home = () => {
    const [err, setErr] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        requestActivity();
    }, [])

    function requestActivity() {
        fetch("http://www.boredapi.com/api/activity/")
            .then(res => res.json())
            .then(
                (response) => {
                    setIsLoaded(true);
                    setActivities([].concat(response, activities));
                },
                (error) => {
                    setIsLoaded(true);
                    setErr(error);
                }
            )
    }

    if (err) {
        return <div>Error: {err.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return <div className="container">
            <p className='text-center'>{JSON.stringify(activities)}</p>
            <button className="btn btn-primary d-block mx-auto" type="submit" onClick={requestActivity}>Request Random Activity</button>
            <div className="accordion" id="accordion">
                {
                    activities.map((activity, index) =>
                        <div className="accordion-item" key={activity.activity}>
                            <h2 className="accordion-header" id={"heading" + index}>
                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={"#collapse" + index} aria-expanded="true" aria-controls="collapseOne">
                                    {activity.activity}
                                </button>
                            </h2>
                            <div id={"collapse" + index} className={`accordion-collapse collapse ${(index==0)?"show":"hide"}`} aria-labelledby={"heading" + index} data-bs-parent="#accordion">
                                <div className="accordion-body">
                                    <dl key={activity.activity} className="row justify-content-md-center">
                                        <dt className="col-sm-6">Description</dt>
                                        <dd className="col-sm-6">{activity.activity}</dd>
                                        <dt className="col-sm-6">Type</dt>
                                        <dd className="col-sm-6">{activity.type}</dd>
                                        <dt className="col-sm-6">Number of participants</dt>
                                        <dd className="col-sm-6">{activity.participants}</dd>
                                        <dt className="col-sm-6">Relative price</dt>
                                        <dd className="col-sm-6">{activity.price}</dd>
                                        {activity.link &&
                                        <>
                                            <dt className="col-sm-6">Link</dt>
                                            <dd className="col-sm-6">{activity.link}</dd>
                                        </>
                                        }
                                        <dt className="col-sm-6">Key</dt>
                                        <dd className="col-sm-6">{activity.key}</dd>
                                        <dt className="col-sm-6">Accessibility rating</dt>
                                        <dd className="col-sm-6">{activity.accessibility}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>

                    )
                }
                <div class="accordion-item">
                    <h2 class="accordion-header" id="flush-headingOne">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                            Accordion Item #1
                        </button>
                    </h2>
                    <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                        <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the first item's accordion body.</div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header" id="flush-headingTwo">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                            Accordion Item #2
                        </button>
                    </h2>
                    <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                        <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the second item's accordion body. Let's imagine this being filled with some actual content.</div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header" id="flush-headingThree">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                            Accordion Item #3
                        </button>
                    </h2>
                    <div id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                        <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the third item's accordion body. Nothing more exciting happening here in terms of content, but just filling up the space to make it look, at least at first glance, a bit more representative of how this would look in a real-world application.</div>
                    </div>
                </div>
            </div>
        </div>
        {/*
        return <div>
            {activity.activity}
            {activity.type}
            {activity.participants}
            {activity.price}
            {activity.link}
            {activity.key}
            {activity.accessibility}
        </div>
    */}
    }
}

export default Home;