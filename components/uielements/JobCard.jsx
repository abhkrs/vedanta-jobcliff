import SpotlightCard from "@/components/SpotlightCard";
import PreloaderLink from "@/components/PreloaderLink";
import Image from "next/image";
import { AnimatedText } from "../typography";
import { Heart, MapPin } from "lucide-react";

export default function jobdataCard({ jobdata }) {
    return (
        <AnimatedText>
            <SpotlightCard className="!bg-white rounded-xl p-2.5 shadow-md">
                <div className="flex items-start gap-2">
                    <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-gray-200">
                        <Image
                            src={jobdata.logo}
                            alt={jobdata.title}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="flex-1 px-3 py-1 rounded bg-white/50 text-black">
                        <h3 className="font-semibold mb-1">{jobdata.title}</h3>
                        <p className="text-sm flex items-top gap-1"><MapPin size={18} />{jobdata.company}</p>
                    </div>
                </div>
                <hr className="mb-3 mt-5 border-gray-200" />
                <div className="flex gap-2 items-center">
                    <PreloaderLink
                        href={`/companies/${jobdata.slug}`}
                        className="text-prime border border-prime rounded-full block text-center py-2 px-5 backdrop-blur-md bg-white/50 hover:bg-prime hover:text-white transition-all duration-100"
                    >
                        View Details
                    </PreloaderLink>
                    <button className="rounded-full border border-prime">
                        <Heart size={20} className="text-prime" />
                    </button>
                </div>
            </SpotlightCard>
        </AnimatedText>
    );
}