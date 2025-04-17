import { Link } from "wouter";
import { Facebook, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-neutral-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">HealthPredict</h3>
            <p className="text-neutral-400 mb-4">
              AI-powered health prediction and personalized recommendations for a healthier future.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-400 hover:text-white">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-neutral-400 hover:text-white">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-neutral-400 hover:text-white">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Prediction Tools</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/diabetes" className="text-neutral-400 hover:text-white">
                  Diabetes Risk Assessment
                </Link>
              </li>
              <li>
                <Link href="/heart-disease" className="text-neutral-400 hover:text-white">
                  Heart Disease Prediction
                </Link>
              </li>
              <li>
                <Link href="/kidney-disease" className="text-neutral-400 hover:text-white">
                  Kidney Disease Screening
                </Link>
              </li>
              <li>
                <Link href="/liver-disease" className="text-neutral-400 hover:text-white">
                  Liver Health Evaluation
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Health Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/diet" className="text-neutral-400 hover:text-white">
                  Diet Recommendations
                </Link>
              </li>
              <li>
                <Link href="/exercise" className="text-neutral-400 hover:text-white">
                  Exercise Plans
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-neutral-400 hover:text-white">
                  Educational Content
                </Link>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-white">
                  Health Blog
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-neutral-400 hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-white">
                  Medical Disclaimer
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-white">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-white">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-white">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-neutral-700 mt-8 pt-8 text-center text-neutral-400">
          <p>&copy; {new Date().getFullYear()} HealthPredict. All rights reserved.</p>
          <p className="mt-2 text-sm">
            Disclaimer: This platform is designed for educational and informational purposes only. 
            It is not intended to be a substitute for professional medical advice, diagnosis, or treatment.
          </p>
        </div>
      </div>
    </footer>
  );
}
