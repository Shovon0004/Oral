import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  ChevronRight, 
  ClipboardCheck, 
  FileText, 
  Shield, 
  Users, 
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Phone,
  Mail,
  MessageSquare
} from "lucide-react"
import Image from "next/image"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-6">
      {/* Hero Section - Improved with animations and better layout */}
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-8 mb-16 relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-50 to-white dark:from-gray-900 dark:to-gray-800 p-6 md:p-10 shadow-xl">
          <div className="flex-1 z-10">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent animate-fade-in">
              Indian Oral Cancer Risk Assessment Tool
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-xl animate-slide-up">
              Early detection saves lives. Assess your risk of oral cancer with our scientifically validated tool based
              on the Indian Oral Cancer Risk Score and Index.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in">
              <Link href="/register">
                <Button size="lg" className="bg-red-600 hover:bg-red-700 w-full sm:w-auto shadow-lg transform transition-all hover:scale-105">
                  Start Assessment
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/education">
                <Button size="lg" variant="outline" className="w-full sm:w-auto hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                  Learn More
                </Button>
              </Link>
            </div>
            
            <div className="mt-8 flex items-center gap-3 text-sm text-muted-foreground">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>Free assessment based on clinical research</span>
            </div>
          </div>
          <div className="flex-1 relative z-10">
            <div className="relative h-[350px] md:h-[450px] w-full rounded-2xl overflow-hidden shadow-2xl transform transition-all hover:scale-[1.02]">
              <Image
                src="/oral.jpg"
                alt="Oral cancer awareness"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <p className="font-medium text-lg">
                    In India, around 77,000 new cases and 52,000 deaths are reported annually
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Background decoration */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-red-200/30 dark:bg-red-700/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-red-100/40 dark:bg-red-800/10 rounded-full blur-3xl"></div>
        </div>

        {/* Features Section - Enhanced with hover effects */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          <Card className="border-l-4 border-l-red-500 group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <ClipboardCheck className="mr-2 h-5 w-5 text-red-500 group-hover:scale-110 transition-transform" />
                Easy Assessment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Complete a simple questionnaire about your habits and health to get your personalized risk score.
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-amber-500 group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5 text-amber-500 group-hover:scale-110 transition-transform" />
                Scientific Validation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Based on research conducted on 354 patients and validated on 296 patients in Indian hospitals.
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500 group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5 text-green-500 group-hover:scale-110 transition-transform" />
                Detailed Report
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Receive a comprehensive downloadable report with your risk assessment and personalized recommendations.
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500 group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5 text-blue-500 group-hover:scale-110 transition-transform" />
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

        {/* Statistics Section - Enhanced with better visuals */}
        <div className="bg-gradient-to-r from-red-50 via-red-100 to-red-50 dark:from-red-950/30 dark:via-red-900/20 dark:to-red-950/30 rounded-3xl p-10 mb-20 shadow-lg relative overflow-hidden">
          <div className="max-w-3xl mx-auto text-center z-10 relative">
            <h2 className="text-3xl font-bold mb-4">Why This Assessment Matters</h2>
            <p className="text-lg mb-10 text-muted-foreground max-w-2xl mx-auto">
              Oral cancer is one of the most preventable malignancies if detected early. With proper awareness and
              timely intervention, the survival rate can improve up to 90%.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 border border-red-100 dark:border-red-800/30">
                <div className="text-4xl font-bold text-red-600 mb-2">11th</div>
                <p className="text-sm text-muted-foreground">Most common cancer globally</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 border border-red-100 dark:border-red-800/30">
                <div className="text-4xl font-bold text-red-600 mb-2">77K</div>
                <p className="text-sm text-muted-foreground">New cases in India annually</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 border border-red-100 dark:border-red-800/30">
                <div className="text-4xl font-bold text-red-600 mb-2">52K</div>
                <p className="text-sm text-muted-foreground">Deaths in India annually</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 border border-red-100 dark:border-red-800/30">
                <div className="text-4xl font-bold text-green-600 mb-2">90%</div>
                <p className="text-sm text-muted-foreground">Survival rate with early detection</p>
              </div>
            </div>
          </div>
          
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-200/50 dark:bg-red-800/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-200/50 dark:bg-red-800/10 rounded-full blur-3xl"></div>
        </div>

        {/* How It Works Section - Enhanced with better visuals and more detailed steps */}
        <div className="mb-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-3xl p-10 shadow-lg relative overflow-hidden">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our assessment process is simple, secure, and designed to provide you with accurate risk evaluation
            </p>
          </div>

          <div className="relative">
            {/* Desktop version with horizontal timeline */}
            <div className="hidden md:block">
              <div className="absolute top-24 left-[10%] w-[80%] h-2 bg-gradient-to-r from-red-200 via-red-400 to-red-200 dark:from-red-900/30 dark:via-red-700/50 dark:to-red-900/30 rounded-full -z-10"></div>
              
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center relative group">
                  <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg border-4 border-white dark:border-gray-800 group-hover:bg-red-200 dark:group-hover:bg-red-800/30 transition-all duration-300 group-hover:scale-110">
                    <span className="text-2xl font-bold text-red-600 dark:text-red-400">1</span>
                  </div>
                  <div className="absolute top-20 left-1/2 w-0.5 h-10 bg-red-200 dark:bg-red-700/50 -z-10 transform -translate-x-1/2"></div>
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-red-100 dark:border-red-800/30">
                    <h3 className="text-xl font-semibold mb-3 text-red-600 dark:text-red-400">Register</h3>
                    <p className="text-muted-foreground mb-4">
                      Create your personal profile with basic details for accurate assessment
                    </p>
                    <ul className="text-sm text-left space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Simple sign-up process</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Secure data protection</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="text-center relative group">
                  <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg border-4 border-white dark:border-gray-800 group-hover:bg-red-200 dark:group-hover:bg-red-800/30 transition-all duration-300 group-hover:scale-110">
                    <span className="text-2xl font-bold text-red-600 dark:text-red-400">2</span>
                  </div>
                  <div className="absolute top-20 left-1/2 w-0.5 h-10 bg-red-200 dark:bg-red-700/50 -z-10 transform -translate-x-1/2"></div>
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-red-100 dark:border-red-800/30">
                    <h3 className="text-xl font-semibold mb-3 text-red-600 dark:text-red-400">Answer Questions</h3>
                    <p className="text-muted-foreground mb-4">
                      Respond to scientifically validated questions about your health and habits
                    </p>
                    <ul className="text-sm text-left space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Easy to understand format</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Takes only 5-10 minutes</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="text-center relative group">
                  <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg border-4 border-white dark:border-gray-800 group-hover:bg-red-200 dark:group-hover:bg-red-800/30 transition-all duration-300 group-hover:scale-110">
                    <span className="text-2xl font-bold text-red-600 dark:text-red-400">3</span>
                  </div>
                  <div className="absolute top-20 left-1/2 w-0.5 h-10 bg-red-200 dark:bg-red-700/50 -z-10 transform -translate-x-1/2"></div>
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-red-100 dark:border-red-800/30">
                    <h3 className="text-xl font-semibold mb-3 text-red-600 dark:text-red-400">Get Results</h3>
                    <p className="text-muted-foreground mb-4">
                      Receive an instant risk assessment based on your responses
                    </p>
                    <ul className="text-sm text-left space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Clear risk categorization</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Visual risk score display</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="text-center relative group">
                  <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg border-4 border-white dark:border-gray-800 group-hover:bg-red-200 dark:group-hover:bg-red-800/30 transition-all duration-300 group-hover:scale-110">
                    <span className="text-2xl font-bold text-red-600 dark:text-red-400">4</span>
                  </div>
                  <div className="absolute top-20 left-1/2 w-0.5 h-10 bg-red-200 dark:bg-red-700/50 -z-10 transform -translate-x-1/2"></div>
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-red-100 dark:border-red-800/30">
                    <h3 className="text-xl font-semibold mb-3 text-red-600 dark:text-red-400">Take Action</h3>
                    <p className="text-muted-foreground mb-4">
                      Follow personalized recommendations based on your risk level
                    </p>
                    <ul className="text-sm text-left space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Downloadable report</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Specific next steps</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile version with vertical timeline */}
            <div className="md:hidden space-y-6">
              <div className="flex items-stretch">
                <div className="flex flex-col items-center mr-4">
                  <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center shadow-lg border-4 border-white dark:border-gray-800">
                    <span className="text-xl font-bold text-red-600 dark:text-red-400">1</span>
                  </div>
                  <div className="w-0.5 flex-1 bg-gradient-to-b from-red-400 to-red-200 dark:from-red-700 to-red-900/30 mt-2"></div>
                </div>
                <div className="flex-1 bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md border border-red-100 dark:border-red-800/30">
                  <h3 className="text-lg font-semibold mb-2 text-red-600 dark:text-red-400">Register</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Create your personal profile with basic details for accurate assessment
                  </p>
                  <div className="text-xs space-y-1">
                    <div className="flex items-start">
                      <CheckCircle className="h-3 w-3 text-red-500 mr-1.5 mt-0.5 flex-shrink-0" />
                      <span>Simple sign-up process</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-3 w-3 text-red-500 mr-1.5 mt-0.5 flex-shrink-0" />
                      <span>Secure data protection</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-stretch">
                <div className="flex flex-col items-center mr-4">
                  <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center shadow-lg border-4 border-white dark:border-gray-800">
                    <span className="text-xl font-bold text-red-600 dark:text-red-400">2</span>
                  </div>
                  <div className="w-0.5 flex-1 bg-gradient-to-b from-red-400 to-red-200 dark:from-red-700 to-red-900/30 mt-2"></div>
                </div>
                <div className="flex-1 bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md border border-red-100 dark:border-red-800/30">
                  <h3 className="text-lg font-semibold mb-2 text-red-600 dark:text-red-400">Answer Questions</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Respond to scientifically validated questions about your health and habits
                  </p>
                  <div className="text-xs space-y-1">
                    <div className="flex items-start">
                      <CheckCircle className="h-3 w-3 text-red-500 mr-1.5 mt-0.5 flex-shrink-0" />
                      <span>Easy to understand format</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-3 w-3 text-red-500 mr-1.5 mt-0.5 flex-shrink-0" />
                      <span>Takes only 5-10 minutes</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-stretch">
                <div className="flex flex-col items-center mr-4">
                  <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center shadow-lg border-4 border-white dark:border-gray-800">
                    <span className="text-xl font-bold text-red-600 dark:text-red-400">3</span>
                  </div>
                  <div className="w-0.5 flex-1 bg-gradient-to-b from-red-400 to-red-200 dark:from-red-700 to-red-900/30 mt-2"></div>
                </div>
                <div className="flex-1 bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md border border-red-100 dark:border-red-800/30">
                  <h3 className="text-lg font-semibold mb-2 text-red-600 dark:text-red-400">Get Results</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Receive an instant risk assessment based on your responses
                  </p>
                  <div className="text-xs space-y-1">
                    <div className="flex items-start">
                      <CheckCircle className="h-3 w-3 text-red-500 mr-1.5 mt-0.5 flex-shrink-0" />
                      <span>Clear risk categorization</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-3 w-3 text-red-500 mr-1.5 mt-0.5 flex-shrink-0" />
                      <span>Visual risk score display</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-stretch">
                <div className="flex flex-col items-center mr-4">
                  <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center shadow-lg border-4 border-white dark:border-gray-800">
                    <span className="text-xl font-bold text-red-600 dark:text-red-400">4</span>
                  </div>
                </div>
                <div className="flex-1 bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md border border-red-100 dark:border-red-800/30">
                  <h3 className="text-lg font-semibold mb-2 text-red-600 dark:text-red-400">Take Action</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Follow personalized recommendations based on your risk level
                  </p>
                  <div className="text-xs space-y-1">
                    <div className="flex items-start">
                      <CheckCircle className="h-3 w-3 text-red-500 mr-1.5 mt-0.5 flex-shrink-0" />
                      <span>Downloadable report</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-3 w-3 text-red-500 mr-1.5 mt-0.5 flex-shrink-0" />
                      <span>Specific next steps</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-100/50 dark:bg-red-900/10 rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gray-100/50 dark:bg-gray-800/10 rounded-full blur-3xl -z-10"></div>
        </div>

        {/* Risk Levels Section - Enhanced with better visuals */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/20 border-green-200 dark:border-green-800 overflow-hidden shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 group">
            <div className="absolute top-0 left-0 w-full h-1 bg-green-500"></div>
            <CardHeader>
              <CardTitle className="text-green-700 dark:text-green-400 flex items-center">
                <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-800/30 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                Low Risk
              </CardTitle>
              <CardDescription>Score: 0-14</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Individuals with low risk should maintain good oral hygiene and be aware of any family history factors.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Continue regular dental check-ups</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Maintain healthy lifestyle</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950/30 dark:to-amber-900/20 border-amber-200 dark:border-amber-800 overflow-hidden shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 group">
            <div className="absolute top-0 left-0 w-full h-1 bg-amber-500"></div>
            <CardHeader>
              <CardTitle className="text-amber-700 dark:text-amber-400 flex items-center">
                <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-800/30 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                  <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
                Moderate Risk
              </CardTitle>
              <CardDescription>Score: 15-28</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Individuals with moderate risk should be counseled about modifiable risk factors and monitored for
                suspicious lesions.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-amber-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Follow-up dental visits every 6 months</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-amber-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Reduce risk factors like tobacco use</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/30 dark:to-red-900/20 border-red-200 dark:border-red-800 overflow-hidden shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 group">
            <div className="absolute top-0 left-0 w-full h-1 bg-red-500"></div>
            <CardHeader>
              <CardTitle className="text-red-700 dark:text-red-400 flex items-center">
                <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-800/30 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                  <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                </div>
                High Risk
              </CardTitle>
              <CardDescription>Score: 29-42</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Individuals with high risk require immediate attention, counseling, and may need further examination by
                specialists.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Immediate referral to specialist</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Comprehensive oral examination</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
        
        {/* Expert Quotes Section - New addition */}
        <div className="mb-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-3xl p-10 shadow-lg">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2">Expert Insights</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Learn what medical professionals say about oral cancer prevention
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur">
              <CardContent className="pt-6">
                <div className="flex gap-4 items-start">
                  <div className="w-14 h-14 rounded-full bg-red-100 dark:bg-red-800/30 flex items-center justify-center flex-shrink-0">
                    <Image 
                      src="/placeholder-user.jpg" 
                      alt="Dr. Sharma" 
                      width={56} 
                      height={56} 
                      className="rounded-full"
                    />
                  </div>
                  <div>
                    <blockquote className="text-lg italic mb-4">
                      "Early detection of oral cancer significantly increases the chances of successful treatment. Regular screenings and awareness of risk factors are crucial for prevention."
                    </blockquote>
                    <div className="font-semibold">Dr. Rajesh Sharma</div>
                    <div className="text-sm text-muted-foreground">Oral Oncologist, AIIMS Delhi</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur">
              <CardContent className="pt-6">
                <div className="flex gap-4 items-start">
                  <div className="w-14 h-14 rounded-full bg-red-100 dark:bg-red-800/30 flex items-center justify-center flex-shrink-0">
                    <Image 
                      src="/placeholder-user.jpg" 
                      alt="Dr. Patel" 
                      width={56} 
                      height={56} 
                      className="rounded-full"
                    />
                  </div>
                  <div>
                    <blockquote className="text-lg italic mb-4">
                      "The prevalence of oral cancer in India is directly linked to tobacco use in various forms. Risk assessment tools help identify high-risk individuals who need immediate intervention."
                    </blockquote>
                    <div className="font-semibold">Dr. Meena Patel</div>
                    <div className="text-sm text-muted-foreground">Head of Preventive Oncology, Tata Memorial Hospital</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* FAQ Section - New addition */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2">Frequently Asked Questions</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Common questions about oral cancer risk assessment
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <AccordionItem value="item-1">
                <AccordionTrigger>What is the Indian Oral Cancer Risk Score?</AccordionTrigger>
                <AccordionContent>
                  The Indian Oral Cancer Risk Score is a validated tool developed specifically for the Indian population to assess the risk of developing oral cancer. It takes into account various factors including demographic information, tobacco and alcohol habits, diet, oral hygiene, and family history.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger>How accurate is this risk assessment?</AccordionTrigger>
                <AccordionContent>
                  This assessment tool has been scientifically validated through research conducted on 354 patients and further validated on 296 patients in Indian hospitals. It has shown high sensitivity and specificity in identifying individuals at risk of developing oral cancer.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger>Is my personal data secure?</AccordionTrigger>
                <AccordionContent>
                  Yes, we take data privacy very seriously. All personal information is encrypted and stored securely. We do not share your data with third parties without your explicit consent.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger>How long does the assessment take?</AccordionTrigger>
                <AccordionContent>
                  The complete assessment typically takes 5-10 minutes to complete. We recommend setting aside a quiet time to answer all questions accurately for the most precise risk evaluation.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5">
                <AccordionTrigger>What should I do after receiving my risk score?</AccordionTrigger>
                <AccordionContent>
                  Based on your risk score, you will receive personalized recommendations. If you're identified as high risk, we strongly recommend consulting with a healthcare professional. Even with low risk, regular oral examinations are important for oral health maintenance.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        {/* CTA Section - Enhanced */}
        <div className="rounded-3xl bg-gradient-to-r from-red-600 to-red-500 dark:from-red-800 dark:to-red-700 p-10 mb-20 text-white shadow-xl relative overflow-hidden">
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <h2 className="text-4xl font-bold mb-6">Ready to Assess Your Risk?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Take the first step towards better oral health by understanding your personal risk factors.
            </p>
            <Link href="/register">
              <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100 hover:text-red-700 shadow-lg transform transition-all hover:scale-105">
                Start Your Assessment
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <p className="font-medium">Free Assessment</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6" />
                </div>
                <p className="font-medium">Secure & Private</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6" />
                </div>
                <p className="font-medium">Detailed Report</p>
              </div>
            </div>
          </div>
          
          {/* Background decoration */}
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-red-400/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-red-400/30 rounded-full blur-3xl"></div>
        </div>
        
        {/* Contact Section - New addition */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2">Have Questions?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our team is here to assist you with any questions about oral cancer or the assessment
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-all hover:-translate-y-1">
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-4">
                  <Phone className="h-5 w-5 text-red-600" />
                </div>
                <h3 className="text-lg font-medium mb-2">Call Us</h3>
                <p className="text-muted-foreground mb-2">
                  Speak with our medical professionals
                </p>
                <p className="font-medium">+91 1234 567890</p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-all hover:-translate-y-1">
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-4">
                  <Mail className="h-5 w-5 text-red-600" />
                </div>
                <h3 className="text-lg font-medium mb-2">Email Us</h3>
                <p className="text-muted-foreground mb-2">
                  Send your queries to our team
                </p>
                <p className="font-medium">info@oralcancerindia.org</p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-all hover:-translate-y-1">
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-4">
                  <MessageSquare className="h-5 w-5 text-red-600" />
                </div>
                <h3 className="text-lg font-medium mb-2">Live Chat</h3>
                <p className="text-muted-foreground mb-2">
                  Chat with our support team
                </p>
                <p className="font-medium">Available 9 AM - 6 PM</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
