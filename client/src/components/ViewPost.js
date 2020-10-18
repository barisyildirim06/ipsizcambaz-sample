import Axios from 'axios'
import React, { useState, useEffect } from 'react'
import NoPhoto from '../images/no_photo.png'
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux'

function ViewPost(props) {
    const [Loaded, setLoaded] = useState(false)
    const [title, setTitle] = useState('')
    const [writer, setWriter] = useState('')
    const [description, setDescription] = useState('')
    const [images, setImages] = useState('')
    const [response, setResponse] = useState('')
    const [responseImages, setResponseImages] = useState('')
    const [userResponse, setUserResponse] = useState([])
    const [status, setStatus] = useState('')
    const [ExtraComment, setExtraComment] = useState('')
    const [ExtraCommentStatus, setExtraCommentStatus] = useState(false)
    const productId = props.match.params.productId

    useEffect(() => {
        const fetchData = async () => {
            await Axios.get(`/api/product/products_by_id?id=${productId}&type=single`)
                .then(response => {
                    setTitle(response.data[0].title)
                    setWriter(response.data[0].writer)
                    setDescription(response.data[0].description)
                    setImages(response.data[0].images)
                    setResponse(response.data[0].response)
                    setUserResponse(response.data[0].userResponse)
                    setResponseImages(response.data[0].responseImages)
                    setStatus(response.data[0].status)
                    setWriter(response.data[0].writer)
                    setLoaded(true)
                })
        }
        fetchData()
    }, [])
    const changeExtraComment = (e) => {
        setExtraComment(e.target.value)
    }

    const ChangeExtraCommentStatus = () => {
        setExtraCommentStatus(true)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        setUserResponse(userResponse.push(ExtraComment))
        
        console.log(userResponse)

        const product = {
            userResponse: userResponse
        }

        console.log(product)
        Axios.post(`/api/product/view?id=${productId}&type=single`, product)
            .then(res => console.log(res.data))
            .then(props.history.push('/'))
            ;
    }

    return (
        <div >{Loaded ?
            <div>
                <h1>{`Writer Name: ${writer.name}`}</h1>
                <div>
                    {images.length ?
                        <div>
                            {images.map((image) => {
                                return (<img src={`../${image}`} alt="." className="col-sm-6 col-lg-4 card-img-top margin-bot-top" />)
                            })}
                        </div>
                        : <img src={NoPhoto} alt="." className="imagesBox" />}
                </div>
                <h3 className="text-left">{`Title: ${title}`}</h3>
                        <h3 className="text-left">{status ? "Status: Open" : "Status: Closed"}</h3>
                <div className="form-group">
                    <label for="Description">Description</label>
                    <textarea className="form-control" rows="5" value={description} id="Descrription" disabled/>
                </div>
                
                <div>
                    <label for="Response">Admin Comment</label>
                    <textarea className="form-control bkcolor" rows="5" value={response} id="Response" disabled/>
                </div>
                <div>
                    {responseImages.length ?
                        <div>
                            <label for="AdminImages">Previous Response Images</label>
                            <div id="AdminImages">
                                {responseImages.map((image) => {
                                    return (<img src={`../${image}`} alt="." className="col-sm-6 col-lg-4 card-img-top margin-bot-top" />)
                                })}
                            </div>
                        </div>
                        : null}
                </div>
                {userResponse.length ?
                <div className="form-group">
                    <br/>
                    <label for="PreviousComments">Your Previous Comments</label>
                <ul className="text-left" id="PreviousComments">{userResponse.map((resp) => (<li> {resp} </li>))}</ul>
                </div>: null}
                <br />
                {
                    ExtraCommentStatus ?
                        <div className="form-group">
                            <label for="Description">Extra Comment</label>
                            <textarea className="form-control" rows="5" value={ExtraComment} id="Description"
                                onChange={changeExtraComment} />
                                <br/>
                            {ExtraComment.length ? <button className="btn btn-outline-success" onClick={onSubmit}>Make Extra Comment</button> :
                            <button className="btn btn-outline-success" onClick={onSubmit} disabled>Write Your Comment</button>}
                        </div>
                        :
                        <button className="btn btn-outline-success" onClick={ChangeExtraCommentStatus }>Make Extra Comment</button>
                }

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

export default withRouter(connect(mapStateToProps)(ViewPost));

