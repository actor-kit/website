
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const CloudflareIntegration = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-secondary/30">
      <div className="container">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <div className="inline-flex items-center rounded-full border px-4 py-1 text-sm font-medium mb-6 bg-white shadow-sm">
              <span className="mr-1 h-2 w-2 rounded-full bg-cf-orange"></span>
              <span className="text-foreground">Perfect for Cloudflare Workers</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Built From the Ground Up for Cloudflare's Edge Network
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Actor Kit is specifically designed to work seamlessly with Cloudflare Workers and Durable Objects, providing a powerful abstraction for sophisticated stateful applications.
            </p>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-cf-orange mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-medium">Globally Distributed State</span>
                  <p className="text-sm text-muted-foreground">Manage application state across Cloudflare's 300+ locations worldwide</p>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-cf-orange mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-medium">Low Latency Interactions</span>
                  <p className="text-sm text-muted-foreground">Built for Durable Objects' actor model, maintaining state close to users</p>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-cf-orange mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-medium">Native Worker Integration</span>
                  <p className="text-sm text-muted-foreground">Seamlessly integrates with Cloudflare Workers' existing tooling</p>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-cf-orange mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-medium">Modern Developer Experience</span>
                  <p className="text-sm text-muted-foreground">TypeScript-first with full framework support for Next.js, Remix and more</p>
                </div>
              </li>
            </ul>
            
            <Button className="bg-cf-blue text-white hover:bg-cf-blue/90">
              View Cloudflare Documentation
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          <div className="md:w-1/2 relative">
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-cf-orange/10 rounded-full blur-[80px]"></div>
            <div className="bg-white rounded-xl border shadow-lg p-6">
              <div className="flex items-center mb-4">
                <div className="h-4 w-4 rounded-full bg-cf-orange mr-2"></div>
                <h3 className="font-medium">Cloudflare Integration Diagram</h3>
              </div>
              <div className="code-block p-4 mb-4 text-xs">
                <pre>
{`┌─────────────────────────────────────────┐
│           User Browser                   │
│  ┌──────────────────┐  ┌───────────────┐ │
│  │  React Components │  │ Actor Kit     │ │
│  │  useSelector,     │  │ Client        │ │
│  │  useSend          │<─┤               │ │
│  └──────────────────┘  └───────────────┘ │
└──────────────┬──────────────────┬────────┘
               │                  │
               ▼                  ▼
┌─────────────────────────────────────────┐
│           Cloudflare Edge               │
│  ┌──────────────────┐  ┌───────────────┐ │
│  │ Actor Kit Router │─>│ Actor Server  │ │
│  │                  │  │ (Durable Obj) │ │
│  └──────────────────┘  └───────────────┘ │
└─────────────────────────────────────────┘`}</pre>
              </div>
              <div className="text-muted-foreground text-sm">
                Actor Kit leverages Cloudflare's global network to provide real-time state synchronization with minimal latency, perfect for interactive applications requiring state management at the edge.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CloudflareIntegration;
