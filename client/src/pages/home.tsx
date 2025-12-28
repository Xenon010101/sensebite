import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Type, Sparkles, ArrowRight, Loader2, CheckCircle2, AlertTriangle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import heroBg from "@assets/generated_images/abstract_soft_3d_wave_background,_light_mint_green.png";

type AnalysisState = "idle" | "analyzing" | "complete";

export default function Home() {
  const [activeTab, setActiveTab] = useState("text");
  const [status, setStatus] = useState<AnalysisState>("idle");
  const [result, setResult] = useState<any>(null);

  // Mock Analysis Function
  const handleAnalyze = () => {
    setStatus("analyzing");
    // Simulate AI delay
    setTimeout(() => {
      setResult({
        summary: "This product appears to be a processed snack with a high sugar content.",
        ingredients: [
          { name: "High Fructose Corn Syrup", status: "warning", desc: "Added sweetener linked to metabolic issues." },
          { name: "Red 40", status: "caution", desc: "Artificial food dye. May cause hyperactivity in some children." },
          { name: "Whole Grain Oats", status: "good", desc: "A good source of fiber and nutrients." },
        ],
        verdict: "Consume in moderation due to added sugars.",
      });
      setStatus("complete");
    }, 2500);
  };

  return (
    <Layout>
      <div className="relative overflow-hidden min-h-[calc(100vh-4rem)]">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-multiply">
             <img src={heroBg} className="w-full h-full object-cover" alt="Background Texture" />
        </div>
        
        {/* Content */}
        <div className="container mx-auto px-4 py-12 md:py-24 relative z-10 flex flex-col items-center">
          
          {/* Hero Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <Badge variant="secondary" className="mb-6 px-4 py-1.5 rounded-full text-primary bg-primary/10 border-primary/20 backdrop-blur-sm">
              <Sparkles className="w-3 h-3 mr-2" />
              AI-Powered Food Intelligence
            </Badge>
            <h1 className="text-5xl md:text-7xl font-display font-extrabold tracking-tight text-foreground mb-6 leading-[1.1]">
              Know what you <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">really eat.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Instantly decode ingredient lists. We translate complex labels into clear, honest, human-readable insights.
            </p>
          </motion.div>

          {/* Interactive Card */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full max-w-xl"
          >
            <Card className="border-0 shadow-2xl shadow-primary/5 bg-white/80 backdrop-blur-xl overflow-hidden rounded-3xl ring-1 ring-black/5">
              <CardContent className="p-0">
                <Tabs defaultValue="text" value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <div className="flex border-b border-border/50 bg-secondary/30">
                    <TabsTrigger 
                      value="text" 
                      className="flex-1 py-4 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-none border-b-2 border-transparent data-[state=active]:border-primary transition-all font-medium"
                    >
                      <Type className="w-4 h-4 mr-2" />
                      Paste Ingredients
                    </TabsTrigger>
                    <TabsTrigger 
                      value="image" 
                      className="flex-1 py-4 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-none border-b-2 border-transparent data-[state=active]:border-primary transition-all font-medium"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Label
                    </TabsTrigger>
                  </div>

                  <div className="p-6 md:p-8 min-h-[300px] flex flex-col">
                    <TabsContent value="text" className="mt-0 flex-1 flex flex-col">
                      <label className="block text-sm font-semibold text-foreground mb-3">
                        Paste the ingredient list below
                      </label>
                      <Textarea 
                        placeholder="e.g., Water, High Fructose Corn Syrup, Sucrose, Natural Flavors..."
                        className="flex-1 resize-none bg-secondary/20 border-border/60 focus:ring-primary/20 min-h-[150px] text-base"
                      />
                    </TabsContent>

                    <TabsContent value="image" className="mt-0 flex-1 flex flex-col justify-center">
                      <div className="border-2 border-dashed border-border hover:border-primary/50 transition-colors rounded-xl p-10 flex flex-col items-center justify-center text-center cursor-pointer bg-secondary/10 hover:bg-secondary/20 h-full min-h-[200px]">
                        <div className="bg-primary/10 p-4 rounded-full mb-4">
                          <Upload className="w-8 h-8 text-primary" />
                        </div>
                        <p className="font-medium text-foreground">Click to upload or drag & drop</p>
                        <p className="text-sm text-muted-foreground mt-2">Supports JPG, PNG (Max 5MB)</p>
                      </div>
                    </TabsContent>

                    <div className="mt-6 pt-4 border-t border-border/50">
                      <Button 
                        onClick={handleAnalyze} 
                        disabled={status === "analyzing"}
                        className="w-full h-12 text-lg font-semibold rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all"
                      >
                        {status === "analyzing" ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Analyzing...
                          </>
                        ) : (
                          <>
                            Analyze Ingredients
                            <ArrowRight className="w-5 h-5 ml-2" />
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>

          {/* Results Section */}
          <AnimatePresence>
            {status === "complete" && result && (
              <motion.div
                initial={{ opacity: 0, y: 40, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: 20, height: 0 }}
                transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
                className="w-full max-w-xl mt-8"
              >
                <div className="bg-white rounded-3xl shadow-xl border border-border/60 overflow-hidden relative">
                   <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-primary" />
                   
                   <div className="p-6 md:p-8">
                      <div className="flex items-start gap-4 mb-6">
                        <div className="bg-emerald-100 p-3 rounded-2xl">
                          <Sparkles className="w-6 h-6 text-emerald-600" />
                        </div>
                        <div>
                          <h3 className="text-xl font-display font-bold text-foreground">Analysis Complete</h3>
                          <p className="text-muted-foreground mt-1 text-sm leading-relaxed">{result.summary}</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {result.ingredients.map((ing: any, i: number) => (
                          <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-secondary/30 border border-secondary/50">
                            {ing.status === 'warning' && <AlertTriangle className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />}
                            {ing.status === 'caution' && <Info className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />}
                            {ing.status === 'good' && <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />}
                            
                            <div>
                              <p className="font-semibold text-foreground">{ing.name}</p>
                              <p className="text-sm text-muted-foreground mt-0.5">{ing.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 pt-6 border-t border-border/50 text-center">
                         <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-2">Verdict</p>
                         <p className="text-lg font-medium text-foreground">{result.verdict}</p>
                      </div>
                   </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </Layout>
  );
}
