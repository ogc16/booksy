import { Github, Mail, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="container mx-auto px-4 py-6 flex-grow">
        {children}
      </main>
      
      <footer className="bg-cyan-600 text-white pb-1">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">About Us</h3>
              <p>
                Simplify your business finances with our comprehensive financial management platform
                which is designed to enhance the book keeping.
                 
              </p>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="/pricing"className=" hover:text-primary">Pricing</a></li>
                <li><a href="/login" className=" hover:text-primary">Login</a></li>
                <li><a href="/register" className=" hover:text-primary">Register</a></li>
                <li><a href="/learn" className=" hover:text-primary">Learn</a></li>
                <li><a href="/documentation" className=" hover:text-primary">Docs</a></li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Contact</h3>
              <ul className="space-y-2">
                <li className="">Email: contact@example.com</li>
                <li className="">Phone: (555) 123-4567</li>
                <li className="">Address: 123 Business St.</li>
              </ul>
            </div>
            
            <div className="space-y-3 ">
              <h3 className="text-lg font-semibold">Follow Us</h3>
             {/* <div className="flex space-x-4"> */}
                <Button variant="ghost" size="icon" className="hover:text-primary">
                  <Twitter className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="hover:text-primary">
                  <Github className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="hover:text-primary">
                  <Mail className="h-5 w-5" />
                </Button>
              {/* </div> */}
              <ul className="space-y-2">
              <li><a href="/blog"className=" hover:text-primary">Blog</a></li>
              <li><a href="/terms" className=" hover:text-primary">Terms of Service</a></li>
              <li><a href="/privacy"className=" hover:text-primary">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-2 text-center text-sm-opacity">
                        <p>&copy; {new Date().getFullYear()} Booksy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
