import {
  FeedbackSection,
  FindUsSection,
  FooterSection,
  HeroSection,
  ImageLibrarySection,
  MenuSection,
  NavSection,
  PromotionSection,
  StorySection,
} from "@/components/sections";


export default function Home() {
  return (
    <section>
      <NavSection />
      <HeroSection />
      <StorySection />
      <MenuSection />
      <PromotionSection />
      <ImageLibrarySection />
      <FeedbackSection />
      <FindUsSection />
      <FooterSection />
    </section>
  );
}
