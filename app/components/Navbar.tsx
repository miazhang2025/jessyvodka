'use client';

import { useState } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';

type NavItem = 'about' | 'drink' | 'contact';

interface PopupCardProps {
  type: NavItem;
  onClose: () => void;
}

const SocialIcons = {
  instagram: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  ),
  artstation: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M0 17.723l2.027 3.505c.378.652 1.069 1.052 1.819 1.052h11.54l-3.08-5.013L0 17.723zm18.956-3.376L11.788 3.415c-.378-.652-1.069-1.052-1.819-1.052H6.431l10.916 18.33 3.557-5.763c.666-.897.666-1.989.052-2.583zm.673 4.632l-1.716-2.876-3.511 5.763h4.966a1.999 1.999 0 001.819-1.052 1.999 1.999 0 00-.558-1.835z"/>
    </svg>
  ),
  linkedin: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  ),
  website: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
    </svg>
  )
};

const PopupCard = ({ type, onClose }: PopupCardProps) => {
  const content = {
    about: {
      title: 'About Jessy',
      text: "Hi! I'm Jessy Wang, and yes, I really do enjoy a good drinks. Mia created this page for me because she knows how much I love quality spirits. Cheers!"
    },
    drink: {
      title: 'Buy Me a Drink',
      text: "Feeling generous? I appreciate premium vodka brands! Every bottle brings a smile! 🍸"
    },
    contact: {
      title: 'Contact',
      text: "You can contact me at jessywangzixin@gmail.com.",
      socials: [
        { name: 'Instagram', url: 'https://www.instagram.com/b_h_f_m_/', icon: 'instagram' },
        { name: 'ArtStation', url: 'https://www.artstation.com/jessywang6?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnAts7RnjtGIwCW_gDwM85xHzZCv5YGascGM6qi0mmLNvVJZUMwczbu6Ptsao_aem_MaFNvgpXSWS2_5AebAvWWA', icon: 'artstation' },
        { name: 'LinkedIn', url: 'https://www.linkedin.com/in/jessyzixinwang/', icon: 'linkedin' }
      ],
      creatorText: "You may also want to connect with Mia who created this page",
      creatorSocials: [
        { name: 'Website', url: 'https://cabbageblame.me/', icon: 'website' },
        { name: 'Instagram', url: 'https://www.instagram.com/neck_catchers/', icon: 'instagram' },
        { name: 'LinkedIn', url: 'https://www.linkedin.com/in/deyinzhang/', icon: 'linkedin' }
      ]
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full mx-4 transform transition-all animate-in fade-in zoom-in-95 duration-300">
        <h2 className="text-3xl font-bold mb-4 text-gray-800 animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ fontFamily: 'var(--font-bayon)' }}>{content[type].title}</h2>
        <p className="text-gray-600 mb-6 leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100" style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}>{content[type].text}</p>
        
        {type === 'drink' && (
          <div className="flex justify-center mb-6 animate-in fade-in zoom-in-95 duration-500 delay-200">
            <div className="relative w-48 h-48">
              <Image
                src="/qrcode.png"
                alt="Payment QR Code"
                fill
                className="object-contain"
              />
            </div>
          </div>
        )}
        
        {type === 'contact' && 'socials' in content[type] && (
          <div className="flex justify-center gap-6 mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
            {content[type].socials?.map((social, index) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-800 hover:text-gray-600 transition-colors animate-in fade-in zoom-in-95 duration-500"
                style={{ animationDelay: `${300 + index * 100}ms` }}
                aria-label={social.name}
              >
                {SocialIcons[social.icon as keyof typeof SocialIcons]}
              </a>
            ))}
          </div>
        )}
        
        {type === 'contact' && 'creatorSocials' in content[type] && (
          <div className="border-t border-gray-200 pt-4 mt-4 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
            <p className="text-gray-600 text-sm mb-3 text-center" style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}>
              {content[type].creatorText}
            </p>
            <div className="flex justify-center gap-6 mb-4">
              {content[type].creatorSocials?.map((social, index) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-800 transition-colors animate-in fade-in zoom-in-95 duration-500"
                  style={{ animationDelay: `${500 + index * 100}ms` }}
                  aria-label={social.name}
                >
                  {SocialIcons[social.icon as keyof typeof SocialIcons]}
                </a>
              ))}
            </div>
          </div>
        )}
        
        <button
          onClick={onClose}
          className="bg-gray-800 text-white px-6 py-2 rounded-full hover:bg-gray-700 transition-colors animate-in fade-in slide-in-from-bottom-4 duration-500 delay-500"
          style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default function Navbar() {
  const [activePopup, setActivePopup] = useState<NavItem | null>(null);

  const handleNavClick = (item: NavItem) => {
    setActivePopup(item);
  };

  return (
    <>
      <nav className="fixed top-5 left-0 right-0 text-white z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <ul className="flex justify-center gap-12">
            <li>
              <button
                onClick={() => handleNavClick('about')}
                className="text-lg font-normal hover:text-gray-300 transition-colors uppercase tracking-wide"
                style={{ fontFamily: 'var(--font-ibm-plex-mono)', letterSpacing: '0.1em' }}
              >
                About
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick('drink')}
                className="text-lg font-normal hover:text-gray-300 transition-colors uppercase tracking-wide"
                style={{ fontFamily: 'var(--font-ibm-plex-mono)', letterSpacing: '0.1em' }}
              >
                Buy Me a Drink
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick('contact')}
                className="text-lg font-normal hover:text-gray-300 transition-colors uppercase tracking-wide"
                style={{ fontFamily: 'var(--font-ibm-plex-mono)', letterSpacing: '0.1em' }}
              >
                Contact
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {activePopup && (
        <PopupCard type={activePopup} onClose={() => setActivePopup(null)} />
      )}
    </>
  );
}
