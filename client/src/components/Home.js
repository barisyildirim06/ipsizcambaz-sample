import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { connect, useSelector } from 'react-redux'
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import NoPhoto from '../images/no_photo.png'


function Home(props) {

    const user = useSelector(state => state.user)
    const [Products, setProducts] = useState([])
    const [Loaded, setLoaded] = useState(false)
    let maxTitleLength = 16;
    let maxDescriptionLength = 20;
    useEffect(() => {
        const variables = {
            filters: {status: [ 0,1 ]}
        }

        getProducts(variables)
    }, [])

    const getProducts = (variables) => {
        Axios.post('/api/product/getProducts',variables)
            .then(response => {
                if (response.data.success) {
                    setProducts(response.data.products)
                    setLoaded(true)
                } else {
                    alert('Failed to fectch product datas')
                }
            })
    }

    const onTogether  =() => {
        let variables = {
            filters : {status: [ 0,1 ]}
        }
        getProducts(variables)
    }
    const onClose  =() => {
        let variables = {
            filters : {status: [ 0 ]}
        }
        getProducts(variables)
    }
    const onOpen  =() => {
        let variables = {
            filters : {status: [ 1 ]}
        }
        getProducts(variables)
    }

    return (
        <div>
            {Loaded ? 
            <div>
                <h1>Your Last Tickets Page</h1>
                <div className="text-right">
                    <div class="form-check form-check-inline">
                        <input onClick={onOpen} name="inlineRadioOptions" class="form-check-input" type="radio" id="inlineRadio1" value="option1" />
                        <label class="form-check-label" for="inlineRadio1">Show Open Posts</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input onClick={onClose} name="inlineRadioOptions" class="form-check-input" type="radio" id="inlineRadio2" value="option2" />
                        <label class="form-check-label" for="inlineRadio2">Show Closed Posts</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input onClick={onTogether} name="inlineRadioOptions" class="form-check-input" type="radio" id="inlineRadio3" value="option3" defaultChecked/>
                        <label class="form-check-label" for="inlineRadio3">Show All Posts</label>
                    </div>
                </div>
            </div>
            : null}
            <div className="row">{Products.map((product) => {
                if (user.userData.isAdmin) {
                    return props.history.push(`/admin`);
                } else if (user.userData._id === product.writer._id) {
                    return(
                        <div className="col-lg-4 col-md-6 productbox">
                            <div className="card" >
                                {product.images.length ? 
                                <img src={`../${product.images[0]}`} alt="." className="card-img-top"/> 
                                : <img src={NoPhoto} alt="." className="card-img-top"/>}
                                
                                <div className="card-body">
                                <h5 className="card-title">{`Writer : ${product.writer.name}`}</h5>
                                    <h5 className="card-title">{`Title : ${product.title.length < maxTitleLength ? product.title : `${product.title.substring(0,maxTitleLength)}...`}`}</h5>
                                    <p className="card-text">{`Description :${product.description.length < maxDescriptionLength ? product.description : `${product.description.substring(0,maxDescriptionLength)}...`}`}</p>
                                    <Link to={`/view/${product._id}`} className="btn btn-outline-success">View</Link>
                                </div>
                            </div>
                        </div>
                    )
                        
                }
            })}</div>
        </div>



    )
}

const mapStateToProps = (state) => {
    return {
        userData: state.user.userData
    }
}

export default withRouter(connect(mapStateToProps)(Home));
