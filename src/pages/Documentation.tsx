
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Documentation = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-12">
        <h1 className="text-4xl font-bold mb-6">Documentation</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Comprehensive guides to help you get started with Actor Kit.
        </p>
        
        <div className="prose max-w-none">
          <p>
            Documentation page is under construction. Please check back soon for detailed guides on how to use Actor Kit.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Documentation;
