
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="py-20 bg-primary/5">
      <div className="container">
        <div className="rounded-2xl bg-gradient-to-r from-cf-blue to-cf-orange p-px">
          <div className="bg-background rounded-2xl p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">
                  Unlock the Full Power of Edge Computing
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Actor Kit provides the missing abstraction layer on top of Durable Objects. Build complex, interactive applications that scale effortlessly on Cloudflare Workers.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-gradient-to-r from-cf-blue to-cf-orange text-white hover:opacity-90">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Link to="/docs">
                    <Button size="lg" variant="outline">
                      Read the Docs
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="bg-card/50 border rounded-xl p-6">
                <h3 className="font-semibold mb-4">Perfect For:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="h-5 w-5 rounded-full bg-gradient-to-r from-green-400 to-green-500 flex items-center justify-center text-white text-xs mr-3 mt-0.5">✓</span>
                    <div>
                      <span className="font-medium">Multiplayer Games</span>
                      <p className="text-sm text-muted-foreground">Real-time state synchronization across players</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="h-5 w-5 rounded-full bg-gradient-to-r from-green-400 to-green-500 flex items-center justify-center text-white text-xs mr-3 mt-0.5">✓</span>
                    <div>
                      <span className="font-medium">Collaborative Tools</span>
                      <p className="text-sm text-muted-foreground">Document editing, whiteboards, planning tools</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="h-5 w-5 rounded-full bg-gradient-to-r from-green-400 to-green-500 flex items-center justify-center text-white text-xs mr-3 mt-0.5">✓</span>
                    <div>
                      <span className="font-medium">IoT Applications</span>
                      <p className="text-sm text-muted-foreground">Device state management at the edge</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="h-5 w-5 rounded-full bg-gradient-to-r from-green-400 to-green-500 flex items-center justify-center text-white text-xs mr-3 mt-0.5">✓</span>
                    <div>
                      <span className="font-medium">Distributed Systems</span>
                      <p className="text-sm text-muted-foreground">Building global, highly available applications</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
