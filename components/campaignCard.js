import Image from 'next/image';
import { Card, CardContent, CardFooter } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Clock, Check, BadgeCheck } from 'lucide-react';
import { useRouter } from 'next/router';

const CampaignCard = ({ campaign }) => {
  const router = useRouter();

  const truncateDescription = (text, limit = 150) => {
    if (text.length <= limit) return text;
    return text.slice(0, limit) + '...';
  };

  const getProgressColor = (raised, goal, minThreshold = 0.5) => {
    const progress = raised / goal;
    if (progress >= 1) return ['bg-green-200', 'bg-green-600'];
    if (progress >= minThreshold) return ['bg-yellow-100', 'bg-yellow-400'];
    return ['bg-red-200', 'bg-red-600'];
  };

  const minThreshold = 0.5; // 50% by default
  const minAmount = campaign.fundGoal * minThreshold;
  const [lightColor, darkColor] = getProgressColor(campaign.fundRaised, campaign.fundGoal, minThreshold);
  const progressPercentage = (campaign.fundRaised / campaign.fundGoal) * 100;

  const getRemainingText = () => {
    if (campaign.fundRaised >= campaign.fundGoal) {
      return <span><span className="font-semibold text-gray-800 dark:text-gray-200">{campaign.fundRaised - campaign.fundGoal} USDT</span> amount raised</span>;
    } else if (campaign.fundRaised >= minAmount) {
      return <span><span className="font-semibold text-gray-800 dark:text-gray-200">{campaign.fundGoal - campaign.fundRaised} USDT</span> left to meet goal</span>;
    } else {
      return <span><span className="ont-semibold text-gray-800 dark:text-gray-200">{minAmount - campaign.fundRaised} USDT</span> left to meet minimum</span>;
    }
  };

  const handleCardClick = () => {
    router.push(`/campaign/${campaign.id}`);
  };

  return (
    <Card 
      className="w-full max-w-sm overflow-hidden flex flex-col cursor-pointer transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1"
      onClick={handleCardClick}
    >
      <div className="relative h-40">
        <img
          src={`https://picsum.photos/400/300`}
          alt={campaign.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <h3 className="absolute bottom-4 left-4 text-white text-xl font-bold">
          {campaign.title}
        </h3>
      </div>
      <CardContent className="p-4 flex-grow">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={`https://i.pravatar.cc/150?u=${campaign.creator.name}`} />
              <AvatarFallback>{campaign.creator.name[0]}</AvatarFallback>
            </Avatar>
            <p className="text-sm font-medium">{campaign.creator.name}</p>
          </div>
          {campaign.creator.isVerified && (
            <Badge variant="secondary" className="text-xs bg-white text-black flex items-center space-x-1 px-2 py-1 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
  <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
</svg>

              <span>Verified</span>
            </Badge>
          )}
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {truncateDescription(campaign.description)}
        </p>
        <div className="mt-4">
          <p className="text-sm text-gray-500 mb-1">{getRemainingText()}</p>
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
            {progressPercentage < minThreshold * 100 && (
              <div 
                className="absolute text-[10px] text-gray-500 text-center"
                style={{ left: `calc(${minThreshold * 100}% - 16px)`, bottom: '-40px' }}
              >
                <div>MIN</div>
                <div>USDT {minAmount}</div>
              </div>
            )}
            {progressPercentage >= minThreshold * 100 && (
              <div 
                className={`absolute ${darkColor} rounded-full p-0.5`}
                style={{ left: `calc(${minThreshold * 100}% - 8px)`, bottom: '-30px' }}
              >
                <Check size={10} className="text-white" />
              </div>
            )}
          </div>
          <div className="flex justify-between text-sm mt-1">
            <span className="text-gray-500 flex items-center">
              <Clock size={14} className="mr-1" />
              7 days left
            </span>
            <span className={`${darkColor.replace('bg-', 'text-')} font-medium`}>{progressPercentage.toFixed(0)}%</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="mt-auto">
        <Button className="w-full">Donate Now</Button>
      </CardFooter>
    </Card>
  );
};

export default CampaignCard;
