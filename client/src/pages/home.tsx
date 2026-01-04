import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Type, Sparkles, ArrowRight, Loader2, CheckCircle2, AlertTriangle, Info, MessageCircle, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import heroBg from "@assets/generated_images/warm_sunset_orange_abstract_background.png";

type AnalysisState = "idle" | "analyzing" | "complete";

export default function Home() {
  const [activeTab, setActiveTab] = useState("text");
  const [status, setStatus] = useState<AnalysisState>("idle");
  const [result, setResult] = useState<any>(null);
  const [followUp, setFollowUp] = useState("");
  const [chat, setChat] = useState<{ role: 'user' | 'ai', content: string }[]>([]);
  const [isAsking, setIsAsking] = useState(false);

  const handleAnalyze = () => {
    setStatus("analyzing");
    setChat([]);
    setTimeout(() => {
      setResult({
        explanation: "This product is mostly hearty oats with a sweet syrup added for flavor. While the oats provide a good source of fiber which helps with energy balance, the added syrup moves it away from being a whole food. The synthetic dyes are mainly for appearance and don't add nutritional value. It's a fine choice for an occasional snack, but for an everyday health boost, you might prefer something with fewer processed touches.",
      });
      setStatus("complete");
    }, 2000);
  };

  const handleFollowUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!followUp.trim()) return;

    const userMsg = followUp;
    setChat(prev => [...prev, { role: 'user', content: userMsg }]);
    setFollowUp("");
    setIsAsking(true);

    setTimeout(() => {
      let response = "From a health perspective, the oats are great for steady energy, but the syrup can cause quicker sugar spikes. It's best enjoyed as a treat rather than a primary health food.";
      if (userMsg.toLowerCase().includes("alternative")) {
        response = "For a healthier alternative, plain oats with fresh berries and a drizzle of honey give you more vitamins and antioxidants without the artificial additives.";
      }
      setChat(prev => [...prev, { role: 'ai', content: response }]);
      setIsAsking(false);
    }, 1500);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleAnalyze();
    }
  };

  return (
    <Layout>
      <div className="relative overflow-hidden min-h-[calc(100vh-4rem)] mesh-gradient">
        <div className="container mx-auto px-4 py-12 md:py-24 relative z-10 flex flex-col items-center">
          
          <AnimatePresence mode="wait">
            {status === "idle" || status === "analyzing" ? (
              <motion.div 
                key="hero"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center max-w-2xl mx-auto mb-12"
              >
                <Badge variant="secondary" className="mb-6 px-4 py-1.5 rounded-full text-primary bg-primary/10 border-primary/20 backdrop-blur-sm">
                  <Sparkles className="w-3 h-3 mr-2" />
                  AI Food Reasoning
                </Badge>
                <h1 className="text-5xl md:text-7xl font-display font-extrabold tracking-tight text-foreground mb-6 leading-[1.1]">
                  Making sense of <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">every bite.</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                  Upload a label or paste ingredients. Our AI reasons through the complexity to give you clarity, not just data.
                </p>
              </motion.div>
            ) : null}
          </AnimatePresence>

          <motion.div 
            layout
            className="w-full max-w-xl"
          >
            <AnimatePresence mode="wait">
              {status !== "complete" ? (
                <motion.div
                  key="input-card"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <Card className="border-0 shadow-2xl shadow-primary/5 bg-white/80 backdrop-blur-xl overflow-hidden rounded-3xl ring-1 ring-black/5">
                    <CardContent className="p-0">
                      <Tabs defaultValue="text" value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="w-full h-auto p-0 flex border-b border-border/50 bg-secondary/30 rounded-none">
                          <TabsTrigger 
                            value="text" 
                            className="flex-1 py-4 h-auto rounded-none border-b-2 border-transparent data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:border-primary transition-all font-medium"
                          >
                            <Type className="w-4 h-4 mr-2" />
                            Paste Text
                          </TabsTrigger>
                          <TabsTrigger 
                            value="image" 
                            className="flex-1 py-4 h-auto rounded-none border-b-2 border-transparent data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:border-primary transition-all font-medium"
                          >
                            <Upload className="w-4 h-4 mr-2" />
                            Upload Image
                          </TabsTrigger>
                        </TabsList>

                        <div className="p-6 md:p-8 min-h-[300px] flex flex-col">
                          <TabsContent value="text" className="mt-0 flex-1 flex flex-col">
                            <Textarea 
                              placeholder="Paste ingredient list here..."
                              className="flex-1 resize-none bg-secondary/20 border-border/60 focus:ring-primary/20 min-h-[180px] text-base rounded-xl p-4"
                            />
                          </TabsContent>

                          <TabsContent value="image" className="mt-0 flex-1 flex flex-col justify-center">
                            <label className="border-2 border-dashed border-border hover:border-primary/50 transition-colors rounded-xl p-10 flex flex-col items-center justify-center text-center cursor-pointer bg-secondary/10 hover:bg-secondary/20 h-full min-h-[180px]">
                              <input 
                                type="file" 
                                accept="image/*" 
                                className="hidden" 
                                onChange={handleFileUpload}
                              />
                              <Upload className="w-8 h-8 text-primary mb-4" />
                              <p className="font-medium">Click to upload food label</p>
                            </label>
                          </TabsContent>

                          <div className="mt-6">
                            <Button 
                              onClick={handleAnalyze} 
                              disabled={status === "analyzing"}
                              className="w-full h-12 text-lg font-semibold rounded-xl shadow-lg shadow-primary/25"
                            >
                              {status === "analyzing" ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                              ) : (
                                "Start Reasoning"
                              )}
                            </Button>
                          </div>
                        </div>
                      </Tabs>
                    </CardContent>
                  </Card>
                </motion.div>
              ) : (
                <motion.div
                  key="results-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className="bg-white rounded-3xl shadow-2xl border border-border/60 overflow-hidden">
                    <div className="p-8 md:p-10">
                      <div className="flex justify-between items-center mb-8">
                        <div className="flex items-center gap-3">
                          <div className="bg-amber-100 p-2 rounded-xl">
                            <Sparkles className="w-5 h-5 text-amber-600" />
                          </div>
                          <h3 className="text-xl font-display font-bold">Insight</h3>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => setStatus("idle")} className="text-muted-foreground">
                          <RefreshCcw className="w-4 h-4 mr-2" />
                          Start Over
                        </Button>
                      </div>

                      <div className="prose prose-stone max-w-none">
                        <p className="text-lg text-foreground leading-relaxed mb-6">
                          {result.explanation}
                        </p>
                      </div>

                      {/* Chat History */}
                      <div className="space-y-4 mb-6 mt-8 border-t border-border/50 pt-8">
                        {chat.map((msg, i) => (
                          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[85%] p-4 rounded-2xl text-sm ${
                              msg.role === 'user' 
                              ? 'bg-primary text-primary-foreground' 
                              : 'bg-secondary/40 text-foreground border border-border'
                            }`}>
                              {msg.content}
                            </div>
                          </div>
                        ))}
                        {isAsking && (
                          <div className="flex justify-start">
                            <div className="bg-secondary/40 p-4 rounded-2xl border border-border">
                              <Loader2 className="w-4 h-4 animate-spin text-primary" />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Follow up input */}
                      <form onSubmit={handleFollowUp} className="relative mt-4">
                        <Input 
                          value={followUp}
                          onChange={(e) => setFollowUp(e.target.value)}
                          placeholder="Ask anything else..."
                          className="h-14 pr-14 rounded-2xl bg-secondary/20 border-border/60 focus:ring-primary/20"
                        />
                        <Button 
                          type="submit" 
                          size="icon" 
                          className="absolute right-2 top-2 h-10 w-10 rounded-xl"
                          disabled={!followUp.trim() || isAsking}
                        >
                          <MessageCircle className="w-5 h-5" />
                        </Button>
                      </form>
                      
                      <p className="text-[10px] text-center text-muted-foreground mt-8 uppercase tracking-widest font-medium opacity-50">
                        SenseBite provides clarity, not medical advice.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
