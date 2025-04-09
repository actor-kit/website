
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Examples = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-12">
        <h1 className="text-4xl font-bold mb-6">Examples</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Real-world examples showing Actor Kit in action.
        </p>
        
        <div className="prose max-w-none">
          <p>
            Examples page is under construction. Please check back soon for live demos of Actor Kit applications.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Examples;
