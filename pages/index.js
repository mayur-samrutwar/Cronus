import Image from "next/image";
import localFont from "next/font/local";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

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
    frontEnd: 50,
    backEnd: 50,
    design: 50,
    ml: 50,
    hoursPerWeek: 40,
    bufferTime: 0,
  });
  const [estimate, setEstimate] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSliderChange = (name, value) => {
    setFormData({ ...formData, [name]: value[0] });
  };

  const calculateEstimate = () => {
    // More sophisticated calculation based on all inputs
    const complexity = (formData.frontEnd + formData.backEnd + formData.design + formData.ml) / 4;
    const baseHours = 100 + (complexity * 2);
    const adjustedHours = baseHours + formData.bufferTime;
    const days = Math.ceil(adjustedHours / formData.hoursPerWeek * 7);
    setEstimate({ days, hours: Math.round(adjustedHours) });
  };

  const handleSubmit = () => {
    calculateEstimate();
    setStep(4);
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
              {["frontEnd", "backEnd", "design", "ml"].map((domain) => (
                <div key={domain} className="space-y-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize">
                    {domain.replace(/([A-Z])/g, " $1").trim()}
                  </label>
                  <Slider
                    name={domain}
                    min={0}
                    max={100}
                    step={1}
                    value={[formData[domain]]}
                    onValueChange={(value) => handleSliderChange(domain, value)}
                  />
                  <p className="text-sm text-muted-foreground">{formData[domain]}%</p>
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
                <label className="text-sm font-medium leading-none">Hours per Week</label>
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
                    Estimated time: {estimate.days} days
                  </p>
                  <p className="text-lg text-muted-foreground">
                    ({estimate.hours} hours)
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
                  onClick={() => step === 3 ? handleSubmit() : setStep(step + 1)}
                >
                  {step === 3 ? "Calculate Estimate" : "Next"}
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    setEstimate(null);
                    setFormData({
                      projectName: "",
                      projectDescription: "",
                      frontEnd: 50,
                      backEnd: 50,
                      design: 50,
                      ml: 50,
                      hoursPerWeek: 40,
                      bufferTime: 0,
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
        MIT Licenced
      </footer>
    </div>
  );
}
