import { Button } from "@/components/ui/button";
import { ArrowRight, Workflow, Zap, Shield } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-slate-200/60 dark:bg-grid-slate-800/20 bg-[length:20px_20px] [mask-image:radial-gradient(white,transparent_88%)]"></div>
      
      <div className="container relative py-20 md:py-32 flex flex-col items-center text-center">
        <div className="animate-fade-in opacity-0" style={{ animationDelay: "0.1s" }}>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-r from-cf-blue to-cf-orange">
            Better State Management for Edge Computing
          </h1>
        </div>
        
        <div className="animate-fade-in opacity-0" style={{ animationDelay: "0.3s" }}>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mb-8">
            Actor Kit is a powerful state machine framework built for <span className="text-foreground font-medium">Cloudflare Workers</span>, making distributed systems easier to build and maintain.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in opacity-0" style={{ animationDelay: "0.5s" }}>
          <Button size="lg" className="bg-gradient-to-r from-cf-blue to-cf-orange text-white hover:opacity-90">
            Get Started <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button size="lg" variant="outline">
            View on GitHub
          </Button>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-left animate-fade-in opacity-0" style={{ animationDelay: "0.7s" }}>
          <div className="flex flex-col p-6 bg-card/50 backdrop-blur-sm border rounded-xl">
            <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
              <Workflow className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">State Machine Architecture</h3>
            <p className="text-muted-foreground">
              Model complex application logic with a predictable, visualizable state machine approach.
            </p>
          </div>
          
          <div className="flex flex-col p-6 bg-card/50 backdrop-blur-sm border rounded-xl">
            <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Edge-Native Performance</h3>
            <p className="text-muted-foreground">
              Built from the ground up for Cloudflare Workers with real-time, distributed state management.
            </p>
          </div>
          
          <div className="flex flex-col p-6 bg-card/50 backdrop-blur-sm border rounded-xl">
            <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Type-Safe Operations</h3>
            <p className="text-muted-foreground">
              First-class TypeScript support with Zod for runtime validation and type safety.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
