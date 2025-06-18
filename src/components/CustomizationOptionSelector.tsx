import React from 'react';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { CheckCircle2, ImageOff } from 'lucide-react';
import { cn } from "@/lib/utils"; // Assumed to be available

export interface CustomizationOption {
  id: string;
  name: string;
  imageUrl?: string;
  description?: string;
}

export interface CustomizationOptionSelectorProps {
  title: string;
  options: CustomizationOption[];
  selectedOptionId: string | null;
  onOptionSelect: (optionId: string) => void;
  className?: string; // For the main Card container
  itemCardClassName?: string; // For individual option cards
  gridConfig?: {
    cols?: string;
    sm?: string;
    md?: string;
    lg?: string;
    xl?: string;
  };
}

const CustomizationOptionSelector: React.FC<CustomizationOptionSelectorProps> = ({
  title,
  options,
  selectedOptionId,
  onOptionSelect,
  className,
  itemCardClassName,
  gridConfig = {},
}) => {
  console.log(`CustomizationOptionSelector loaded for: ${title}`);

  const defaultGrid = {
    cols: "grid-cols-2",
    sm: "sm:grid-cols-3",
    md: "md:grid-cols-3", // Adjusted for potentially larger items
    lg: "lg:grid-cols-4",
    xl: "xl:grid-cols-5",
  };
  const currentGridConfig = { ...defaultGrid, ...gridConfig };
  const gridClasses = cn(
    currentGridConfig.cols,
    currentGridConfig.sm,
    currentGridConfig.md,
    currentGridConfig.lg,
    currentGridConfig.xl,
    "gap-3 sm:gap-4" // Consistent gap
  );

  return (
    <Card className={cn("w-full shadow-sm bg-white rounded-lg", className)}>
      <CardHeader>
        <CardTitle className="text-base sm:text-lg font-medium text-neutral-700">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {options.length === 0 ? (
          <p className="text-neutral-500 italic text-sm py-4 text-center">
            No options available for {title.toLowerCase()}.
          </p>
        ) : (
          <ToggleGroup
            type="single"
            value={selectedOptionId || undefined}
            onValueChange={(value) => {
              // `value` is the id of the selected item, or "" if deselected by clicking active item
              if (value && value !== selectedOptionId) {
                onOptionSelect(value);
              }
              // If value is empty (deselected) or same as current, do nothing.
              // This effectively prevents deselection if parent keeps selectedOptionId set.
            }}
            className={gridClasses}
            aria-label={`Select ${title}`}
          >
            {options.map((option) => {
              const isSelected = selectedOptionId === option.id;
              
              const optionCardInnerContent = (
                <div className={cn(
                  "w-full h-full transition-all duration-200 ease-in-out cursor-pointer group relative overflow-hidden flex flex-col",
                  "rounded-md", // Apply rounded corners to the visual card part
                  "hover:shadow-xl hover:scale-[1.03]", 
                  isSelected
                    ? "ring-2 ring-primary shadow-lg scale-[1.03]" 
                    : "ring-1 ring-neutral-200 hover:ring-neutral-300 bg-white",
                  itemCardClassName
                )}>
                  <div className="flex-grow p-2 sm:p-3 flex flex-col items-center justify-start text-center">
                    {option.imageUrl ? (
                      <AspectRatio ratio={1} className="w-full mb-2 rounded-sm overflow-hidden bg-neutral-100">
                        <img
                          src={option.imageUrl}
                          alt={option.name}
                          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                        />
                      </AspectRatio>
                    ) : (
                      <AspectRatio ratio={1} className="w-full mb-2 rounded-sm overflow-hidden flex items-center justify-center bg-neutral-50 border border-dashed border-neutral-200">
                        <ImageOff className="w-1/3 h-1/3 text-neutral-400" />
                      </AspectRatio>
                    )}
                    <p className={cn(
                      "text-xs sm:text-sm font-medium line-clamp-2 leading-snug mt-auto", // mt-auto to push text to bottom if space
                      isSelected ? "text-primary font-semibold" : "text-neutral-600 group-hover:text-neutral-800"
                    )}>
                      {option.name}
                    </p>
                  </div>
                  {isSelected && (
                    <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 p-0.5 bg-primary rounded-full text-primary-foreground shadow-md">
                      <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    </div>
                  )}
                </div>
              );

              return (
                <ToggleGroupItem
                  key={option.id}
                  value={option.id}
                  aria-label={option.name}
                  className={cn(
                    "p-0 border-none h-auto bg-transparent hover:bg-transparent", // Reset ToggleGroupItem base styles
                    "rounded-lg", // Apply rounded corners to the item itself for focus ring
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2", // Enhanced focus visibility
                    "data-[state=on]:bg-transparent data-[state=off]:bg-transparent" // Neutralize ToggleGroupItem's own state visuals
                  )}
                >
                  {option.description ? (
                    <Tooltip delayDuration={150}>
                      <TooltipTrigger className="w-full h-full">{optionCardInnerContent}</TooltipTrigger>
                      <TooltipContent side="bottom" className="max-w-[200px] bg-neutral-800 text-white p-2 rounded text-xs shadow-lg">
                        <p>{option.description}</p>
                      </TooltipContent>
                    </Tooltip>
                  ) : (
                    optionCardInnerContent
                  )}
                </ToggleGroupItem>
              );
            })}
          </ToggleGroup>
        )}
      </CardContent>
    </Card>
  );
};

export default CustomizationOptionSelector;