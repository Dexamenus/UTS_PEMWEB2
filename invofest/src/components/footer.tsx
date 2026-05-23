import { NavbarLink }  from "./navbarLink";
import { Home, Mic, Users, Trophy, Laptop, CirclePlay, MapPin } from "lucide-react";

export const Footer: React.FC = () => {
    const currentPath = "#";

    const menuItems = [

        {label: "Beranda", href:"#", icon: <Home size={18} />},
        {label: "Competition", href:"#competition", icon: <Trophy size={18} />},
        {label: "Seminar", href:"#seminar", icon: <Users size={18} />},
        {label: "Workshop", href:"#workshop", icon: <Laptop size={18} />},
        {label: "Talkshow", href:"#Talkshow", icon: <Mic size={18} />},
        
    ];

    const mediaItems = [
        {label: "Instagram", href: "#", icon: <CirclePlay size={18} />},
        {label: "Youtube", href: "#", icon: <CirclePlay size={18} />},

    ];

    return(
        <footer className="bg-pink-100 shadow-sm px-6 py-12 mt-10">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-3 w-full">
          
                    <div>
                        <img 
                            src="https://www.invofest-harkatnegeri.com/assets/nav-logo.png" 
                            alt="logo" 
                            className="h-16 object-contain"
                        />
                    </div>
                    
                    <div className="flex flex-col gap-4">

                        <h3 className="font-semibold text-gray-800 uppercase tracking-wider text-sm">
                            Menu Navigasi
                        </h3>
                        <div className="flex flex-col gap-3">
                            {menuItems.map((item) => (                        
                                <NavbarLink
                                    key={item.label}
                                    label={item.label}
                                    href={item.href}
                                    icon={item.icon}
                                    isActive={item.href === currentPath}
                                />
                            ))}
                        </div>
                    </div>
                    
                    <div className="flex flex-col gap-4">
                        <h3 className="font-semibold text-gray-800 uppercase tracking-wider text-sm">
                            Media sosial
                        </h3>
                        <div className="flex flex-col gap-3">
                            {mediaItems.map((item) => (
                                <NavbarLink
                                    key={item.label}
                                    label={item.label}
                                    href={item.href}
                                    icon={item.icon}
                                    isActive={item.href === currentPath}
                                />
                            ))}
                        </div>
                    </div>
                    
                 
                    <div className="flex flex-col gap-4">
                        <h3 className="font-semibold text-gray-800 uppercase tracking-wider text-sm">
                            Alamat
                        </h3>
                        <div className="text-sm text-gray-600 flex flex-col gap-3">
                            <div className="flex gap-2">
                                <MapPin size={24} className="text-pink-500 shrink-0" />
                                <p>Jl. Mataram No.9, Pesurungan Lor, Kec. Tegal Barat, Kota Tegal, Jawa Tengah 52114</p>
                            </div>
                            
                            {/* Container Peta */}
                            <div className="w-full h-40 rounded-lg overflow-hidden border border-pink-200 shadow-sm mt-2">
                                <iframe
                                    title="Google Maps Harkat Negeri Tegal"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.033621437149!2d109.10543667475667!3d-6.886566893112461!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6fb9e28d00923d%3A0x7d605156a595180!2sPoliteknik%20Negeri%20Tegal!5e0!3m2!1sid!2sid!4v1714400000000!5m2!1sid!2sid"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen={true}
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="mt-12 pt-6 border-t border-red-200 flex justify-between items-center text-sm text-gray-500 px-3">
                    <p>© 2026 INVOFEST. All Rights Reserved.</p>
                </div>
            </div>
        </footer>

    );
};
export default Footer;