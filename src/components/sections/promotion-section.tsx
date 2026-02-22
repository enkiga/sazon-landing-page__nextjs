import React from "react";
import SectionWrapper from "../reusables/section-wrapper";
import { Typography } from "../ui/typography";
import { Button } from "../ui/button";
import { Tag } from "lucide-react";
import Image from "next/image";

type Props = {};

const PromotionSection = (props: Props) => {
  return (
    <SectionWrapper className="py-16 lg:px-24 flex flex-col lg:flex-row items-center gap-16 bg-accent rounded-lg">
      <div className="flex flex-col gap-3 w-full lg:w-2/3">
        <Typography
          variant="small"
          className="text-white text-xs uppercase font-bold bg-white/30 border border-white/40 px-2 py-1 rounded-full w-max"
        >
          Weekly Special
        </Typography>
        <Typography variant="h2" className="text-white">
          Taco Tuesday is Here!
        </Typography>
        <Typography variant="small" className="text-white/80 ">
          Buy 2 get 1 free on all Taco platters every Tuesday. Gather your
          amigos and feast.
        </Typography>
        <Button className="self-start bg-white rounded-full text-accent flex items-center gap-2 px-10 mt-4" size="lg">
          <Typography variant="button" className="text-accent font-semibold">
            Claim Deal
          </Typography>
          <Tag className="size-4" />
        </Button>
      </div>
      <div className="relative size-70 lg:size-60 border-4 border-white/80 rounded-lg rotate-6">
        <Image
          src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Taco Tuesday Promotion"
          width={600}
          height={600}
          className="absolute inset-0 w-full h-full object-cover rounded-lg"
        />
      </div>
    </SectionWrapper>
  );
};

export default PromotionSection;
