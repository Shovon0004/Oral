"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, AlertTriangle, CheckCircle2, Download, Loader2, Printer } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { toast } from "@/components/ui/use-toast"
import { ScoreMeter, LinearScoreMeter } from "@/components/score-meter"
import { jsPDF } from "jspdf"
import "jspdf-autotable"

export default function AssessmentForm() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("tobacco")
  const [formData, setFormData] = useState({
    // Tobacco Smoker
    isTobaccoSmoker: "no",
    tobaccoSmokerDuration: "",
    tobaccoSmokerFrequency: "",

    // Smokeless Tobacco
    isSmokelessTobacco: "no",
    smokelessTobaccoDuration: "",
    smokelessTobaccoFrequency: "",

    // Betel quid/Paan masala
    isBetelQuid: "no",
    betelQuidFrequency: "",

    // Betel nut
    isBetelNut: "no",

    // Alcohol
    isAlcohol: "no",

    // Malnourished
    isMalnourished: "no",

    // Precancerous lesions
    hasOralLichenPlanus: "no",
    hasErythroplakiaLeukoplakia: "no",
    hasOSMF: "no",
    hasNonHealedUlcers: "no",

    // Family history
    hasMother: "no",
    hasMaternalGrandparents: "no",
    hasOtherMaternalRelatives: "no",
    hasFather: "no",
    hasPaternalGrandparents: "no",
    hasOtherPaternalRelatives: "no",

    // Infection or immunosuppression
    hasHPV: "no",
    hasHIV: "no",
    hasCMV: "no",
    hasEBV: "no",
    hasSyphilis: "no",
    hasDiabetes: "no",
    isOnSteroidTherapy: "no",
    hasCandidiasis: "no",

    // Chronic irritation
    hasUlcers: "no",
    hasDentureIrritation: "no",
    hasRootStumps: "no",

    // History of cancer
    hasCancerHistory: "no",

    // UV Radiation exposure
    hasUVExposure: "no",

    // Chemical industry
    isChemicalIndustryExposed: "no",
  })

  const [userDetails, setUserDetails] = useState(null)
  const [showResults, setShowResults] = useState(false)
  const [totalScore, setTotalScore] = useState(0)
  const [isCalculating, setIsCalculating] = useState(false)
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)

  useEffect(() => {
    // Check if user details exist in localStorage
    const storedUserDetails = localStorage.getItem("userDetails")
    if (!storedUserDetails) {
      toast({
        title: "Registration required",
        description: "Please register before taking the assessment.",
        variant: "destructive",
      })
      router.push("/register")
      return
    }

    setUserDetails(JSON.parse(storedUserDetails))
  }, [router])

  const handleRadioChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    })
  }

  const calculateScore = () => {
    setIsCalculating(true)
    let score = 0

    // Tobacco Smoker
    if (formData.isTobaccoSmoker === "yes") {
      // Duration
      if (formData.tobaccoSmokerDuration === "less5") score += 1
      else if (formData.tobaccoSmokerDuration === "5to10") score += 2
      else if (formData.tobaccoSmokerDuration === "more10") score += 3

      // Frequency
      if (formData.tobaccoSmokerFrequency === "less3") score += 1
      else if (formData.tobaccoSmokerFrequency === "3to6") score += 2
      else if (formData.tobaccoSmokerFrequency === "more6") score += 3
    }

    // Smokeless Tobacco
    if (formData.isSmokelessTobacco === "yes") {
      // Duration
      if (formData.smokelessTobaccoDuration === "less5") score += 1
      else if (formData.smokelessTobaccoDuration === "5to10") score += 2
      else if (formData.smokelessTobaccoDuration === "more10") score += 3

      // Frequency
      if (formData.smokelessTobaccoFrequency === "less2") score += 1
      else if (formData.smokelessTobaccoFrequency === "2to4") score += 2
      else if (formData.smokelessTobaccoFrequency === "more4") score += 3
    }

    // Betel quid/Paan masala
    if (formData.isBetelQuid === "yes") {
      if (formData.betelQuidFrequency === "less2") score += 1
      else if (formData.betelQuidFrequency === "more2") score += 2
    }

    // Betel nut
    if (formData.isBetelNut === "yes") score += 1

    // Alcohol
    if (formData.isAlcohol === "occasional") score += 1
    else if (formData.isAlcohol === "regular") score += 2
    else if (formData.isAlcohol === "withOtherHabits") score += 3

    // Malnourished
    if (formData.isMalnourished === "yes") score += 1

    // Precancerous lesions
    if (formData.hasOralLichenPlanus === "yes") score += 1
    if (formData.hasErythroplakiaLeukoplakia === "yes") score += 2
    if (formData.hasOSMF === "yes") score += 2
    if (formData.hasNonHealedUlcers === "yes") score += 2

    // Family history
    if (formData.hasMother === "yes") score += 1
    if (formData.hasMaternalGrandparents === "yes") score += 1
    if (formData.hasOtherMaternalRelatives === "yes") score += 1
    if (formData.hasFather === "yes") score += 1
    if (formData.hasPaternalGrandparents === "yes") score += 1
    if (formData.hasOtherPaternalRelatives === "yes") score += 1

    // Infection or immunosuppression
    if (formData.hasHPV === "yes") score += 1
    if (formData.hasHIV === "yes") score += 1
    if (formData.hasCMV === "yes") score += 1
    if (formData.hasEBV === "yes") score += 1
    if (formData.hasSyphilis === "yes") score += 1
    if (formData.hasDiabetes === "yes") score += 1
    if (formData.isOnSteroidTherapy === "yes") score += 1
    if (formData.hasCandidiasis === "yes") score += 1

    // Chronic irritation
    if (formData.hasUlcers === "yes") score += 1
    if (formData.hasDentureIrritation === "yes") score += 1
    if (formData.hasRootStumps === "yes") score += 1

    // History of cancer
    if (formData.hasCancerHistory === "yes") score += 2

    // UV Radiation exposure
    if (formData.hasUVExposure === "regular") score += 1

    // Chemical industry
    if (formData.isChemicalIndustryExposed === "yes") score += 1

    // Cap the score at the maximum of 42
    score = Math.min(score, 42)

    // Save assessment data to localStorage
    localStorage.setItem("assessmentData", JSON.stringify(formData))
    localStorage.setItem("assessmentScore", score.toString())

    // Simulate API call
    setTimeout(() => {
      setTotalScore(score)
      setShowResults(true)
      setIsCalculating(false)
    }, 1500)
  }

  const handleNextTab = () => {
    if (activeTab === "tobacco") setActiveTab("habits")
    else if (activeTab === "habits") setActiveTab("medical")
    else if (activeTab === "medical") setActiveTab("family")
    else if (activeTab === "family") setActiveTab("other")
    else if (activeTab === "other") calculateScore()
  }

  const handlePrevTab = () => {
    if (activeTab === "habits") setActiveTab("tobacco")
    else if (activeTab === "medical") setActiveTab("habits")
    else if (activeTab === "family") setActiveTab("medical")
    else if (activeTab === "other") setActiveTab("family")
  }

  const resetForm = () => {
    setFormData({
      // Tobacco Smoker
      isTobaccoSmoker: "no",
      tobaccoSmokerDuration: "",
      tobaccoSmokerFrequency: "",

      // Smokeless Tobacco
      isSmokelessTobacco: "no",
      smokelessTobaccoDuration: "",
      smokelessTobaccoFrequency: "",

      // Betel quid/Paan masala
      isBetelQuid: "no",
      betelQuidFrequency: "",

      // Betel nut
      isBetelNut: "no",

      // Alcohol
      isAlcohol: "no",

      // Malnourished
      isMalnourished: "no",

      // Precancerous lesions
      hasOralLichenPlanus: "no",
      hasErythroplakiaLeukoplakia: "no",
      hasOSMF: "no",
      hasNonHealedUlcers: "no",

      // Family history
      hasMother: "no",
      hasMaternalGrandparents: "no",
      hasOtherMaternalRelatives: "no",
      hasFather: "no",
      hasPaternalGrandparents: "no",
      hasOtherPaternalRelatives: "no",

      // Infection or immunosuppression
      hasHPV: "no",
      hasHIV: "no",
      hasCMV: "no",
      hasEBV: "no",
      hasSyphilis: "no",
      hasDiabetes: "no",
      isOnSteroidTherapy: "no",
      hasCandidiasis: "no",

      // Chronic irritation
      hasUlcers: "no",
      hasDentureIrritation: "no",
      hasRootStumps: "no",

      // History of cancer
      hasCancerHistory: "no",

      // UV Radiation exposure
      hasUVExposure: "no",

      // Chemical industry
      isChemicalIndustryExposed: "no",
    })
    setShowResults(false)
    setActiveTab("tobacco")
  }

  const getRiskCategory = () => {
    if (totalScore >= 0 && totalScore <= 14) return "LOW"
    if (totalScore >= 15 && totalScore <= 28) return "MODERATE"
    return "HIGH"
  }

  const getRiskColor = () => {
    const category = getRiskCategory()
    if (category === "LOW") return "bg-green-500"
    if (category === "MODERATE") return "bg-yellow-500"
    return "bg-red-500"
  }

  const getRecommendations = () => {
    const category = getRiskCategory()

    if (category === "LOW") {
      return (
        <Alert className="mt-6 border-green-500 bg-green-50 dark:bg-green-950/30 print:bg-white print:border-green-500">
          <CheckCircle2 className="h-5 w-5 text-green-500" />
          <AlertTitle className="text-green-700 dark:text-green-400 text-lg font-medium print:text-green-700">Low Risk (0-14)</AlertTitle>
          <AlertDescription className="text-green-700 dark:text-green-400 print:text-green-700">
            <p className="mb-2">You are at low risk for developing oral cancer. However, it's still important to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Maintain good oral hygiene</li>
              <li>Visit a dentist regularly for check-ups</li>
              <li>Be aware of any family history factors</li>
              <li>Avoid starting tobacco or alcohol use</li>
            </ul>
          </AlertDescription>
        </Alert>
      )
    }

    if (category === "MODERATE") {
      return (
        <Alert className="mt-6 border-yellow-500 bg-yellow-50 dark:bg-yellow-950/30 print:bg-white print:border-yellow-500">
          <AlertTriangle className="h-5 w-5 text-yellow-500" />
          <AlertTitle className="text-yellow-700 dark:text-yellow-400 text-lg font-medium print:text-yellow-700">
            Moderate Risk (15-28)
          </AlertTitle>
          <AlertDescription className="text-yellow-700 dark:text-yellow-400 print:text-yellow-700">
            <p className="mb-2">You are at moderate risk for developing oral cancer. It's recommended that you:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Consult with a healthcare professional</li>
              <li>Consider quitting tobacco and reducing alcohol consumption</li>
              <li>Have regular oral examinations</li>
              <li>Monitor for any suspicious lesions in your oral cavity</li>
              <li>If you have persistent lesions for more than 2 weeks, seek professional evaluation</li>
            </ul>
          </AlertDescription>
        </Alert>
      )
    }

    return (
      <Alert className="mt-6 border-red-500 bg-red-50 dark:bg-red-950/30 print:bg-white print:border-red-500">
        <AlertCircle className="h-5 w-5 text-red-500" />
        <AlertTitle className="text-red-700 dark:text-red-400 text-lg font-medium print:text-red-700">High Risk (29-42)</AlertTitle>
        <AlertDescription className="text-red-700 dark:text-red-400 print:text-red-700">
          <p className="mb-2">You are at high risk for developing oral cancer. It's strongly recommended that you:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Seek immediate consultation with a healthcare professional</li>
            <li>Stop all tobacco and alcohol use</li>
            <li>Undergo a thorough oral examination</li>
            <li>Consider regular screening and follow-up</li>
            <li>Make significant lifestyle changes to reduce your risk</li>
            <li>For any suspicious lesions, histopathological examination should be done in the early stage</li>
          </ul>
        </AlertDescription>
      </Alert>
    )
  }

  const generatePDF = () => {
    if (!userDetails) return

    setIsGeneratingPDF(true)

    setTimeout(() => {
      try {
        // Get the report ID and date from localStorage to ensure consistency with print
        const reportId = localStorage.getItem("reportId") || Math.random().toString(36).substring(2, 10).toUpperCase();
        if (!localStorage.getItem("reportId")) localStorage.setItem("reportId", reportId);
        
        const reportDate = localStorage.getItem("reportDate") || new Date().toLocaleDateString();
        if (!localStorage.getItem("reportDate")) localStorage.setItem("reportDate", reportDate);
        
        const doc = new jsPDF();
        const riskCategory = getRiskCategory().toLowerCase();
        
        // Add white background for the entire page
        doc.setFillColor(255, 255, 255);
        doc.rect(0, 0, 210, 297, "F");

        // Add header with more compact layout
        doc.setFillColor(248, 250, 252);
        doc.rect(0, 0, 210, 25, "F");
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(16);
        doc.text("Indian Oral Cancer Risk Assessment Report", 105, 10, { align: "center" });
        
        doc.setFontSize(10);
        doc.setTextColor(100, 116, 139);
        doc.text("Based on the Indian Oral Cancer Risk Score and Index", 105, 18, { align: "center" });

        // Make personal information more compact
        doc.setFillColor(248, 250, 252);
        doc.rect(10, 30, 190, 40, "F");
        doc.setDrawColor(226, 232, 240);
        doc.rect(10, 30, 190, 40, "S");

        doc.setTextColor(0, 0, 0);
        doc.setFontSize(12);
        doc.text("Personal Information", 15, 38);

        // Create a more compact 2-column layout for personal information
        doc.setFontSize(9);
        
        // Left column
        doc.setTextColor(71, 85, 105);
        doc.text("Name:", 15, 47);
        doc.text("Age:", 15, 54);
        doc.text("Email:", 15, 61);
        
        doc.setTextColor(0, 0, 0);
        doc.text(userDetails.fullName, 40, 47);
        doc.text(userDetails.age.toString(), 40, 54);
        doc.text(userDetails.email || "Not provided", 40, 61);
        
        // Right column
        doc.setTextColor(71, 85, 105);
        doc.text("Gender:", 110, 47);
        doc.text("Contact:", 110, 54);
        
        if (userDetails.address) {
          doc.text("Address:", 110, 61);
        }
        
        doc.setTextColor(0, 0, 0);
        doc.text(userDetails.gender.charAt(0).toUpperCase() + userDetails.gender.slice(1), 140, 47);
        doc.text(userDetails.phone, 140, 54);
        
        if (userDetails.address) {
          let addressText = userDetails.address;
          if (userDetails.city) addressText += ', ' + userDetails.city;
          if (userDetails.state) addressText += ', ' + userDetails.state;
          // Truncate address if too long
          if (addressText.length > 40) {
            addressText = addressText.substring(0, 37) + '...';
          }
          doc.text(addressText, 140, 61);
        }

        // Score section with more compact layout
        // Determine color based on risk level
        let arcColor;
        if (riskCategory === "low") {
          arcColor = [34, 197, 94]; // green-500
        } else if (riskCategory === "moderate") {
          arcColor = [245, 158, 11]; // amber-500
        } else {
          arcColor = [239, 68, 68]; // red-500
        }

        // Create a more compact layout with side-by-side meters
        const percentage = Math.min(totalScore / 42, 1);
        
        // Add score circle (smaller)
        const circleX = 50;
        const circleY = 95;
        const radius = 20;

        // Background circle
        doc.setFillColor(248, 250, 252);
        doc.circle(circleX, circleY, radius, 'F');
        doc.setDrawColor(226, 232, 240);
        doc.circle(circleX, circleY, radius, 'S');
        
        // Draw the progress arc
        doc.setDrawColor(arcColor[0], arcColor[1], arcColor[2]);
        doc.setLineWidth(4);
        
        // Draw arc with small line segments
        const startAngle = -90;
        const endAngle = startAngle + (percentage * 360);
        
        for (let i = startAngle; i <= endAngle; i += 5) {
          const rads = i * (Math.PI / 180);
          const x = circleX + Math.cos(rads) * radius;
          const y = circleY + Math.sin(rads) * radius;
          
          if (i === startAngle) {
            doc.setDrawColor(arcColor[0], arcColor[1], arcColor[2]);
            doc.setLineWidth(4);
            doc.line(x, y, x, y);
          } else {
            const prevRads = (i - 5) * (Math.PI / 180);
            const prevX = circleX + Math.cos(prevRads) * radius;
            const prevY = circleY + Math.sin(prevRads) * radius;
            doc.line(prevX, prevY, x, y);
          }
        }
        
        // Score in center
        doc.setFontSize(16);
        doc.setTextColor(arcColor[0], arcColor[1], arcColor[2]);
        doc.text(totalScore.toString(), circleX, circleY + 4, { align: "center" });
        
        doc.setFontSize(8);
        doc.setTextColor(100, 116, 139);
        doc.text("out of 42", circleX, circleY + 12, { align: "center" });

        // Add risk category
        doc.setFontSize(14);
        doc.setTextColor(arcColor[0], arcColor[1], arcColor[2]);
        doc.text(getRiskCategory(), 50, 125, { align: "center" });
        doc.setFontSize(10);
        doc.text("RISK", 50, 135, { align: "center" });

        // Add horizontal score bar (more compact)
        const barY = 95;
        doc.setFillColor(226, 232, 240);
        doc.roundedRect(100, barY - 5, 90, 4, 2, 2, 'F');
        
        // Progress on the bar
        doc.setFillColor(arcColor[0], arcColor[1], arcColor[2]);
        if (percentage > 0) {
          const progressWidth = Math.max(90 * percentage, 2);
          doc.roundedRect(100, barY - 5, progressWidth, 4, 2, 2, 'F');
        }
        
        // Risk text
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text("Risk Score: " + totalScore + "/42", 145, 105, { align: "center" });
        
        // Bar labels with readable colors (smaller font)
        doc.setFontSize(7);
        doc.setTextColor(34, 197, 94);
        doc.text("Low", 110, barY + 8);
        
        doc.setTextColor(245, 158, 11);
        doc.text("Moderate", 145, barY + 8, { align: "center" });
        
        doc.setTextColor(239, 68, 68);
        doc.text("High", 180, barY + 8);
        
        doc.setTextColor(100, 116, 139);
        doc.text("0", 100, barY + 8);
        doc.text("42", 190, barY + 8);

        // Add recommendations section (more compact)
        doc.setFillColor(248, 250, 252);
        doc.rect(10, 145, 190, 110, "F");
        doc.setDrawColor(226, 232, 240);
        doc.rect(10, 145, 190, 110, "S");
        
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(12);
        doc.text("Recommendations", 15, 155);
        
        doc.setFontSize(9);
        const lineHeight = 8;
        let startY = 165;
        
        if (riskCategory === "low") {
          doc.setTextColor(34, 197, 94);
          doc.text("Low Risk (0-14)", 15, startY);
          doc.setTextColor(0, 0, 0);
          doc.setFontSize(8);
          doc.text("You are at low risk for developing oral cancer. However, it's still important to:", 15, startY + lineHeight);
          
          const bullets = [
            "• Maintain good oral hygiene",
            "• Visit a dentist regularly for check-ups",
            "• Be aware of any family history factors",
            "• Avoid starting tobacco or alcohol use"
          ];
          
          bullets.forEach((bullet, index) => {
            doc.text(bullet, 20, startY + (lineHeight * 2) + (index * lineHeight));
          });
        } else if (riskCategory === "moderate") {
          doc.setTextColor(245, 158, 11);
          doc.text("Moderate Risk (15-28)", 15, startY);
          doc.setTextColor(0, 0, 0);
          doc.setFontSize(8);
          doc.text("You are at moderate risk for developing oral cancer. It's recommended that you:", 15, startY + lineHeight);
          
          const bullets = [
            "• Consult with a healthcare professional",
            "• Consider quitting tobacco and reducing alcohol consumption",
            "• Have regular oral examinations",
            "• Monitor for any suspicious lesions in your oral cavity",
            "• If you have persistent lesions for more than 2 weeks, seek professional evaluation"
          ];
          
          bullets.forEach((bullet, index) => {
            doc.text(bullet, 20, startY + (lineHeight * 2) + (index * lineHeight));
          });
        } else {
          doc.setTextColor(239, 68, 68);
          doc.text("High Risk (29-42)", 15, startY);
          doc.setTextColor(0, 0, 0);
          doc.setFontSize(8);
          doc.text("You are at high risk for developing oral cancer. It's strongly recommended that you:", 15, startY + lineHeight);
          
          const bullets = [
            "• Seek immediate consultation with a healthcare professional",
            "• Stop all tobacco and alcohol use",
            "• Undergo a thorough oral examination",
            "• Consider regular screening and follow-up",
            "• Make significant lifestyle changes to reduce your risk",
            "• For any suspicious lesions, histopathological examination should be done in the early stage"
          ];
          
          bullets.forEach((bullet, index) => {
            doc.text(bullet, 20, startY + (lineHeight * 2) + (index * lineHeight));
          });
        }

        // Add disclaimer and footer
        doc.setFillColor(248, 250, 252);
        doc.rect(10, 260, 190, 20, "F");
        doc.setDrawColor(226, 232, 240);
        doc.rect(10, 260, 190, 20, "S");
        
        doc.setTextColor(100, 116, 139);
        doc.setFontSize(7);
        doc.text("DISCLAIMER: This assessment is based on the Indian Oral Cancer Risk Score and Index. It is for educational purposes only", 105, 267, { align: "center" });
        doc.text("and does not replace professional medical advice. Please consult with a healthcare professional for proper diagnosis and treatment.", 105, 273, { align: "center" });
        doc.setFontSize(7);
        doc.text("Report Date: " + reportDate + " | Report ID: " + reportId, 105, 279, { align: "center" });

        // Save the PDF with a meaningful name
        doc.save(`Oral_Cancer_Risk_Report_${userDetails.fullName.replace(/\s+/g, "_")}_${totalScore}.pdf`);

        toast({
          title: "Report generated",
          description: "Your assessment report has been downloaded successfully.",
        });
      } catch (error) {
        console.error("Error generating PDF:", error);
        toast({
          title: "Error generating report",
          description: "There was an error generating your report. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsGeneratingPDF(false);
      }
    }, 1500);
  }

  const getProgressPercentage = () => {
    if (activeTab === "tobacco") return 20
    if (activeTab === "habits") return 40
    if (activeTab === "medical") return 60
    if (activeTab === "family") return 80
    return 100
  }

  if (showResults) {
    const riskCategory = getRiskCategory().toLowerCase();
    const categoryMapping = {
      "LOW": "low",
      "MODERATE": "moderate",
      "HIGH": "high"
    }
    
    // Generate reportId and date for print version if not already in localStorage
    const reportId = localStorage.getItem("reportId") || Math.random().toString(36).substring(2, 10).toUpperCase();
    if (!localStorage.getItem("reportId")) localStorage.setItem("reportId", reportId);
    
    const reportDate = localStorage.getItem("reportDate") || new Date().toLocaleDateString();
    if (!localStorage.getItem("reportDate")) localStorage.setItem("reportDate", reportDate);
    
    return (
      <div className="space-y-6 print:bg-white print:text-black print-container" data-report-date={reportDate} data-report-id={reportId}>
        {/* Report header - visible only in print */}
        <div className="hidden print:block text-center mb-6 print-section">
          <h1 className="text-2xl font-bold">Indian Oral Cancer Risk Assessment Report</h1>
          <p className="text-sm text-gray-600">Based on the Indian Oral Cancer Risk Score and Index</p>
        </div>
        
        <div className="bg-gray-900 dark:bg-gray-900 text-white rounded-lg p-8 shadow-lg print:shadow-none print:bg-white print:p-0">
          {/* On-screen header - hidden in print */}
          <div className="text-center mb-6 print:hidden">
            <h2 className="text-3xl font-bold mb-2 text-white">Indian Oral Cancer Risk Assessment Report</h2>
            <p className="text-gray-400">Based on the Indian Oral Cancer Risk Score and Index</p>
          </div>

          {userDetails && (
            <div className="mb-6 p-5 bg-gray-800 dark:bg-gray-800 rounded-lg shadow-sm print:bg-gray-50 print:border print:border-gray-200 print:p-3 print-section">
              <h3 className="font-medium text-lg mb-4 text-white print:text-black print:mb-2">Personal Information</h3>
              {/* Two-column layout for personal info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm print:grid print:grid-cols-2 print:gap-2">
                <div className="flex">
                  <span className="font-medium text-gray-400 w-24 print:text-gray-600">Name:</span> 
                  <span className="text-white print:text-black">{userDetails.fullName}</span>
                </div>
                <div className="flex">
                  <span className="font-medium text-gray-400 w-24 print:text-gray-600">Gender:</span> 
                  <span className="text-white print:text-black">{userDetails.gender.charAt(0).toUpperCase() + userDetails.gender.slice(1)}</span>
                </div>
                <div className="flex">
                  <span className="font-medium text-gray-400 w-24 print:text-gray-600">Age:</span> 
                  <span className="text-white print:text-black">{userDetails.age}</span>
                </div>
                <div className="flex">
                  <span className="font-medium text-gray-400 w-24 print:text-gray-600">Contact:</span> 
                  <span className="text-white print:text-black">{userDetails.phone}</span>
                </div>
                <div className="flex">
                  <span className="font-medium text-gray-400 w-24 print:text-gray-600">Email:</span> 
                  <span className="text-white print:text-black">{userDetails.email || "Not provided"}</span>
                </div>
                {userDetails.address && (
                  <div className="flex col-span-1 md:col-span-2 print:col-span-2">
                    <span className="font-medium text-gray-400 w-24 print:text-gray-600">Address:</span> 
                    <span className="text-white print:text-black">
                      {userDetails.address}
                      {userDetails.city ? ', ' + userDetails.city : ''}
                      {userDetails.state ? ', ' + userDetails.state : ''}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Assessment Results Section - side-by-side meters */}
          <div className="mb-6 p-5 bg-gray-800 dark:bg-gray-800 rounded-lg shadow-sm print:bg-gray-50 print:border print:border-gray-200 print:p-3 print-section">
            <h3 className="font-medium text-lg mb-4 text-white print:text-black print:mb-2">Assessment Results</h3>
            
            {/* Side-by-side layout for score visualization */}
            <div className="flex flex-col md:flex-row items-center justify-around print:flex print:flex-row">
              {/* Left side: Circular meter */}
              <div className="mb-6 md:mb-0 print:mb-0 print:transform print:scale-75">
                <div className="flex flex-col items-center">
                  <ScoreMeter 
                    score={totalScore} 
                    maxScore={42} 
                    category={categoryMapping[getRiskCategory()]}
                  />
                  <div className="mt-3 text-xl font-bold text-white print:text-black">
                    {getRiskCategory()} RISK
                  </div>
                </div>
              </div>
              
              {/* Right side: Linear meter and score */}
              <div className="w-full md:w-1/2 print:w-1/2">
                <div className="text-center mb-4">
                  <div className="text-xl font-bold text-white print:text-black">
                    Risk Score: {totalScore}/42
                  </div>
                </div>
                <div className="print:transform print:scale-90">
                  <LinearScoreMeter 
                    score={totalScore} 
                    maxScore={42} 
                    category={categoryMapping[getRiskCategory()]}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Recommendations Section - improved appearance */}
          <div className="mb-6 p-5 bg-gray-800 dark:bg-gray-800 rounded-lg shadow-sm print:bg-gray-50 print:border print:border-gray-200 print:p-3 print-section">
            <h3 className="font-medium text-lg mb-4 text-white print:text-black print:mb-2">Recommendations</h3>
            <div className={`print:bg-white print:text-black ${
              riskCategory === "low" ? "alert-green" : 
              riskCategory === "moderate" ? "alert-yellow" : "alert-red"
            }`}>
              {getRecommendations()}
            </div>
          </div>
          
          {/* Disclaimer and Report Info - visible in both screen and print */}
          <div className="p-4 mt-6 bg-gray-800 dark:bg-gray-800 rounded-lg text-sm text-gray-400 print:text-gray-600 print:border print:border-gray-200 print:bg-gray-50 print:p-3 print-section">
            <p>DISCLAIMER: This assessment is based on the Indian Oral Cancer Risk Score and Index. It is for educational purposes only and 
            does not replace professional medical advice. Please consult with a healthcare professional for proper diagnosis and treatment.</p>
            
            <div className="flex justify-between mt-4 text-sm text-gray-400 print:text-gray-600">
              <div>Report Date: {reportDate}</div>
              <div>Report ID: {reportId}</div>
            </div>
          </div>
        </div>

        {/* Actions Buttons - hidden in print */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 print:hidden">
          <Button variant="outline" onClick={resetForm} className="order-2 sm:order-1 bg-transparent border-gray-600 text-red hover:bg-gray-800">
            Start New Assessment
          </Button>

          <div className="flex gap-2 order-1 sm:order-2">
            <Button 
              onClick={() => {
                // Set a print flag in localStorage
                localStorage.setItem("isPrinting", "true");
                window.print();
                // Remove the flag after printing
                setTimeout(() => localStorage.removeItem("isPrinting"), 1000);
              }} 
              variant="secondary" 
              className="flex-1 sm:flex-none"
            >
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>

            <Button
              onClick={generatePDF}
              className="bg-red-600 hover:bg-red-700 flex-1 sm:flex-none"
              disabled={isGeneratingPDF}
            >
              {isGeneratingPDF ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Download Report
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="w-full bg-muted rounded-full h-2 mb-6">
        <div
          className="bg-red-600 h-2 rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${getProgressPercentage()}%` }}
        ></div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5 mb-6">
          <TabsTrigger value="tobacco">Tobacco</TabsTrigger>
          <TabsTrigger value="habits">Other Habits</TabsTrigger>
          <TabsTrigger value="medical">Medical</TabsTrigger>
          <TabsTrigger value="family">Family History</TabsTrigger>
          <TabsTrigger value="other">Other Factors</TabsTrigger>
        </TabsList>

        <TabsContent value="tobacco" className="space-y-6 animate-in fade-in-50">
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Tobacco Smoking</h3>

            <Card className="border-l-4 border-l-red-200 dark:border-l-red-800">
              <CardContent className="pt-6">
                <div>
                  <p className="mb-2 text-sm">Do you smoke tobacco (cigarettes, bidis, etc.)?</p>
                  <RadioGroup
                    value={formData.isTobaccoSmoker}
                    onValueChange={(value) => handleRadioChange("isTobaccoSmoker", value)}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="tobacco-yes" />
                      <Label htmlFor="tobacco-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="tobacco-no" />
                      <Label htmlFor="tobacco-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>

                {formData.isTobaccoSmoker === "yes" && (
                  <div className="mt-4 space-y-4 animate-in fade-in-50">
                    <div>
                      <p className="mb-2 text-sm">For how long have you been smoking?</p>
                      <RadioGroup
                        value={formData.tobaccoSmokerDuration}
                        onValueChange={(value) => handleRadioChange("tobaccoSmokerDuration", value)}
                        className="flex flex-col space-y-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="less5" id="tobacco-duration-less5" />
                          <Label htmlFor="tobacco-duration-less5">Less than 5 years</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="5to10" id="tobacco-duration-5to10" />
                          <Label htmlFor="tobacco-duration-5to10">5 to 10 years</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="more10" id="tobacco-duration-more10" />
                          <Label htmlFor="tobacco-duration-more10">More than 10 years</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div>
                      <p className="mb-2 text-sm">How many times do you smoke per day?</p>
                      <RadioGroup
                        value={formData.tobaccoSmokerFrequency}
                        onValueChange={(value) => handleRadioChange("tobaccoSmokerFrequency", value)}
                        className="flex flex-col space-y-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="less3" id="tobacco-freq-less3" />
                          <Label htmlFor="tobacco-freq-less3">Less than 3 times</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="3to6" id="tobacco-freq-3to6" />
                          <Label htmlFor="tobacco-freq-3to6">3 to 6 times</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="more6" id="tobacco-freq-more6" />
                          <Label htmlFor="tobacco-freq-more6">More than 6 times</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Separator />

            <h3 className="font-medium text-lg">Smokeless Tobacco</h3>

            <Card className="border-l-4 border-l-red-200 dark:border-l-red-800">
              <CardContent className="pt-6">
                <div>
                  <p className="mb-2 text-sm">Do you use smokeless tobacco (chewing tobacco, gutka, etc.)?</p>
                  <RadioGroup
                    value={formData.isSmokelessTobacco}
                    onValueChange={(value) => handleRadioChange("isSmokelessTobacco", value)}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="smokeless-yes" />
                      <Label htmlFor="smokeless-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="smokeless-no" />
                      <Label htmlFor="smokeless-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>

                {formData.isSmokelessTobacco === "yes" && (
                  <div className="mt-4 space-y-4 animate-in fade-in-50">
                    <div>
                      <p className="mb-2 text-sm">For how long have you been using smokeless tobacco?</p>
                      <RadioGroup
                        value={formData.smokelessTobaccoDuration}
                        onValueChange={(value) => handleRadioChange("smokelessTobaccoDuration", value)}
                        className="flex flex-col space-y-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="less5" id="smokeless-duration-less5" />
                          <Label htmlFor="smokeless-duration-less5">Less than 5 years</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="5to10" id="smokeless-duration-5to10" />
                          <Label htmlFor="smokeless-duration-5to10">5 to 10 years</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="more10" id="smokeless-duration-more10" />
                          <Label htmlFor="smokeless-duration-more10">More than 10 years</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div>
                      <p className="mb-2 text-sm">How many times do you use smokeless tobacco per day?</p>
                      <RadioGroup
                        value={formData.smokelessTobaccoFrequency}
                        onValueChange={(value) => handleRadioChange("smokelessTobaccoFrequency", value)}
                        className="flex flex-col space-y-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="less2" id="smokeless-freq-less2" />
                          <Label htmlFor="smokeless-freq-less2">Less than 2 times</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="2to4" id="smokeless-freq-2to4" />
                          <Label htmlFor="smokeless-freq-2to4">2 to 4 times</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="more4" id="smokeless-freq-more4" />
                          <Label htmlFor="smokeless-freq-more4">More than 4 times</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="habits" className="space-y-6 animate-in fade-in-50">
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Betel Quid / Paan Masala</h3>

            <Card className="border-l-4 border-l-amber-200 dark:border-l-amber-800">
              <CardContent className="pt-6">
                <div>
                  <p className="mb-2 text-sm">Do you chew betel quid or paan masala?</p>
                  <RadioGroup
                    value={formData.isBetelQuid}
                    onValueChange={(value) => handleRadioChange("isBetelQuid", value)}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="betel-quid-yes" />
                      <Label htmlFor="betel-quid-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="betel-quid-no" />
                      <Label htmlFor="betel-quid-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>

                {formData.isBetelQuid === "yes" && (
                  <div className="mt-4 animate-in fade-in-50">
                    <p className="mb-2 text-sm">How many times do you chew per day?</p>
                    <RadioGroup
                      value={formData.betelQuidFrequency}
                      onValueChange={(value) => handleRadioChange("betelQuidFrequency", value)}
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="less2" id="betel-quid-freq-less2" />
                        <Label htmlFor="betel-quid-freq-less2">Less than 2 times</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="more2" id="betel-quid-freq-more2" />
                        <Label htmlFor="betel-quid-freq-more2">More than 2 times</Label>
                      </div>
                    </RadioGroup>
                  </div>
                )}
              </CardContent>
            </Card>

            <Separator />

            <h3 className="font-medium text-lg">Betel Nut</h3>

            <Card className="border-l-4 border-l-amber-200 dark:border-l-amber-800">
              <CardContent className="pt-6">
                <div>
                  <p className="mb-2 text-sm">Do you consume betel nut?</p>
                  <RadioGroup
                    value={formData.isBetelNut}
                    onValueChange={(value) => handleRadioChange("isBetelNut", value)}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="betel-nut-yes" />
                      <Label htmlFor="betel-nut-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="betel-nut-no" />
                      <Label htmlFor="betel-nut-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>

            <Separator />

            <h3 className="font-medium text-lg">Alcohol Consumption</h3>

            <Card className="border-l-4 border-l-amber-200 dark:border-l-amber-800">
              <CardContent className="pt-6">
                <div>
                  <p className="mb-2 text-sm">Do you consume alcohol?</p>
                  <RadioGroup
                    value={formData.isAlcohol}
                    onValueChange={(value) => handleRadioChange("isAlcohol", value)}
                    className="flex flex-col space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="alcohol-no" />
                      <Label htmlFor="alcohol-no">No</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="occasional" id="alcohol-occasional" />
                      <Label htmlFor="alcohol-occasional">Occasionally</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="regular" id="alcohol-regular" />
                      <Label htmlFor="alcohol-regular">Regularly</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="withOtherHabits" id="alcohol-with-habits" />
                      <Label htmlFor="alcohol-with-habits">With other habits (tobacco, etc.)</Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>

            <Separator />

            <h3 className="font-medium text-lg">Nutrition</h3>

            <Card className="border-l-4 border-l-amber-200 dark:border-l-amber-800">
              <CardContent className="pt-6">
                <div>
                  <p className="mb-2 text-sm">Are you malnourished?</p>
                  <RadioGroup
                    value={formData.isMalnourished}
                    onValueChange={(value) => handleRadioChange("isMalnourished", value)}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="malnourished-yes" />
                      <Label htmlFor="malnourished-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="malnourished-no" />
                      <Label htmlFor="malnourished-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="medical" className="space-y-6 animate-in fade-in-50">
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Precancerous Lesions</h3>

            <Card className="border-l-4 border-l-blue-200 dark:border-l-blue-800">
              <CardContent className="pt-6 space-y-4">
                <div>
                  <p className="mb-2 text-sm">Do you have Oral Lichen Planus?</p>
                  <RadioGroup
                    value={formData.hasOralLichenPlanus}
                    onValueChange={(value) => handleRadioChange("hasOralLichenPlanus", value)}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="lichen-planus-yes" />
                      <Label htmlFor="lichen-planus-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="lichen-planus-no" />
                      <Label htmlFor="lichen-planus-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <p className="mb-2 text-sm">Do you have Erythroplakia or Leukoplakia?</p>
                  <RadioGroup
                    value={formData.hasErythroplakiaLeukoplakia}
                    onValueChange={(value) => handleRadioChange("hasErythroplakiaLeukoplakia", value)}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="erythroplakia-yes" />
                      <Label htmlFor="erythroplakia-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="erythroplakia-no" />
                      <Label htmlFor="erythroplakia-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <p className="mb-2 text-sm">Do you have Oral Submucous Fibrosis (OSMF)?</p>
                  <RadioGroup
                    value={formData.hasOSMF}
                    onValueChange={(value) => handleRadioChange("hasOSMF", value)}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="osmf-yes" />
                      <Label htmlFor="osmf-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="osmf-no" />
                      <Label htmlFor="osmf-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <p className="mb-2 text-sm">Do you have any non-healed ulcers (more than 2 months)?</p>
                  <RadioGroup
                    value={formData.hasNonHealedUlcers}
                    onValueChange={(value) => handleRadioChange("hasNonHealedUlcers", value)}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="ulcers-yes" />
                      <Label htmlFor="ulcers-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="ulcers-no" />
                      <Label htmlFor="ulcers-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>

            <Separator />

            <h3 className="font-medium text-lg">Infections or Immunosuppression</h3>

            <Card className="border-l-4 border-l-blue-200 dark:border-l-blue-800">
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="mb-2 text-sm">HPV Infection?</p>
                    <RadioGroup
                      value={formData.hasHPV}
                      onValueChange={(value) => handleRadioChange("hasHPV", value)}
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="hpv-yes" />
                        <Label htmlFor="hpv-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="hpv-no" />
                        <Label htmlFor="hpv-no">No</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <p className="mb-2 text-sm">HIV Infection?</p>
                    <RadioGroup
                      value={formData.hasHIV}
                      onValueChange={(value) => handleRadioChange("hasHIV", value)}
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="hiv-yes" />
                        <Label htmlFor="hiv-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="hiv-no" />
                        <Label htmlFor="hiv-no">No</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <p className="mb-2 text-sm">CMV Infection?</p>
                    <RadioGroup
                      value={formData.hasCMV}
                      onValueChange={(value) => handleRadioChange("hasCMV", value)}
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="cmv-yes" />
                        <Label htmlFor="cmv-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="cmv-no" />
                        <Label htmlFor="cmv-no">No</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <p className="mb-2 text-sm">EBV Infection?</p>
                    <RadioGroup
                      value={formData.hasEBV}
                      onValueChange={(value) => handleRadioChange("hasEBV", value)}
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="ebv-yes" />
                        <Label htmlFor="ebv-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="ebv-no" />
                        <Label htmlFor="ebv-no">No</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <p className="mb-2 text-sm">Syphilis?</p>
                    <RadioGroup
                      value={formData.hasSyphilis}
                      onValueChange={(value) => handleRadioChange("hasSyphilis", value)}
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="syphilis-yes" />
                        <Label htmlFor="syphilis-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="syphilis-no" />
                        <Label htmlFor="syphilis-no">No</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <p className="mb-2 text-sm">Diabetes?</p>
                    <RadioGroup
                      value={formData.hasDiabetes}
                      onValueChange={(value) => handleRadioChange("hasDiabetes", value)}
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="diabetes-yes" />
                        <Label htmlFor="diabetes-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="diabetes-no" />
                        <Label htmlFor="diabetes-no">No</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <p className="mb-2 text-sm">On steroid therapy?</p>
                    <RadioGroup
                      value={formData.isOnSteroidTherapy}
                      onValueChange={(value) => handleRadioChange("isOnSteroidTherapy", value)}
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="steroid-yes" />
                        <Label htmlFor="steroid-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="steroid-no" />
                        <Label htmlFor="steroid-no">No</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <p className="mb-2 text-sm">Candidiasis?</p>
                    <RadioGroup
                      value={formData.hasCandidiasis}
                      onValueChange={(value) => handleRadioChange("hasCandidiasis", value)}
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="candidiasis-yes" />
                        <Label htmlFor="candidiasis-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="candidiasis-no" />
                        <Label htmlFor="candidiasis-no">No</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="family" className="space-y-6 animate-in fade-in-50">
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Family History of Oral Cancer</h3>

            <Card className="border-l-4 border-l-purple-200 dark:border-l-purple-800">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Maternal Side</h4>

                  <div>
                    <p className="mb-2 text-sm">Mother had oral cancer?</p>
                    <RadioGroup
                      value={formData.hasMother}
                      onValueChange={(value) => handleRadioChange("hasMother", value)}
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="mother-yes" />
                        <Label htmlFor="mother-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="mother-no" />
                        <Label htmlFor="mother-no">No</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <p className="mb-2 text-sm">Maternal grandparents had oral cancer?</p>
                    <RadioGroup
                      value={formData.hasMaternalGrandparents}
                      onValueChange={(value) => handleRadioChange("hasMaternalGrandparents", value)}
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="maternal-grandparents-yes" />
                        <Label htmlFor="maternal-grandparents-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="maternal-grandparents-no" />
                        <Label htmlFor="maternal-grandparents-no">No</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <p className="mb-2 text-sm">Other maternal blood relatives had oral cancer?</p>
                    <RadioGroup
                      value={formData.hasOtherMaternalRelatives}
                      onValueChange={(value) => handleRadioChange("hasOtherMaternalRelatives", value)}
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="other-maternal-yes" />
                        <Label htmlFor="other-maternal-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="other-maternal-no" />
                        <Label htmlFor="other-maternal-no">No</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Paternal Side</h4>

                  <div>
                    <p className="mb-2 text-sm">Father had oral cancer?</p>
                    <RadioGroup
                      value={formData.hasFather}
                      onValueChange={(value) => handleRadioChange("hasFather", value)}
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="father-yes" />
                        <Label htmlFor="father-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="father-no" />
                        <Label htmlFor="father-no">No</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <p className="mb-2 text-sm">Paternal grandparents had oral cancer?</p>
                    <RadioGroup
                      value={formData.hasPaternalGrandparents}
                      onValueChange={(value) => handleRadioChange("hasPaternalGrandparents", value)}
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="paternal-grandparents-yes" />
                        <Label htmlFor="paternal-grandparents-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="paternal-grandparents-no" />
                        <Label htmlFor="paternal-grandparents-no">No</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <p className="mb-2 text-sm">Other paternal blood relatives had oral cancer?</p>
                    <RadioGroup
                      value={formData.hasOtherPaternalRelatives}
                      onValueChange={(value) => handleRadioChange("hasOtherPaternalRelatives", value)}
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="other-paternal-yes" />
                        <Label htmlFor="other-paternal-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="other-paternal-no" />
                        <Label htmlFor="other-paternal-no">No</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="other" className="space-y-6 animate-in fade-in-50">
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Chronic Irritation</h3>

            <Card className="border-l-4 border-l-green-200 dark:border-l-green-800">
              <CardContent className="pt-6 space-y-4">
                <div>
                  <p className="mb-2 text-sm">Do you have chronic ulcers in your mouth?</p>
                  <RadioGroup
                    value={formData.hasUlcers}
                    onValueChange={(value) => handleRadioChange("hasUlcers", value)}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="chronic-ulcers-yes" />
                      <Label htmlFor="chronic-ulcers-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="chronic-ulcers-no" />
                      <Label htmlFor="chronic-ulcers-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <p className="mb-2 text-sm">Do you have denture irritation?</p>
                  <RadioGroup
                    value={formData.hasDentureIrritation}
                    onValueChange={(value) => handleRadioChange("hasDentureIrritation", value)}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="denture-irritation-yes" />
                      <Label htmlFor="denture-irritation-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="denture-irritation-no" />
                      <Label htmlFor="denture-irritation-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <p className="mb-2 text-sm">Do you have root stumps in your mouth?</p>
                  <RadioGroup
                    value={formData.hasRootStumps}
                    onValueChange={(value) => handleRadioChange("hasRootStumps", value)}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="root-stumps-yes" />
                      <Label htmlFor="root-stumps-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="root-stumps-no" />
                      <Label htmlFor="root-stumps-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>

            <Separator />

            <h3 className="font-medium text-lg">History of Cancer</h3>

            <Card className="border-l-4 border-l-green-200 dark:border-l-green-800">
              <CardContent className="pt-6">
                <div>
                  <p className="mb-2 text-sm">Do you have a history of cancer?</p>
                  <RadioGroup
                    value={formData.hasCancerHistory}
                    onValueChange={(value) => handleRadioChange("hasCancerHistory", value)}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="cancer-history-yes" />
                      <Label htmlFor="cancer-history-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="cancer-history-no" />
                      <Label htmlFor="cancer-history-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>

            <Separator />

            <h3 className="font-medium text-lg">Environmental Factors</h3>

            <Card className="border-l-4 border-l-green-200 dark:border-l-green-800">
              <CardContent className="pt-6 space-y-4">
                <div>
                  <p className="mb-2 text-sm">UV Radiation exposure?</p>
                  <RadioGroup
                    value={formData.hasUVExposure}
                    onValueChange={(value) => handleRadioChange("hasUVExposure", value)}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="occasional" id="uv-occasional" />
                      <Label htmlFor="uv-occasional">Occasional</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="regular" id="uv-regular" />
                      <Label htmlFor="uv-regular">Regular</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <p className="mb-2 text-sm">Are you exposed to chemical industry?</p>
                  <RadioGroup
                    value={formData.isChemicalIndustryExposed}
                    onValueChange={(value) => handleRadioChange("isChemicalIndustryExposed", value)}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="chemical-industry-yes" />
                      <Label htmlFor="chemical-industry-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="chemical-industry-no" />
                      <Label htmlFor="chemical-industry-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-between">
        {activeTab !== "tobacco" && (
          <Button variant="outline" onClick={handlePrevTab}>
            Previous
          </Button>
        )}
        {activeTab === "tobacco" && <div></div>}

        <Button
          onClick={handleNextTab}
          className={activeTab === "other" ? "bg-red-600 hover:bg-red-700" : ""}
          disabled={isCalculating}
        >
          {isCalculating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Calculating...
            </>
          ) : activeTab === "other" ? (
            "Calculate Risk"
          ) : (
            "Next"
          )}
        </Button>
      </div>
    </div>
  )
}
