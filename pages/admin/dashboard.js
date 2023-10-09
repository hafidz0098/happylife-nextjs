
import Layout from "../../layouts/admin";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Router from 'next/router';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';

export async function getServerSideProps() {

    //http request
    const req  = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/posts`)
    const res  = await req.data.data.data

    return {
      props: {
          posts: res // <-- assign response
      },
    }
}

function Dashboard(props) {

    const { posts } = props;
    const router = useRouter();

    //refresh data
    const refreshData = () => {
        router.replace(router.asPath);
    }


    //function "deletePost"
    const deletePost = (id) => {
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: 'Deleted!',
              text: 'Your file is being deleted.',
              icon: 'success',
              showConfirmButton: false
            });
      
            try {
              // Sending
              await axios.delete(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/posts/${id}`);
              // Refresh data
              refreshData();
              Swal.update({
                title: 'Deleted!',
                text: 'Your file has been deleted.',
                icon: 'success',
                showConfirmButton: true
              });
            } catch (error) {
              // Handle error
              Swal.fire('Error!', 'An error occurred while deleting the file.', 'error');
            }
          }
        });
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
    

    //function logout
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
                <Link href="/admin/posts/create" legacyBehavior>
                <a className="list-group-item list-group-item-action bg-transparent second-text"><i
                        className="fa fa-plus-square me-2"></i>Tambah Artikel</a>
                </Link>
                
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
                    <h3 className="fs-4 mb-3">Daftar Artikel</h3>
                    <div className="col">
                                <table className="table table-bordered mb-0" id="tablepost">
                                    <thead>
                                        <tr>
                                            <th scope="col">No</th>
                                            <th scope="col">Judul</th>
                                            <th scope="col">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {posts.length === 0 ? (
                                            <tr>
                                                <td colSpan="3">No articles available.</td>
                                            </tr>
                                        ) : (
                                            posts.map((post, index) => (
                                                <tr key={post.id}>
                                                    <td>{index + 1}</td>
                                                    <td>{post.title}</td>
                                                    <td className="text-center">
                                                    <Link href={`/admin/posts/edit/${post.id}`}>
                                                        <button className="btn btn-sm btn-primary border-0 shadow-sm mb-3 me-3"><i
                                                            className="fa fa-edit"></i></button>
                                                    </Link>
                                                    <Link href={`/artikel/${post.id}`} target="_blank">
                                                        <button className="btn btn-sm btn-warning border-0 shadow-sm mb-3 me-3"><i
                                                            className="fa fa-eye"></i></button>
                                                    </Link>
                                                    <button onClick={() => deletePost(post.id)} className="btn btn-sm btn-danger border-0 shadow-sm mb-3"><i
                                                        className="fa fa-trash"></i></button>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                </div>

            </div>
        </div>
            </div>

        </Layout>
        
    )

}

export default Dashboard;