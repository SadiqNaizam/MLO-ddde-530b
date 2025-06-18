import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Custom Components
import MainHeader from '@/components/layout/MainHeader';
import MainFooter from '@/components/layout/MainFooter';
import AnimatedPageTransitionContainer from '@/components/AnimatedPageTransitionContainer';
import DynamicGarmentVisualizer, { GarmentAttributes } from '@/components/DynamicGarmentVisualizer';
import InteractiveFabricSwatch from '@/components/InteractiveFabricSwatch';
import CustomizationOptionSelector, { CustomizationOption } from '@/components/CustomizationOptionSelector';
import MeasurementInputFieldGroup from '@/components/MeasurementInputFieldGroup';

// Shadcn/ui Components
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { ChevronRight } from 'lucide-react';

// Placeholder Data
interface FabricOption {
  id: string;
  name: string;
  swatchImageUrl: string;
  detailImageUrl: string;
  description: string;
  color?: string; // Optional: if fabric dictates a primary color
}

const sampleFabrics: FabricOption[] = [
  { id: 'fabric_silk_charmeuse', name: 'Silk Charmeuse', swatchImageUrl: 'https://images.unsplash.com/photo-1593094199808-a6ef57ba12ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2lsayUyMGZhbGljfGVufDB8fDB8fHww&auto=format&fit=crop&w=96&h=96&q=60', detailImageUrl: 'https://images.unsplash.com/photo-1593094199808-a6ef57ba12ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2lsayUyMGZhbGljfGVufDB8fDB8fHww&auto=format&fit=crop&w=320&h=180&q=80', description: 'Luxurious, smooth, and lustrous silk, perfect for elegant drapes.', color: 'Champagne' },
  { id: 'fabric_cashmere_wool', name: 'Cashmere Wool Blend', swatchImageUrl: 'https://images.unsplash.com/photo-1619220048091-a69f6885159f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d29vbCUyMGZhbGljfGVufDB8fDB8fHww&auto=format&fit=crop&w=96&h=96&q=60', detailImageUrl: 'https://images.unsplash.com/photo-1619220048091-a69f6885159f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d29vbCUyMGZhbGljfGVufDB8fDB8fHww&auto=format&fit=crop&w=320&h=180&q=80', description: 'Soft, warm, and breathable blend, ideal for suiting.', color: 'Heather Grey' },
  { id: 'fabric_italian_linen', name: 'Italian Linen', swatchImageUrl: 'https://images.unsplash.com/photo-1621343421049-774a39937194?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bGluZW4lMjBmYWJyaWN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=96&h=96&q=60', detailImageUrl: 'https://images.unsplash.com/photo-1621343421049-774a39937194?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bGluZW4lMjBmYWJyaWN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=320&h=180&q=80', description: 'Lightweight and crisp, perfect for summer garments.', color: 'Natural White' },
];

const garmentBaseStyleOptions: CustomizationOption[] = [
  { id: 'style_two_piece_suit', name: 'Two-Piece Suit', imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3VpdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=100&h=100&q=60', description: 'Classic two-piece ensemble.' },
  { id: 'style_evening_gown', name: 'Evening Gown', imageUrl: 'https://images.unsplash.com/photo-1590005358001-aa5718742791?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZXZlbmluZyUyMGdvd258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=100&h=100&q=60', description: 'Elegant floor-length dress.' },
  { id: 'style_blazer', name: 'Statement Blazer', imageUrl: 'https://images.unsplash.com/photo-1593030668099-3933a5778b38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YmxhemVyfGVufDB8fDB8fHww&auto=format&fit=crop&w=100&h=100&q=60', description: 'A versatile and sharp blazer.' },
];

const cutOptions: CustomizationOption[] = [
  { id: 'cut_slim_fit', name: 'Slim Fit', imageUrl: 'https://via.placeholder.com/100/E2E8F0/4A5568?Text=Slim', description: 'Tapered to the body.' },
  { id: 'cut_modern_fit', name: 'Modern Fit', imageUrl: 'https://via.placeholder.com/100/CBD5E0/2D3748?Text=Modern', description: 'Comfortable with a defined silhouette.' },
  { id: 'cut_classic_fit', name: 'Classic Fit', imageUrl: 'https://via.placeholder.com/100/BEE3F8/1A202C?Text=Classic', description: 'Traditional and relaxed.' },
];

const lapelOptions: CustomizationOption[] = [
  { id: 'lapel_notch', name: 'Notch Lapel', imageUrl: 'https://via.placeholder.com/100/A0AEC0/4A5568?Text=Notch', description: "Standard, versatile lapel." },
  { id: 'lapel_peak', name: 'Peak Lapel', imageUrl: 'https://via.placeholder.com/100/718096/2D3748?Text=Peak', description: "Formal, pointed upwards." },
  { id: 'lapel_shawl', name: 'Shawl Lapel', imageUrl: 'https://via.placeholder.com/100/4A5568/E2E8F0?Text=Shawl', description: "Rounded, common on tuxedos." },
];


const CustomizationAtelierPage: React.FC = () => {
  console.log('CustomizationAtelierPage loaded');
  const navigate = useNavigate();

  const [selectedFabric, setSelectedFabric] = useState<FabricOption>(sampleFabrics[0]);
  const [selectedStyle, setSelectedStyle] = useState<CustomizationOption>(garmentBaseStyleOptions[0]);
  const [selectedCut, setSelectedCut] = useState<CustomizationOption>(cutOptions[0]);
  const [selectedLapel, setSelectedLapel] = useState<CustomizationOption | null>(lapelOptions[0]);
  
  const [measurements, setMeasurements] = useState<Record<string, string>>({});
  const [measurementUnit, setMeasurementUnit] = useState<'cm' | 'in'>('cm');

  const [currentVisualizerGarment, setCurrentVisualizerGarment] = useState<GarmentAttributes>({
    fabric: sampleFabrics[0].name,
    color: sampleFabrics[0].color || 'As selected',
    style: garmentBaseStyleOptions[0].name,
    cut: cutOptions[0].name,
    details: { lapel: lapelOptions[0].name },
    baseModelKey: garmentBaseStyleOptions[0].id,
  });

  const [progressValue, setProgressValue] = useState(25);
  const [activeTab, setActiveTab] = useState<string>("fabric");

  useEffect(() => {
    setCurrentVisualizerGarment({
      fabric: selectedFabric.name,
      color: selectedFabric.color || 'As selected',
      style: selectedStyle.name,
      cut: selectedCut.name,
      details: { 
        lapel: selectedLapel?.name || 'Not Selected',
        // Add other dynamic details here as they are selected
      },
      baseModelKey: selectedStyle.id, // Use style ID as base model key example
    });
  }, [selectedFabric, selectedStyle, selectedCut, selectedLapel]);

  const handleMeasurementsChange = (newMeasurements: Record<string, string>, unit: 'cm' | 'in') => {
    setMeasurements(newMeasurements);
    setMeasurementUnit(unit);
    console.log("Measurements updated:", newMeasurements, unit);
  };
  
  const handleFabricSelect = (fabricId: string) => {
    const fabric = sampleFabrics.find(f => f.id === fabricId);
    if (fabric) setSelectedFabric(fabric);
  };

  const handleStyleSelect = (styleId: string) => {
    const style = garmentBaseStyleOptions.find(s => s.id === styleId);
    if (style) setSelectedStyle(style);
  };

  const handleCutSelect = (cutId: string) => {
    const cut = cutOptions.find(c => c.id === cutId);
    if (cut) setSelectedCut(cut);
  };

  const handleLapelSelect = (lapelId: string) => {
    const lapel = lapelOptions.find(l => l.id === lapelId);
    if (lapel) setSelectedLapel(lapel);
  };

  const handleTabChange = (tabValue: string) => {
    setActiveTab(tabValue);
    const tabProgressMap: Record<string, number> = {
      'fabric': 25,
      'style': 50,
      'details': 75,
      'measurements': 100,
    };
    setProgressValue(tabProgressMap[tabValue] || 0);
  };

  const handleReviewDesign = () => {
    // Here you would typically save the customization state or pass it to the next page
    console.log("Customization complete, navigating to order summary with state:", {
      garment: currentVisualizerGarment,
      measurements,
      measurementUnit,
    });
    navigate('/order-summary'); // Path from App.tsx
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
      <MainHeader />
      <AnimatedPageTransitionContainer>
        <div className="container mx-auto px-4 py-8">
          <Progress value={progressValue} className="w-full h-2 mb-8 transition-all duration-500" />
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column: Visualizer */}
            <section className="lg:w-[45%] xl:w-2/5 sticky top-24 self-start h-full"> {/* Make visualizer sticky */}
              <DynamicGarmentVisualizer garment={currentVisualizerGarment} className="min-h-[600px] lg:min-h-[calc(100vh-12rem)]" />
            </section>

            {/* Right Column: Customization Options */}
            <section className="lg:w-[55%] xl:w-3/5">
              <ScrollArea className="h-auto lg:h-[calc(100vh-12rem)]" viewportClassName="pr-2">
                <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
                  <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-6 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
                    <TabsTrigger value="fabric" className="text-xs sm:text-sm">1. Fabric</TabsTrigger>
                    <TabsTrigger value="style" className="text-xs sm:text-sm">2. Style & Cut</TabsTrigger>
                    <TabsTrigger value="details" className="text-xs sm:text-sm">3. Details</TabsTrigger>
                    <TabsTrigger value="measurements" className="text-xs sm:text-sm">4. Measurements</TabsTrigger>
                  </TabsList>

                  <TabsContent value="fabric" className="space-y-6">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Select Your Fabric</h2>
                    <p className="text-gray-600 dark:text-gray-400">Choose from our curated collection of luxurious fabrics. Hover to see details, click to select.</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {sampleFabrics.map(fabric => (
                        <InteractiveFabricSwatch
                          key={fabric.id}
                          {...fabric}
                          onSelect={handleFabricSelect}
                          className={selectedFabric.id === fabric.id ? "ring-2 ring-primary ring-offset-2 shadow-lg" : ""}
                        />
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="style" className="space-y-6">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Define Style & Cut</h2>
                     <Accordion type="single" collapsible defaultValue="item-style" className="w-full space-y-4">
                        <AccordionItem value="item-style" className="border bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                            <AccordionTrigger className="px-4 py-3 text-md font-medium hover:no-underline">Base Garment Style</AccordionTrigger>
                            <AccordionContent className="p-4 border-t dark:border-gray-700">
                               <CustomizationOptionSelector
                                title="Choose Garment Style"
                                options={garmentBaseStyleOptions}
                                selectedOptionId={selectedStyle.id}
                                onOptionSelect={handleStyleSelect}
                                gridConfig={{sm: "sm:grid-cols-2", md: "md:grid-cols-2", lg: "lg:grid-cols-3"}}
                                />
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-cut" className="border bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                            <AccordionTrigger className="px-4 py-3 text-md font-medium hover:no-underline">Garment Cut</AccordionTrigger>
                            <AccordionContent className="p-4 border-t dark:border-gray-700">
                                <CustomizationOptionSelector
                                title="Select Your Fit"
                                options={cutOptions}
                                selectedOptionId={selectedCut.id}
                                onOptionSelect={handleCutSelect}
                                gridConfig={{sm: "sm:grid-cols-2", md: "md:grid-cols-2", lg: "lg:grid-cols-3"}}
                                />
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                  </TabsContent>
                  
                  <TabsContent value="details" className="space-y-6">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Add Finer Details</h2>
                     <Accordion type="single" collapsible defaultValue="item-lapels" className="w-full space-y-4">
                        <AccordionItem value="item-lapels" className="border bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                            <AccordionTrigger className="px-4 py-3 text-md font-medium hover:no-underline">Lapel Style</AccordionTrigger>
                            <AccordionContent className="p-4 border-t dark:border-gray-700">
                               <CustomizationOptionSelector
                                title="Choose Lapel Style"
                                options={lapelOptions}
                                selectedOptionId={selectedLapel?.id || null}
                                onOptionSelect={handleLapelSelect}
                                gridConfig={{sm: "sm:grid-cols-2", md: "md:grid-cols-2", lg: "lg:grid-cols-3"}}
                                />
                            </AccordionContent>
                        </AccordionItem>
                        {/* Add more AccordionItems for other details like Pockets, Buttons, Lining etc. */}
                         <AccordionItem value="item-pockets" className="border bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                            <AccordionTrigger className="px-4 py-3 text-md font-medium hover:no-underline">Pocket Style (Placeholder)</AccordionTrigger>
                            <AccordionContent className="p-4 border-t dark:border-gray-700">
                               <p className="text-gray-500 dark:text-gray-400 italic">Pocket customization options would appear here.</p>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                  </TabsContent>

                  <TabsContent value="measurements" className="space-y-6">
                     <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Enter Your Measurements</h2>
                     <p className="text-gray-600 dark:text-gray-400">Provide precise measurements for a perfect fit. Use our guides for accuracy.</p>
                    <MeasurementInputFieldGroup
                      onMeasurementsChange={handleMeasurementsChange}
                      initialMeasurements={measurements}
                      initialUnit={measurementUnit}
                    />
                  </TabsContent>
                </Tabs>
                
                <Separator className="my-8" />

                <div className="mt-8 pb-8 flex justify-end items-center">
                  <Button size="lg" variant="default" onClick={handleReviewDesign} className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-md shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105">
                    Review Your Design
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </ScrollArea>
            </section>
          </div>
        </div>
      </AnimatedPageTransitionContainer>
      <MainFooter />
    </div>
  );
};

export default CustomizationAtelierPage;