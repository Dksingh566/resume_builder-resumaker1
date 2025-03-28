
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Check, X, HelpCircle, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface PlanFeature {
  name: string;
  free: boolean | string;
  premium: boolean | string;
  pro: boolean | string;
  tooltip?: string;
}

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  
  const features: PlanFeature[] = [
    {
      name: "Number of resumes",
      free: "2",
      premium: "10",
      pro: "Unlimited",
      tooltip: "The number of different resumes you can create and save"
    },
    {
      name: "Templates",
      free: "3 Basic",
      premium: "10+ Premium",
      pro: "All templates + Priority access",
      tooltip: "Access to our collection of professional resume templates"
    },
    {
      name: "AI content suggestions",
      free: "Limited",
      premium: true,
      pro: "Advanced",
      tooltip: "AI-powered suggestions to improve your resume content"
    },
    {
      name: "Export formats",
      free: "PDF",
      premium: "PDF, DOCX",
      pro: "PDF, DOCX, TXT, JSON",
      tooltip: "Available formats for downloading your resume"
    },
    {
      name: "Remove watermark",
      free: false,
      premium: true,
      pro: true,
      tooltip: "Removal of the Resumaker logo from your resume"
    },
    {
      name: "Cover letter builder",
      free: false,
      premium: true,
      pro: true,
      tooltip: "Build matching cover letters for your resumes"
    },
    {
      name: "Custom sections",
      free: false,
      premium: true,
      pro: true,
      tooltip: "Add custom sections to your resume"
    },
    {
      name: "LinkedIn profile integration",
      free: false,
      premium: false,
      pro: true,
      tooltip: "Import data from your LinkedIn profile"
    },
    {
      name: "ATS optimization",
      free: false,
      premium: true,
      pro: "Advanced",
      tooltip: "Enhance your resume to pass Applicant Tracking Systems"
    },
    {
      name: "Priority support",
      free: false,
      premium: false,
      pro: true,
      tooltip: "Get priority assistance from our support team"
    }
  ];
  
  const renderFeatureValue = (value: boolean | string) => {
    if (typeof value === "string") {
      return <span>{value}</span>;
    }
    
    return value ? (
      <Check className="h-5 w-5 text-green-500" />
    ) : (
      <X className="h-5 w-5 text-red-500 opacity-50" />
    );
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 mt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 font-display">Simple, Transparent Pricing</h1>
            <p className="text-lg text-muted-foreground">
              Choose the plan that fits your needs. All plans include access to our core resume builder.
            </p>
          </div>
          
          {/* Pricing Toggle */}
          <div className="flex justify-center items-center mb-12">
            <div className="bg-secondary rounded-full p-1 flex">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  billingCycle === "monthly" ? "bg-white dark:bg-primary text-primary-foreground" : "text-muted-foreground"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle("yearly")}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  billingCycle === "yearly" ? "bg-white dark:bg-primary text-primary-foreground" : "text-muted-foreground"
                }`}
              >
                Yearly
                <span className="ml-1 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded-full">-20%</span>
              </button>
            </div>
          </div>
          
          {/* Price Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden flex flex-col">
              <div className="p-6 pb-8">
                <h3 className="text-lg font-bold mb-1">Free</h3>
                <p className="text-muted-foreground text-sm mb-4">Basic resume creation</p>
                <div className="flex items-end gap-1 mb-6">
                  <span className="text-4xl font-bold">$0</span>
                  <span className="text-muted-foreground mb-1">forever</span>
                </div>
                <Button asChild className="w-full">
                  <Link to="/signup">Get Started</Link>
                </Button>
              </div>
              
              <div className="px-6 py-4 bg-muted/50 text-sm">
                <p>Includes:</p>
              </div>
              
              <div className="p-6 space-y-4 text-sm flex-1">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-6 mr-3 flex justify-center">
                      {renderFeatureValue(feature.free)}
                    </div>
                    <span>{feature.name}</span>
                    {feature.tooltip && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="h-4 w-4 ml-2 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">{feature.tooltip}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Premium Plan */}
            <div className="bg-card border-2 border-primary rounded-xl shadow-md overflow-hidden flex flex-col relative">
              <div className="absolute top-5 right-5">
                <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">Popular</span>
              </div>
              
              <div className="p-6 pb-8">
                <h3 className="text-lg font-bold mb-1">Premium</h3>
                <p className="text-muted-foreground text-sm mb-4">Professional resume tools</p>
                <div className="flex items-end gap-1 mb-6">
                  <span className="text-4xl font-bold">${billingCycle === "monthly" ? "9.99" : "7.99"}</span>
                  <span className="text-muted-foreground mb-1">/ {billingCycle === "monthly" ? "month" : "month (billed yearly)"}</span>
                </div>
                <Button asChild className="w-full">
                  <Link to="/signup?plan=premium">Choose Premium</Link>
                </Button>
              </div>
              
              <div className="px-6 py-4 bg-primary/10 text-sm">
                <p>Everything in Free, plus:</p>
              </div>
              
              <div className="p-6 space-y-4 text-sm flex-1">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-6 mr-3 flex justify-center">
                      {renderFeatureValue(feature.premium)}
                    </div>
                    <span>{feature.name}</span>
                    {feature.tooltip && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="h-4 w-4 ml-2 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">{feature.tooltip}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Pro Plan */}
            <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden flex flex-col">
              <div className="p-6 pb-8">
                <h3 className="text-lg font-bold mb-1">Pro</h3>
                <p className="text-muted-foreground text-sm mb-4">Advanced career tools</p>
                <div className="flex items-end gap-1 mb-6">
                  <span className="text-4xl font-bold">${billingCycle === "monthly" ? "19.99" : "15.99"}</span>
                  <span className="text-muted-foreground mb-1">/ {billingCycle === "monthly" ? "month" : "month (billed yearly)"}</span>
                </div>
                <Button asChild className="w-full">
                  <Link to="/signup?plan=pro">Choose Pro</Link>
                </Button>
              </div>
              
              <div className="px-6 py-4 bg-muted/50 text-sm">
                <p>Everything in Premium, plus:</p>
              </div>
              
              <div className="p-6 space-y-4 text-sm flex-1">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-6 mr-3 flex justify-center">
                      {renderFeatureValue(feature.pro)}
                    </div>
                    <span>{feature.name}</span>
                    {feature.tooltip && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="h-4 w-4 ml-2 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">{feature.tooltip}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Testimonial */}
          <div className="mt-20 max-w-3xl mx-auto bg-card p-8 rounded-xl border border-border">
            <div className="flex items-center gap-4 mb-4">
              <div className="rounded-full bg-primary/10 p-3">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Satisfaction Guaranteed</h3>
                <p className="text-muted-foreground">30-day money-back guarantee for all paid plans</p>
              </div>
            </div>
            
            <blockquote className="text-lg italic border-l-4 pl-4 border-primary/20 my-4">
              "Resumaker helped me land interviews at three Fortune 500 companies! The premium templates and AI suggestions made my resume stand out."
            </blockquote>
            
            <div className="text-right text-sm text-muted-foreground">
              — Sarah K., Software Engineer
            </div>
          </div>
          
          {/* FAQ */}
          <div className="mt-20 max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-12">Frequently Asked Questions</h2>
            
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div>
                <h3 className="font-semibold mb-2">Can I cancel anytime?</h3>
                <p className="text-muted-foreground">Yes, you can cancel your subscription at any time. Your paid features will remain active until the end of your billing period.</p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">How does the AI assistant work?</h3>
                <p className="text-muted-foreground">Our AI analyzes your resume content and suggests improvements based on industry standards and job requirements.</p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Do you offer student discounts?</h3>
                <p className="text-muted-foreground">Yes! Students can receive 50% off any plan. Contact our support team with your school email for verification.</p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Can I switch plans later?</h3>
                <p className="text-muted-foreground">Absolutely. You can upgrade or downgrade your plan at any time, and the price will be prorated accordingly.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
