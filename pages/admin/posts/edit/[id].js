import { useState } from 'react';
import Router from 'next/router';
import Layout from '../../../../layouts/default';
import axios from "axios";
import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

//fetch with "getServerSideProps"
export async function getServerSideProps({ params }) {

    //http request
    const req  = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/posts/${params.id}`)
    const res  = await req.data.data

    return {
      props: {
          post: res // <-- assign response
      },
    }
}

function PostEdit(props) {
    const editorRef = useRef(null);

    //destruct
    const { post } = props;

    //state
    const [image, setImage] = useState("");
    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content);

    const handleEditorChange = (content, editor) => {
        setContent(content);
      };
    //state validation
    const [validation, setValidation] = useState({});

    //function "handleFileChange"
    const handleFileChange = (e) => {

        //define variable for get value image data
        const imageData = e.target.files[0]

        //check validation file
        if (!imageData.type.match('image.*')) {

            //set state "image" to null
            setImage('');

            return
        }

        //assign file to state "image"
        setImage(imageData);
    }

    //method "updatePost"
    const updatePost = async (e) => {
        e.preventDefault();

        //define formData
        const formData = new FormData();

        //append data to "formData"
        formData.append('image', image);
        formData.append('title', title);
        formData.append('content', content);
        formData.append('_method', 'PUT');
        
        //send data to server
        await axios.post(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/posts/${post.id}`, formData)
        .then(() => {

            //redirect
            Router.push('/admin/dashboard')

        })
        .catch((error) => {

            //assign validation on state
            setValidation(error.response.data);
        })
        
    };

    return (
        <Layout>
            <div className="container" style={{ marginTop: '80px' }}>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card border-0 rounded shadow-sm">
                            <div className="card-body">
                                <form onSubmit={ updatePost }>

                                    <div className="form-group mb-3">
                                        <label className="form-label fw-bold">Image</label>
                                        <input type="file" className="form-control" onChange={handleFileChange}/>
                                    </div>

                                    <div className="form-group mb-3">
                                        <label className="form-label fw-bold">TITLE</label>
                                        <input className="form-control" type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Masukkan Title" />
                                    </div>
                                    {
                                        validation.title &&
                                            <div className="alert alert-danger">
                                                {validation.title}
                                            </div>
                                    }

                                    <div className="form-group mb-3">
                                        <label className="form-label fw-bold">CONTENT</label>
                                        <Editor
                                            apiKey='y64g9p8st4vq2vpk35a0ial1gf2mjhm2xggag4e7bdh5nkpa'
                                            onInit={(evt, editor) => editorRef.current = editor}
                                            value={content}
                                            onEditorChange={handleEditorChange}
                                            init={{
                                            height: 300,
                                            menubar: false,
                                            plugins: [
                                                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                                            ],
                                            toolbar: 'undo redo | blocks | ' +
                                                'bold italic forecolor | alignleft aligncenter ' +
                                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                                'removeformat | help',
                                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                            }}
                                        />
                                    </div>
                                    {
                                        validation.content &&
                                            <div className="alert alert-danger">
                                                {validation.content}
                                            </div>
                                    }

                                    <button className="btn btn-primary border-0 shadow-sm" type="submit">
                                        UPDATE
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );

}

export default PostEdit