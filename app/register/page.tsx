import type { Metadata } from "next"
import UserRegistrationForm from "@/components/user-registration-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ClipboardList } from "lucide-react"

export const metadata: Metadata = {
  title: "Register | Indian Oral Cancer Risk Assessment Tool",
  description: "Register to begin your oral cancer risk assessment",
}

export default function RegisterPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-red-100 dark:bg-red-900/30 rounded-full mb-4">
            <ClipboardList className="h-8 w-8 text-red-600" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Register for Assessment</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Please provide your basic information to begin the oral cancer risk assessment. Your data is kept
            confidential and used only for assessment purposes.
          </p>
        </div>

        <Card className="border-red-200 dark:border-red-800/30 shadow-md">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Enter your details to create your profile</CardDescription>
          </CardHeader>
          <CardContent>
            <UserRegistrationForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
