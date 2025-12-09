import React from 'react';
import { FaEnvelope, FaFacebook, FaInstagram, FaMapMarkerAlt, FaPhoneAlt, } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { Link } from 'react-router';


const Footer = () => {
  return (
    <div className='bg-base-300 '>
      <footer className="footer max-w-7xl mx-auto sm:footer-horizontal bg-base-300 text-base-content p-10">
        <nav>
          <Link to='/'><p className='font-bold flex  items-center text-xl'>  StyleDecor</p></Link>
          <p>
            Your trusted partner in compassionate <br /> and reliable care.
            Providing , <br /> safety, and dedicated support for every touch.



          </p>

        </nav>
        <nav>
          <h6 className="footer-title">Quick Links</h6>
          <Link to="/" className="link link-hover">Home</Link>
          <Link to="/profile" className="link link-hover">Dashboard</Link>
          <Link to="/login" className="link link-hover">Login</Link>
          <Link to="/register" className="link link-hover">Register</Link>
        </nav>

        <nav>
          <div>
            <h6 className="footer-title">Contact & Support</h6>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-orange-400" />
                D-12,Zakir Hossain Road, <br /> Mohammadpur, Dhaka-1207
              </li>
              <li className="flex items-center gap-2">
                <FaPhoneAlt className="text-orange-400" />
                +880 1580334337
              </li>
              <li className="flex items-center gap-2">
                <FaEnvelope className="text-orange-400" />
                support@styledecor.com
              </li>
            </ul>
          </div>



        </nav>
        <nav>
          <div >
            <h6 className="footer-title">Social Links</h6>
            <p className="text-sm mb-4">Stay connected with our <br /> StyleDecor community </p>
            <div className="flex items-center gap-4 text-2xl">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-orange-400 transition">
                <FaFacebook />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-orange-400 transition">
                <FaInstagram />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-orange-400 transition">
                <FaXTwitter />
              </a>
            </div>
          </div>
        </nav>
      </footer>

      <footer className="footer max-w-7xl mx-auto sm:footer-horizontal footer-center bg-base-300 text-base-content p-4">
        <aside>
          <p>Copyright © {new Date().getFullYear()} - All right reserved by StyleDecor.</p>
        </aside>
      </footer>
    </div>
  );
};

export default Footer;