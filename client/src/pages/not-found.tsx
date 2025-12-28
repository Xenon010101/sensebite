import React from "react";
import Layout from "@/components/layout/Layout";
import { AlertTriangle } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="bg-orange-50 p-4 rounded-full mb-6">
          <AlertTriangle className="w-12 h-12 text-orange-500" />
        </div>
        <h1 className="text-4xl font-display font-bold text-foreground mb-4">Page not found</h1>
        <p className="text-muted-foreground max-w-md mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link href="/">
          <Button size="lg" className="rounded-xl">Go Home</Button>
        </Link>
      </div>
    </Layout>
  );
}
