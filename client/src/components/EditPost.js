import Axios from 'axios'
import React, { useState, useEffect } from 'react'

function EditPost(props) {
    const [Product, setProduct] = useState([])
    const [writer, setWriter] = useState('')
    const [description, setDescription] = useState('')
    const [images, setImages] = useState('')
    const [response, setResponse] = useState('')
    const [responseImages, setResponseImages] = useState('')
    const [status, setStatus] = useState('')
    const productId = props.match.params.productId

    useEffect(() => {

        Axios.get(`/api/product/products_by_id?id=${productId}&type=single`)
            .then(response => {
                setProduct(response.data[0])
                setWriter(response.data[0].writer)
                setDescription(response.data[0].description)
                setImages(response.data[0].images)
                setResponse(response.data[0].response)
                setResponseImages(response.data[0].responseImages)
                setStatus(response.data[0].status)
            })

    }, [])

    const onSubmit = () => {
        Axios.post(`/api/product/update/${productId}`,)
    }
    const onClick =() =>{
        console.log(Product)
    }


    return (
        <div>
            ses
            <button onClick={onClick}>buton</button>
            <div>{description}</div>
        </div>
    )
}

export default EditPost
