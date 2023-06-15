import Layout from "../layouts/default";
import Head from 'next/head';

function About(){
    return(
        <Layout>
        <Head>
              <title>Tentang Kami</title>
          </Head>
        <section id="team" className="team section-bg">
        <div className="container" data-aos="fade-up">
            <div className="title-section mb-5">
                Meet Our Team
            </div>
          <div className="row">
            <div className="col-lg-6" data-aos="zoom-in" data-aos-delay="100">
              <div className="member d-flex align-items-start">
                <div className="pic"><img src="/Group 107.png" className="img-fluid" alt=""/></div>
                <div className="member-info">
                  <h4>Hafidz</h4>
                  <span>Fullstack Developer</span>
                  <div className="social">
                    <a href=""><i className="ri-github-fill"></i></a>
                    <a href=""><i className="ri-instagram-fill"></i></a>
                    <a href=""> <i className="ri-linkedin-box-fill"></i> </a>
                  </div>
                </div>
              </div>
            </div>
  
            <div className="col-lg-6 mt-4 mt-lg-0" data-aos="zoom-in" data-aos-delay="200">
              <div className="member d-flex align-items-start">
                <div className="pic"><img src="/Group 107.png" className="img-fluid" alt=""/></div>
                <div className="member-info">
                  <h4>Septian Aji Saputra</h4>
                  <span>Frontend Developer</span>
                  <div className="social">
                    <a href=""><i className="ri-github-fill"></i></a>
                    <a href=""><i className="ri-instagram-fill"></i></a>
                    <a href=""> <i className="ri-linkedin-box-fill"></i> </a>
                  </div>
                </div>
              </div>
            </div>
  
            <div className="col-lg-6 mt-4" data-aos="zoom-in" data-aos-delay="300">
              <div className="member d-flex align-items-start">
                <div className="pic"><img src="/Group 107.png" className="img-fluid" alt=""/></div>
                <div className="member-info">
                  <h4>Aulia Azzaskia</h4>
                  <span>Frontend Developer</span>
                  <div className="social">
                    <a href=""><i className="ri-github-fill"></i></a>
                    <a href=""><i className="ri-instagram-fill"></i></a>
                    <a href=""> <i className="ri-linkedin-box-fill"></i> </a>
                  </div>
                </div>
              </div>
            </div>
  
            <div className="col-lg-6 mt-4" data-aos="zoom-in" data-aos-delay="400">
              <div className="member d-flex align-items-start">
                <div className="pic"><img src="/Group 107.png" className="img-fluid" alt=""/></div>
                <div className="member-info">
                  <h4>Indy Istiqamah</h4>
                  <span>Frontend Developer</span>
                  <div className="social">
                    <a href=""><i className="ri-github-fill"></i></a>
                    <a href=""><i className="ri-instagram-fill"></i></a>
                    <a href=""> <i className="ri-linkedin-box-fill"></i> </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
        </Layout>
    )
}

export default About