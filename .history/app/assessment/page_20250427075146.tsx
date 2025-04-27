import type { Metadata } from "next"
import Link from "next/link"
import AssessmentForm from "@/components/assessment-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileSpreadsheet } from "lucide-react"
import { ChevronRight, ClipboardCheck, FileText, Shield, Users } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"


export const metadata: Metadata = {
  title: "Risk Assessment | Indian Oral Cancer Risk Assessment Tool",
  description:
    "Complete the assessment form to calculate your risk of oral cancer based on the Indian Oral Cancer Risk Score and Index.",
}

export default function AssessmentPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Assessment page header - hidden when printing report */}
        <div className="text-center mb-8 print:hidden">
          <div className="inline-block p-3 bg-red-100 dark:bg-red-900/30 rounded-full mb-4">
            <FileSpreadsheet className="h-8 w-8 text-red-600" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Oral Cancer Risk Assessment</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Complete the form below to calculate your risk score. This assessment is based on the Indian Oral Cancer
            Risk Score and Index.
          </p>
        </div>

        <Card className="border-red-200 dark:border-red-800/30 shadow-md print:shadow-none print:border-0">
          <CardHeader className="print:hidden">
            <CardTitle>Risk Assessment Questionnaire</CardTitle>
            <CardDescription>Please answer all questions honestly for an accurate risk assessment</CardDescription>
          </CardHeader>
          <CardContent>
  <Link href="/register">
    <Button size="lg" className="bg-red-600 hover:bg-red-700 w-full sm:w-auto shadow-lg transform transition-all hover:scale-105">
      Start Assessment
      <ChevronRight className="ml-2 h-4 w-4" />
    </Button>
  </Link>
</CardContent>

        </Card>
      </div>
    </div>
  )
}
