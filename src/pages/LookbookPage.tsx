import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Custom Components
import MainHeader from '../../components/layout/MainHeader';
import MainFooter from '../../components/layout/MainFooter';
import AnimatedPageTransitionContainer from '../../components/AnimatedPageTransitionContainer';
import ParallaxScrollSection from '../../components/ParallaxScrollSection';
import LookbookItemCard from '../../components/LookbookItemCard';

// shadcn/ui Components
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis, // Added for completeness if needed later
} from "@/components/ui/pagination";
// import { Button } from '@/components/ui/button'; // Not directly used on this page currently outside of LookbookItemCard

interface LookbookItem {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
}

const allLookbookItems: LookbookItem[] = [
  {
    id: 'look101',
    name: 'The "Avant-Garde Silhouette" Gown',
    imageUrl: 'https://images.unsplash.com/photo-1509319117193-57bab727e09d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    description: 'A striking evening gown that challenges traditional forms with its bold, sculptural design and luxurious obsidian silk.',
  },
  {
    id: 'look102',
    name: 'The "Urban Nomad" Ensemble',
    imageUrl: 'https://images.unsplash.com/photo-1551909490-5c7f0f9901ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    description: 'A versatile, layered outfit designed for the modern explorer, blending utilitarian chic with refined tailoring.',
  },
  {
    id: 'look103',
    name: 'The "Celestial Dreamer" Suit',
    imageUrl: 'https://images.unsplash.com/photo-1617053313548-900355f87099?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    description: 'A meticulously crafted suit in midnight blue velvet, adorned with subtle celestial embroidery for a touch of magic.',
  },
  {
    id: 'look104',
    name: 'The "Ephemeral Bloom" Dress',
    imageUrl: 'https://images.unsplash.com/photo-1590230192042-683627583864?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    description: 'A light, airy dress with delicate floral appliques, capturing the fleeting beauty of a spring garden.',
  },
  {
    id: 'look105',
    name: 'The "Neo-Futurist" Jacket',
    imageUrl: 'https://images.unsplash.com/photo-1521577352947-2c45e0211605?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    description: 'A sharply tailored jacket with innovative fabric technology and a sleek, minimalist aesthetic.',
  },
  {
    id: 'look106',
    name: 'The "Monochromatic Muse" Set',
    imageUrl: 'https://images.unsplash.com/photo-1581338834535-2630338979a4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    description: 'An elegant two-piece set in varying shades of grey, playing with texture and form for a sophisticated statement.',
  },
  {
    id: 'look107',
    name: 'The "Regal Brocade" Coat',
    imageUrl: 'https://images.unsplash.com/photo-1608250009400-83a7904a815e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    description: 'A statement coat crafted from rich brocade fabric, exuding opulence and old-world charm.',
  },
  {
    id: 'look108',
    name: 'The "Minimalist Flow" Tunic',
    imageUrl: 'https://images.unsplash.com/photo-1529759148018-c11ea8d10646?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    description: 'A beautifully draped tunic in a neutral palette, embodying effortless sophistication and comfort.',
  },
];

const ITEMS_PER_PAGE = 6;

const LookbookPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    console.log('LookbookPage loaded');
    window.scrollTo(0, 0); // Ensure page loads at the top
  }, []);

  const totalPages = Math.ceil(allLookbookItems.length / ITEMS_PER_PAGE);
  const currentItems = allLookbookItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 300, behavior: 'smooth' }); // Scroll gently to below parallax
    }
  };

  // Function to generate pagination items more robustly
  const renderPaginationItems = () => {
    const items = [];
    const MAX_VISIBLE_PAGES = 5; // Example: 1 ... 4 5 6 ... 10

    if (totalPages <= MAX_VISIBLE_PAGES) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              onClick={(e) => { e.preventDefault(); handlePageChange(i); }}
              isActive={currentPage === i}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      // Always show first page
      items.push(
        <PaginationItem key={1}>
          <PaginationLink href="#" onClick={(e) => { e.preventDefault(); handlePageChange(1); }} isActive={currentPage === 1}>1</PaginationLink>
        </PaginationItem>
      );

      // Determine ellipsis and middle pages
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 3) {
          startPage = 2;
          endPage = Math.min(totalPages - 1, MAX_VISIBLE_PAGES - 2);
      } else if (currentPage >= totalPages - 2) {
          startPage = Math.max(2, totalPages - MAX_VISIBLE_PAGES + 3)
          endPage = totalPages - 1;
      }
      
      if (startPage > 2) {
        items.push(<PaginationItem key="ellipsis-start"><PaginationEllipsis /></PaginationItem>);
      }

      for (let i = startPage; i <= endPage; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink href="#" onClick={(e) => { e.preventDefault(); handlePageChange(i); }} isActive={currentPage === i}>{i}</PaginationLink>
          </PaginationItem>
        );
      }

      if (endPage < totalPages - 1) {
        items.push(<PaginationItem key="ellipsis-end"><PaginationEllipsis /></PaginationItem>);
      }
      
      // Always show last page
      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink href="#" onClick={(e) => { e.preventDefault(); handlePageChange(totalPages); }} isActive={currentPage === totalPages}>{totalPages}</PaginationLink>
        </PaginationItem>
      );
    }
    return items;
  };


  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <MainHeader />
      <AnimatedPageTransitionContainer>
        <main className="flex-grow">
          <ParallaxScrollSection
            imageUrl="https://images.unsplash.com/photo-1545004879-295950189037?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80" // Elegant fabric texture or abstract fashion shot
            strength={0.25}
            minHeight="65vh"
            className="bg-gray-800" 
            contentClassName="text-center text-neutral-100 justify-center items-center p-8"
          >
            <div className="bg-black/60 p-8 md:p-12 rounded-lg shadow-2xl backdrop-blur-sm max-w-3xl mx-auto">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4 font-serif">
                The Lookbook
              </h1>
              <p className="text-lg sm:text-xl text-neutral-200 max-w-xl mx-auto">
                Discover curated collections where timeless elegance meets contemporary design. Find your unique inspiration.
              </p>
            </div>
          </ParallaxScrollSection>

          <section className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12 md:mb-16 text-foreground font-serif">
                Featured Styles
              </h2>
              {currentItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                  {currentItems.map((item) => (
                    <LookbookItemCard
                      key={item.id}
                      id={item.id}
                      name={item.name}
                      imageUrl={item.imageUrl}
                      description={item.description}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground text-lg">No looks to display currently.</p>
              )}

              {totalPages > 1 && (
                <div className="mt-16 md:mt-20 flex justify-center">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          href="#"
                          onClick={(e) => { e.preventDefault(); handlePageChange(currentPage - 1); }}
                          className={currentPage === 1 ? "pointer-events-none opacity-60" : undefined}
                          aria-disabled={currentPage === 1}
                        />
                      </PaginationItem>
                      {renderPaginationItems()}
                      <PaginationItem>
                        <PaginationNext
                          href="#"
                          onClick={(e) => { e.preventDefault(); handlePageChange(currentPage + 1); }}
                          className={currentPage === totalPages ? "pointer-events-none opacity-60" : undefined}
                          aria-disabled={currentPage === totalPages}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </div>
          </section>
        </main>
      </AnimatedPageTransitionContainer>
      <MainFooter />
    </div>
  );
};

export default LookbookPage;