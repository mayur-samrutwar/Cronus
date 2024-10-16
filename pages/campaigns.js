import { useState } from 'react';
import CampaignCard from '@/components/campaignCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Filter, SortAsc } from 'lucide-react';
import FeaturedCampaigns from '@/components/FeaturedCampaigns';

const dummyCampaigns = [
  {
    id: 1,
    title: "Save the Rainforest",
    description: "Help us protect and preserve the Amazon rainforest. Our initiative focuses on combating deforestation, supporting indigenous communities, and promoting sustainable practices. Your contribution will directly fund reforestation efforts, wildlife conservation, and educational programs for local communities.",
    creator: {
      name: "Jane Doe",
      isVerified: true
    },
    fundRaised: 50000,
    fundGoal: 100000
  },
  {
    id: 2,
    title: "Clean Ocean Initiative",
    description: "Join our mission to clean up the world's oceans. We're tackling plastic pollution, marine debris, and oil spills through innovative technologies and community-driven cleanup efforts. Your support will help deploy ocean cleaning devices, organize beach cleanups, and fund research on sustainable alternatives to single-use plastics.",
    creator: {
      name: "John Smith",
      isVerified: false
    },
    fundRaised: 75000,
    fundGoal: 150000
  },
  {
    id: 3,
    title: "Education for All",
    description: "Support our program to provide education in underprivileged areas. We're building schools, training teachers, and supplying educational materials to communities with limited access to quality education. Your donation will help break the cycle of poverty by empowering children and adults with knowledge and skills for a brighter future.",
    creator: {
      name: "Alice Johnson",
      isVerified: true
    },
    fundRaised: 30000,
    fundGoal: 80000
  },
  {
    id: 4,
    title: "Renewable Energy Project",
    description: "Help fund our renewable energy initiatives for a sustainable future. We're developing and implementing solar, wind, and hydroelectric power solutions in communities reliant on fossil fuels. Your contribution will support the installation of clean energy infrastructure, create green jobs, and reduce carbon emissions for a healthier planet.",
    creator: {
      name: "Bob Williams",
      isVerified: false
    },
    fundRaised: 120000,
    fundGoal: 200000
  }
];

export default function Campaigns() {
  const [campaigns] = useState(dummyCampaigns);

  return (
    <div>
      <div className="w-full bg-[#FFDAB9] bg-opacity-50 py-16">
        <div className="container mx-auto px-4">
          <div className="w-3/5">
            <h1 className="text-4xl font-bold mb-6">Fund your activities</h1>
            <p className="text- mb-8 font-thin">Embark on a journey to create positive change with your campaign. Every idea has the potential to transform lives, foster growth, and leave a lasting legacy. By taking the first step, you can inspire others to join you in making a meaningful difference.</p>
            <button className="relative inline-block group">
              <span className="relative z-10 px-3.5 py-2 overflow-hidden font-medium leading-tight flex items-centrer justify-center text-red-600 transition-colors duration-300 ease-out border-2 border-red-600 rounded-lg group-hover:text-white">
                <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                <span className="absolute left-0 w-40 h-40 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-red-600 group-hover:-rotate-180 ease"></span>
                <span className="relative text-base font-semibold">Start Campaign</span>
              </span>
              <span className="absolute bottom-0 right-0 w-full h-9 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-red-600 rounded-lg group-hover:mb-0 group-hover:mr-0 group-hover:mb-2" data-rounded="rounded-lg"></span>
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <FeaturedCampaigns campaigns={campaigns} />

        <div className="mb-6">
          <h2 className="text-lg font-medium text-gray-800">Active Campaigns</h2>
          <div className="flex space-x-4 mt-8">
            <Input
              type="text"
              placeholder="Search campaigns..."
              className=""
            />
            <Button variant="outline" className="flex items-center">
              <Filter className="mr-2 h-4 w-4" /> Filter
            </Button>
            <Button variant="outline" className="flex items-center">
              <SortAsc className="mr-2 h-4 w-4" /> Sort
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button>Load More Campaigns</Button>
        </div>
      </div>
    </div>
  );
}