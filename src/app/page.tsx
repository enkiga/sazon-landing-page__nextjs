import {
  CategorySection,
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
      <CategorySection />
      <MenuSection />
      <PromotionSection />
      <ImageLibrarySection />
      <FeedbackSection />
      <FindUsSection />
      <FooterSection />
    </section>
  );
}
