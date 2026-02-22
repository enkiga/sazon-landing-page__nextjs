import SectionWrapper from "../reusables/section-wrapper";
import { Typography } from "../ui/typography";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";

const dummyMenuItems = [
  {
    id: 1,
    name: "Al Pastor Tacos",
    tag: "Most Popular",
    description:
      "Marinated pork shoulder, grilled pineapple, onion, cilantro, and salsa verde on corn tortillas.",
    price: "KES 950",
    image:
      "https://images.unsplash.com/photo-1726514734441-dde9eabd9208?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    name: "Carne Asada Burrito",
    tag: "Chef's Special",
    description:
      "Grilled steak, cilantro-lime rice, black beans, pico de gallo, cheese, and crema wrapped in flour tortilla.",
    price: "KES 1100",
    image:
      "https://images.unsplash.com/photo-1622816931574-4c027c474fb0?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    name: "Loaded Nachos",
    tag: "Sharable",
    description:
      "House-made chips topped with queso blanco, black beans, jalapeños, guacamole, and choice of meat.",
    price: "KES 1300",
    image:
      "https://images.unsplash.com/photo-1582169296194-e4d644c48063?q=80&w=1900&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const MenuSection = () => {
  return (
    <SectionWrapper className="py-16 flex flex-col gap-12">
      <div className="flex flex-col lg:flex-row lg:items-start justify-between">
        <div className="flex flex-col gap-0">
          <Typography variant="h2" className="text-foreground">
            Crowd Favorites
          </Typography>
          <Typography variant="body" className="text-foreground/80 mt-2">
            Our best-selling dishes that keep Nairobi coming back.
          </Typography>
        </div>
        <Button variant="ghost" className="hidden lg:flex">
          <Typography variant="button" className="text-primary cursor-pointer">
            View Full Menu
            <ArrowRight className="inline-block size-4" />
          </Typography>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {dummyMenuItems.map((item) => (
          <div
            key={item.id}
            className="rounded-lg overflow-hidden shadow-lg relative"
          >
            <Image
              src={item.image}
              alt={item.name}
              className="w-full h-72 object-cover"
              width={1925}
              height={1080}
            />
            <div className="absolute top-3 right-3 bg-primary px-2 pb-1 rounded-full">
              <Typography
                variant="small"
                className="text-white uppercase text-xs font-bold"
              >
                {item.tag}
              </Typography>
            </div>
            <div className="p-4 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <Typography variant="h3" className="text-foreground font-bold">
                  {item.name}
                </Typography>
                <Typography
                  variant="h3"
                  className="text-primary font-bold mt-2"
                >
                  {item.price}
                </Typography>
              </div>

              <Typography
                variant="small"
                className="text-foreground/80 border-t border-foreground/10 pt-2"
              >
                {item.description}
              </Typography>
            </div>
          </div>
        ))}
      </div>
      <Button variant="default" className="lg:hidden">
        <Typography variant="button" className="flex items-center gap-4">
          View Full Menu
          <ArrowRight />
        </Typography>
      </Button>
    </SectionWrapper>
  );
};

export default MenuSection;
