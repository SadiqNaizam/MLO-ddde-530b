import React, { useState } from 'react';
import MainHeader from '@/components/layout/MainHeader';
import MainFooter from '@/components/layout/MainFooter';
import AnimatedPageTransitionContainer from '@/components/AnimatedPageTransitionContainer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash2, User, Ruler, ShoppingBag, Palette } from 'lucide-react'; // Icons for tabs and actions

const MyAccountPage = () => {
  console.log('MyAccountPage loaded');
  const [activeTab, setActiveTab] = useState("profile");

  // Placeholder form state for Profile
  const [profileData, setProfileData] = useState({
    firstName: 'Aria',
    lastName: 'Montgomery',
    email: 'aria.montgomery@example.com',
  });

  // Placeholder saved measurements
  const [measurements, setMeasurements] = useState({
    height: '170 cm',
    chest: '88 cm',
    waist: '70 cm',
    hips: '95 cm',
    sleeveLength: '58 cm',
    inseam: '75 cm',
  });

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  // Placeholder order history
  const orderHistory = [
    { id: 'ORD12345', date: '2024-07-15', total: '$350.00', status: 'Delivered', items: 'Custom Silk Blouse' },
    { id: 'ORD12346', date: '2024-06-20', total: '$1275.00', status: 'Shipped', items: 'Bespoke Evening Gown' },
    { id: 'ORD12347', date: '2024-05-10', total: '$480.00', status: 'Processing', items: 'Tailored Wool Trousers' },
  ];

  // Placeholder saved designs
  const savedDesigns = [
    { id: 'DSGN001', name: 'Midnight Bloom Gown', dateSaved: '2024-07-01', previewImageUrl: 'https://images.unsplash.com/photo-1590095439810-347f3959975a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGV2ZW5pbmclMjBnb3dufGVufDB8fDB8fHww&auto=format&fit=crop&w=300&q=60', description: 'Elegant silk charmeuse gown with hand-embroidered floral details.' },
    { id: 'DSGN002', name: 'Riviera Linen Suit', dateSaved: '2024-06-15', previewImageUrl: 'https://images.unsplash.com/photo-1617137968427-85916880950a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bGluZW4lMjBzdWl0fGVufDB8fDB8fHww&auto=format&fit=crop&w=300&q=60', description: 'Two-piece linen suit, perfect for summer occasions. Sky blue color.' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-neutral-900 text-gray-800 dark:text-gray-200">
      <MainHeader />
      <AnimatedPageTransitionContainer>
        <main className="flex-grow container mx-auto px-4 py-10 sm:py-16">
          <div className="text-center mb-10 sm:mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 dark:from-purple-400 dark:via-pink-400 dark:to-red-400">
              My Account
            </h1>
            <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
              Manage your personal information, orders, and saved designs.
            </p>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-2 mb-8 bg-gray-100 dark:bg-neutral-800 p-1 rounded-lg">
              <TabsTrigger value="profile" className="flex items-center justify-center gap-2 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-md dark:data-[state=active]:bg-neutral-700 dark:data-[state=active]:text-white">
                <User className="h-5 w-5" /> Profile
              </TabsTrigger>
              <TabsTrigger value="measurements" className="flex items-center justify-center gap-2 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-md dark:data-[state=active]:bg-neutral-700 dark:data-[state=active]:text-white">
                <Ruler className="h-5 w-5" /> Measurements
              </TabsTrigger>
              <TabsTrigger value="orders" className="flex items-center justify-center gap-2 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-md dark:data-[state=active]:bg-neutral-700 dark:data-[state=active]:text-white">
                <ShoppingBag className="h-5 w-5" /> Orders
              </TabsTrigger>
              <TabsTrigger value="designs" className="flex items-center justify-center gap-2 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-md dark:data-[state=active]:bg-neutral-700 dark:data-[state=active]:text-white">
                <Palette className="h-5 w-5" /> Saved Designs
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card className="shadow-xl border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-800">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold">Edit Profile</CardTitle>
                  <CardDescription>Update your personal details and password.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" name="firstName" value={profileData.firstName} onChange={handleProfileChange} placeholder="Your first name" className="dark:bg-neutral-700 dark:border-neutral-600"/>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" name="lastName" value={profileData.lastName} onChange={handleProfileChange} placeholder="Your last name" className="dark:bg-neutral-700 dark:border-neutral-600"/>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" name="email" type="email" value={profileData.email} onChange={handleProfileChange} placeholder="your.email@example.com" className="dark:bg-neutral-700 dark:border-neutral-600"/>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" placeholder="Enter current password to change" className="dark:bg-neutral-700 dark:border-neutral-600"/>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" type="password" placeholder="New password" className="dark:bg-neutral-700 dark:border-neutral-600"/>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input id="confirmPassword" type="password" placeholder="Confirm new password" className="dark:bg-neutral-700 dark:border-neutral-600"/>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t border-gray-200 dark:border-neutral-700 px-6 py-4 mt-6">
                  <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white">Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="measurements">
              <Card className="shadow-xl border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-800">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold">My Measurements</CardTitle>
                  <CardDescription>Your saved body measurements. These are used when you customize garments.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  {Object.entries(measurements).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center p-4 bg-gray-50 dark:bg-neutral-700/50 rounded-lg border border-gray-200 dark:border-neutral-600">
                      <span className="font-medium capitalize text-gray-700 dark:text-gray-300">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                      <span className="text-gray-900 dark:text-gray-100">{value}</span>
                    </div>
                  ))}
                  <p className="text-sm text-gray-500 dark:text-gray-400 pt-4">
                    To update your measurements, please use the measurement input tools available in the Customization Atelier when starting a new design, or contact our support team for assistance.
                  </p>
                </CardContent>
                <CardFooter className="border-t border-gray-200 dark:border-neutral-700 px-6 py-4 mt-6">
                  <Button variant="outline">Contact Support for Updates</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="orders">
              <Card className="shadow-xl border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-800">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold">Order History</CardTitle>
                  <CardDescription>Review your past and current bespoke orders.</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  {orderHistory.length > 0 ? (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="hover:bg-transparent dark:hover:bg-transparent">
                            <TableHead className="dark:text-gray-300">Order ID</TableHead>
                            <TableHead className="dark:text-gray-300">Date</TableHead>
                            <TableHead className="dark:text-gray-300">Items</TableHead>
                            <TableHead className="dark:text-gray-300">Total</TableHead>
                            <TableHead className="dark:text-gray-300">Status</TableHead>
                            <TableHead className="text-right dark:text-gray-300">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {orderHistory.map((order) => (
                            <TableRow key={order.id} className="dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-700/30">
                              <TableCell className="font-medium text-primary dark:text-purple-400">{order.id}</TableCell>
                              <TableCell>{order.date}</TableCell>
                              <TableCell className="max-w-xs truncate">{order.items}</TableCell>
                              <TableCell>{order.total}</TableCell>
                              <TableCell>
                                <span className={`px-3 py-1 text-xs font-semibold rounded-full whitespace-nowrap ${
                                  order.status === 'Delivered' ? 'bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-300' :
                                  order.status === 'Shipped' ? 'bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-300' :
                                  order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800/30 dark:text-yellow-300' : 
                                  'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                                }`}>
                                  {order.status}
                                </span>
                              </TableCell>
                              <TableCell className="text-right">
                                <Button variant="ghost" size="icon" title="View Order Details" className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-purple-400">
                                  <Eye className="h-5 w-5" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400 text-center py-10">You have no orders yet. Start by exploring our Lookbook or visiting the Atelier!</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="designs">
              <Card className="shadow-xl border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-800">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold">My Saved Designs</CardTitle>
                  <CardDescription>Access and manage your previously customized garment designs.</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  {savedDesigns.length > 0 ? (
                    <Accordion type="single" collapsible className="w-full space-y-4">
                      {savedDesigns.map((design) => (
                        <AccordionItem value={design.id} key={design.id} className="border border-gray-200 dark:border-neutral-700 rounded-lg bg-gray-50/50 dark:bg-neutral-700/30">
                          <AccordionTrigger className="px-6 py-4 hover:no-underline text-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-700/50 rounded-t-lg">
                            <div className="flex justify-between w-full items-center">
                              <span>{design.name}</span>
                              <span className="text-sm text-gray-500 dark:text-gray-400">Saved: {design.dateSaved}</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="px-6 pt-4 pb-6 border-t border-gray-200 dark:border-neutral-600 bg-white dark:bg-neutral-800 rounded-b-lg">
                            <div className="flex flex-col sm:flex-row gap-6 items-start">
                              <img src={design.previewImageUrl} alt={`Preview of ${design.name}`} className="w-full sm:w-40 h-auto sm:h-52 object-cover rounded-md border border-gray-300 dark:border-neutral-600 shadow-md" />
                              <div className="flex-grow space-y-3">
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  {design.description || "A beautifully crafted custom design."}
                                </p>
                                <div className="flex flex-wrap gap-3 pt-2">
                                  <Button size="sm" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                                    <Pencil className="h-4 w-4 mr-2" /> View / Edit Design
                                  </Button>
                                  <Button variant="outline" size="sm">
                                    <Trash2 className="h-4 w-4 mr-2" /> Delete Design
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400 text-center py-10">You have no saved designs. Unleash your creativity in the Atelier!</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </AnimatedPageTransitionContainer>
      <MainFooter />
    </div>
  );
};

export default MyAccountPage;