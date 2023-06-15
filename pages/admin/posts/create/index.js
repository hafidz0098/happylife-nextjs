import { useState, useEffect} from 'react';
import Router from 'next/router';
import Layout from '../../../../layouts/admin';
import axios from "axios";
import Head from 'next/head';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import Link from 'next/link';


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
    //get token
    const token = Cookies.get('token');

    //state user
    const [user, setUser] = useState({});

    //function "fetchData"
    const fetchData = async () => {

        //set axios header dengan type Authorization + Bearer token
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        //fetch user from Rest API
        await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/user`)
        .then((response) => {

            //set response user to state
            setUser(response.data);
        })
    }
    

    //hook useEffect
    useEffect(() => {

        //check token empty
        if(!token) {

            //redirect login page
            Router.push('/login');
        }
        
        //call function "fetchData"
        fetchData();
        const el = document.getElementById("wrapper");
        const toggleButton = document.getElementById("menu-toggle");

        toggleButton.onclick = function () {
            el.classList.toggle("toggled");
        };

    }, []);

    const logoutHandler = async () => {

        //set axios header dengan type Authorization + Bearer token
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        //fetch Rest API
        await axios.post(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/logout`)
        .then(() => {

            //remove token from cookies
            Cookies.remove("token");

            //redirect halaman login
            Router.push('/login');
        });
    };
    

    return (
        <Layout>
            <Head>
                <title>Dashboard</title>
            </Head>
            <div className="d-flex" id="wrapper">

        <div className="primary-bg" id="sidebar-wrapper">
            <div className="sidebar-heading text-center py-4 second-text fs-4 fw-bold text-uppercase border-bottom">Admin</div>
            <div className="list-group list-group-flush my-3">
                <Link href="/admin/dashboard" legacyBehavior>
                        <a className="list-group-item list-group-item-action bg-transparent second-text "><i
                        className="fa fa-file-text me-2"></i>List Artikel</a>
                </Link>
                <a href="#" className="list-group-item list-group-item-action bg-transparent second-text"><i
                        className="fa fa-plus-square me-2"></i>Tambah Artikel</a>
                <button onClick={logoutHandler} className="list-group-item list-group-item-action bg-transparent second-text"><i
                        className="fa fa-power-off me-2"></i>Logout</button>
    
                
            </div>
        </div>



        <div id="page-content-wrapper">
            <nav className="navbar navbar-expand-lg navbar-light bg-transparent py-4 px-4">
                <div className="d-flex align-items-center">
                    <i className="fa fa-bars third-text fs-4 me-3" id="menu-toggle"></i>
                    <h2 className="fs-2 m-0">Dashboard</h2>
                </div>
            </nav>

            <div className="container-fluid px-4">
                <div className="row my-5">
                    <h3 className="fs-4 mb-3">Tambah Artikel</h3>
                    <div className="col">
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
        </div>
            </div>
        </Layout>
    );

}

export default PostCreate