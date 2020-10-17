import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { connect, useSelector } from 'react-redux'
import { withRouter } from "react-router-dom";
import { Link } from 'react-router-dom'
import NoPhoto from '../images/no_photo.png'


function Admin(props) {

    const user = useSelector(state => state.user)
    const [Products, setProducts] = useState([])
    const [Loaded, setLoaded] = useState(false)
    let maxTitleLength = 16;
    let maxDescriptionLength = 20;
    useEffect(() => {
        getProducts()
        
    }, [])

    const getProducts = () => {
        Axios.post('/api/product/getProducts')
            .then(response => {
                if (response.data.success) {
                    setProducts(response.data.products)
                    setLoaded(true)
                } else {
                    alert('Failed to fectch product datas')
                }
            })
    }

    return (
        <div className="container">
            {Loaded ? <h1>Admin Page</h1> : null}
            <div className="row">{Products.map((product) => {
                if (!user.userData.isAdmin) {
                    props.history.push("/");
                } else {
                    return (
                        <div className="col-lg-4 col-md-6 productbox">
                            <div class="card" >
                                {product.images.length ? 
                                <img src={`../${product.images[0]}`} alt="No Image" className="card-img-top"/> 
                                : <img src={NoPhoto} alt="No Image" className="card-img-top"/>}
                                
                                <div class="card-body">
                                <h5 class="card-title">{`Writer : ${product.writer.name}`}</h5>
                                    <h5 class="card-title">{`Title : ${product.title.length < maxTitleLength ? product.title : `${product.title.substring(0,maxTitleLength)}...`}`}</h5>
                                    <p class="card-text">{`Description :${product.description.length < maxDescriptionLength ? product.description : `${product.description.substring(0,maxDescriptionLength)}...`}`}</p>
                                    <Link to={`/update/${product._id}`} className="btn btn-outline-success">Edit</Link>
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

export default withRouter(connect(mapStateToProps)(Admin));
