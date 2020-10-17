
import { connect } from 'react-redux'

import React, { useEffect, useState } from 'react'
import Axios from 'axios';



function SearchPage(props) {

    const searchTerms= props.match.params.searchTerms;

    useEffect(() => {
        const variables = {
            skip: Skip,
            limit: Limit,
            searchTerms: searchTerms
        }

        getProducts(variables)

        

    }, [])

    const getProducts = (variables) => {
        Axios.post(`/api/product/getProducts?searchTerms=${searchTerms}&type=single`, variables)
            .then(response => {
                if (response.data.success) {
                    
                    if (variables.loadMore) {
                        setProducts([...Products, ...response.data.products])
                    } else {
                        setProducts(response.data.products)
                    }
                    setSuspense(1)
                    setPostSize(response.data.postSize)
                    console.log(PostSize)
                } else {
                    alert('Failed to fectch product datas')
                }
            })
    }

    const onLoadMore = () => {
        let skip = Skip + Limit;

        const variables = {
            skip: skip,
            limit: Limit,
            loadMore: true,
            searchTerm: searchTerms
        }
        getProducts(variables)
        setSkip(skip)
    }


    return (
        <div>
            {!Suspense ? <div className="container"></div> :
                <div>
                    <div className="container">
                        <div className="column col-8 col-s-12 left1">

                            
                        </div>
                    </div>
                </div>
            }

        </div>


    )
}


const mapStateToProps = (state) => {
    return {
        searchTerms: state.searchTerms
    }
}


export default connect(mapStateToProps)(SearchPage)

