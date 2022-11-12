import {Link} from "react-router-dom";
import {FaFacebook, FaInstagram, FaLinkedinIn, FaPinterest, FaTwitter, FaYoutube} from "react-icons/fa";

function Footer() {
    return (
        <div className="container">
            <footer
                className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                <div className="col-md-4 d-flex align-items-center">
                    <Link to="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
                        <div className='brand'>Møbel</div>
                    </Link>
                    <span className="mb-3 mb-md-0 text-muted">&copy; 2022</span>
                </div>

                <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
                    <li className="ms-3">
                        <a className="text-muted" href="https://twitter.com/">
                            <FaTwitter/>
                        </a>
                    </li>
                    <li className="ms-3">
                        <a className="text-muted" href="https://instagram.com/">
                            <FaInstagram/>
                        </a>
                    </li>
                    <li className="ms-3">
                        <a className="text-muted" href="https://facebook.com/">
                            <FaFacebook/>
                        </a>
                    </li>
                    <li className="ms-3">
                        <a className="text-muted" href="https://youtube.com/">
                            <FaYoutube/>
                        </a>
                    </li>
                    <li className="ms-3">
                        <a className="text-muted" href="https://linkedin.com/">
                            <FaLinkedinIn/>
                        </a>
                    </li>
                    <li className="ms-3">
                        <a className="text-muted" href="https://pinterest.com/">
                            <FaPinterest/>
                        </a>
                    </li>
                </ul>
            </footer>
        </div>
    )
}

export default Footer;