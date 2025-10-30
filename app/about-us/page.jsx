import PreloaderLink from "@/components/PreloaderLink";
import { P, StaggerContainer } from "@/components/typography";
import Heading from "@/components/typography/Heading";
import Section from "@/components/uielements/Section";
import Image from "next/image";

export default function page() {
  return (
    <Section sclass="bg-gradient-to-t from-prime/10 to-white" className="py-12">
      <div className="grid lg:grid-cols-2">
        <div className="space-y-5">
          <StaggerContainer>
            <Heading
            black="About"
            blue="Us"
            />
            <P>
              For over three decades, Vedanta Foundation has been empowering
              lives through education, skill development, and meaningful
              employment. Our network of schools, colleges, and vocational
              training centers has transformed thousands of futures across India
              — shaping disciplined, ethical, and confident professionals.
            </P>
            <P>
              With <PreloaderLink href="https://Jobcliff.com" className="underline hover:text-prime">Jobcliff.com</PreloaderLink>, we are taking this mission online. This
              not-for-profit platform connects aspirants to real job
              opportunities, industry-aligned training, and essential life
              skills, helping them build sustainable and rewarding careers.
            </P>
            <P>
              Our vision is simple yet powerful — to make quality skill
              development and employment accessible to every Indian, unlocking
              potential and driving social transformation at scale.
            </P>
          </StaggerContainer>
        </div>
        <div>
            <div className="sticky top-24 bg-white rounded-lg shadow-lg w-fit mx-auto p-6 pe-2">
                <Image
                src="/logojob.svg"
                width={300}
                height={100}
                className="max-w-full mt-5"
                alt="jobcliff"
                />
            </div>
        </div>
      </div>
    </Section>
  );
}
