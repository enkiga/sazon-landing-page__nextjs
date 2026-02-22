import SectionWrapper from "../reusables/section-wrapper";
import { Typography } from "../ui/typography";
import { Flame, Leaf, SlidersHorizontal } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";

const dummyPointers = [
  {
    id: 1,
    icon: Leaf,
    title: "100% Fresh Ingredients",
    description: "Locally sourced produce, imported spices, never frozen.",
  },
  {
    id: 2,
    icon: SlidersHorizontal,
    title: "Fully Customizable",
    description:
      "Build your burrito, bowl, or tacos exactly how you crave them.",
  },
  {
    id: 3,
    icon: Flame,
    title: "Bold Sazón",
    description:
      "Our secret spice blends bring the heat and flavor you've been missing.",
  },
];

const StorySection = () => {
  return (
    <div className="bg-accent/10 overflow-x-hidden">
      <SectionWrapper className="py-16 flex flex-col lg:flex-row lg:items-start gap-12">
        <div className="w-full lg:w-1/2 flex flex-col gap-5">
          <div className="flex items-center gap-1">
            <hr className="w-6 border-primary" />
            <Typography variant="h3" className="text-primary">
              Our Story
            </Typography>
          </div>

          <Typography variant="h1" className="text-foreground">
            Authentic Roots, <span className="text-primary">Nairobi Sould</span>
          </Typography>
          <Typography variant="body" className="text-foreground">
            We bring the vibrant energy of Mexican street food to Westlands.
            Every tortilla is pressed fresh, every salsa is made from scratch,
            and every bite is packed with bold sazón. We don't cut corners; we
            dice onions.
          </Typography>
          <div className="flex flex-col gap-8 my-4">
            {dummyPointers.map((pointer) => (
              <div key={pointer.id} className="flex items-center gap-4">
                <pointer.icon className="text-secondary bg-secondary/10 rounded-full p-3 size-12" />
                <div className="flex flex-col gap-0.5">
                  <Typography
                    variant="h3"
                    className="text-foreground font-bold"
                  >
                    {pointer.title}
                  </Typography>
                  <Typography variant="body" className="text-foreground">
                    {pointer.description}
                  </Typography>
                </div>
              </div>
            ))}

            <Button className="self-start bg-foreground rounded-full" size="lg">
              Read our full story
            </Button>
          </div>
        </div>
        <div className="w-full lg:w-1/2 relative">
          <div className="w-full lg:h-187.5 object-cover rounded-lg shadow-lg relative z-10">
            <Image
              src="https://images.unsplash.com/photo-1654922207993-2952fec328ae?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Our Story Image"
              width={800}
              height={600}
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute rounded-lg inset-0 bg-linear-to-b from-transparent to-foreground/70" />
            <Typography
              variant="h3"
              className="absolute bottom-4 left-4 text-white"
            >
              &quot;Food is the ingredient that binds us together.&quot;
            </Typography>
            <div className="absolute top-20 -right-10 rounded-full size-26 border-6 border-white bg-primary flex items-center justify-center rotate-20">
              <Typography variant="small" className="text-white p-4 text-center uppercase font-semibold">
                Chef's Choice
              </Typography>
            </div>
          </div>
          <div className="absolute inset-0 bg-accent/30 rounded-lg rotate-4" />
        </div>
      </SectionWrapper>
    </div>
  );
};

export default StorySection;
