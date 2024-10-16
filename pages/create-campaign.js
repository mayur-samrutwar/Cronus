import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Camera, Image as ImageIcon, ChevronRight } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { useRouter } from 'next/router';
import ReactConfetti from 'react-confetti';
import Link from 'next/link';

export default function CreateCampaign() {
  const [campaignData, setCampaignData] = useState({
    coverImage: null,
    activityDao: '',
    title: '',
    description: '',
    totalAmount: '',
    startDate: null,
    endDate: null
  });
  const [imageError, setImageError] = useState('');
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState({ width: 0, height: 0 });
  const fileInputRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const updateWindowDimensions = () => {
      setWindowDimensions({ width: window.innerWidth, height: window.innerHeight });
    };

    updateWindowDimensions();
    window.addEventListener('resize', updateWindowDimensions);

    return () => window.removeEventListener('resize', updateWindowDimensions);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCampaignData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value) => {
    setCampaignData(prev => ({ ...prev, activityDao: value }));
  };

  const handleDateChange = (field, date) => {
    setCampaignData(prev => ({ ...prev, [field]: date }));
  };

  const handleCreateCampaign = () => {
    console.log(campaignData);
    setShowConfetti(true);
    setTimeout(() => {
      setShowSuccessDialog(true);
    }, 500);
    setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
  };

  const handleCoverImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new window.Image();
        img.onload = () => {
          if (img.width < 800 || img.height < 400) {
            setImageError("Please upload an image that is at least 800x400 pixels.");
          } else {
            setCampaignData(prev => ({ ...prev, coverImage: e.target.result }));
            setImageError('');
          }
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleViewCampaign = () => {
    setShowSuccessDialog(false);
    router.push(`/campaign/${campaignData.id}`); // Assuming you have a campaign ID
  };

  return (
    <div>
      {showConfetti && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 9999 }}>
          <ReactConfetti
            width={windowDimensions.width}
            height={windowDimensions.height}
            recycle={false}
            numberOfPieces={500}
          />
        </div>
      )}
{/*       
      <div className="bg-white py-4 px-8 mb-6 ">
        <div className="container mx-auto flex items-center text-sm">
          <Link href="/" className="text-gray-600 hover:text-gray-800">Home</Link>
          <ChevronRight className="mx-2 h-4 w-4 text-gray-400" />
          <Link href="/campaigns" className="text-gray-600 hover:text-gray-800">Campaigns</Link>
          <ChevronRight className="mx-2 h-4 w-4 text-gray-400" />
          <span className="text-gray-800">Create Campaign</span>
        </div>
      </div> */}
        
      <div className="w-full bg-[#FFDAB9] bg-opacity-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-6">Create Your Campaign</h1>
          <p className="text-xl mb-8 font-thin">Start your journey to make a difference. Every campaign has the power to change lives.</p>
        </div>
      </div>

      <div className="container mx-auto px-8 md:px-16 lg:px-32 py-12">
        <div className="relative w-full h-64 bg-gray-200 mb-2 rounded-lg overflow-hidden">
          {campaignData.coverImage ? (
            <img src={campaignData.coverImage} alt="Cover" className="w-full h-full object-cover" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-500">
              No cover image selected
            </div>
          )}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleCoverImageUpload}
            accept="image/*"
            className="hidden"
          />
          <Button 
            className="absolute bottom-4 right-4 flex items-center"
            onClick={() => fileInputRef.current.click()}
          >
            <ImageIcon className="mr-2 h-4 w-4" />
            Add Cover Image
          </Button>
        </div>
        {imageError && <p className="text-red-500 text-sm mb-4">{imageError}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 mb-8">
          <div>
            <Label htmlFor="activityDao" className="text-sm font-bold text-gray-700 mb-2 block">Select the activity DAO you are raising for</Label>
            <Select onValueChange={handleSelectChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select DAO" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dao1">DAO 1</SelectItem>
                <SelectItem value="dao2">DAO 2</SelectItem>
                <SelectItem value="dao3">DAO 3</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="title" className="text-sm font-bold text-gray-700 mb-2 block">Title of the campaign</Label>
            <Input
              id="title"
              name="title"
              value={campaignData.title}
              onChange={handleInputChange}
              placeholder="Enter campaign title"
              className="w-full"
            />
          </div>
        </div>

        <div className="mb-8">
          <Label htmlFor="description" className="text-sm font-bold text-gray-700 mb-2 block">Description (250 characters max)</Label>
          <Textarea
            id="description"
            name="description"
            value={campaignData.description}
            onChange={handleInputChange}
            placeholder="Enter campaign description"
            maxLength={250}
            className="h-32 w-full"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <Label htmlFor="totalAmount" className="text-sm font-bold text-gray-700 mb-2 block">Total amount you're raising</Label>
            <Input
              id="totalAmount"
              name="totalAmount"
              value={campaignData.totalAmount}
              onChange={handleInputChange}
              placeholder="Enter total amount"
              type="number"
              className="w-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <Label htmlFor="startDate" className="text-sm font-bold text-gray-700 mb-2 block">Start date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  {campaignData.startDate ? format(campaignData.startDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={campaignData.startDate}
                  onSelect={(date) => handleDateChange('startDate', date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <Label htmlFor="endDate" className="text-sm font-bold text-gray-700 mb-2 block">End date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  {campaignData.endDate ? format(campaignData.endDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={campaignData.endDate}
                  onSelect={(date) => handleDateChange('endDate', date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <Button variant="outline" onClick={() => console.log('Cancel')} className="px-6 py-2">Cancel</Button>
          <Button onClick={handleCreateCampaign} className="px-6 py-2">Create Campaign</Button>
        </div>
      </div>

      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="bg-white sm:max-w-md">    
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">Campaign Created Successfully!</DialogTitle>
            <DialogDescription className="text-center">
              <p className="mt-2 text-lg text-gray-600">Congratulations! You've successfully created your campaign.</p>
              <p className="mt-4 text-sm text-gray-500">Please stake XX amount and complete KYC to verify it.</p>
            </DialogDescription>
          </DialogHeader>
          <div className="mt-6 flex flex-col space-y-4">
            <Button onClick={handleViewCampaign} className="w-full text-white font-semibold py-3 rounded-lg shadow-md hover:from-purple-600 hover:to-indigo-700 transition duration-300">
              View Campaign
            </Button>
            <Button onClick={() => setShowSuccessDialog(false)} variant="outline" className="w-full">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
