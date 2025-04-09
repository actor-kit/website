
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

const Testimonials = () => {
  const testimonials = [
    {
      quote: "Actor Kit has transformed how we build state-driven applications on Cloudflare. It feels like it could be an official Cloudflare product - exactly the abstraction layer we needed.",
      author: "Sarah Johnson",
      title: "Senior Engineer at TechFlow",
      avatar: "",
      initials: "SJ"
    },
    {
      quote: "This library solves so many challenges we faced with Durable Objects. It's the perfect marriage of XState's powerful state machines with Cloudflare's global infrastructure.",
      author: "Michael Chen",
      title: "Lead Developer at EdgeWorks",
      avatar: "",
      initials: "MC"
    },
    {
      quote: "We moved our multiplayer game from a traditional backend to Cloudflare Workers with Actor Kit and saw a 40% reduction in latency globally. This project deserves more visibility.",
      author: "Alex Rivera",
      title: "CTO at GameStream",
      avatar: "",
      initials: "AR"
    }
  ];

  return (
    <section className="py-20">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Loved by Edge Developers
          </h2>
          <p className="text-lg text-muted-foreground">
            Actor Kit is being used to build production applications with real-time, distributed state.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border">
              <CardContent className="p-6">
                <div className="flex flex-col h-full">
                  <blockquote className="text-lg mb-6 flex-grow">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-3">
                      {testimonial.avatar && <AvatarImage src={testimonial.avatar} alt={testimonial.author} />}
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {testimonial.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{testimonial.author}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.title}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
