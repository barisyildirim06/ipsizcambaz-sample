import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { connect, useSelector } from 'react-redux'
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";


function Home(props) {

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
            <h1>Active Posts</h1>
            <div>{Products.map((product) => {
                if (user.userData.isAdmin) {
                    props.history.push(`/admin/${user.userData._id}`);
                } else if (user.userData._id === product.writer._id) {
                    return (
                        <div>
                            <h1 className="personalheader"><Link to={`/posts/${product._id}`}>{`View Your "${product.title}" Post`}</Link></h1>
                        </div>
                    )
                }
            })}</div>
            <div>
            <Link to="/uploadPost"><button>ADD NEW POST</button></Link>
            </div>

        </div>



    )
}

const mapStateToProps = (state) => {
    return {
        userData: state.user.userData
    }
}

export default withRouter(connect(mapStateToProps)(Home));
