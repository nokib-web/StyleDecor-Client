import React from 'react';
import { FaEnvelope, FaFacebook, FaGithub, FaGlobe, FaLinkedin, FaMapMarkerAlt, FaPhoneAlt, } from 'react-icons/fa';
import { Link } from 'react-router';
import Logo from '../../../components/Logo/Logo';

const Footer = () => {
  return (
    <div className="bg-base-200 border-t border-base-300">
      <footer className="footer max-w-7xl mx-auto flex flex-col md:flex-row justify-between bg-base-200 text-base-content p-10 gap-12">
        <aside className="flex-1">
          <Logo />
          <p className="mt-4 max-w-xs leading-relaxed opacity-80">
            Transforming spaces into timeless masterpieces. Your trusted partner in professional and elegant interior design services.
          </p>
        </aside>

        <nav className="flex-1">
          <h6 className="footer-title opacity-100 font-bold text-primary">Quick Links</h6>
          <div className="flex flex-col gap-2">
            <Link to="/" className="link link-hover hover:text-primary transition-colors">Home</Link>
            <Link to="/services" className="link link-hover hover:text-primary transition-colors">Services</Link>
            <Link to="/about" className="link link-hover hover:text-primary transition-colors">About Us</Link>
            <Link to="/contact" className="link link-hover hover:text-primary transition-colors">Contact</Link>
          </div>
        </nav>

        <nav className="flex-1">
          <h6 className="footer-title opacity-100 font-bold text-primary">Contact & Support</h6>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-primary mt-1 shrink-0" />
              <span>D-12, Zakir Hossain Road, <br /> Mohammadpur, Dhaka-1207</span>
            </li>
            <li className="flex items-center gap-3">
              <FaPhoneAlt className="text-primary shrink-0" />
              <span>+880 1580334337</span>
            </li>
            <li className="flex items-center gap-3">
              <FaEnvelope className="text-primary shrink-0" />
              <span>support@styledecor.com</span>
            </li>
          </ul>
        </nav>

        <nav className="flex-1">
          <h6 className="footer-title opacity-100 font-bold text-primary">Social Connect</h6>
          <p className="text-sm mb-4 opacity-70">Follow our journey and stay updated with the latest trends.</p>
          <div className="flex items-center gap-5 text-2xl">
            <a href="https://www.facebook.com/NokibHasan.Nazmul" target="_blank" rel="noreferrer" className="text-base-content/70 hover:text-primary transition-all transform hover:-translate-y-1" title="Facebook">
              <FaFacebook />
            </a>
            <a href="https://github.com/nokib-web" target="_blank" rel="noreferrer" className="text-base-content/70 hover:text-black dark:hover:text-white transition-all transform hover:-translate-y-1" title="GitHub">
              <FaGithub />
            </a>
            <a href="https://www.linkedin.com/in/nazmulhasan-nokib/" target="_blank" rel="noreferrer" className="text-base-content/70 hover:text-[#0077b5] transition-all transform hover:-translate-y-1" title="LinkedIn">
              <FaLinkedin />
            </a>
            <a href="https://nokib.vercel.app/" target="_blank" rel="noreferrer" className="text-base-content/70 hover:text-primary transition-all transform hover:-translate-y-1" title="Portfolio">
              <FaGlobe />
            </a>
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