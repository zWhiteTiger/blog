import Appbar from "@/components/appbar/appbar"
import FooterBar from "@/components/footer/footerbar"

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="
  min-h-screen bg-background
  bg-[radial-gradient(circle,#e5e7eb_1px,transparent_1px)]
  dark:bg-[radial-gradient(circle,#334155_1px,transparent_1px)]
  bg-[size:40px_40px]
">

            <div className="mx-auto relative z-10">
                {children}
            </div>

        </div>
    )
}