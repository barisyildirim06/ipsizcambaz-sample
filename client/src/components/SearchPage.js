import { connect, useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { Link } from "react-router-dom";
import NoPhoto from '../images/no_photo.png'



function SearchPage(props) {

    const [Products, setProducts] = useState([])
    const [Loaded, setLoaded] = useState(false)
    const user = useSelector(state => state.user)
    let maxTitleLength = 16;
    let maxDescriptionLength = 20;
    const searchTerms= props.match.params.searchTerms;

    useEffect(() => {
        const variables = {
            searchTerms: searchTerms,
            filters: {status: [ 0,1 ]}
        }
        getProducts(variables)

    }, [])

    const onTogether  =() => {
        let variables = {
            searchTerms: searchTerms,
            filters : {status: [ 0,1 ]}
        }
        getProducts(variables)
    }
    const onClose  =() => {
        let variables = {
            searchTerms: searchTerms,
            filters : {status: [ 0 ]}
        }
        getProducts(variables)
    }
    const onOpen  =() => {
        let variables = {
            searchTerms: searchTerms,
            filters : {status: [ 1 ]}
        }
        getProducts(variables)
    }


    const getProducts = (variables) => {
        Axios.post(`/api/product/getProducts?searchTerms=${searchTerms}&type=single`, variables)
            .then(response => {
                if (response.data.success) {
                    setLoaded(1)
                    setProducts(response.data.products)
                } else {
                    alert('Failed to fectch product datas')
                }
            })
    }


    return (
        <div>
            {Loaded ? 
            <div>
                <h1>Your Last Tickets Page</h1>
                <div className="text-right">
                    <div className="form-check form-check-inline">
                        <input onClick={onOpen} name="inlineRadioOptions" className="form-check-input" type="radio" id="inlineRadio1" value="option1" />
                        <label className="form-check-label" for="inlineRadio1">Show Open Posts</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input onClick={onClose} name="inlineRadioOptions" className="form-check-input" type="radio" id="inlineRadio2" value="option2" />
                        <label className="form-check-label" for="inlineRadio2">Show Closed Posts</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input onClick={onTogether} name="inlineRadioOptions" className="form-check-input" type="radio" id="inlineRadio3" value="option3" defaultChecked/>
                        <label className="form-check-label" for="inlineRadio3">Show All Posts</label>
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
        searchTerms: state.searchTerms
    }
}


export default connect(mapStateToProps)(SearchPage)

