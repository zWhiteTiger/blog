"use client"

import Link from "next/link"

export default function FooterBar() {
    return (
        <footer className="w-full border-t mt-10">
            <div className="max-w-6xl mx-auto px-4 py-10">

                {/* Top Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

                    {/* Brand */}
                    <div>
                        <h2 className="text-lg font-bold">MyBlog</h2>
                        <p className="text-sm text-muted-foreground mt-2">
                            Sharing knowledge about web development, UI/UX and modern tech.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="font-semibold mb-3">Navigation</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/">Home</Link></li>
                            <li><Link href="/blog">Blog</Link></li>
                            <li><Link href="/projects">Projects</Link></li>
                            <li><Link href="/about">About</Link></li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="font-semibold mb-3">Resources</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="#">Docs</Link></li>
                            <li><Link href="#">API</Link></li>
                            <li><Link href="#">Tutorials</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-semibold mb-3">Contact</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>Email: hello@myblog.com</li>
                            <li>Twitter: @myblog</li>
                            <li>GitHub: myblog</li>
                        </ul>
                    </div>

                </div>

                {/* Bottom */}
                <div className="mt-10 border-t pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-muted-foreground">

                    <p>© {new Date().getFullYear()} MyBlog. All rights reserved.</p>

                    <div className="flex gap-4">
                        <Link href="#">Privacy Policy</Link>
                        <Link href="#">Terms</Link>
                    </div>

                </div>

            </div>
        </footer>
    )
}