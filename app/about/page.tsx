import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "About | Indian Oral Cancer Risk Assessment Tool",
  description:
    "Learn about the research behind the Indian Oral Cancer Risk Score and Index and our mission to reduce oral cancer incidence in India.",
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">About This Project</h1>
          <p className="text-muted-foreground">
            Learn about the research behind the Indian Oral Cancer Risk Score and Index
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>The Research</CardTitle>
            <CardDescription>Scientific validation and methodology</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              The Indian Oral Cancer Risk Score and Index was developed by Dr. Arpita Chatterjee, Dr. Surajit Bose, Dr.
              Gopeswar Mukherjee, and Prof. Dr. Jayanta Chatterjee, and published in the Annals of R.S.C.B., Vol. 24,
              Issue 2, 2020.
            </p>

            <p>
              The index was developed from data obtained from 354 patients attending the Kusum Devi SunderlalDugar Jain
              Dental College & Hospital, Kolkata, and Bharatsevashram Hospital. It was then validated by testing on 296
              additional patients.
            </p>

            <p>
              The scoring system takes into account various risk factors including tobacco use, alcohol consumption,
              betel quid and areca nut consumption, family history, precancerous lesions, infections, and other
              environmental factors. Each factor is assigned a specific score based on its contribution to oral cancer
              risk.
            </p>

            <p>The total maximum risk score is 42, which is divided into three risk categories:</p>

            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Low Risk (0-14):</strong> Individuals should maintain good oral hygiene and be aware of any
                family history factors.
              </li>
              <li>
                <strong>Moderate Risk (15-28):</strong> Individuals should be counseled about modifiable risk factors
                and monitored for suspicious lesions.
              </li>
              <li>
                <strong>High Risk (29-42):</strong> Individuals require immediate attention, counseling, and may need
                further examination by specialists.
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Our Mission</CardTitle>
            <CardDescription>Reducing oral cancer incidence in India</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Oral cancer is a significant public health concern in India, with approximately 77,000 new cases and
              52,000 deaths reported annually. This represents about one-fourth of global incidences.
            </p>

            <p>Our mission is to reduce the incidence and mortality of oral cancer in India through:</p>

            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Early Detection:</strong> Providing tools for risk assessment to identify high-risk individuals
                who need further screening and intervention.
              </li>
              <li>
                <strong>Education:</strong> Raising awareness about oral cancer, its risk factors, and prevention
                strategies.
              </li>
              <li>
                <strong>Prevention:</strong> Promoting lifestyle changes to reduce modifiable risk factors such as
                tobacco and alcohol use.
              </li>
              <li>
                <strong>Research:</strong> Contributing to the scientific understanding of oral cancer risk factors and
                prevention strategies.
              </li>
            </ul>

            <p>
              By making this risk assessment tool widely available, we aim to help individuals understand their personal
              risk and take appropriate actions to reduce it. We believe that with proper awareness and early detection,
              we can significantly reduce the burden of oral cancer in India.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>The Team</CardTitle>
            <CardDescription>Researchers behind the Indian Oral Cancer Risk Score and Index</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              The Indian Oral Cancer Risk Score and Index was developed by a team of dedicated researchers and medical
              professionals:
            </p>

            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Dr. Arpita Chatterjee</strong> - MSc, PhD, DSc, Assistant Professor and Head, Dept. of Botany,
                Barasat College, Kolkata, West Bengal
              </li>
              <li>
                <strong>Dr. Surajit Bose</strong> - BSc, BDS, MDS, MSc (Biotech), PhD, Asst. Professor, Dept. of Oral
                Pathology and Microbiology, Kusum Devi SunderlalDugar Jain Dental College & Hospital, Kolkata
              </li>
              <li>
                <strong>Dr. Gopeswar Mukherjee</strong> - MD, PhD, DSc, Professor and Dean, Brainware University,
                Kolkata
              </li>
              <li>
                <strong>Prof. Dr. Jayanta Chatterjee</strong> - BDS, MDS, Dean and HOD, Dept. of Oral Pathology and
                Microbiology, Kusum Devi SunderlalDugar Jain Dental College & Hospital, Kolkata
              </li>
            </ul>

            <p className="mt-4">
              We are grateful for their groundbreaking research that has made this risk assessment tool possible.
            </p>
          </CardContent>
        </Card>

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
