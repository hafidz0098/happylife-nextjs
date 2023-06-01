//import Link
import Link from 'next/link';

function Footer() {

    return (
        <footer id="footer" className="footer">

        <div className="container">
          <div className="row gy-4 justify-content-center">
            <div className="col-lg-5 col-md-12 footer-info">
              <a href="index.html" className="logo d-flex align-items-center">
                <span>HappyLife</span>
              </a>
              <p>Cras fermentum odio eu feugiat lide par naso tierra. Justo eget nada terra videa magna derita valies darta donna mare fermentum iaculis eu non diam phasellus.</p>
            </div>
    
            <div className="col-lg-3 col-6 footer-links">
              <h4>Useful Links</h4>
              <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">Artikel</a></li>
                <li><a href="#">Tentang Kami</a></li>
              </ul>
            </div>
    
            <div className="col-lg-3 col-6 footer-links">
              <h4>Our Services</h4>
              <ul>
                <li><a href="#">Jenis kesehatan mental</a></li>
                <li><a href="#">Pencegahan dan penanganan</a></li>
                <li><a href="#">Product Management</a></li>
                <li><a href="#">Marketing</a></li>
                <li><a href="#">Graphic Design</a></li>
              </ul>
            </div>
    
          </div>
        </div>
    
        <div className="container mt-4">
          <div className="copyright">
            &copy; Copyright 2023 <strong><span>HappyLife</span></strong>. All Rights Reserved
          </div>
        </div>
    
      </footer>
    )

}

export default Footer