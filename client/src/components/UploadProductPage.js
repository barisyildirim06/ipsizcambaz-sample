import React, {useState} from 'react'
import {Typography, Button, Form, Input} from 'antd';
import FileUpload from './utils/FileUpload'
//antd ile Style değiştiriyoruz
import Axios from 'axios';
import { useSelector } from 'react-redux'

const {Title} =Typography;
const {TextArea} = Input

function UploadProductPage(props) {

    const user = useSelector(state => state.user)
    const [TitleValue, setTitleValue] = useState("")
    const [DescriptionValue, setDescriptionValue] = useState("")
    const [Images, setImages] = useState([])


    const onTitleChange= (e) => {
        setTitleValue(e.currentTarget.value)
    }
    const onDescriptionChange= (e) => {
        setDescriptionValue(e.currentTarget.value)
    }

    const updateImages = (newImages) => {
        setImages(newImages)
    }
    const onSubmit = (e) => {
        e.preventDefault();

        if(!TitleValue || !DescriptionValue || !Images ) {
            return alert('Fill all the fields!!')
        }

        const variables = {
            writer: user.userData._id,
            title: TitleValue,
            description: DescriptionValue,
            images: Images
        }

        Axios.post('/api/product/uploadProduct', variables)
        .then(response => {
            if(response.data.success) {
                alert('Product Successfully Uploaded')
                props.history.push('/')
            } else {
                alert('Failed to upload Product')
            }
        })
    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2}>Upload Travel Product</Title>
            </div>
            
            <Form onSubmit={onSubmit}>
            {/* DropZone */}
            <h4>Photographs Related with Post (Not Necessary)</h4>
            <FileUpload refreshFunction={updateImages}/>
            <br />
            <br />
            <label>Title</label>
            <TextArea rows="2" cols="100"
                onChange={onTitleChange}
                value={TitleValue}
            />
            <br />
            <br />
            <label>Description</label>
            <TextArea cols="100" rows="20"
                onChange={onDescriptionChange}
                value={DescriptionValue}
            />
            <br/>
            <br/>
            <Button
                onClick={onSubmit}
            >
                Submit
            </Button>

            </Form>


        </div>
    )
}

export default UploadProductPage;