
import Layout from "../../layouts/default";
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
            <div className="container" style={{ marginTop: "80px" }}>
                <div className="row justify-content-center">
                    <div className="col-md-12">
                        <div className="card border-0 rounded shadow-sm">
                            <div className="card-body">
                                SELAMAT DATANG <strong className="text-uppercase">{user.name}</strong>
                                <hr />
                                <Link href="/admin/posts/create">
                                    <button className="btn btn-primary border-0 shadow-sm mb-3">Tambah</button>
                                </Link>
                                <button onClick={logoutHandler} className="btn btn-md btn-danger mb-3 mr-3">Logout</button>
                                <table className="table table-bordered mb-0" id="tablepost">
                                    <thead>
                                        <tr>
                                            <th scope="col">Gambar</th>
                                            <th scope="col">Judul</th>
                                            <th scope="col">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    { posts.map((post) => (
                                        <tr key={ post.id }>
                                            <td className="text-center">
                                                <img src={`${process.env.NEXT_PUBLIC_API_BACKEND}/storage/posts/${post.image}`} width="150" className="rounded-3"/>
                                            </td>
                                            <td>{ post.title }</td>
                                            <td className="text-center">
                                                <Link href={`/admin/posts/edit/${post.id}`}>
                                                    <button className="btn btn-sm btn-primary border-0 shadow-sm mb-3 me-3">Edit</button>
                                                </Link>
                                                <button onClick={() => deletePost(post.id)} className="btn btn-sm btn-danger border-0 shadow-sm mb-3">Delete</button>
                                            </td>
                                        </tr>
                                    )) }
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