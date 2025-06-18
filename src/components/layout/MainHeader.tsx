import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { UserCircle, Diamond } from 'lucide-react'; // Using Diamond as a placeholder for a luxury brand icon

const MainHeader: React.FC = () => {
  console.log('MainHeader loaded');

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `relative text-sm font-medium transition-colors hover:text-primary/80
     after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full
     ${isActive ? 'text-primary after:w-full' : 'text-foreground/70'}`;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <Diamond className="h-7 w-7 text-primary transition-transform duration-300 group-hover:rotate-12" />
          <span className="text-xl font-semibold tracking-tight text-foreground">
            LUXE TAILOR
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <NavLink to="/lookbook" className={navLinkClasses}>
            Lookbook
          </NavLink>
          <NavLink to="/customization-atelier" className={navLinkClasses}>
            Atelier
          </NavLink>
          <NavLink to="/my-account" className={navLinkClasses}>
            My Account
          </NavLink>
        </nav>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/my-account" aria-label="My Account">
              <UserCircle className="h-6 w-6" />
            </Link>
          </Button>
          {/* Future: Mobile menu toggle */}
        </div>
      </div>
    </header>
  );
};

export default MainHeader;