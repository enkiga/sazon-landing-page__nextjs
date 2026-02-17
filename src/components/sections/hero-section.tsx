import Image from "next/image";
import React from "react";
import SectionWrapper from "../reusables/section-wrapper";
import { Typography } from "../ui/typography";
import { Button } from "../ui/button";

type Props = {};

const HeroSection = (props: Props) => {
  return (
    <section className="relative w-full h-[90vh]">
      <div className="absolute inset-0 bg-linear-to-b from-black/40 to-black/90" />
      <Image
        src="https://images.unsplash.com/photo-1611250188496-e966043a0629?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Hero Image"
        width={1200}
        height={800}
        className="w-full h-full object-cover"
      />
      <SectionWrapper className="absolute inset-0 flex flex-col justify-center gap-6">
        <Typography variant="small" className="text-background text-xs bg-accent px-3 py-1.5 w-max rounded-full uppercase">
          Now delivering in Nairobi
        </Typography>
        <Typography variant="h1" className="text-background max-w-2xl">
          Bold Mexican Flavors in Nairobi
        </Typography>
        <Typography variant="body" className="text-background max-w-xl">
          Authentic street-style tacos and burritos, made fresh daily. Taste the vibrant flavors of Mexico in every bite.
        </Typography>
        <div className="flex gap-4">
            <Button className="rounded-full">
                Order Now
            </Button>
            <Button variant="outline" className="rounded-full">
                View Menu
            </Button>
        </div>
      </SectionWrapper>
    </section>
  );
};

export default HeroSection;
