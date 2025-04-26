import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronRight, ClipboardCheck, FileText, Shield, Users } from "lucide-react"
import Image from "next/image"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-8 mb-16">
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
              Indian Oral Cancer Risk Assessment Tool
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              Early detection saves lives. Assess your risk of oral cancer with our scientifically validated tool based
              on the Indian Oral Cancer Risk Score and Index.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/register">
                <Button size="lg" className="bg-red-600 hover:bg-red-700 w-full sm:w-auto">
                  Start Assessment
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/education">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex-1">
            <div className="relative h-[300px] md:h-[400px] w-full rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/oral.jp?height=400&width=600"
                alt="Oral cancer awareness"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <p className="font-medium">
                    In India, around 77,000 new cases and 52,000 deaths are reported annually
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="border-l-4 border-l-red-500">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <ClipboardCheck className="mr-2 h-5 w-5 text-red-500" />
                Easy Assessment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Complete a simple questionnaire about your habits and health to get your personalized risk score.
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-amber-500">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5 text-amber-500" />
                Scientific Validation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Based on research conducted on 354 patients and validated on 296 patients in Indian hospitals.
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5 text-green-500" />
                Detailed Report
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Receive a comprehensive downloadable report with your risk assessment and personalized recommendations.
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5 text-blue-500" />
                Expert Guidance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Get evidence-based recommendations developed by leading medical professionals in the field.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-950/30 dark:to-red-900/20 rounded-xl p-8 mb-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Why This Assessment Matters</h2>
            <p className="text-lg mb-8">
              Oral cancer is one of the most preventable malignancies if detected early. With proper awareness and
              timely intervention, the survival rate can improve up to 90%.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
                <div className="text-3xl font-bold text-red-600 mb-1">11th</div>
                <p className="text-sm text-muted-foreground">Most common cancer globally</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
                <div className="text-3xl font-bold text-red-600 mb-1">77K</div>
                <p className="text-sm text-muted-foreground">New cases in India annually</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
                <div className="text-3xl font-bold text-red-600 mb-1">52K</div>
                <p className="text-sm text-muted-foreground">Deaths in India annually</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
                <div className="text-3xl font-bold text-green-600 mb-1">90%</div>
                <p className="text-sm text-muted-foreground">Survival rate with early detection</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our assessment process is simple, secure, and designed to provide you with accurate risk evaluation
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-red-600 dark:text-red-400">1</span>
              </div>
              <h3 className="text-xl font-medium mb-2">Register</h3>
              <p className="text-muted-foreground">
                Enter your basic details to create your personal profile for the assessment
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-red-600 dark:text-red-400">2</span>
              </div>
              <h3 className="text-xl font-medium mb-2">Complete Assessment</h3>
              <p className="text-muted-foreground">
                Answer questions about your habits, medical history, and other risk factors
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-red-600 dark:text-red-400">3</span>
              </div>
              <h3 className="text-xl font-medium mb-2">Get Your Report</h3>
              <p className="text-muted-foreground">
                Receive a detailed risk assessment report with personalized recommendations
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/20 border-green-200 dark:border-green-800">
            <CardHeader>
              <CardTitle className="text-green-700 dark:text-green-400">Low Risk</CardTitle>
              <CardDescription>Score: 0-14</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Individuals with low risk should maintain good oral hygiene and be aware of any family history factors.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950/30 dark:to-amber-900/20 border-amber-200 dark:border-amber-800">
            <CardHeader>
              <CardTitle className="text-amber-700 dark:text-amber-400">Moderate Risk</CardTitle>
              <CardDescription>Score: 15-28</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Individuals with moderate risk should be counseled about modifiable risk factors and monitored for
                suspicious lesions.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/30 dark:to-red-900/20 border-red-200 dark:border-red-800">
            <CardHeader>
              <CardTitle className="text-red-700 dark:text-red-400">High Risk</CardTitle>
              <CardDescription>Score: 29-42</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Individuals with high risk require immediate attention, counseling, and may need further examination by
                specialists.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Ready to Assess Your Risk?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Take the first step towards better oral health by understanding your personal risk factors.
          </p>
          <Link href="/register">
            <Button size="lg" className="bg-red-600 hover:bg-red-700">
              Start Your Assessment
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
