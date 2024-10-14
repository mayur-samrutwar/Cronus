import { useState } from 'react';
import CampaignCard from '@/components/campaignCard';
import { Button } from '@/components/ui/button';

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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Active Campaigns</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((campaign) => (
          <CampaignCard key={campaign.id} campaign={campaign} />
        ))}
      </div>
      <div className="mt-8 text-center">
        <Button>Load More Campaigns</Button>
      </div>
    </div>
  );
}