import React from "react";

interface ScoreMeterProps {
  score: number;
  maxScore: number;
  category: "low" | "moderate" | "high";
}

export function ScoreMeter({ score, maxScore, category }: ScoreMeterProps) {
  const percentage = (score / maxScore) * 100;
  
  const getCategoryColor = () => {
    // Determine color based on actual score percentage, not just category
    if (percentage <= 33) {
      return {
        main: "#22c55e", // green-500
        light: "rgba(34, 197, 94, 0.2)",
        track: "#1f2937", // dark bg
        text: "#22c55e",
        textDark: "#4ade80" // green-400
      };
    } else if (percentage <= 66) {
      return {
        main: "#f59e0b", // amber-500
        light: "rgba(245, 158, 11, 0.2)",
        track: "#1f2937", // dark bg
        text: "#f59e0b",
        textDark: "#fbbf24" // amber-400
      };
    } else {
      return {
        main: "#ef4444", // red-500
        light: "rgba(239, 68, 68, 0.2)",
        track: "#1f2937", // dark bg
        text: "#ef4444",
        textDark: "#f87171" // red-400
      };
    }
  };

  const colors = getCategoryColor();

  // FIXED: Adjusted needle rotation to align exactly with the filled arc
  // The needle starts at -90 degrees (straight up) and rotates clockwise
  const needleRotation = -90 + (percentage / 100) * 180; 

  // Calculate the stroke-dasharray values for the colored arc
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const arcLength = (percentage / 100) * (circumference / 2); // Half circumference = 180° arc
  const dashArray = `${arcLength}, ${circumference}`;

  return (
    <div className="w-full flex flex-col items-center space-y-6">
      {/* Half-Circular meter */}
      <div className="relative w-64 h-36 mt-8">
        {/* Background track arc - gray base */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 60">
          <path 
            d="M 10,50 a 40,40 0 0 1 80,0" 
            stroke="#374151" // gray-700
            strokeWidth="10"
            strokeLinecap="round"
            fill="none"
          />
          
          {/* Colored arc that follows the needle - only fills up to needle position */}
          <path 
            d="M 10,50 a 40,40 0 0 1 80,0" 
            stroke={colors.main}
            strokeWidth="10"
            strokeLinecap="round"
            fill="none"
            strokeDasharray={dashArray}
            strokeDashoffset="0"
          />
          
          {/* FIXED: Needle indicator - Now correctly positioned and rotated */}
          <g transform={`rotate(${needleRotation}, 50, 50)`}>
            <line
              x1="50"
              y1="50"
              x2="50"
              y2="15"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </g>
          
          {/* Needle pivot point */}
          <circle
            cx="50"
            cy="50"
            r="3"
            fill="#ffffff"
          />
        </svg>
        
        {/* Tick marks and labels */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 60">
          {/* Low section */}
          <text x="10" y="58" fill="#22c55e" fontSize="4" textAnchor="middle">0</text>
          <line x1="10" y1="50" x2="10" y2="54" stroke="#22c55e" strokeWidth="1" />
          
          {/* Moderate section */}
          <text x="50" y="5" fill="#f59e0b" fontSize="4" textAnchor="middle">{Math.floor(maxScore / 2)}</text>
          <line x1="50" y1="10" x2="50" y2="14" stroke="#f59e0b" strokeWidth="1" />
          
          {/* High section */}
          <text x="90" y="58" fill="#ef4444" fontSize="4" textAnchor="middle">{maxScore}</text>
          <line x1="90" y1="50" x2="90" y2="54" stroke="#ef4444" strokeWidth="1" />
        </svg>
      </div>
      
      {/* Score display below meter */}
      <div className="flex flex-col items-center">
        <div className="flex items-baseline">
          <span className="text-4xl font-bold print:text-black" style={{ color: colors.textDark }}>
            {score}
          </span>
          <span className="text-lg text-gray-400 dark:text-gray-400 print:text-gray-600 ml-1">/ {maxScore}</span>
        </div>
        
        {/* Category label with print styling */}
        <div className="font-semibold text-xl mt-2 print:text-black" style={{ color: colors.textDark }}>
          {category === "low" ? "Low Risk" : category === "moderate" ? "Moderate Risk" : "High Risk"}
        </div>
      </div>
      
      {/* Risk Level Indicators with print styling */}
      <div className="w-full flex justify-between px-8">
        <div className="text-xs text-green-400 print:text-green-700">Low</div>
        <div className="text-xs text-amber-400 print:text-amber-700">Moderate</div>
        <div className="text-xs text-red-400 print:text-red-700">High</div>
      </div>
    </div>
  );
}

// Linear Progress Meter with updated print styles
export function LinearScoreMeter({ score, maxScore, category }: ScoreMeterProps) {
  const percentage = (score / maxScore) * 100;
  
  // Determine color based on percentage
  const getBarColor = () => {
    if (percentage <= 33) {
      return "#22c55e"; // green-500
    } else if (percentage <= 66) {
      return "#f59e0b"; // amber-500
    } else {
      return "#ef4444"; // red-500
    }
  };
  
  const barColor = getBarColor();
  
  const textColor = category === "low" ? "#4ade80" : 
                   category === "moderate" ? "#fbbf24" : "#f87171";

  return (
    <div className="w-full space-y-3">
      <div className="flex justify-between">
        <div className="text-sm font-medium text-gray-300">Score: {score}/{maxScore}</div>
        <div className="text-sm font-medium print:text-black" style={{ color: textColor }}>
          {category === "low" ? "Low Risk" : category === "moderate" ? "Moderate Risk" : "High Risk"}
        </div>
      </div>
      
      <div className="h-4 w-full rounded-full bg-gray-800 dark:bg-gray-900 print:bg-gray-300 overflow-hidden relative">
        {/* Background color zones */}
        <div className="absolute inset-0 flex">
          <div className="h-full w-1/3 bg-green-500 opacity-10"></div>
          <div className="h-full w-1/3 bg-amber-500 opacity-10"></div>
          <div className="h-full w-1/3 bg-red-500 opacity-10"></div>
        </div>
        
        {/* Progress bar */}
        <div 
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%`, backgroundColor: barColor }}
        ></div>
        
        {/* Zone markers */}
        <div className="absolute inset-0 flex pointer-events-none">
          <div className="h-full w-1/3 border-r border-gray-600"></div>
          <div className="h-full w-1/3 border-r border-gray-600"></div>
        </div>
      </div>
      
      <div className="flex justify-between text-xs text-gray-400 print:text-gray-600">
        <div>0</div>
        <div className="text-green-400 print:text-green-700">Low Risk</div>
        <div className="text-amber-400 print:text-amber-700">Moderate Risk</div>
        <div className="text-red-400 print:text-red-700">High Risk</div>
        <div>{maxScore}</div>
      </div>
    </div>
  );
}
