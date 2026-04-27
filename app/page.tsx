import Hero from "@/components/Hero";
import Quote from "@/components/Quote";
import Works from "@/components/Works";
import ServiceContact from "@/components/ServiceContact";

export default function PortfolioPage() {
  return (
    <main className="relative bg-brand-cream">
      <Hero />
      <Quote />
      <Works />
      <ServiceContact />
    </main>
  );
}

