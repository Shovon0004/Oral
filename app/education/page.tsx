import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, CheckCircle2, Info } from "lucide-react"

export const metadata: Metadata = {
  title: "Education | Indian Oral Cancer Risk Assessment Tool",
  description: "Learn about oral cancer, its risk factors, prevention, and early detection.",
}

export default function EducationPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Oral Cancer Education</h1>
          <p className="text-muted-foreground">
            Learn about oral cancer, its risk factors, prevention, and early detection.
          </p>
        </div>

        <Tabs defaultValue="overview" className="mb-12">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="risk-factors">Risk Factors</TabsTrigger>
            <TabsTrigger value="prevention">Prevention</TabsTrigger>
            <TabsTrigger value="detection">Early Detection</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle>Understanding Oral Cancer</CardTitle>
                <CardDescription>Key facts about oral cancer in India</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Oral cancer is a type of cancer that develops in the tissues of the mouth or throat. It belongs to the
                  larger group of head and neck cancers and can occur in the lips, tongue, cheeks, floor of the mouth,
                  hard and soft palate, sinuses, and pharynx.
                </p>

                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div className="flex flex-col items-center p-6 bg-muted rounded-lg">
                    <div className="text-4xl font-bold text-red-500 mb-2">11th</div>
                    <p className="text-center">Most common malignancy worldwide</p>
                  </div>

                  <div className="flex flex-col items-center p-6 bg-muted rounded-lg">
                    <div className="text-4xl font-bold text-red-500 mb-2">77,000</div>
                    <p className="text-center">New cases reported annually in India</p>
                  </div>

                  <div className="flex flex-col items-center p-6 bg-muted rounded-lg">
                    <div className="text-4xl font-bold text-red-500 mb-2">52,000</div>
                    <p className="text-center">Deaths reported annually in India</p>
                  </div>

                  <div className="flex flex-col items-center p-6 bg-muted rounded-lg">
                    <div className="text-4xl font-bold text-green-500 mb-2">90%</div>
                    <p className="text-center">Survival rate with early detection</p>
                  </div>
                </div>

                <p className="mt-6">
                  In India, oral cancer is a significant public health concern, with approximately one-fourth of global
                  incidences occurring in the country. It accounts for 12% of all cancers in men and 8% of all cancers
                  in women in India.
                </p>

                <p>
                  The high incidence of oral cancer in India is primarily attributed to the widespread use of tobacco
                  products, betel quid chewing, and alcohol consumption. Unfortunately, most cases are diagnosed at
                  advanced stages, leading to poor prognosis and high mortality rates.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/assessment">
                  <Button>Take Risk Assessment</Button>
                </Link>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="risk-factors">
            <Card>
              <CardHeader>
                <CardTitle>Risk Factors for Oral Cancer</CardTitle>
                <CardDescription>Understanding what increases your risk</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-red-100 dark:bg-red-900 p-3 rounded-full">
                    <AlertTriangle className="h-6 w-6 text-red-500 dark:text-red-300" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Tobacco Use</h3>
                    <p>
                      Tobacco use in any form (smoking cigarettes, bidis, pipes, or using smokeless tobacco like gutka,
                      khaini, or paan with tobacco) is the single largest risk factor for oral cancer. About 80-90% of
                      oral cancers in India are linked to tobacco use.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-red-100 dark:bg-red-900 p-3 rounded-full">
                    <AlertTriangle className="h-6 w-6 text-red-500 dark:text-red-300" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Alcohol Consumption</h3>
                    <p>
                      Heavy alcohol use is a significant risk factor for oral cancer. The risk is substantially higher
                      when combined with tobacco use, as alcohol can enhance the harmful effects of tobacco on oral
                      tissues.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-red-100 dark:bg-red-900 p-3 rounded-full">
                    <AlertTriangle className="h-6 w-6 text-red-500 dark:text-red-300" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Betel Quid and Areca Nut</h3>
                    <p>
                      Chewing betel quid (paan) with or without tobacco and areca nut (supari) is a common practice in
                      many parts of India and is strongly associated with oral cancer risk.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-red-100 dark:bg-red-900 p-3 rounded-full">
                    <AlertTriangle className="h-6 w-6 text-red-500 dark:text-red-300" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Human Papillomavirus (HPV)</h3>
                    <p>
                      Infection with certain types of HPV, particularly HPV-16, increases the risk of oral cancer,
                      especially in the back of the throat, base of the tongue, and tonsils.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-red-100 dark:bg-red-900 p-3 rounded-full">
                    <AlertTriangle className="h-6 w-6 text-red-500 dark:text-red-300" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Precancerous Conditions</h3>
                    <p>
                      Conditions like leukoplakia (white patches), erythroplakia (red patches), oral submucous fibrosis
                      (OSMF), and oral lichen planus can increase the risk of developing oral cancer.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-red-100 dark:bg-red-900 p-3 rounded-full">
                    <AlertTriangle className="h-6 w-6 text-red-500 dark:text-red-300" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Other Risk Factors</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Family history of oral cancer</li>
                      <li>Poor nutrition and diet low in fruits and vegetables</li>
                      <li>Weakened immune system</li>
                      <li>Excessive sun exposure (for lip cancer)</li>
                      <li>Chronic irritation from jagged teeth, ill-fitting dentures, or other sources</li>
                      <li>Poor oral hygiene</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/assessment">
                  <Button>Take Risk Assessment</Button>
                </Link>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="prevention">
            <Card>
              <CardHeader>
                <CardTitle>Preventing Oral Cancer</CardTitle>
                <CardDescription>Steps you can take to reduce your risk</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
                    <CheckCircle2 className="h-6 w-6 text-green-500 dark:text-green-300" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Avoid Tobacco</h3>
                    <p>
                      The most important step in preventing oral cancer is to avoid all forms of tobacco. If you
                      currently use tobacco, quitting now can significantly reduce your risk over time.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
                    <CheckCircle2 className="h-6 w-6 text-green-500 dark:text-green-300" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Limit Alcohol</h3>
                    <p>
                      If you drink alcohol, do so in moderation. For oral cancer prevention, it's best to limit alcohol
                      to no more than one drink per day for women and two drinks per day for men.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
                    <CheckCircle2 className="h-6 w-6 text-green-500 dark:text-green-300" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Avoid Betel Quid and Areca Nut</h3>
                    <p>
                      Avoid chewing betel quid (paan) and areca nut (supari), with or without tobacco, as these
                      substances are known to increase the risk of oral cancer.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
                    <CheckCircle2 className="h-6 w-6 text-green-500 dark:text-green-300" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Eat a Healthy Diet</h3>
                    <p>
                      Consume a diet rich in fruits and vegetables, which contain antioxidants and other nutrients that
                      may help reduce the risk of cancer. Avoid processed foods and excessive consumption of red meat.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
                    <CheckCircle2 className="h-6 w-6 text-green-500 dark:text-green-300" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Protect Against Sun Exposure</h3>
                    <p>
                      Use lip balm with sunscreen and wear a wide-brimmed hat to protect your lips from the sun,
                      especially if you work outdoors or spend a lot of time in the sun.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
                    <CheckCircle2 className="h-6 w-6 text-green-500 dark:text-green-300" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Practice Good Oral Hygiene</h3>
                    <p>
                      Maintain good oral hygiene by brushing twice a day, flossing daily, and visiting your dentist
                      regularly for check-ups and cleanings.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
                    <CheckCircle2 className="h-6 w-6 text-green-500 dark:text-green-300" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Get Vaccinated Against HPV</h3>
                    <p>
                      Consider getting vaccinated against HPV, especially if you are at high risk for HPV infection. The
                      vaccine is most effective when given before exposure to the virus.
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/assessment">
                  <Button>Take Risk Assessment</Button>
                </Link>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="detection">
            <Card>
              <CardHeader>
                <CardTitle>Early Detection of Oral Cancer</CardTitle>
                <CardDescription>Recognizing warning signs and getting screened</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                    <Info className="h-6 w-6 text-blue-500 dark:text-blue-300" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Warning Signs to Watch For</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>A sore in the mouth that doesn't heal within two weeks</li>
                      <li>A lump or thickening in the cheek</li>
                      <li>A white or red patch on the gums, tongue, tonsil, or lining of the mouth</li>
                      <li>A sore throat or feeling that something is caught in the throat</li>
                      <li>Difficulty chewing or swallowing</li>
                      <li>Difficulty moving the jaw or tongue</li>
                      <li>Numbness of the tongue or other area of the mouth</li>
                      <li>Swelling of the jaw that causes dentures to fit poorly or become uncomfortable</li>
                      <li>Loosening of the teeth or pain around the teeth or jaw</li>
                      <li>Voice changes</li>
                      <li>A lump or mass in the neck</li>
                      <li>Weight loss</li>
                      <li>Persistent bad breath</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                    <Info className="h-6 w-6 text-blue-500 dark:text-blue-300" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Regular Oral Cancer Screenings</h3>
                    <p>
                      Regular oral cancer screenings by a dentist or healthcare provider are essential for early
                      detection. These screenings typically involve:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 mt-2">
                      <li>A visual examination of the face, neck, lips, and mouth</li>
                      <li>Palpation (feeling) of the lymph nodes in the neck</li>
                      <li>
                        Examination of the oral cavity, including the tongue, gums, inner cheeks, roof of the mouth, and
                        back of the throat
                      </li>
                      <li>Discussion of any symptoms or changes you've noticed</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                    <Info className="h-6 w-6 text-blue-500 dark:text-blue-300" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Self-Examination</h3>
                    <p>
                      In addition to professional screenings, you can perform a self-examination at home once a month.
                      Here's how:
                    </p>
                    <ol className="list-decimal pl-5 space-y-1 mt-2">
                      <li>Remove any dental products (dentures, retainers)</li>
                      <li>Look at and feel your lips and front of gums</li>
                      <li>Tilt your head back and check the roof of your mouth</li>
                      <li>Pull your cheek out to see its inside surface and the back of your gums</li>
                      <li>Pull out your tongue and look at all surfaces</li>
                      <li>
                        Feel for lumps or enlarged lymph nodes in both sides of your neck and under your lower jaw
                      </li>
                    </ol>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                    <Info className="h-6 w-6 text-blue-500 dark:text-blue-300" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">When to See a Doctor</h3>
                    <p>
                      If you notice any of the warning signs mentioned above or any other unusual changes in your mouth
                      that persist for more than two weeks, see your dentist or doctor immediately. Early detection
                      significantly improves the chances of successful treatment.
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/assessment">
                  <Button>Take Risk Assessment</Button>
                </Link>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Assess Your Risk?</h2>
          <p className="mb-6 text-muted-foreground max-w-2xl mx-auto">
            Use our scientifically validated tool to calculate your risk of developing oral cancer based on your
            personal risk factors.
          </p>
          <Link href="/assessment">
            <Button size="lg" className="bg-red-600 hover:bg-red-700">
              Start Your Risk Assessment
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
