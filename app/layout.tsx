
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <style>
@import url('https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Afacad+Flux:wght@100..1000&family=Alumni+Sans+SC:ital,wght@0,100..900;1,100..900&family=Arimo:ital,wght@0,400..700;1,400..700&family=Atkinson+Hyperlegible+Mono:ital,wght@0,200..800;1,200..800&family=Barlow:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Bitcount+Grid+Double:wght@100..900&family=Caveat:wght@400..700&family=Dancing+Script:wght@400..700&family=EB+Garamond:ital,wght@0,400..800;1,400..800&family=Edu+AU+VIC+WA+NT+Pre&family=Google+Sans+Code:ital,wght,MONO@0,300..800,1;1,300..800,1&family=Iosevka+Charon:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&family=Libertinus+Mono&family=Libertinus+Serif:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Lora:ital,wght@0,400..700;1,400..700&family=Michroma&family=Momo+Trust+Display&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Noto+Sans:ital,wght@0,100..900;1,100..900&family=Old+Standard+TT:ital,wght@0,400;0,700;1,400&family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Pacifico&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Playwrite+AU+NSW:wght@100..400&family=Playwrite+AU+SA:wght@100..400&family=Playwrite+GB+S:ital,wght@0,100..400;1,100..400&family=Playwrite+IN:wght@100..400&family=Playwrite+TZ+Guides&family=Playwrite+VN:wght@100..400&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&family=Raleway:ital,wght@0,100..900;1,100..900&family=Roboto+Mono:ital,wght@0,100..700;1,100..700&family=Roboto+Slab:wght@100..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Source+Code+Pro:ital,wght@0,200..900;1,200..900&family=Tektur:wght@400..900&family=Winky+Sans:ital,wght@0,300..900;1,300..900&display=swap');
</style>
      </head>
      <body className="flex min-h-screen flex-col">
        <SiteHeader />
        {children}
        <footer className="w-full border-t border-blue-900/10 bg-white px-4 py-6 text-center text-sm text-slate-500">
            <p>© 2026 AI Prompt Marketplace</p>
        </footer>
        </body>
    </html>
  );
}
