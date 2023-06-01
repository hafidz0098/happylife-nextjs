import Layout from '../../layouts/default';
import axios from "axios";

export async function getServerSideProps({ params }) {

    const req  = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/posts/${params.id}`)
    const res  = await req.data.data

    return {
      props: {
          post: res
      },
    }
}


function Post(props){
    const {post} = props;

    return (
        <Layout>
          <div className="detail-artikel">
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-12" key={post.id}>
                    <div className="card-artikel">
                        <div className="card-img">
                            <img src={`${process.env.NEXT_PUBLIC_API_BACKEND}/storage/posts/${post.image}`} alt="" className="img-fluid"/>
                        </div>
                        <div className="card-title-detail">
                            <h2>{post.title}</h2>
                        </div>
                        <div className="card-content-detail" dangerouslySetInnerHTML={{ __html: post.content }}>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
        </Layout>
      );
}

export default Post;