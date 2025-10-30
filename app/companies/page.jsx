import { P } from "@/components/typography";
import Heading from "@/components/typography/Heading";
import Section from "@/components/uielements/Section";
import CompanyCard from "@/components/uielements/CompanyCard";

export default function page() {
    const companies = [
        { slug: "sound-society", name: "Sound Society India", location: "Mumbai, India", logo: "/Logo Image (1).png" },
        { slug: "zomato", name: "Zomato", location: "Mumbai, India", logo: "/Logo Image.png" },
        { slug: "lenskart", name: "Lenskart", location: "Mumbai, India", logo: "/Logo Image (2).png" },
        { slug: "sound-society", name: "Sound Society India", location: "Mumbai, India", logo: "/Logo Image (1).png" },
        { slug: "zomato", name: "Zomato", location: "Mumbai, India", logo: "/Logo Image.png" },
        { slug: "lenskart", name: "Lenskart", location: "Mumbai, India", logo: "/Logo Image (2).png" },
        { slug: "sound-society", name: "Sound Society India", location: "Mumbai, India", logo: "/Logo Image (1).png" },
        { slug: "zomato", name: "Zomato", location: "Mumbai, India", logo: "/Logo Image.png" },
        { slug: "lenskart", name: "Lenskart", location: "Mumbai, India", logo: "/Logo Image (2).png" },
        { slug: "sound-society", name: "Sound Society India", location: "Mumbai, India", logo: "/Logo Image (1).png" },
        { slug: "zomato", name: "Zomato", location: "Mumbai, India", logo: "/Logo Image.png" },
        { slug: "lenskart", name: "Lenskart", location: "Mumbai, India", logo: "/Logo Image (2).png" },
    ];

    return (
        <>
            <Section className="py-8 md:py-10 lg:py-12" sclass="bg-gradient-to-t from-white via-prime/05 to-prime/10">
                <Heading
                    black="Companies"
                    blue="That Are Hiring"
                    className="text-center"
                />
                <P className="text-center mx-auto max-w-xl my-4 text-black/90">Discover opportunities with top employers who are actively building their teams and shaping the future.</P>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6 sm:mt-8 md:mt-10 lg:mt-12">
                    {companies.map((company, i) => (
                        <CompanyCard key={i} company={company} />
                    ))}
                </div>
            </Section>
        </>
    )
}
