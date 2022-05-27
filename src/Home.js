import { type } from '@testing-library/user-event/dist/type';
import React, { useState, useEffect } from 'react';

const Home = () => {
    const typeCategoryDefaultValue = "education";
    const numParticipantsDefaultValue = 1;
    const relativePriceDefaultValue = 0.1;
    const accessibilityRatingDefaultValue = 0.1;

    const [errorMessage, setErrorMessage] = useState(null);
    const [activities, setActivities] = useState([]);
    const [typeCategory, setTypeCategory] = useState(typeCategoryDefaultValue)
    const [numParticipants, setNumParticipants] = useState(numParticipantsDefaultValue);
    const [relativePrice, setRelativePrice] = useState(relativePriceDefaultValue);
    const [accessibilityRating, setAccessibilityRating] = useState(accessibilityRatingDefaultValue);

    function requestActivity() {
        fetch(`http://www.boredapi.com/api/activity?type=${typeCategory}&participants=${numParticipants}&price=${relativePrice}&accessibility=${accessibilityRating}`)
            .then(res => res.json())
            .then(
                (response) => {
                    if (response.error) {
                        setErrorMessage(response.error);
                    } else {
                        setErrorMessage(null);
                        setActivities([].concat(response, activities));
                    }
                },
                (error) => {
                    setErrorMessage(error);
                }
            )
    }

    function handleChangeTypeCategory(event) {
        setTypeCategory(event.target.value);
    }

    function handleChangeRelativePrice(event) {
        setRelativePrice(event.target.value);
    }

    function handleChangeAccessibilityRating(event) {
        setAccessibilityRating(event.target.value);
    }

    function handleChangeNumParticipants(event) {
        setNumParticipants(event.target.value);
    }
    return <div className="container pt-3">
        <div className="row">
            <div className="col-md">
                <div className="form-floating mb-3">
                    <select className="form-select" id="typeCategory" aria-label="Floating label select example" onChange={handleChangeTypeCategory}>
                        <option value="education">Education</option>
                        <option value="recreational">Recreational</option>
                        <option value="social">Social</option>
                        <option value="diy">Diy</option>
                        <option value="charity">Charity</option>
                        <option value="cooking">Cooking</option>
                        <option value="relaxation">Relaxation</option>
                        <option value="music">Music</option>
                        <option value="busywork">Busywork</option>
                    </select>
                    <label htmlFor="typeCategory">Type:</label>
                </div>
            </div>
            <div className="col-md">
                <div className="form-floating mb-3">
                    <input type="number" className="form-control" id="numParticipants" defaultValue={numParticipantsDefaultValue} onChange={handleChangeNumParticipants} />
                    <label htmlFor="numParticipants">Number of participants:</label>
                </div>
            </div>
            <div className="col-md">
                <label htmlFor="relativePrice" className="form-label">Relative price: {relativePrice}</label>
                <div className="row">
                    <div className="col-md-1">0</div>
                    <div className="col-md-10"><input type="range" className="form-range" id="relativePrice" min="0" max="1" step="0.05" defaultValue={relativePriceDefaultValue} onChange={handleChangeRelativePrice}></input></div>
                    <div className="col-md-1">1</div>
                </div>
            </div>
            <div className="col-md">
                <label htmlFor="accessibilityRating" className="form-label">Accessibility rating: {accessibilityRating}</label>
                <div className="row">
                    <div className="col-md-1">0</div>
                    <div className="col-md-10"><input type="range" className="form-range" id="accessibilityRating" min="0" max="1" step="0.05" defaultValue={accessibilityRatingDefaultValue} onChange={handleChangeAccessibilityRating}></input></div>
                    <div className="col-md-1">1</div>
                </div>
            </div>
            <div className="row">
                <div className="col text-center">
                    <button className="btn btn-primary mx-auto mb-3" type="submit" onClick={requestActivity}>Request Random Activity</button>
                </div>
            </div>
            {errorMessage &&
                <p className='text-center'>{errorMessage}</p>
            }
            <div className="accordion" id="accordion">
                {activities.map((activity, index) =>
                    <div className="accordion-item" key={index}>
                        <h2 className="accordion-header" id={"heading" + index}>
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={"#collapse" + index} aria-expanded="true" aria-controls="collapseOne">
                                {activity.activity}
                            </button>
                        </h2>
                        <div id={"collapse" + index} className={`accordion-collapse collapse ${(index == 0) ? "show" : "hide"}`} aria-labelledby={"heading" + index} data-bs-parent="#accordion">
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
                )}
            </div>

        </div>
    </div>
}

export default Home;