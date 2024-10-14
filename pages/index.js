import localFont from "next/font/local";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Loader2 } from "lucide-react";
import Link from "next/link";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    projectName: "",
    projectDescription: "",
    hoursPerWeek: 40,
    bufferTime: 0,
    teamMembers: 1,
  });
  const [estimate, setEstimate] = useState(null);
  const [subtasks, setSubtasks] = useState([]);
  const [isGeneratingSubtasks, setIsGeneratingSubtasks] = useState(false);
  const [isGeneratingEstimate, setIsGeneratingEstimate] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSliderChange = (name, value) => {
    setFormData({ ...formData, [name]: value[0] });
  };

  const generateEstimate = async () => {
    setIsGeneratingEstimate(true);
    try {
      const techStackExpertise = subtasks.reduce((acc, task, index) => {
        acc[task] = formData[`group${index}`] / 10;
        return acc;
      }, {});

      const response = await fetch('/api/generate-estimate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          projectDescription: formData.projectDescription,
          techStackExpertise,
          hoursPerWeek: formData.hoursPerWeek,
          bufferTime: formData.bufferTime,
          teamMembers: formData.teamMembers,
        }),
      });
      const data = await response.json();
      const hours = data.estimatedHours;
      const days = Math.floor(hours / 8);
      const remainingHours = hours % 8;
      const perPersonHours = Math.round(hours / formData.teamMembers);
      const perPersonDays = Math.floor(perPersonHours / 8);
      const perPersonRemainingHours = perPersonHours % 8;
      setEstimate({ hours, days, remainingHours, perPersonHours, perPersonDays, perPersonRemainingHours });
      setStep(4);
    } catch (error) {
      console.error('Error generating estimate:', error);
    } finally {
      setIsGeneratingEstimate(false);
    }
  };

  const generateSubtasks = async () => {
    setIsGeneratingSubtasks(true);
    try {
      const response = await fetch('/api/generate-subtasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ projectDescription: formData.projectDescription }),
      });
      const data = await response.json();
      console.log('API Response:', data);
      setSubtasks(data.data);
      setStep(2);
    } catch (error) {
      console.error('Error generating subtasks:', error);
      console.error('Error details:', error.response);
    } finally {
      setIsGeneratingSubtasks(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                type="text"
                name="projectName"
                value={formData.projectName}
                onChange={handleInputChange}
                placeholder="Project Name"
              />
              <Textarea
                name="projectDescription"
                value={formData.projectDescription}
                onChange={handleInputChange}
                placeholder="Project Description"
                rows="4"
              />
            </CardContent>
          </>
        );
      case 2:
        return (
          <>
            <CardHeader>
              <CardTitle>Technical Expertise</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {subtasks.map((group, index) => (
                <div key={index} className="space-y-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize">
                    {group}
                  </label>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Beginner</span>
                    <span>Moderate</span>
                    <span>Expert</span>
                  </div>
                  <Slider
                    name={`group${index}`}
                    min={0}
                    max={100}
                    step={1}
                    value={[formData[`group${index}`] || 50]}
                    onValueChange={(value) => handleSliderChange(`group${index}`, value)}
                  />
                  <p className="text-sm text-muted-foreground">{formData[`group${index}`] || 50}%</p>
                </div>
              ))}
            </CardContent>
          </>
        );
      case 3:
        return (
          <>
            <CardHeader>
              <CardTitle>Time Allocation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">Hours per Week per Person</label>
                <Input
                  type="number"
                  name="hoursPerWeek"
                  value={formData.hoursPerWeek}
                  onChange={handleInputChange}
                  min={1}
                  max={168}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">Buffer Time (hours)</label>
                <Input
                  type="number"
                  name="bufferTime"
                  value={formData.bufferTime}
                  onChange={handleInputChange}
                  min={0}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">Number of Team Members</label>
                <Input
                  type="number"
                  name="teamMembers"
                  value={formData.teamMembers}
                  onChange={handleInputChange}
                  min={1}
                />
              </div>
            </CardContent>
          </>
        );
      case 4:
        return (
          <>
            <CardHeader>
              <CardTitle>Estimate Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {estimate && (
                <div className="text-center">
                  <p className="text-2xl font-bold mb-2">
                    Total estimated time: {estimate.days} days {estimate.remainingHours > 0 ? `${estimate.remainingHours} hours` : ''}
                  </p>
                  <p className="text-lg text-muted-foreground mb-4">
                    ({estimate.hours} hours)
                  </p>
                  <p className="text-xl font-bold mb-2">
                    Per person: {estimate.perPersonDays} days {estimate.perPersonRemainingHours > 0 ? `${estimate.perPersonRemainingHours} hours` : ''}
                  </p>
                  <p className="text-lg text-muted-foreground">
                    ({estimate.perPersonHours} hours)
                  </p>
                </div>
              )}
              <Progress value={(step / 4) * 100} className="w-full" />
            </CardContent>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 font-[family-name:var(--font-geist-sans)]`}
    >
      <header className="w-full text-center py-8">
        <h1 className="text-4xl font-bold mb-2">Cronus</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">An AI time estimate agent</p>
      </header>
      <main className="flex-grow flex items-center justify-center px-4">
        <Card className="w-full max-w-2xl">
          <div>
            {renderStep()}
            <CardFooter className="flex justify-between">
              {step > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(step - 1)}
                >
                  Previous
                </Button>
              )}
              {step < 4 ? (
                <Button
                  type="button"
                  onClick={() => {
                    if (step === 1) {
                      generateSubtasks();
                    } else if (step === 3) {
                      generateEstimate();
                    } else {
                      setStep(step + 1);
                    }
                  }}
                  disabled={(step === 1 && isGeneratingSubtasks) || (step === 3 && isGeneratingEstimate)}
                >
                  {step === 1 ? (
                    isGeneratingSubtasks ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      "Generate Subtasks"
                    )
                  ) : step === 3 ? (
                    isGeneratingEstimate ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Calculating...
                      </>
                    ) : (
                      "Calculate Estimate"
                    )
                  ) : (
                    "Next"
                  )}
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    setEstimate(null);
                    setSubtasks([]);
                    setFormData({
                      projectName: "",
                      projectDescription: "",
                      hoursPerWeek: 40,
                      bufferTime: 0,
                      teamMembers: 1,
                    });
                  }}
                >
                  Start Over
                </Button>
              )}
            </CardFooter>
          </div>
        </Card>
      </main>
      <footer className="w-full text-center py-4 text-sm text-gray-600 dark:text-gray-400">
        MIT Licenced. <Link href="https://github.com/mayur-samrutwar/Cronus">Github</Link>
      </footer>
    </div>
  );
}
