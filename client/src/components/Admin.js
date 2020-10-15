import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { connect, useSelector } from 'react-redux'
import { withRouter } from "react-router-dom";



function Admin(props) {

    const user = useSelector(state => state.user)
    const [Products, setProducts] = useState([])
    useEffect(() => {
        getProducts()
    }, [])

    const getProducts = () => {
        Axios.post('/api/product/getProducts')
            .then(response => {
                if (response.data.success) {
                    setProducts(response.data.products)
                } else {
                    alert('Failed to fectch product datas')
                }
            })
    }

    return (
        <div>
            <div>{Products.map((product) => {
                if (!user.userData.isAdmin) {
                    props.history.push("/");
                } else {
                    return (
                        <div>
                            <h1>{product.title}</h1>
                            <h4>{product.description}</h4>
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
