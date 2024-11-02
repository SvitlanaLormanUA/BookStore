import React, { useState } from 'react';
import '../styles/mediaQueries.css';
import '../styles/App.css';
import { Link } from 'react-router-dom';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(true);

const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setIsValid(true); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(email)) {
      alert('Thank you for subscribing!');
      setEmail('');
      setIsValid(true);
    } else {
      setIsValid(false); 
    }


  };

  return (
    <footer className="text-center text-lg-start border border-white mt-xl-5 pt-4">
      <div className="container p-4">
        <div className="row">
          {/* OUR WORLD */}
          <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
            <h5 className="text-uppercase mb-4 link-header-in-footer">OUR WORLD</h5>
            <ul className="list-unstyled mb-4">
              <li><Link to="/blog" className="footer-link">Blog</Link></li>
              <li><Link to="/books" className="footer-link">Books</Link></li>
              <li><Link to="/about" className="footer-link">About us</Link></li>
              <li><Link to="/" className="footer-link">Main Page</Link></li>
            </ul>
          </div>

          {/* CONTACTS */}
          <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
            <h5 className="text-uppercase mb-4 link-header-in-footer">Contacts</h5>
            <ul className="list-unstyled">
              <li><a href="tel:+380937462393" className="footer-link">Phone: +380 93 746 23 93</a></li>
              <li><a href="mailto:info@bambook.com" className="footer-link">Email: info@bambook.com</a></li>
              <li>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=48+Gryschevskiy+Street,+Korosten,+Zhytomyr+Region"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  Address: 48 Gryschevskiy Street, Korosten, Zhytomyr Region
                </a>
              </li>
            </ul>
          </div>

          {/**Social Media */}
          <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
            <h5 className="text-uppercase mb-4 link-header-in-footer">Our social Media </h5>
            <ul className="list-unstyled">
              <li><a href="https://www.instagram.com/bambook_korosten?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==3" className="footer-link"> bambook_korosten <i className="fab fa-instagram"></i></a></li>
              <li><a href="https://t.me/bambook_korosten?fbclid=PAZXh0bgNhZW0CMTEAAabYS8jmNwsxugd_cCgP6J9Y6BQD28FE4inCkuGEtErM4U3CGMSQePyMS_0_aem_TPpkZsN7GkEE24gDXokeLw" className="footer-link">BAMBOOK <i className="fab fa-telegram"></i></a></li>
              
            </ul>
          </div>



          {/**Donations*/}
          <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
            <h5 className="text-uppercase mb-4 link-header-in-footer">Help our Army </h5>
            <ul className="list-unstyled">
              <li><a href="https://send.monobank.ua/jar/95dA3LsyTq?fbclid=PAZXh0bgNhZW0CMTEAAaYWzAFLSm2QFUpfROa-SNIASn1-lv3Y8HFQslCudgS7P0tyxEBZ-I5RuH4_aem_sddP6HgkP61bFvmoaIVngg" className="footer-link"> <i>Link to Monobank</i></a></li>
          
            </ul>
          </div>

          {/* CAREERS */}
          {/* 
          <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
            <h5 className="text-uppercase mb-4 link-header-in-footer">Careers</h5>
            <ul className="list-unstyled">
              <li><Link to="/jobs" className="footer-link">Jobs</Link></li>
            </ul>
          </div>
          */}

          {/* UPDATES */}
          {/* 
          <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
            <h5 className="text-uppercase mb-4 link-header-in-footer">Sign up to receive updates</h5>
            <form onSubmit={handleSubmit}>
              <div className="form-outline form-white">
                <input
                  type="email"
                  id="form5Example2"
                  className={`form-control ${!isValid ? 'is-invalid' : ''}`} 
                  value={email}
                  onChange={handleEmailChange}
                />
                <label className="form-label" htmlFor="form5Example2">Email address</label>
                {!isValid && <div className="invalid-feedback">Please enter a valid email.</div>}
              </div>
              <button type="submit" className="subscribe-btn btn btn-block">Subscribe</button>
            </form>
          </div>
          */}
        </div>
      </div>

      <div className="copywrite-year text-center p-3">
        © 2024
      </div>
    </footer>
  );
}
