import Layout from "../../layouts/default";
import axios from "axios";
import Link from 'next/link';
import Head from "next/head";
import Styles from "../../styles/artikel.module.css"


export async function getServerSideProps() {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/posts`);
    const posts = response.data.data.data;

    return {
      props: {
        posts: posts
      }
    };
  } catch (error) {
    console.error("Error fetching posts:", error);
    return {
      props: {
        posts: []
      }
    };
  }
}

function PostIndex(props) {
  const { posts } = props;

  return (
    <Layout>
        <Head>
            <title>Artikel</title>
        </Head>
      <div className={`mt-70 ${Styles.artikel}`}>
        <div className="container">
            <div className="title-section mb-5">
                Artikel Tentang Kesehatan Mental
            </div>
            <div className="row gy-5 mb-5 justify-content-center">
            {posts.map((post) => (
              <div className="col-lg-3 d-flex align-items-stretch justify-content-center" key={post.id}>
                    <div className="card">
                        <img src={`${process.env.NEXT_PUBLIC_API_BACKEND}/storage/posts/${post.image}`} alt="..."/>
                        <div className="card-body">
                          <h5 className="card-title">{post.title}</h5>
                          <div className="artikel-content card-text" dangerouslySetInnerHTML={{ __html: post.content }}></div>
                          <Link href={`/artikel/${post.id}`} legacyBehavior><a className="btn btn-artikel">Baca Selengkapnya</a></Link>
                        </div>
                      </div>
                </div> 
            ))}
            </div>
        </div>
        
      </div>
    </Layout>
  );
}

export default PostIndex;