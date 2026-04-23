import { Badge } from "@/components/ui/badge"
import SearchBar from "@/components/element/searchButton"
import FeaturedContent from "./components/featuredContent"
import LatestContent from "./components/latestContent"

export default function Home() {

    return (
        <div className="">

            <div className="flex justify-center items-center py-10 flex-col px-5">
                <Badge>blog</Badge>
                <p className="text-md md:text-4xl font-bold text-center max-w-xl mx-auto">
                    Discovery our latest news
                </p>

                <p className="text-xs md:text-sm font-bold text-center max-w-md mx-auto">
                    Discovery the achievement that set us apart for ground breaking project to industry accolader, we take pride in our accomplishments.
                </p>

                <div className="w-full flex justify-center py-5">
                    <SearchBar blogs={[]} />
                </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-4">
                <div className="md:col-span-3 p-2 flex-col justify-between">
                    <Badge>Featured</Badge>
                    <FeaturedContent />
                </div>
                <div className="md:col-span-1 p-2">
                    <Badge>Latest</Badge>
                    <LatestContent />
                </div>
            </div>

        </div>
    )
}