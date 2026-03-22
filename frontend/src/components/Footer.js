import React from 'react'
import { 
  FaLinkedin, 
  FaInstagram, 
  FaYoutube, 
  FaXTwitter, 
  FaTiktok, 
  FaTwitch, 
  FaGithub 
} from 'react-icons/fa6'
import { TbWorld } from 'react-icons/tb'
import { Link } from 'react-router-dom'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="main-footer">
      <div className="footer-content">
        <div className="footer-top">
          <div className="footer-branding">
            <h2 className="footer-logo">Workout.<span>MERN</span></h2>
            <p className="footer-tagline">Track your progress, crush your goals.</p>
          </div>
          <div className="social-icons">
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><FaInstagram /></a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube"><FaYoutube /></a>
            <a href="https://x.com" target="_blank" rel="noreferrer" aria-label="X"><FaXTwitter /></a>
            <a href="https://tiktok.com" target="_blank" rel="noreferrer" aria-label="TikTok"><FaTiktok /></a>
            <a href="https://twitch.tv" target="_blank" rel="noreferrer" aria-label="Twitch"><FaTwitch /></a>
            <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub /></a>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-center">
            <span className="copyright">© {currentYear} Workout Mern, Inc.</span>
            <div className="footer-nav">
              <Link to="/privacy">Privacy</Link>
              <Link to="/terms">Terms</Link>
              <Link to="/cookies">Manage Cookies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
