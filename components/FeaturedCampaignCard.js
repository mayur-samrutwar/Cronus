import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Check, Clock } from 'lucide-react';

const FeaturedCampaignCard = ({ campaign }) => {
  const progressPercentage = (campaign.fundRaised / campaign.fundGoal) * 100;
  const minThreshold = 0.5;
  const lightColor = 'bg-yellow-100';
  const darkColor = 'bg-yellow-400';

  return (
    <div className="w-full overflow-hidden flex flex-row cursor-pointer bg-white">
      <div className="relative w-2/3">
        <img
          src={`https://picsum.photos/800/400?random=${campaign.id}`}
          alt={campaign.title}
          className="absolute inset-0 w-full h-full object-cover rounded-2xl"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60 rounded-2xl" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-white text-xl font-bold mb-2">{campaign.title}</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className='text-sm text-white font-thin'>Organised by | </span>
              <Avatar className="w-6 h-6">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>{campaign.creator.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="text-white text-sm font-semibold">{campaign.creator.name}</span>
            </div>
            {campaign.creator.isVerified && (
              <Badge variant="secondary" className="text-xs bg-white text-black flex items-center space-x-1 px-2 py-1 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                </svg>
                <span>Verified</span>
              </Badge>
            )}
          </div>
        </div>
      </div>
      <div className="w-1/3 flex flex-col px-6">
        <div className="flex-grow">
          <div className="">
            <p className="text-sm text-gray-500 mb-1">{campaign.fundGoal - campaign.fundRaised} USDT left to meet goal</p>
            <div className="relative mb-8">
              <Progress 
                value={progressPercentage}
                className={`w-full h-2 ${lightColor}`}
              />
              <div 
                className={`absolute top-0 left-0 h-full ${darkColor}`}
                style={{ width: `${progressPercentage}%` }}
              />
              <div 
                className="absolute top-2 h-4 w-4"
                style={{ left: `calc(${minThreshold * 100}% - 8px)` }}
              >
                <div className={`w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-${lightColor}`}></div>
              </div>
              <div 
                className={`absolute ${darkColor} rounded-full p-0.5`}
                style={{ left: `calc(${minThreshold * 100}% - 8px)`, bottom: '-30px' }}
              >
                <Check size={10} className="text-white" />
              </div>
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span className="text-gray-500 flex items-center">
                <Clock size={14} className="mr-1" />
                7 days left
              </span>
              <span className={`${darkColor.replace('bg-', 'text-')} font-medium`}>{progressPercentage.toFixed(0)}%</span>
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-6">
            {campaign.description.slice(0, 200)}...
          </p>
        </div>
        <div className="mt-auto">
          <Button className="w-full mt-6">Donate Now</Button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCampaignCard;