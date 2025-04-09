
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Community = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-12">
        <h1 className="text-4xl font-bold mb-6">Community</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Join the Actor Kit community and get involved.
        </p>
        
        <div className="prose max-w-none">
          <p>
            Community page is under construction. Please check back soon for information on how to get involved with the Actor Kit project.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Community;
