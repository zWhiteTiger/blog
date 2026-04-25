import Appbar from "@/components/appbar/appbar"
import FooterBar from "@/components/footer/footerbar"

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div>
            <div className="sticky top-0 bg-black/2 dark:bg-black/70 backdrop-blur-sm z-50">
                <Appbar />
            </div>

            <div className="container mx-auto">
                {children}
            </div>

            <footer>
                <FooterBar />
            </footer>

        </div>
    )
}