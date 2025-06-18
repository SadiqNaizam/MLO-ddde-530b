import React from 'react';
import { Link } from 'react-router-dom';
import MainHeader from '@/components/layout/MainHeader';
import MainFooter from '@/components/layout/MainFooter';
import AnimatedPageTransitionContainer from '@/components/AnimatedPageTransitionContainer';
import ParallaxScrollSection from '@/components/ParallaxScrollSection';
import LookbookItemCard from '@/components/LookbookItemCard';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Homepage: React.FC = () => {
  console.log('Homepage loaded');

  const featuredLooks = [
    {
      id: 'look101',
      name: 'The Sovereign Suit',
      imageUrl: 'https://images.unsplash.com/photo-1593030468747-cf6936875974?auto=format&fit=crop&w=800&q=75',
      description: 'A masterpiece of tailoring, exuding confidence and refined power for the discerning individual.',
    },
    {
      id: 'look102',
      name: 'The Ethereal Gown',
      imageUrl: 'https://images.unsplash.com/photo-1580465446361-8aae793510f6?auto=format&fit=crop&w=800&q=75',
      description: 'Elegance personified in flowing silks, designed for moments that demand unforgettable grace.',
    },
    {
      id: 'look103',
      name: 'The Sculpted Blazer',
      imageUrl: 'https://images.unsplash.com/photo-1617114912950-7351055e9c44?auto=format&fit=crop&w=800&q=75',
      description: 'A bold statement of modern artistry, impeccably crafted for the contemporary visionary.',
    },
  ];

  return (
    <AnimatedPageTransitionContainer>
      <MainHeader />
      <main className="bg-background text-foreground">
        {/* Hero Section */}
        <ParallaxScrollSection
          imageUrl="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1920&q=80"
          minHeight="calc(100vh - 5rem)" // Adjust based on header height (h-20 is 5rem)
          strength={0.25}
          className="flex items-center justify-center"
          contentClassName="container mx-auto px-4"
        >
          <div className="text-center text-white bg-black bg-opacity-50 p-8 md:p-12 rounded-lg shadow-2xl max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Bespoke Elegance, Redefined.
            </h1>
            <p className="text-lg md:text-xl mb-8 leading-relaxed">
              Experience the art of personalized luxury. Craft garments that are uniquely yours, from the finest fabrics to the most intricate details, embodying your distinct style.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground text-base px-8 py-3 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105">
                <Link to="/customization-atelier">
                  Start Your Design <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white hover:text-black text-base px-8 py-3 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105">
                <Link to="/lookbook">Explore Lookbook</Link>
              </Button>
            </div>
          </div>
        </ParallaxScrollSection>

        {/* Featured Looks Section */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16" style={{ fontFamily: "'Playfair Display', serif" }}>
              Curated Inspirations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {featuredLooks.map((look) => (
                <LookbookItemCard
                  key={look.id}
                  id={look.id}
                  name={look.name}
                  imageUrl={look.imageUrl}
                  description={look.description}
                />
              ))}
            </div>
            <div className="text-center mt-12 md:mt-16">
              <Button size="lg" variant="outline" asChild className="text-base px-8 py-3">
                <Link to="/lookbook">
                  Discover All Looks <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Brand Ethos / Call to Action Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 text-center max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Your Vision, Our Artistry
            </h2>
            <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
              At LUXE TAILOR, we believe true luxury lies in personalization. Our master artisans meticulously craft each garment to your exact specifications, using time-honored techniques and the world's finest materials, ensuring a flawless fit and a piece that eloquently tells your unique story.
            </p>
            <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground text-base px-10 py-4 shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105">
              <Link to="/customization-atelier">
                Begin Your Customization Journey <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <MainFooter />
    </AnimatedPageTransitionContainer>
  );
};

export default Homepage;