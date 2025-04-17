import { Link, useLocation } from "wouter";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Prediction Hub", href: "/prediction-hub" },
  { name: "Diabetes", href: "/diabetes" },
  { name: "Heart Disease", href: "/heart-disease" },
  { name: "Kidney Disease", href: "/kidney-disease" },
  { name: "Liver Disease", href: "/liver-disease" },
  { name: "Diet", href: "/diet" },
  { name: "Exercise", href: "/exercise" },
  { name: "Resources", href: "/resources" },
  { name: "AI Assistant", href: "/assistant" },
];

export default function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 backdrop-blur-sm bg-white/90">
      <div className="container-custom py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center text-white font-bold">
            HP
          </div>
          <span className="text-primary text-xl font-bold group-hover:opacity-90 transition-opacity">
            HealthPredict
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-4">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "text-neutral-700 hover:text-primary font-medium px-2 py-1 rounded-md transition-colors text-sm",
                location === item.href && "text-primary bg-primary/5"
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        
        <div className="flex items-center">
          {/* Mobile Menu Button */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" aria-label="Menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80vw] p-0">
              <div className="flex flex-col p-4 gap-4">
                {navigation.map((item) => (
                  <Link 
                    key={item.name} 
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "text-neutral-800 hover:text-primary font-medium py-2",
                      location === item.href && "text-primary"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
