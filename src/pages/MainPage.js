import React from 'react'
import {useHistory} from 'react-router-dom'

const MainPage = () => {
    const history = useHistory()
    return (
        <div className="container d-flex justify-content-center">
            <div className="container shadow">
                <div className="d-flex justify-content-center">
                    <h1>DAKONAN</h1>
                </div>
                <div className="d-flex justify-content-center">
                    <p>bla bla bla</p>
                </div>
                <div className="d-flex justify-content-center"  >
                    <button className="btn btn-warning mr-3 w-25">How To Play</button>
                    <button onClick={() => history.push('/register')} className="btn btn-dark w-25">Play</button>
                    <a href="https://css-tricks.com/snippets/css/a-guide-to-flexbox/"><button className="btn btn-dark w-25">Play</button></a>
                </div>
            </div>
        </div>
    )
}

export default MainPage