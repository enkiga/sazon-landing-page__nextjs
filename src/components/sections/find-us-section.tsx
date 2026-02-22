import SectionWrapper from "../reusables/section-wrapper";
import Image from "next/image";
import { Typography } from "../ui/typography";
import { Clock, ExternalLink, Store } from "lucide-react";
import { Button } from "../ui/button";

const FindUsSection = () => {
  return (
    <SectionWrapper className="my-16 rounded-lg px-0 lg:px-0 md:px-0 bg-white/85 dark:bg-gray-900 flex flex-col lg:flex-row lg:items-center lg:h-[60vh] overflow-hidden">
      <div className="w-full lg:w-1/2 lg:h-full">
        <Image
          src="https://images.unsplash.com/photo-1629486543594-a11f83fdc4e3?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fG1leGljYW4lMjByZXN0YXVyYW50fGVufDB8fDB8fHww"
          alt="Find Us"
          width={600}
          height={400}
          className="w-full h-full rounded-t-lg lg:rounded-t-none lg:rounded-l-lg object-cover"
        />
      </div>
      <div className="flex flex-col gap-6 p-6 lg:p-12 mx-auto w-full lg:w-1/2 ">
        <Typography variant="h2" className="text-foreground">
          Find Us
        </Typography>
        <div className="flex items-start gap-4 ">
          <Store className="size-10 p-2 bg-primary/10 text-primary rounded-full" />
          <div className="flex flex-col gap-1">
            <Typography
              variant="small"
              className="text-foreground/80 font-bold"
            >
              Westlands, Nairobi
            </Typography>
            <Typography variant="small" className="text-foreground/80 mt-1">
              Ground Floor, ABC Place
            </Typography>
            <Typography
              variant="small"
              className="text-primary mt-1 flex items-center gap-1"
            >
              Get Directions
              <ExternalLink className="size-4" />
            </Typography>
          </div>
        </div>
        <div className="flex items-start gap-4 mt-4">
          <Clock className="size-10 p-2 bg-primary/10 text-primary rounded-full" />
          <div className="flex flex-col gap-1">
            <Typography
              variant="small"
              className="text-foreground/80 font-bold"
            >
              Opening Hours
            </Typography>
            <Typography variant="small" className="text-foreground/80 mt-1">
              Mon-Fri: 11am - 10pm
            </Typography>
            <Typography variant="small" className="text-foreground/80 mt-1">
              Sat-Sun: 12pm - 11pm
            </Typography>
          </div>
        </div>
        <Button className="bg-foreground">Call for Reservations</Button>
      </div>
    </SectionWrapper>
  );
};

export default FindUsSection;
