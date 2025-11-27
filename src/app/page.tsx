import HeroMatrix from "./(sections)/hero/HeroMatrix";
import SectionIntro from "./(sections)/intro/SectionIntro";
import SectionContact from "./(sections)/contact/SectionContact";

export default function HomePage() {
  return (
    <>
      <HeroMatrix />
      <SectionIntro />
      <SectionContact />
    </>
  );
}
