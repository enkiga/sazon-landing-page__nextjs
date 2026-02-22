import SectionWrapper from "../reusables/section-wrapper";
import { Typography } from "../ui/typography";
import Image from "next/image";
import { Star, StarHalf } from "lucide-react";

const dummyFeedback = [
  {
    id: 1,
    name: "Michael Odero",
    userImg:
      "https://images.unsplash.com/photo-1711500310970-1defb6bfce6b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDd8fGFmcmljYW4lMjB1c2VyfGVufDB8fDB8fHww",
    feedback:
      "The food at this Mexican restaurant is absolutely amazing! The flavors are authentic and the service is top-notch. I highly recommend trying their tacos and guacamole!",
    rating: 5,
  },
  {
    id: 2,
    name: "Silvester Maina",
    userImg:
      "https://images.unsplash.com/photo-1619452220963-4da4e145aba9?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    feedback:
      "I had a fantastic dining experience at this place. The ambiance is vibrant, and the staff is friendly. The enchiladas were delicious, and the margaritas were perfectly balanced.",
    rating: 4.5,
  },
  {
    id: 3,
    name: "Abigail Mwende",
    userImg:
      "https://images.unsplash.com/photo-1712821125603-4ee6b434a41f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fGFmcmljYW4lMjB1c2VyfGVufDB8fDB8fHww",
    feedback:
      "This restaurant has become my go-to spot for Mexican cuisine. The variety on the menu is impressive, and every dish I've tried has been bursting with flavor. Don't miss out on their churros for dessert!",
    rating: 5,
  },
];

const STAR_COUNT = 5;
const STAR_KEYS = [1, 2, 3, 4, 5] as const;

const StarRating = ({ rating }: { rating: number }) => {
  const clampedRating = Math.max(0, Math.min(rating, STAR_COUNT));
  const fullStars = Math.floor(clampedRating);
  const hasHalfStar = clampedRating % 1 >= 0.5;

  return (
    <div className="inline-flex items-center gap-1 text-primary">
      {STAR_KEYS.slice(0, fullStars).map((star) => (
        <Star
          key={`rating-full-${star}`}
          size={16}
          fill="currentColor"
          strokeWidth={0}
        />
      ))}
      {hasHalfStar && (
        <StarHalf
          key="rating-half"
          size={16}
          fill="currentColor"
          strokeWidth={0}
        />
      )}
      {clampedRating === 0 && (
        <Typography variant="small" className="text-foreground/60">
          No rating
        </Typography>
      )}
    </div>
  );
};

const FeedbackSection = () => {
  return (
    <div className="bg-white/85 dark:bg-gray-900">
      <SectionWrapper className="py-20 flex flex-col gap-6">
        <Typography variant="h2" className="text-foreground text-center">
          What the Familia Says
        </Typography>
        <div className="grid gap-6 lg:grid-cols-3">
          {dummyFeedback.map(({ id, name, userImg, feedback, rating }) => (
            <div
              key={id}
              className="rounded-lg border border-foreground/10 bg-foreground/5 p-4 flex flex-col items-start justify-between gap-5 shadow-lg"
            >
              <div className="mt-3">
                <StarRating rating={rating} />
              </div>
              <Typography variant="small" className="text-foreground/80 mt-2">
                {feedback}
              </Typography>
              <div className="flex items-center gap-2">
                <Image
                  src={userImg}
                  alt={name}
                  width={48}
                  height={48}
                  className="size-12 object-cover object-top rounded-full"
                />
                <Typography
                  variant="small"
                  className="text-foreground font-semibold"
                >
                  {name}
                </Typography>
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>
    </div>
  );
};

export default FeedbackSection;
