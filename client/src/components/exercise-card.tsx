import { useState } from "react";
import { Clock, TrendingUp, Heart, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface ExerciseCardProps {
  title: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  description: string;
  details: string[];
  imageUrl: string;
  linkUrl: string;
}

export default function ExerciseCard({
  title,
  level,
  description,
  details,
  imageUrl,
  linkUrl,
}: ExerciseCardProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  
  // Sample complete exercise plan data
  const completePlan = {
    overview: `This ${title.toLowerCase()} program is designed for ${level.toLowerCase()}-level individuals looking to improve their fitness while managing health concerns. Focus on proper form and listen to your body throughout the exercises.`,
    weeklySchedule: [
      {
        day: "Monday",
        activities: [
          { name: "Warm-up", duration: "10 min", intensity: "Low" },
          { name: title.includes("Walking") ? "Brisk Walking" : title.includes("Strength") ? "Upper Body Strength" : "Cardio Intervals", duration: "30 min", intensity: level === "Beginner" ? "Low to Moderate" : level === "Intermediate" ? "Moderate" : "High" },
          { name: "Cool-down", duration: "5 min", intensity: "Low" }
        ]
      },
      {
        day: "Tuesday",
        activities: [
          { name: "Flexibility", duration: "20 min", intensity: "Low" },
          { name: "Balance Training", duration: "15 min", intensity: "Low to Moderate" }
        ]
      },
      {
        day: "Wednesday",
        activities: [
          { name: "Warm-up", duration: "10 min", intensity: "Low" },
          { name: title.includes("Walking") ? "Interval Walking" : title.includes("Strength") ? "Lower Body Strength" : "Steady State Cardio", duration: "30 min", intensity: level === "Beginner" ? "Low to Moderate" : level === "Intermediate" ? "Moderate" : "High" },
          { name: "Cool-down", duration: "5 min", intensity: "Low" }
        ]
      },
      {
        day: "Thursday",
        activities: [
          { name: "Rest Day", duration: "N/A", intensity: "N/A" }
        ]
      },
      {
        day: "Friday",
        activities: [
          { name: "Warm-up", duration: "10 min", intensity: "Low" },
          { name: title.includes("Walking") ? "Long Duration Walk" : title.includes("Strength") ? "Full Body Strength" : "Cross-Training", duration: "40 min", intensity: level === "Beginner" ? "Low to Moderate" : level === "Intermediate" ? "Moderate" : "High" },
          { name: "Cool-down", duration: "5 min", intensity: "Low" }
        ]
      },
      {
        day: "Saturday",
        activities: [
          { name: "Flexibility & Mobility", duration: "30 min", intensity: "Low" }
        ]
      },
      {
        day: "Sunday",
        activities: [
          { name: "Rest Day", duration: "N/A", intensity: "N/A" }
        ]
      }
    ],
    precautions: [
      "Consult your healthcare provider before starting any new exercise program",
      "Monitor your heart rate during exercise and stay within recommended ranges",
      "Drink plenty of water before, during, and after exercise",
      "Stop exercising if you experience chest pain, severe shortness of breath, or dizziness",
      "Progress gradually and allow adequate recovery between sessions"
    ]
  };
  
  // Helper function to get the background color based on intensity
  const getIntensityColor = (intensity: string) => {
    if (intensity === "N/A") return 'bg-gray-100 text-gray-800';
    const lowerIntensity = intensity.toLowerCase();
    if (lowerIntensity.includes('low')) return 'bg-green-100 text-green-800';
    if (lowerIntensity.includes('moderate')) return 'bg-yellow-100 text-yellow-800';
    if (lowerIntensity.includes('high')) return 'bg-red-100 text-red-800';
    return 'bg-blue-100 text-blue-800';
  };
  
  return (
    <>
      <div className="bg-neutral-50 rounded-lg shadow-md overflow-hidden">
        <div className="h-48 overflow-hidden">
          <img 
            src={imageUrl} 
            alt={`${title} exercise plan`} 
            className="w-full object-cover" 
            width="500" 
            height="300" 
          />
        </div>
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-neutral-800">{title}</h3>
            <span className="bg-primary bg-opacity-10 text-primary text-xs font-medium px-2 py-1 rounded">
              {level}
            </span>
          </div>
          <p className="text-neutral-600 mb-4">{description}</p>
          <div className="bg-white rounded p-3 mb-4">
            <h4 className="font-medium text-neutral-700 mb-2">Program Details:</h4>
            <ul className="space-y-1 text-sm text-neutral-600">
              {details.map((detail, index) => (
                <li key={index} className="flex items-center">
                  {index === 0 ? (
                    <Clock className="h-4 w-4 text-primary mr-2" />
                  ) : index === 1 ? (
                    <TrendingUp className="h-4 w-4 text-primary mr-2" />
                  ) : (
                    <Heart className="h-4 w-4 text-primary mr-2" />
                  )}
                  {detail}
                </li>
              ))}
            </ul>
          </div>
          <Button 
            variant="link" 
            className="p-0 text-primary font-medium hover:underline"
            onClick={() => setDialogOpen(true)}
          >
            View Complete Plan →
          </Button>
        </div>
      </div>
      
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl text-primary">{title} - {level} Level</DialogTitle>
            <DialogDescription>
              A comprehensive exercise program for improving fitness and health
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 mt-4">
            <div>
              <h3 className="text-lg font-medium mb-2">Plan Overview</h3>
              <p className="text-neutral-600">{completePlan.overview}</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3">Weekly Schedule</h3>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Day</TableHead>
                      <TableHead>Activities</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {completePlan.weeklySchedule.map((day, dayIndex) => (
                      <TableRow key={dayIndex}>
                        <TableCell className="font-medium">{day.day}</TableCell>
                        <TableCell>
                          <div className="space-y-2">
                            {day.activities.map((activity, activityIndex) => (
                              <div key={activityIndex} className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
                                <span className="font-medium">{activity.name}</span>
                                <div className="flex flex-wrap gap-2">
                                  <span className="text-xs rounded-full bg-neutral-100 px-2 py-1">
                                    {activity.duration}
                                  </span>
                                  <span className={`text-xs rounded-full px-2 py-1 ${getIntensityColor(activity.intensity)}`}>
                                    {activity.intensity}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
            
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
                <div>
                  <h4 className="text-md font-medium mb-2 text-neutral-800">Important Health Precautions</h4>
                  <ul className="space-y-1 text-sm text-neutral-600 list-disc list-inside">
                    {completePlan.precautions.map((precaution, index) => (
                      <li key={index}>{precaution}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="mt-4 text-center">
              <DialogClose asChild>
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                  Close
                </Button>
              </DialogClose>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
