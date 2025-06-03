
import React from 'react';
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Check, ChevronRight, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureItem {
  title: string;
  description: string;
}

interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  company: string;
}

interface SegmentLandingPageProps {
  segment: string;
  headline: string;
  subheadline: string;
  problem: string;
  solution: string;
  cta: string;
  features: FeatureItem[];
  testimonials: TestimonialItem[];
  bgColor?: string;
  accentColor?: string;
  heroImage?: string;
}

const SegmentLandingPage: React.FC<SegmentLandingPageProps> = ({
  segment,
  headline,
  subheadline,
  problem,
  solution,
  cta,
  features,
  testimonials,
  bgColor = "bg-primary",
  accentColor = "text-primary",
  heroImage
}) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className={cn("w-full py-12 md:py-24 lg:py-32", bgColor, "text-white")}>
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-white/10 px-3 py-1 text-sm backdrop-blur">
                TechCare para {segment}
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                {headline}
              </h1>
              <p className="text-muted-foreground text-white/80 md:text-xl">
                {subheadline}
              </p>
              <div className="flex flex-col gap-2 md:flex-row">
                <Button className="bg-white text-primary hover:bg-white/90" size="lg">
                  {cta}
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white/20" size="lg">
                  Agendar demonstração <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
            {heroImage && (
              <div className="mx-auto max-w-sm overflow-hidden rounded-xl bg-gray-50 shadow-xl lg:max-w-none">
                <img
                  src={heroImage}
                  alt={`${segment} TechCare`}
                  className="w-full object-cover"
                />
              </div>
            )}
            {!heroImage && (
              <div className="mx-auto max-w-sm overflow-hidden rounded-xl bg-white/10 backdrop-blur-sm shadow-xl lg:max-w-none p-6 h-[400px] flex justify-center items-center border border-white/20">
                <p className="text-center text-white/60 text-sm">Imagem ilustrativa do {segment}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Problem Solution Section */}
      <section className="w-full py-12 md:py-24 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                O Desafio
              </div>
              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">
                O problema
              </h2>
              <p className="text-muted-foreground">
                {problem}
              </p>
            </div>
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                Nossa Solução
              </div>
              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">
                Como resolvemos
              </h2>
              <p className="text-muted-foreground">
                {solution}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className={cn("inline-block rounded-lg px-3 py-1 text-sm", `text-${accentColor}`)}>
                Recursos
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Funcionalidades especiais para {segment}
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                Nossa plataforma oferece ferramentas específicas para o seu segmento.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Check className={cn("mr-2 h-5 w-5", accentColor)} /> {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-12 md:py-24 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className={cn("inline-block rounded-lg px-3 py-1 text-sm", `text-${accentColor}`)}>
                Depoimentos
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                O que nossos clientes dizem
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                Veja como estamos transformando negócios como o seu
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="shadow-sm">
                <CardHeader>
                  <CardDescription className="text-lg italic">
                    "{testimonial.quote}"
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}, {testimonial.company}</p>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={cn("w-full py-12 md:py-24", bgColor, "text-white")}>
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Comece agora mesmo
              </h2>
              <p className="max-w-[600px] text-white/80 md:text-xl/relaxed">
                Junte-se a centenas de {segment.toLowerCase()} que já estão otimizando seus negócios com o TechCare.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button className="bg-white text-primary hover:bg-white/90" size="lg">
                {cta}
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/20" size="lg">
                Fale com um especialista
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-6 bg-background border-t">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                TechCare Automation Platform © {new Date().getFullYear()}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SegmentLandingPage;
