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
        <Alert className="mt-6 border-green-500 bg-green-50 dark:bg-green-950/30">
          <CheckCircle2 className="h-5 w-5 text-green-500" />
          <AlertTitle className="text-green-700 dark:text-green-400 text-lg font-medium">Low Risk (0-14)</AlertTitle>
          <AlertDescription className="text-green-700 dark:text-green-400">
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
        <Alert className="mt-6 border-yellow-500 bg-yellow-50 dark:bg-yellow-950/30">
          <AlertTriangle className="h-5 w-5 text-yellow-500" />
          <AlertTitle className="text-yellow-700 dark:text-yellow-400 text-lg font-medium">
            Moderate Risk (15-28)
          </AlertTitle>
          <AlertDescription className="text-yellow-700 dark:text-yellow-400">
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
      <Alert className="mt-6 border-red-500 bg-red-50 dark:bg-red-950/30">
        <AlertCircle className="h-5 w-5 text-red-500" />
        <AlertTitle className="text-red-700 dark:text-red-400 text-lg font-medium">High Risk (29-42)</AlertTitle>
        <AlertDescription className="text-red-700 dark:text-red-400">
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
        const doc = new jsPDF()

        // Add header with logo
        doc.setFillColor(220, 38, 38) // red-600
        doc.rect(0, 0, 210, 20, "F")
        doc.setTextColor(255, 255, 255)
        doc.setFontSize(16)
        doc.text("Indian Oral Cancer Risk Assessment Report", 105, 12, { align: "center" })

        // Add user details section
        doc.setTextColor(0, 0, 0)
        doc.setFontSize(14)
        doc.text("Personal Information", 14, 30)
        doc.setDrawColor(220, 38, 38) // red-600
        doc.line(14, 32, 196, 32)

        doc.setFontSize(10)
        doc.text(`Name: ${userDetails.fullName}`, 14, 40)
        doc.text(`Age: ${userDetails.age}`, 14, 46)
        doc.text(`Gender: ${userDetails.gender.charAt(0).toUpperCase() + userDetails.gender.slice(1)}`, 14, 52)
        doc.text(`Contact: ${userDetails.phone}`, 14, 58)
        doc.text(`Email: ${userDetails.email}`, 14, 64)
        doc.text(`Address: ${userDetails.address}, ${userDetails.city}, ${userDetails.state}`, 14, 70)

        if (userDetails.medicalHistory) {
          doc.text(`Medical History: ${userDetails.medicalHistory}`, 14, 76)
        }

        // Add assessment results section
        doc.setFontSize(14)
        doc.text("Assessment Results", 14, 88)
        doc.setDrawColor(220, 38, 38) // red-600
        doc.line(14, 90, 196, 90)

        doc.setFontSize(20)
        doc.text(`Risk Score: ${totalScore}/42`, 105, 102, { align: "center" })

        const riskCategory = getRiskCategory()
        doc.setFontSize(16)

        if (riskCategory === "LOW") {
          doc.setTextColor(34, 197, 94) // green-500
        } else if (riskCategory === "MODERATE") {
          doc.setTextColor(234, 179, 8) // yellow-500
        } else {
          doc.setTextColor(239, 68, 68) // red-500
        }

        doc.text(`Risk Category: ${riskCategory} RISK`, 105, 112, { align: "center" })
        doc.setTextColor(0, 0, 0)

        // Add recommendations section
        doc.setFontSize(14)
        doc.text("Recommendations", 14, 124)
        doc.setDrawColor(220, 38, 38) // red-600
        doc.line(14, 126, 196, 126)

        doc.setFontSize(10)

        if (riskCategory === "LOW") {
          doc.text("You are at low risk for developing oral cancer. However, it's still important to:", 14, 134)
          doc.text("• Maintain good oral hygiene", 14, 142)
          doc.text("• Visit a dentist regularly for check-ups", 14, 148)
          doc.text("• Be aware of any family history factors", 14, 154)
          doc.text("• Avoid starting tobacco or alcohol use", 14, 160)
        } else if (riskCategory === "MODERATE") {
          doc.text("You are at moderate risk for developing oral cancer. It's recommended that you:", 14, 134)
          doc.text("• Consult with a healthcare professional", 14, 142)
          doc.text("• Consider quitting tobacco and reducing alcohol consumption", 14, 148)
          doc.text("• Have regular oral examinations", 14, 154)
          doc.text("• Monitor for any suspicious lesions in your oral cavity", 14, 160)
          doc.text("• If you have persistent lesions for more than 2 weeks, seek professional evaluation", 14, 166)
        } else {
          doc.text("You are at high risk for developing oral cancer. It's strongly recommended that you:", 14, 134)
          doc.text("• Seek immediate consultation with a healthcare professional", 14, 142)
          doc.text("• Stop all tobacco and alcohol use", 14, 148)
          doc.text("• Undergo a thorough oral examination", 14, 154)
          doc.text("• Consider regular screening and follow-up", 14, 160)
          doc.text("• Make significant lifestyle changes to reduce your risk", 14, 166)
          doc.text(
            "• For any suspicious lesions, histopathological examination should be done in the early stage",
            14,
            172,
          )
        }

        // Add disclaimer
        doc.setFontSize(8)
        doc.text(
          "DISCLAIMER: This assessment is based on the Indian Oral Cancer Risk Score and Index. It is for educational purposes only and",
          14,
          260,
        )
        doc.text(
          "does not replace professional medical advice. Please consult with a healthcare professional for proper diagnosis and treatment.",
          14,
          265,
        )

        // Add date and report ID
        doc.text(`Report Date: ${new Date().toLocaleDateString()}`, 14, 275)
        doc.text(`Report ID: ${Math.random().toString(36).substring(2, 10).toUpperCase()}`, 14, 280)

        // Save the PDF
        doc.save(`Oral_Cancer_Risk_Report_${userDetails.fullName.replace(/\s+/g, "_")}.pdf`)

        toast({
          title: "Report generated",
          description: "Your assessment report has been downloaded successfully.",
        })
      } catch (error) {
        console.error("Error generating PDF:", error)
        toast({
          title: "Error generating report",
          description: "There was an error generating your report. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsGeneratingPDF(false)
      }
    }, 1500)
  }

  const getProgressPercentage = () => {
    if (activeTab === "tobacco") return 20
    if (activeTab === "habits") return 40
    if (activeTab === "medical") return 60
    if (activeTab === "family") return 80
    return 100
  }

  if (showResults) {
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-950/30 dark:to-red-900/20 rounded-lg p-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-1">Your Oral Cancer Risk Assessment Results</h2>
            <p className="text-muted-foreground">Based on the Indian Oral Cancer Risk Score and Index</p>
          </div>

          {userDetails && (
            <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <h3 className="font-medium text-lg mb-2">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="font-medium">Name:</span> {userDetails.fullName}
                </div>
                <div>
                  <span className="font-medium">Age:</span> {userDetails.age}
                </div>
                <div>
                  <span className="font-medium">Gender:</span>{" "}
                  {userDetails.gender.charAt(0).toUpperCase() + userDetails.gender.slice(1)}
                </div>
                <div>
                  <span className="font-medium">Contact:</span> {userDetails.phone}
                </div>
              </div>
            </div>
          )}

          <div className="text-center mb-6">
            <div className="text-6xl font-bold mb-2">{totalScore}</div>
            <div className="text-sm text-muted-foreground">Total Risk Score (out of 42)</div>
          </div>

          <div className="mb-6">
            <div className="flex justify-between mb-2 text-sm">
              <span>Low Risk</span>
              <span>Moderate Risk</span>
              <span>High Risk</span>
            </div>
            <Progress value={(totalScore / 42) * 100} className={getRiskColor()} />
          </div>

          <div className="text-center mb-6">
            <div className={`inline-block px-6 py-3 rounded-full font-bold text-white text-lg ${getRiskColor()}`}>
              {getRiskCategory()} RISK
            </div>
          </div>

          {getRecommendations()}
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <Button variant="outline" onClick={resetForm} className="order-2 sm:order-1">
            Start New Assessment
          </Button>

          <div className="flex gap-2 order-1 sm:order-2">
            <Button onClick={() => window.print()} variant="secondary" className="flex-1 sm:flex-none">
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
