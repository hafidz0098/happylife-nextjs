//import Link
import Link from 'next/link';

function Navbar() {

    return (
        <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
        <div className="container-fluid">
          <Link href="/" legacyBehavior>
          <a className="navbar-brand" >HappyLife</a>
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
            <div className="navbar-nav">
            <Link href="/" legacyBehavior><a className="nav-link">Home</a></Link>
            <Link href="/artikel" legacyBehavior><a className="nav-link" >Artikel</a></Link>
            <Link href="/about" legacyBehavior><a className="nav-link">Tentang Kami</a></Link>
            </div>
          </div>
        </div>
      </nav>
    )

}

export default Navbar