import Layout from "../layouts/default";
import Head from 'next/head';
import Link from "next/link";
import axios from "axios";
import Styles from "../styles/Home.module.css"

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

function Home(props) {
  const { posts } = props;
  const latestPosts = posts.slice(0, 4);

  return (
    <Layout>
      <Head>
        <title>HappyLife</title>
      </Head>
      <div className={Styles.hero}>
        <div className={`container ${Styles.container_hero}`}>
          <div className="row">
            <div className="col-text col-lg-6 col-sm-12">
              <h1 className={Styles.title}>Get your mental health wellbeing information</h1>
              <p className={Styles.desc}>Seseorang dengan mental yang sehat akan memiliki pikiran yang lebih terfokus dan terarah sehingga memudahkan untuk mengumpulkan konsentrasi sehingga dapat melakukan aktivitas dengan maksimal</p>
              <button type="button" className={`btn btn-custom ${Styles.heroBtn}`}>Selengkapnya</button>
            </div>
            <div className="col-img col-lg-6 col-sm-12">
              <img src="hero-image.png" alt=""/>
            </div>
          </div>
        </div>
      </div>
      <div className={Styles.kenali}>
        <div className="container">
          <div className="title-section pt-5 pb-3">
            Yuk Kenali Berbagai Macam Penyakit Mental
          </div>
          <div className="row mt-5">
            <div className="col-lg-3 col-md-6 col-sm-12 d-flex align-items-stretch">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Skizofrenia</h5>
                  <p className="card-text">
                    Gangguan skizofrenia termasuk ke dalam gangguan psikotik yang membuat orang seperti melihat atau merasakan sesuatu. Saat mengidap gangguan skizofrenia, seseorang sulit membedakan mana kehidupan yang nyata dan mimpi.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 d-flex align-items-stretch">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Skizofrenia</h5>
                  <p className="card-text">
                    Gangguan skizofrenia termasuk ke dalam gangguan psikotik yang membuat orang seperti melihat atau merasakan sesuatu. Saat mengidap gangguan skizofrenia, seseorang sulit membedakan mana kehidupan yang nyata dan mimpi.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 d-flex align-items-stretch">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Skizofrenia</h5>
                  <p className="card-text">
                    Gangguan skizofrenia termasuk ke dalam gangguan psikotik yang membuat orang seperti melihat atau merasakan sesuatu. Saat mengidap gangguan skizofrenia, seseorang sulit membedakan mana kehidupan yang nyata dan mimpi.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 d-flex align-items-stretch">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Skizofrenia</h5>
                  <p className="card-text">
                    Gangguan skizofrenia termasuk ke dalam gangguan psikotik yang membuat orang seperti melihat atau merasakan sesuatu. Saat mengidap gangguan skizofrenia, seseorang sulit membedakan mana kehidupan yang nyata dan mimpi.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={Styles.artikel}>
        <div className="container">
          <div className="title-section">
            Artikel Tentang Kesehatan Mental
          </div>
          <div className="row mt-5 justify-content-center">
            {latestPosts.length === 0 ? (
              <div className="col-12">
                <p>Tidak ada artikel yang tersedia.</p>
              </div>
            ) : (
              latestPosts.map((post) => (
                <div className="col-lg-3 col-md-6 d-flex align-items-stretch justify-content-center" key={post.id}>
                  <div className="card">
                    <img className="card-image-artikel" src={`${process.env.NEXT_PUBLIC_API_BACKEND}/storage/posts/${post.image}`} alt="..."/>
                    <div className="card-body">
                      <h5 className="card-title">{post.title}</h5>
                      <div className="artikel-content card-text" dangerouslySetInnerHTML={{ __html: post.content }}></div>
                      <Link href={`/artikel/${post.id}`} legacyBehavior><a className="btn btn-artikel">Baca Selengkapnya</a></Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="text-center">
            <Link href="/artikel" legacyBehavior><a className="btn btn-artikel mt-5">Baca Selengkapnya</a></Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Home;
