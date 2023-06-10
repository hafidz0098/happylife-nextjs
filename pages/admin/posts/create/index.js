import { useState } from 'react';
import Router from 'next/router';
import Layout from '../../../../layouts/default';
import axios from "axios";
import Head from 'next/head';
import Swal from 'sweetalert2';
import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';


function PostCreate() {
    const editorRef = useRef(null);

    //state
    const [image, setImage] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

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

    //method "storePost"
    const storePost = async (e) => {
        e.preventDefault();

        //define formData
        const formData = new FormData();

        //append data to "formData"
        formData.append('image', image);
        formData.append('title', title);
        formData.append('content', content);
        
        //send data to server
        await axios.post(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/posts`, formData)
        .then(() => {
            Swal.fire(
                'Good job!',
                'Berhasil menambahkan artikel baru!',
                'success'
              )
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
            <Head>
                <title>Dashboard</title>
            </Head>
            <div className="container" style={{ marginTop: '80px' }}>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card border-0 rounded shadow-sm">
                            <div className="card-body">
                                <form onSubmit={ storePost }>

                                    <div className="form-group mb-3">
                                        <label className="form-label fw-bold">Image</label>
                                        <input type="file" className="form-control" onChange={handleFileChange}/>
                                    </div>
                                    {validation.image && (
                                        <div className="alert alert-danger">
                                            {validation.image}
                                        </div>
                                    )}

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
                                        SIMPAN
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

export default PostCreate