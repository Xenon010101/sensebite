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

import cerealImg from "@assets/stock_images/bowl_of_cereal_milk_65339b07.jpg";
import snacksImg from "@assets/stock_images/bag_of_potato_chips__ca20f7d6.jpg";
import drinksImg from "@assets/stock_images/cola_glass_with_ice_92b64f12.jpg";
import instantImg from "@assets/stock_images/instant_noodles_in_b_ea9da7f2.jpg";
import chocolateImg from "@assets/stock_images/dark_chocolate_bar_p_66ed506d.jpg";
import dairyImg from "@assets/stock_images/glass_of_fresh_milk__ce935e44.jpg";
import energyImg from "@assets/stock_images/energy_drink_can_blu_90687bff.jpg";
import breadImg from "@assets/stock_images/loaf_of_sliced_white_9b230237.jpg";

const CATEGORIES = [
  { id: "cereal", label: "Breakfast Cereals", image: cerealImg, data: "Whole grain oats, sugar, oat bran, corn starch, honey, brown sugar syrup, salt, tripotassium phosphate, rice bran oil, natural almond flavor." },
  { id: "snacks", label: "Packaged Snacks", image: snacksImg, data: "Potatoes, vegetable oil (sunflower, corn, and/or canola oil), salt, maltodextrin, sugar, dextrose, yeast extract, onion powder, natural flavors." },
  { id: "drinks", label: "Soft Drinks", image: drinksImg, data: "Carbonated water, high fructose corn syrup, caramel color, phosphoric acid, natural flavors, caffeine." },
  { id: "instant", label: "Instant Foods", image: instantImg, data: "Enriched wheat flour, vegetable oil, salt, dehydrated vegetables, monosodium glutamate, soy sauce powder, spices, artificial flavors." },
  { id: "chocolates", label: "Chocolates & Sweets", image: chocolateImg, data: "Milk chocolate (sugar, cocoa butter, chocolate, skim milk, lactose, milkfat, soy lecithin), peanuts, corn syrup, sugar, palm oil, skim milk." },
  { id: "dairy", label: "Dairy Products", image: dairyImg, data: "Grade A pasteurized milk, Vitamin D3." },
  { id: "energy", label: "Energy Drinks", image: energyImg, data: "Carbonated water, sucrose, glucose, citric acid, taurine, sodium citrate, magnesium carbonate, caffeine, niacinamide, calcium pantothenate." },
  { id: "bakery", label: "Packaged Bread", image: breadImg, data: "Unbleached enriched wheat flour, water, yeast, sugar, soybean oil, salt, wheat gluten, calcium propionate, datem, monoglycerides." },
];

type AnalysisState = "idle" | "analyzing" | "complete";

export default function Home() {
  const [activeTab, setActiveTab] = useState("text");
  const [status, setStatus] = useState<AnalysisState>("idle");
  const [result, setResult] = useState<any>(null);
  const [followUp, setFollowUp] = useState("");
  const [textInput, setTextInput] = useState("");
  const [chat, setChat] = useState<{ role: 'user' | 'ai', content: string }[]>([]);
  const [isAsking, setIsAsking] = useState(false);

  const handleAnalyze = (predefinedData?: string) => {
    setStatus("analyzing");
    setChat([]);
    
    // Varied responses based on product type or generic text input
    setTimeout(() => {
      let dataToAnalyze = predefinedData || "";
      let explanation = "This product seems to have a mix of ingredients that lean towards the processed side. While some components offer basic energy, the overall profile suggests it's best viewed as an occasional part of your diet rather than a nutrient-dense staple. It contains a few additives that don't contribute to its nutritional value but help with texture and shelf-life.";

      if (dataToAnalyze.toLowerCase().includes("oats") || dataToAnalyze.toLowerCase().includes("cereal")) {
        explanation = "This product is mostly hearty oats with a sweet syrup added for flavor. While the oats provide a good source of fiber which helps with energy balance, the added syrup moves it away from being a whole food. It's a fine choice for an occasional snack, but for an everyday health boost, you might prefer something with fewer processed touches.";
      } else if (dataToAnalyze.toLowerCase().includes("phosphoric acid") || dataToAnalyze.toLowerCase().includes("cola") || dataToAnalyze.toLowerCase().includes("syrup")) {
        explanation = "This drink is essentially a blend of carbonated water and concentrated sweeteners. The phosphoric acid gives it that characteristic bite, but it's something to be mindful of for long-term dental and bone health. The caramel coloring is purely for aesthetics. It's best enjoyed as an occasional treat rather than a primary source of hydration.";
      } else if (dataToAnalyze.toLowerCase().includes("monosodium glutamate") || dataToAnalyze.toLowerCase().includes("noodles")) {
        explanation = "These noodles are a quick source of energy from processed wheat, but they rely heavily on sodium and flavor enhancers like MSG for their savory profile. While satisfying in the moment, they lack the fiber and fresh nutrients found in whole meals. They're a convenient pantry staple, but adding some fresh greens or an egg can help balance out the nutritional profile.";
      } else if (dataToAnalyze.toLowerCase().includes("potatoes") || dataToAnalyze.toLowerCase().includes("chips")) {
        explanation = "These snacks are thinly sliced potatoes cooked in vegetable oil. While potatoes themselves are a whole vegetable, the high-heat frying process and added salt turn them into a high-energy, low-nutrient snack. The natural flavors help with the savory appeal, making them easy to overconsume. They're a classic comfort food, but better kept for special occasions.";
      } else if (dataToAnalyze.toLowerCase().includes("cocoa") || dataToAnalyze.toLowerCase().includes("chocolate")) {
        explanation = "This treat is a complex mix of chocolate, peanuts, and sugars. The cocoa butter and milk solids provide a rich texture, but the combination of corn syrup and palm oil makes it very energy-dense. It's a delightful indulgence, though the high sugar content means it's best enjoyed mindfully as a dessert rather than a snack.";
      } else if (dataToAnalyze.toLowerCase().includes("milk") || dataToAnalyze.toLowerCase().includes("dairy")) {
        explanation = "This is a straightforward dairy product, primarily pasteurized milk fortified with Vitamin D. It's an excellent source of calcium and protein with very little processing. Unlike many packaged foods, it contains no added sugars or artificial stabilizers. It's a solid, nutrient-dense choice for daily consumption.";
      } else if (dataToAnalyze.toLowerCase().includes("taurine") || dataToAnalyze.toLowerCase().includes("energy drink")) {
        explanation = "This energy drink is formulated for a quick mental and physical boost using caffeine and taurine. While effective for short-term alertness, the high concentration of sucrose and glucose can lead to a significant energy crash later. The added B-vitamins are a nice touch, but they don't outweigh the impact of the refined sugars. Use it strategically when needed, but stay hydrated with water too.";
      } else if (dataToAnalyze.toLowerCase().includes("yeast") || dataToAnalyze.toLowerCase().includes("bread") || dataToAnalyze.toLowerCase().includes("flour")) {
        explanation = "This packaged bread uses enriched wheat flour and soybean oil for a soft, consistent texture. The addition of calcium propionate and monoglycerides helps it stay fresh on the shelf for longer than bakery-fresh bread. It's a convenient staple, but it's more processed than a simple sourdough or whole-grain loaf from a local bakery.";
      } else if (dataToAnalyze.length > 50) {
        // Generic fallback for long text that doesn't match specific keywords
        explanation = "The ingredient list you've provided shows a complex profile. It contains several shelf-stable additives and refined components that are common in modern packaged foods. While functional, these ingredients don't offer the same level of nourishment as whole, unprocessed alternatives. It works well as a convenience option, but balancing it with fresher ingredients is always a good strategy.";
      }
      
      setResult({ explanation });
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
                              value={textInput}
                              onChange={(e) => setTextInput(e.target.value)}
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
                              onClick={() => handleAnalyze(textInput)} 
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

                  {/* Categories Section */}
                  <div className="mt-12 w-full">
                    <p className="text-sm font-medium text-muted-foreground mb-6 text-center opacity-70">
                      Or explore common products
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {CATEGORIES.map((cat) => (
                        <motion.button
                          key={cat.id}
                          whileHover={{ y: -4 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleAnalyze(cat.data)}
                          className="group relative aspect-[4/5] rounded-2xl overflow-hidden bg-secondary/10 border border-border/50 transition-all hover:shadow-xl hover:shadow-primary/5"
                        >
                          <img 
                            src={cat.image} 
                            alt={cat.label}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                          <div className="absolute bottom-0 left-0 right-0 p-4">
                            <span className="text-xs font-bold text-white/90 uppercase tracking-wider">
                              {cat.label}
                            </span>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>
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
