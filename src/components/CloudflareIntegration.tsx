
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";
import { 
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent 
} from "@/components/ui/chart";

const CloudflareIntegration = () => {
  const [diagramIsVisible, setDiagramIsVisible] = useState(false);

  useEffect(() => {
    // Set diagram to visible after a short delay for better visual appearance
    const timer = setTimeout(() => {
      setDiagramIsVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

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
            <div className="bg-[#0f1216] rounded-xl border border-zinc-800 shadow-2xl p-6 text-white transition-all duration-500 ease-in-out transform opacity-0 translate-y-4 scale-95" 
              style={{
                opacity: diagramIsVisible ? 1 : 0,
                transform: diagramIsVisible ? 'translateY(0) scale(1)' : 'translateY(4px) scale(0.95)'
              }}>
              <div className="flex items-center mb-4">
                <div className="h-4 w-4 rounded-full bg-cf-orange mr-2"></div>
                <h3 className="font-medium">Cloudflare Integration Diagram</h3>
              </div>
              
              <div className="relative h-[320px] w-full">
                {/* User Browser Box */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90%] border border-zinc-700 rounded-md p-3">
                  <div className="text-center mb-2 text-zinc-400">User Browser</div>
                  
                  {/* React Components Box */}
                  <div className="float-left w-[48%] border border-zinc-700 rounded-md p-2 text-sm">
                    <div className="font-mono text-xs">React Components</div>
                    <div className="font-mono text-xs text-zinc-400">useSelector,</div>
                    <div className="font-mono text-xs text-zinc-400">useSend</div>
                  </div>
                  
                  {/* Actor Kit Client Box */}
                  <div className="float-right w-[48%] border border-zinc-700 rounded-md p-2 text-sm">
                    <div className="font-mono text-xs">Actor Kit</div>
                    <div className="font-mono text-xs text-zinc-400">Client</div>
                  </div>
                  
                  {/* Arrow between boxes */}
                  <div className="clear-both relative h-8">
                    <div className="absolute left-[47%] top-0 mt-3 w-[6%] border-t border-dashed border-zinc-600"></div>
                    <div className="absolute left-[52%] top-0 mt-2 text-zinc-400">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m12 19-7-7 7-7"/>
                      </svg>
                    </div>
                  </div>
                  
                  {/* Vertical arrows down */}
                  <div className="relative h-6">
                    <div className="absolute left-1/4 h-6 border-l border-zinc-600"></div>
                    <div className="absolute left-1/4 bottom-0 translate-x-[-7px] text-zinc-400">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m19 12-7 7-7-7"/>
                      </svg>
                    </div>
                    
                    <div className="absolute right-1/4 h-6 border-l border-zinc-600"></div>
                    <div className="absolute right-1/4 bottom-0 translate-x-[-7px] text-zinc-400">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m19 12-7 7-7-7"/>
                      </svg>
                    </div>
                  </div>
                </div>
                
                {/* Cloudflare Edge Box */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] border border-zinc-700 rounded-md p-3">
                  <div className="text-center mb-2 text-zinc-400">Cloudflare Edge</div>
                  
                  {/* Actor Kit Router Box */}
                  <div className="float-left w-[48%] border border-zinc-700 rounded-md p-2 text-sm">
                    <div className="font-mono text-xs">Actor Kit Router</div>
                  </div>
                  
                  {/* Actor Server Box */}
                  <div className="float-right w-[48%] border border-zinc-700 rounded-md p-2 text-sm">
                    <div className="font-mono text-xs">Actor Server</div>
                    <div className="font-mono text-xs text-zinc-400">(Durable Obj)</div>
                  </div>
                  
                  {/* Arrow between boxes */}
                  <div className="clear-both relative h-6">
                    <div className="absolute left-[47%] top-3 w-[6%] border-t border-dashed border-zinc-600"></div>
                    <div className="absolute right-[54%] top-2 text-zinc-400">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14"/>
                        <path d="m12 5 7 7-7 7"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-zinc-400 text-sm mt-4">
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
