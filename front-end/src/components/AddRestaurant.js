import React from 'react'

const AddRestaurant = () => {
    return (
        <div>
            <div className="mb-4">
                <form action="">
                    <div className="form-row">
                        <div className="col">
                            <input className="form-control" type="text" placeholder="name"/>
                        </div>
                        <div className="col">
                            <input className="form-control" type="text" placeholder="location"/>
                        </div>
                        <div className="col">
                            <input className="form-control" type="text" placeholder="price range"/>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddRestaurant
