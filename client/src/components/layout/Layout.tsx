import React from "react";
import { Link, useLocation } from "wouter";
import { ScanSearch, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
    const isActive = location === href;
    return (
      <Link href={href}>
        <a className={`text-sm font-medium transition-colors hover:text-primary ${isActive ? "text-primary" : "text-muted-foreground"}`}>
          {children}
        </a>
      </Link>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans selection:bg-primary/20">
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/20 bg-white/60 backdrop-blur-md supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/">
            <a className="flex items-center gap-2 group">
              <div className="bg-primary/10 p-2 rounded-xl group-hover:bg-primary/20 transition-colors">
                <ScanSearch className="w-5 h-5 text-primary" />
              </div>
              <span className="font-display font-bold text-lg tracking-tight text-foreground">
                SenseBite
              </span>
            </a>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <NavLink href="/">Experience</NavLink>
            <NavLink href="/about">Philosophy</NavLink>
            <NavLink href="/ethics">Ethics & Data</NavLink>
            <Button size="sm" className="rounded-full px-6 font-semibold shadow-lg shadow-primary/20">
              Get Started
            </Button>
          </nav>

          {/* Mobile Nav */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col gap-6 mt-10">
                  <Link href="/">
                    <a className="text-lg font-medium text-foreground">Experience</a>
                  </Link>
                  <Link href="/about">
                    <a className="text-lg font-medium text-foreground">Philosophy</a>
                  </Link>
                  <Link href="/ethics">
                    <a className="text-lg font-medium text-foreground">Ethics & Data</a>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-16">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-12 bg-white">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 opacity-80">
            <ScanSearch className="w-4 h-4 text-primary" />
            <span className="font-display font-bold text-sm">SenseBite</span>
          </div>
          <p className="text-sm text-muted-foreground text-center md:text-right">
            © {new Date().getFullYear()} SenseBite AI. Designed for transparency.
          </p>
        </div>
      </footer>
    </div>
  );
}
