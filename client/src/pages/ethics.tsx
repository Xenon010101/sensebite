import React from "react";
import Layout from "@/components/layout/Layout";
import { AlertCircle } from "lucide-react";

export default function Ethics() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-20 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-12">
          Ethics & Data
        </h1>

        <div className="space-y-8">
          <div className="bg-orange-50 dark:bg-orange-950/20 p-6 rounded-2xl border border-orange-100 dark:border-orange-900/30 flex gap-4">
             <AlertCircle className="w-6 h-6 text-orange-600 shrink-0" />
             <div>
               <h3 className="font-bold text-orange-800 dark:text-orange-200 mb-2">Disclaimer</h3>
               <p className="text-orange-700 dark:text-orange-300 text-sm leading-relaxed">
                 SenseBite uses Artificial Intelligence to analyze ingredients. AI can make mistakes. This information is for educational purposes only and does not constitute medical advice. If you have severe allergies, always rely on the original packaging and consult a doctor.
               </p>
             </div>
          </div>

          <section>
            <h2 className="text-2xl font-bold mb-4">Data Privacy</h2>
            <p className="text-muted-foreground leading-7">
              We do not store the images you upload for longer than the analysis session. Your ingredient lists are processed anonymously. We do not sell your data to food advertisers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">AI Safety</h2>
            <p className="text-muted-foreground leading-7">
              Our models are tuned to avoid medical diagnoses. We will never tell you that a food "cures" a disease or "causes" a condition without overwhelming scientific consensus. We aim for nuance, not absolutes.
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
}
