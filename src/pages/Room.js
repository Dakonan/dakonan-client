import React from 'react'

const Room = () => {
    return (
        <div className="container">
            <div className="container d-flex justify-content-center">
                <form>
                    <input type="text" />
                    <button type="submit" className="btn-primary">Create Room</button>
                </form>
            </div>
            <div className="container room-body">
                <div className="row d-flex justify-content-center align-items-center shadow-lg mt-5 mx-auto">
                    <div className="col-4 bg-warning">
                        <h1>Room List</h1>
                        
                    </div>
                    <div className="col-8">
                        <h1>Waiting Room</h1>
                        {/* detail room nya */}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Room