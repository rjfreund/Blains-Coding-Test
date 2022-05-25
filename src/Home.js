import React, { useState, useEffect } from 'react';

const Home = () => {
    const [err, setErr] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [activity, setActivity] = useState(null);

    useEffect(()=>{
        requestActivity();
    }, [])

    function requestActivity(){
        fetch("http://www.boredapi.com/api/activity/")
            .then(res => res.json())
            .then(
                (response) => {
                    setIsLoaded(true);
                    setActivity(response);
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
        return <div>
            {/* JSON.stringify(activity) */}
            <button className="btn btn-primary" type="submit" onClick={requestActivity}>Request Random Activity</button>
            <dl className="row">
                <dt className="col-sm-3">Description lists</dt>
                <dd className="col-sm-9">A description list is perfect for defining terms.</dd>

                <dt className="col-sm-3">Term</dt>
                <dd className="col-sm-9">
                    <p>Definition for the term.</p>
                    <p>And some more placeholder definition text.</p>
                </dd>

                <dt className="col-sm-3">Another term</dt>
                <dd className="col-sm-9">This definition is short, so no extra paragraphs or anything.</dd>

                <dt className="col-sm-3 text-truncate">Truncated term is truncated</dt>
                <dd className="col-sm-9">This can be useful when space is tight. Adds an ellipsis at the end.</dd>

                <dt className="col-sm-3">Nesting</dt>
                <dd className="col-sm-9">
                    <dl className="row">
                    <dt className="col-sm-4">Nested definition list</dt>
                    <dd className="col-sm-8">I heard you like definition lists. Let me put a definition list inside your definition list.</dd>
                    </dl>
                </dd>
                </dl>
            <Accordion />
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

const Accordion = () =>
    <div className="accordion" id="accordionExample">
        <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    Accordion Item #1
                </button>
            </h2>
            <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                    <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                </div>
            </div>
        </div>
        <div className="accordion-item">
            <h2 className="accordion-header" id="headingTwo">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    Accordion Item #2
                </button>
            </h2>
            <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                    <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                </div>
            </div>
        </div>
        <div className="accordion-item">
            <h2 className="accordion-header" id="headingThree">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                    Accordion Item #3
                </button>
            </h2>
            <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                    <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                </div>
            </div>
        </div>
    </div>

export default Home;