import React from 'react';
import { Link } from 'react-router-dom';

import MainHeader from '@/components/layout/MainHeader';
import MainFooter from '@/components/layout/MainFooter';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator'; // For visual separation

// Placeholder data for the order summary
const garmentDetails = {
  name: "Bespoke Azure Linen Suit",
  imageUrl: "https://images.unsplash.com/photo-1593030901213-7401885a5749?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Placeholder suit image
  options: [
    { item: "Fabric", selection: "Azure Blue Italian Linen" },
    { item: "Style", selection: "Two-Button, Single Breasted" },
    { item: "Cut", selection: "Modern Slim Fit" },
    { item: "Lapel", selection: "Notch Lapel, 7cm" },
    { item: "Pockets", selection: "Flap Pockets, Ticket Pocket" },
    { item: "Vents", selection: "Double Vents" },
    { item: "Lining", selection: "Crimson Silk Paisley" },
    { item: "Monogram", selection: "J.D. (Interior, Gold Thread)" },
  ],
  measurements: [
    { dimension: "Chest", value: "102 cm" },
    { dimension: "Waist (Jacket)", value: "88 cm" },
    { dimension: "Sleeve Length", value: "65 cm" },
    { dimension: "Shoulder Width", value: "46 cm" },
    { dimension: "Jacket Length", value: "75 cm" },
    { dimension: "Trouser Waist", value: "86 cm" },
    { dimension: "Inseam", value: "80 cm" },
  ],
  pricing: {
    subtotal: 1250.00,
    customizationFee: 200.00,
    monogramFee: 50.00,
    total: 1500.00,
  },
  currency: "USD",
};

const formatCurrency = (amount: number, currencyCode: string) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: currencyCode }).format(amount);
};

const OrderSummaryPage = () => {
  console.log('OrderSummaryPage loaded');

  const handleProceedToCheckout = () => {
    console.log("Proceeding to checkout with order:", garmentDetails);
    // In a real app, this would navigate to a payment page or trigger a payment flow.
    // For now, it just logs to the console.
    alert("Proceeding to Checkout (See console for details). This would normally redirect to a payment gateway.");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <MainHeader />
      <main className="flex-grow container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <Card className="max-w-3xl mx-auto shadow-xl rounded-lg overflow-hidden bg-white dark:bg-gray-800">
          <CardHeader className="bg-gray-100 dark:bg-gray-700 p-6">
            <CardTitle className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Review Your Bespoke Creation</CardTitle>
            <CardDescription className="text-md text-gray-600 dark:text-gray-300 mt-1">
              This is your final checkpoint. Please ensure all details for your "{garmentDetails.name}" are correct.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-6 space-y-8">
            <section aria-labelledby="garment-preview-heading">
              <h2 id="garment-preview-heading" className="sr-only">Garment Preview</h2>
              <div className="w-full aspect-[4/3] bg-gray-100 dark:bg-gray-700 flex items-center justify-center rounded-md overflow-hidden">
                <img 
                  src={garmentDetails.imageUrl} 
                  alt={`Preview of ${garmentDetails.name}`} 
                  className="object-cover w-full h-full"
                />
              </div>
            </section>

            <Separator />

            <section aria-labelledby="configuration-details-heading">
              <h3 id="configuration-details-heading" className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Configuration Details</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[150px] sm:w-[200px] text-gray-700 dark:text-gray-300">Item</TableHead>
                    <TableHead className="text-gray-700 dark:text-gray-300">Selection</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {garmentDetails.options.map((opt) => (
                    <TableRow key={opt.item}>
                      <TableCell className="font-medium text-gray-700 dark:text-gray-300">{opt.item}</TableCell>
                      <TableCell className="text-gray-600 dark:text-gray-400">{opt.selection}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </section>

            <Separator />

            <section aria-labelledby="measurements-heading">
              <h3 id="measurements-heading" className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Your Measurements</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[150px] sm:w-[200px] text-gray-700 dark:text-gray-300">Dimension</TableHead>
                    <TableHead className="text-gray-700 dark:text-gray-300">Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {garmentDetails.measurements.map((meas) => (
                    <TableRow key={meas.dimension}>
                      <TableCell className="font-medium text-gray-700 dark:text-gray-300">{meas.dimension}</TableCell>
                      <TableCell className="text-gray-600 dark:text-gray-400">{meas.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </section>

            <Separator />

            <section aria-labelledby="special-instructions-heading">
              <Label htmlFor="specialInstructions" className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2 block" id="special-instructions-heading">
                Special Instructions
              </Label>
              <Textarea 
                id="specialInstructions" 
                placeholder="e.g., specific buttonhole color, reinforcement requests..." 
                rows={4}
                className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-primary-500 focus:border-primary-500"
              />
            </section>
            
            <Separator />

            <section aria-labelledby="price-summary-heading" className="space-y-2 text-right">
              <h3 id="price-summary-heading" className="sr-only">Price Summary</h3>
              <div className="text-md text-gray-600 dark:text-gray-400">
                Subtotal: <span className="font-semibold text-gray-800 dark:text-gray-200">{formatCurrency(garmentDetails.pricing.subtotal, garmentDetails.currency)}</span>
              </div>
              <div className="text-md text-gray-600 dark:text-gray-400">
                Customization Fee: <span className="font-semibold text-gray-800 dark:text-gray-200">{formatCurrency(garmentDetails.pricing.customizationFee, garmentDetails.currency)}</span>
              </div>
               <div className="text-md text-gray-600 dark:text-gray-400">
                Monogram Fee: <span className="font-semibold text-gray-800 dark:text-gray-200">{formatCurrency(garmentDetails.pricing.monogramFee, garmentDetails.currency)}</span>
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white pt-2">
                Total: <span>{formatCurrency(garmentDetails.pricing.total, garmentDetails.currency)}</span>
              </div>
            </section>
          </CardContent>

          <CardFooter className="bg-gray-100 dark:bg-gray-700 p-6 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3">
            <Button variant="outline" size="lg" asChild className="w-full sm:w-auto border-gray-600 text-gray-700 hover:bg-gray-200 dark:border-gray-500 dark:text-gray-300 dark:hover:bg-gray-600">
              <Link to="/customization-atelier">Edit Design</Link>
            </Button>
            <Button size="lg" onClick={handleProceedToCheckout} className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">
              Proceed to Checkout
            </Button>
          </CardFooter>
        </Card>
      </main>
      <MainFooter />
    </div>
  );
};

export default OrderSummaryPage;