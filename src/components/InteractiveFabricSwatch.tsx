import React from 'react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { cn } from "@/lib/utils"; // Assumed to exist for combining class names

interface InteractiveFabricSwatchProps {
  id: string; // Unique identifier for the fabric
  name: string; // Display name of the fabric
  swatchImageUrl: string; // URL for the small swatch image
  detailImageUrl: string; // URL for the larger detailed texture/sheen image
  description?: string; // Optional textual description of the fabric (e.g., composition, feel)
  onSelect?: (fabricId: string) => void; // Callback function when the swatch is clicked for selection
  className?: string; // Optional additional CSS classes for the root swatch element
}

const InteractiveFabricSwatch: React.FC<InteractiveFabricSwatchProps> = ({
  id,
  name,
  swatchImageUrl,
  detailImageUrl,
  description,
  onSelect,
  className,
}) => {
  console.log(`InteractiveFabricSwatch loaded for fabric ID: ${id}, Name: ${name}`);

  const handleSelect = () => {
    if (onSelect) {
      onSelect(id);
    }
  };

  return (
    <HoverCard openDelay={200} closeDelay={100}>
      <HoverCardTrigger asChild>
        <button
          type="button"
          onClick={handleSelect}
          className={cn(
            "group relative h-24 w-24 cursor-pointer overflow-hidden rounded-md border-2 border-transparent transition-all duration-300 ease-in-out hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
            onSelect ? "cursor-pointer" : "cursor-default",
            className
          )}
          aria-label={`View details for ${name}${onSelect ? ". Click to select fabric." : ""}`}
        >
          <img
            src={swatchImageUrl || `https://via.placeholder.com/96x96/FAFAFA/888888?text=${encodeURIComponent(name)}`}
            alt={`Swatch of ${name}`}
            className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
          />
          {/* You could add an overlay icon on hover here if desired, e.g., a small magnifying glass */}
        </button>
      </HoverCardTrigger>
      <HoverCardContent
        side="right"
        align="start"
        className="w-80 overflow-hidden rounded-lg border border-border bg-background p-0 shadow-xl"
        // shadcn/ui HoverCardContent already has enter/exit animations
      >
        <div>
          <img
            src={detailImageUrl || `https://via.placeholder.com/320x180/EEEEEE/888888?text=Detail+View`}
            alt={`Detailed view of ${name}`}
            className="h-48 w-full object-cover"
          />
          <div className="space-y-1 p-4">
            <h4 className="text-md font-semibold text-foreground">{name}</h4>
            {description && (
              <p className="line-clamp-3 text-sm text-muted-foreground">{description}</p>
            )}
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default InteractiveFabricSwatch;