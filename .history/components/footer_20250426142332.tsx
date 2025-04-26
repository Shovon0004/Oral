import Link from "next/link"
import { Facebook, Instagram, Twitter, Mail, Phone } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t py-12 bg-muted/40">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4">
              <span className="text-red-600">Oral</span>CancerRisk.in
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              A scientifically validated tool to assess your risk of oral cancer based on the Indian Oral Cancer Risk
              Score and Index.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-red-600 transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-red-600 transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-red-600 transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>
          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-red-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/register" className="text-muted-foreground hover:text-red-600 transition-colors">
                  Start Assessment
                </Link>
              </li>
              <li>
                <Link href="/education" className="text-muted-foreground hover:text-red-600 transition-colors">
                  Education
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-red-600 transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/prevention" className="text-muted-foreground hover:text-red-600 transition-colors">
                  Prevention Tips
                </Link>
              </li>
              <li>
                <Link href="/symptoms" className="text-muted-foreground hover:text-red-600 transition-colors">
                  Warning Signs
                </Link>
              </li>
              <li>
                <Link href="/research" className="text-muted-foreground hover:text-red-600 transition-colors">
                  Research
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-red-600 transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-red-600" />
                <a
                  href="mailto:info@oralcancerrisk.in"
                  className="text-muted-foreground hover:text-red-600 transition-colors"
                >
                  info@oralcancerrisk.in
                </a>
              </li>
              <li className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-red-600" />
                <a href="tel:+911234567890" className="text-muted-foreground hover:text-red-600 transition-colors">
                  +91 0000
                </a>
              </li>
            </ul>
            <div className="mt-4">
              <h4 className="font-medium mb-2">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/terms" className="text-muted-foreground hover:text-red-600 transition-colors">
                    Terms of Use
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-muted-foreground hover:text-red-600 transition-colors">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="pt-8 border-t text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} OralCancerRisk.in. This tool is for educational purposes only and does not
            replace professional medical advice.
          </p>
          <p className="mt-2">
            Based on research by Dr. Arpita Chatterjee, Dr. Surajit Bose, Dr. Gopeswar Mukherjee, and Prof. Dr. Jayanta
            Chatterjee.
          </p>
        </div>
      </div>
    </footer>
  )
}
