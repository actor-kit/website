import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-secondary/80 border-t">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <div className="flex items-center">
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cf-orange bg-clip-text text-transparent">
                  Actor Kit
                </span>
              </div>
            </Link>
            <p className="text-muted-foreground mb-4 max-w-md">
              Actor Kit is a library for running state machines in Cloudflare Workers, leveraging XState for robust state management.
            </p>
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Actor Kit. MIT License.
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://github.com/actor-kit/actor-kit#readme" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/actor-kit/actor-kit/tree/main/examples" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Examples
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/actor-kit/actor-kit" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a 
                  href="https://www.npmjs.com/package/actor-kit" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  npm
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Related</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://xstate.js.org/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  XState
                </a>
              </li>
              <li>
                <a 
                  href="https://workers.cloudflare.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Cloudflare Workers
                </a>
              </li>
              <li>
                <a 
                  href="https://developers.cloudflare.com/durable-objects/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Durable Objects
                </a>
              </li>
              <li>
                <a 
                  href="https://zod.dev/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Zod
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
