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
        summary: "This product is mainly made for a long shelf-life and a sweet taste.",
        reasoning: "I focused on these ingredients because they shape most of how this product tastes and behaves. This explanation assumes typical, everyday consumption.",
        ingredients: [
          { name: "High Fructose Corn Syrup", status: "warning", desc: "Used to give a consistent, sweet flavor at a low cost. The trade-off is how quickly it adds a lot of sweetness compared to how most people typically use sugar." },
          { name: "Red 40", status: "caution", desc: "Added mainly for visual appeal to make the product look more inviting. There is some uncertainty as to how different people might react to it." },
          { name: "Whole Grain Oats", status: "good", desc: "This is the main ingredient that gives the product its texture and substance. It provides a grounded balance to the more processed parts of the list." },
        ],
        verdict: "A simple blend of hearty oats and more processed sweeteners.",
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
      let response = "When thinking about eating this often, it's worth noting how the sweetness is balanced by the oats. For most people, it's about how this fits into a typical day.";
      if (userMsg.toLowerCase().includes("alternative")) {
        response = "A simpler approach might be using plain oats and adding your own fruit or honey. This gives you more control over the ingredients and avoids the added colors.";
      }
      setChat(prev => [...prev, { role: 'ai', content: response }]);
      setIsAsking(false);
    }, 1500);
  };

  return (
    <Layout>
      <div className="relative overflow-hidden min-h-[calc(100vh-4rem)]">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-multiply">
             <img src={heroBg} className="w-full h-full object-cover" alt="Background Texture" />
        </div>
        
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
                            <div className="border-2 border-dashed border-border hover:border-primary/50 transition-colors rounded-xl p-10 flex flex-col items-center justify-center text-center cursor-pointer bg-secondary/10 hover:bg-secondary/20 h-full min-h-[180px]">
                              <Upload className="w-8 h-8 text-primary mb-4" />
                              <p className="font-medium">Click to upload food label</p>
                            </div>
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
                    <div className="p-6 md:p-8">
                      <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-3">
                          <div className="bg-emerald-100 p-2 rounded-xl">
                            <Sparkles className="w-5 h-5 text-emerald-600" />
                          </div>
                          <h3 className="text-xl font-display font-bold">AI Insight</h3>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => setStatus("idle")} className="text-muted-foreground">
                          <RefreshCcw className="w-4 h-4 mr-2" />
                          Start Over
                        </Button>
                      </div>

                      <div className="bg-secondary/20 p-4 rounded-2xl mb-6 border border-secondary/50">
                        <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-1">Reasoning Layer</p>
                        <p className="text-sm text-muted-foreground leading-relaxed">{result.reasoning}</p>
                      </div>

                      <div className="space-y-4 mb-8">
                        {result.ingredients.map((ing: any, i: number) => (
                          <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-border shadow-sm">
                            {ing.status === 'warning' && <AlertTriangle className="w-5 h-5 text-orange-500 shrink-0 mt-1" />}
                            {ing.status === 'caution' && <Info className="w-5 h-5 text-yellow-500 shrink-0 mt-1" />}
                            {ing.status === 'good' && <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-1" />}
                            <div>
                              <p className="font-bold text-foreground leading-tight">{ing.name}</p>
                              <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{ing.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Chat History */}
                      <div className="space-y-4 mb-6">
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
                          placeholder="Ask a follow-up question..."
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
                      
                      <p className="text-[10px] text-center text-muted-foreground mt-6 uppercase tracking-widest font-medium">
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
