import React from 'react';
import { Link } from 'react-router-dom';
import { Diamond, Facebook, Instagram, Twitter } from 'lucide-react';

const FooterLink: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => (
  <Link to={to} className="text-sm text-muted-foreground hover:text-primary transition-colors">
    {children}
  </Link>
);

const MainFooter: React.FC = () => {
  console.log('MainFooter loaded');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/40 border-t border-border/40">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Diamond className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold text-foreground">LUXE TAILOR</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Crafting unique, bespoke garments with unparalleled artistry.
            </p>
          </div>
          <div>
            <h3 className="text-md font-semibold text-foreground mb-3">Navigate</h3>
            <nav className="flex flex-col space-y-2">
              <FooterLink to="/lookbook">Lookbook</FooterLink>
              <FooterLink to="/customization-atelier">Atelier</FooterLink>
              <FooterLink to="/my-account">My Account</FooterLink>
            </nav>
          </div>
          <div>
            <h3 className="text-md font-semibold text-foreground mb-3">Support</h3>
            <nav className="flex flex-col space-y-2">
              <FooterLink to="/about">About Us</FooterLink>
              <FooterLink to="/sizing-guide">Sizing Guide</FooterLink>
              <FooterLink to="/faq">FAQ</FooterLink>
              <FooterLink to="/contact">Contact</FooterLink>
            </nav>
          </div>
          <div>
            <h3 className="text-md font-semibold text-foreground mb-3">Legal</h3>
            <nav className="flex flex-col space-y-2">
              <FooterLink to="/terms">Terms & Conditions</FooterLink>
              <FooterLink to="/privacy">Privacy Policy</FooterLink>
            </nav>
          </div>
        </div>

        <div className="border-t border-border/40 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            &copy; {currentYear} LUXE TAILOR. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <Link to="#" aria-label="Facebook" className="text-muted-foreground hover:text-primary transition-colors">
              <Facebook className="h-5 w-5" />
            </Link>
            <Link to="#" aria-label="Instagram" className="text-muted-foreground hover:text-primary transition-colors">
              <Instagram className="h-5 w-5" />
            </Link>
            <Link to="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary transition-colors">
              <Twitter className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MainFooter;