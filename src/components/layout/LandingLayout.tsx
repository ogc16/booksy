
import { Github, Mail, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="container mx-auto px-4 py-6 flex-grow">
        {children}
      </main>
      
      <footer className="border-t bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">About Us</h3>
              <p className="text-sm text-muted-foreground">
                Simplify your business finances with our comprehensive financial management platform.
              </p>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="/pricing" className="text-sm text-muted-foreground hover:text-primary">Pricing</a></li>
                <li><a href="/login" className="text-sm text-muted-foreground hover:text-primary">Login</a></li>
                <li><a href="/register" className="text-sm text-muted-foreground hover:text-primary">Register</a></li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Contact</h3>
              <ul className="space-y-2">
                <li className="text-sm text-muted-foreground">Email: contact@example.com</li>
                <li className="text-sm text-muted-foreground">Phone: (555) 123-4567</li>
                <li className="text-sm text-muted-foreground">Address: 123 Business St.</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Follow Us</h3>
              <div className="flex space-x-4">
                <Button variant="ghost" size="icon" className="hover:text-primary">
                  <Twitter className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="hover:text-primary">
                  <Github className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="hover:text-primary">
                  <Mail className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
