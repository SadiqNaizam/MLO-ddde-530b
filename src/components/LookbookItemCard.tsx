import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ArrowRight } from 'lucide-react';

interface LookbookItemCardProps {
  id: string; // Unique identifier for the look
  name: string; // Name of the look or item
  imageUrl: string; // URL for the high-quality image
  description?: string; // Optional short description or tagline for the look
}

const LookbookItemCard: React.FC<LookbookItemCardProps> = ({
  id,
  name,
  imageUrl,
  description,
}) => {
  console.log(`LookbookItemCard loaded for: ${name} (ID: ${id})`);

  const atelierLink = `/customization-atelier?lookId=${id}`;

  return (
    <Card className="w-full overflow-hidden group transition-all duration-300 ease-in-out hover:shadow-xl flex flex-col">
      <CardHeader className="p-0 border-b">
        <Link to={atelierLink} aria-label={`Customize ${name}`}>
          <AspectRatio ratio={3 / 4} className="overflow-hidden">
            <img
              src={imageUrl || 'https://via.placeholder.com/600x800?text=Luxury+Look'}
              alt={name}
              className="object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-105"
            />
          </AspectRatio>
        </Link>
      </CardHeader>

      <CardContent className="p-4 md:p-6 flex-grow">
        <Link to={atelierLink} className="hover:no-underline">
          <h3 className="text-lg md:text-xl font-semibold tracking-tight text-gray-900 dark:text-gray-100 group-hover:text-primary transition-colors duration-300 line-clamp-2">
            {name}
          </h3>
        </Link>
        {description && (
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
            {description}
          </p>
        )}
      </CardContent>

      <CardFooter className="p-4 md:p-6 pt-0">
        <Button asChild className="w-full transition-all duration-300 ease-in-out group-hover:bg-primary/90">
          <Link to={atelierLink}>
            Customize this Look
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LookbookItemCard;