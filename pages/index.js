import Layout from "../layouts/default";
import Head from 'next/head';
import Link from "next/link";
import axios from "axios";

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

        return(
            <Layout>
            <Head>
                <title>HappyLife</title>
            </Head>
            <div className="hero">
                <div className="container">
                    <div className="row">
                        <div className="col-text col-lg-6 col-sm-12">
                        <h1>Get your mental health wellbeing information</h1>
                        <p>Seseorang dengan mental yang sehat akan memiliki pikiran yang lebih terfokus dan terarah sehingga memudahkan untuk mengumpulkan konsentrasi sehingga dapat melakukan aktivitas dengan maksimal</p>
                        <button type="button" className="btn btn-custom">Selengkapnya</button>
                        </div>
                        <div className="col-img col-lg-6 col-sm-12">
                        <img src="hero-image.png" alt=""/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="kenali">
                <div className="container">
                    <div className="title-section pt-3 pb-3">
                        <h1>Yuk Kenali Berbagai Macam Penyakit Mental</h1>
                    </div>
                    <div className="row mt-5">
                        <div className="col-lg-3 col-md-6 col-sm-12 d-flex align-items-stretch">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Skizofrenia</h5>
                                <p className="card-text"/>
                                    Gangguan skizofrenia termasuk ke dalam gangguan psikotik yang membuat orang seperti melihat atau merasakan sesuatu. Saat mengidap gangguan skizofrenia, seseorang sulit membedakan mana kehidupan yang nyata dan mimpi.
                            </div>
                        </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12 d-flex align-items-stretch">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Gangguan mood</h5>
                                <p className="card-text">
                                    Gangguan tentang suasana hati ini bisa melibatkan perasaan dalam tempo yang sangat panjang. Perasaan yang muncul bisa terlalu sedih atau juga terlalu bahagia. Gangguan mood yang paling umum dirasakan adalah depresi, bipolar, dan siklotimik.
                                </p>
                            </div>
                        </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12 d-flex align-items-stretch">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Gangguan psikotik</h5>
                                <p className="card-text">
                                    Penyakit mental ini melibatkan kesadaran yang terganggu. Gejala yang paling sering muncul adalah halusinasi dan delusi. Seseorang bisa seolah-olah melihat objek, suara, atau orang lain yang padahal itu sama sekali tidak ada.
                                </p>
                            </div>
                        </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12 d-flex align-items-stretch">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Gangguan psikotik</h5>
                                <p className="card-text">
                                    Penyakit mental ini melibatkan kesadaran yang terganggu. Gejala yang paling sering muncul adalah halusinasi dan delusi. Seseorang bisa seolah-olah melihat objek, suara, atau orang lain yang padahal itu sama sekali tidak ada.
                                </p>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="artikel">
                <div className="container">
                    <div className="title-section">
                        <h1>Artikel Tentang Kesehatan Mental</h1>
                    </div>
                        <div className="row mt-5 justify-content-center">
                            {latestPosts.map((post) => (
                            <div className="col-lg-3 col-md-6 d-flex align-items-stretch justify-content-center" key={post.id}>
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

                        <div className="text-center">
                        <Link href="/artikel" legacyBehavior><a className="btn btn-artikel mt-5">Baca Selengkapnya</a></Link>
                    </div>
                </div>
            </div>
            </Layout>
        )
    }
export default Home