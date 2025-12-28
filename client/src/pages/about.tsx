import React from "react";
import Layout from "@/components/layout/Layout";
import { Badge } from "@/components/ui/badge";

export default function About() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-20 max-w-3xl">
        <div className="mb-12">
          <Badge variant="outline" className="mb-4">Our Philosophy</Badge>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
            We believe food labels should be human-readable.
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            The modern food industry hides behind complex scientific names. We're using AI to bring transparency back to your plate.
          </p>
        </div>

        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">Why SenseBite?</h2>
            <p className="text-muted-foreground leading-7 text-lg">
              Have you ever looked at the back of a package and seen 50 ingredients, half of which you can't pronounce? You aren't alone. We built SenseBite to bridge the gap between food science and consumer understanding. We don't judge what you eat—we just tell you what it is.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">How it Works</h2>
            <p className="text-muted-foreground leading-7 text-lg">
              Our AI models are trained on thousands of food science databases. When you scan a label, we perform OCR (Optical Character Recognition) to extract the text, cross-reference it with known nutritional data, and generate a simplified explanation.
            </p>
          </section>

          <section className="bg-secondary/30 p-8 rounded-3xl border border-secondary">
             <h2 className="text-xl font-bold mb-4 text-primary">Our Promise</h2>
             <ul className="space-y-3">
               <li className="flex items-center gap-3 text-foreground">
                 <div className="w-2 h-2 rounded-full bg-primary" />
                 <span>No fear-mongering. Just facts.</span>
               </li>
               <li className="flex items-center gap-3 text-foreground">
                 <div className="w-2 h-2 rounded-full bg-primary" />
                 <span>We highlight both the good and the controversial.</span>
               </li>
               <li className="flex items-center gap-3 text-foreground">
                 <div className="w-2 h-2 rounded-full bg-primary" />
                 <span>Always free for consumers.</span>
               </li>
             </ul>
          </section>
        </div>
      </div>
    </Layout>
  );
}
