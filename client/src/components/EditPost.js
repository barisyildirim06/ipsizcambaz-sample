import Axios from 'axios'
import React, { useState, useEffect } from 'react'
import NoPhoto from '../images/no_photo.png'
import FileUpload from './utils/FileUpload'
import { withRouter } from "react-router-dom";
import { connect, useSelector } from 'react-redux'

function EditPost(props) {
    const user = useSelector(state => state.user)
    const [Loaded, setLoaded] = useState(false)
    const [Ses, setSes] = useState([])
    const [title, setTitle] = useState('')
    const [writer, setWriter] = useState('')
    const [description, setDescription] = useState('')
    const [images, setImages] = useState('')
    const [response, setResponse] = useState('')
    const [responseImages, setResponseImages] = useState('')
    const [status, setStatus] = useState('')
    const productId = props.match.params.productId

    useEffect(() => {
        const fetchData = async () => {
            await Axios.get(`/api/product/products_by_id?id=${productId}&type=single`)
                .then(response => {
                    setSes(response.data[0])
                    setTitle(response.data[0].title)
                    setWriter(response.data[0].writer)
                    setDescription(response.data[0].description)
                    setImages(response.data[0].images)
                    setResponse(response.data[0].response)
                    setResponseImages(response.data[0].responseImages)
                    setStatus(response.data[0].status)
                    setLoaded(true)
                })
        }
        fetchData()
    }, [])
    const changeDescription = (e) => {
        setDescription(e.target.value)
    }
    const changeTitle = (e) => {
        setTitle(e.target.value)
    }
    const changeResponse = (e) => {
        setResponse(e.target.value)
    }

    const Switched = () => {
        setStatus(!status)
    }
    const updateImages = (newImages) => {
        setResponseImages(newImages)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        console.log(Ses)

        const product = {
            writer: writer,
            title: title,
            description: description,
            images: images,
            response: response,
            responseImages: responseImages,
            status: status
        }

        console.log(product)
        Axios.post(`/api/product/update?id=${productId}&type=single`, product)
            .then(res => console.log(res.data))
            .then(props.history.push('/'));
    }


    const newLocal = "clicked"
    return (
        <div >{Loaded ?
            <div>
                {user.userData.isAdmin ? <form onSubmit={onSubmit}>
                    <h1>{`Writer Name: ${writer.name}`}</h1>
                    <div>
                        {images.length ?
                            <div>
                                {images.map((image) => {
                                    return (<img src={`../${image}`} alt="No Image" className="col-sm-6 col-lg-4 card-img-top margin-bot-top" />)
                                })}
                            </div>
                            : <img src={NoPhoto} alt="No Image" className="imagesBox" />}
                    </div>
                    <div className="form-group">
                        <label for="Title">Title</label>
                        <input type="text" className="form-control" value={title} id="Title"
                            onChange={changeTitle} />
                    </div>
                    <div className="form-group">
                        <label for="Description">Description</label>
                        <textarea className="form-control" rows="5" className="form-control" value={description} id="Description"
                            onChange={changeDescription} />
                    </div>
                    <div className="form-group">
                        <label for="Response">Admin Comment</label>
                        <textarea className="form-control" rows="5" className="form-control" value={response} id="Response"
                            onChange={changeResponse} />
                    </div>
                    <div>

                        {responseImages.length ?
                            <div>
                                <label for="AdminImages">Previous Response Images</label>
                                <div id="AdminImages">
                                    {responseImages.map((image) => {
                                        return (<img src={`../${image}`} alt="No Image" className="col-sm-6 col-lg-4 card-img-top margin-bot-top" />)
                                    })}
                                </div>
                            </div>

                            : null}
                    </div>
                    <br />
                    <label for="FileUpload">Upload Response Pictures</label>
                    <div id="FileUpload">
                        <FileUpload refreshFunction={updateImages} />
                    </div>
                    <br />


                    {status ?
                        <div className="custom-control custom-switch">
                            <input type="checkbox" className="custom-control-input" id="StatusCheck" onClick={Switched} checked />
                            <label className="custom-control-label" for="StatusCheck">{status ? "Post status is opened toggle To close status" : "Post status is closed toggle to open status"}</label>
                        </div> :
                        <div className="custom-control custom-switch">
                            <input type="checkbox" className="custom-control-input" id="StatusCheck" onClick={Switched} />
                            <label className="custom-control-label" for="StatusCheck">{status ? "Toggle To Close Status" : "Toggle To Open Status"}</label>
                        </div>}
                    <br />
                    <input type="submit" className="btn btn-outline-success" onClick={onSubmit} value="Submit" />
                </form> : props.history.push('/')}
                
            </div>
            : null
        }

        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        userData: state.user.userData
    }
}

export default withRouter(connect(mapStateToProps)(EditPost));

