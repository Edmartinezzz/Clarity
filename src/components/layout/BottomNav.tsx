"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { navItems } from "@/lib/nav-items";
import { Menu, X, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { haptics } from "@/lib/haptics";

export default function BottomNav() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Limit items for bottom nav (4 main + 1 more button)
    const mainNavItems = navItems.slice(0, 4); // Chat, Wellness, Journal, Sounds
    const extraNavItems = navItems.slice(4); // Resources, Progress, Badges, Profile, Settings

    const handleNavClick = () => {
        haptics.light();
        setIsMenuOpen(false);
    };

    const toggleMenu = () => {
        haptics.medium();
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[92%] max-w-lg">
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMenuOpen(false)}
                            className="fixed inset-0 bg-background/40 backdrop-blur-md z-[-1] h-screen w-screen left-1/2 -translate-x-1/2"
                        />

                        {/* Menu Drawer - Modern Bottom Sheet style */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="absolute bottom-20 left-0 right-0 bg-surface-container-high/90 backdrop-blur-2xl rounded-[2.5rem] border border-outline/10 shadow-2xl p-6 z-[-1]"
                        >
                            <div className="flex items-center justify-between mb-6 px-2">
                                <h3 className="text-sm font-black uppercase tracking-widest text-primary">Más opciones</h3>
                                <ThemeToggle />
                            </div>

                            <div className="grid grid-cols-4 gap-y-6 gap-x-2">
                                {extraNavItems.map((item) => {
                                    const isActive = pathname === item.href;
                                    const Icon = item.icon;

                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={handleNavClick}
                                            className="flex flex-col items-center gap-2 group active:scale-90 transition-transform"
                                        >
                                            <div className={`flex items-center justify-center w-12 h-12 rounded-[1.25rem] transition-all ${isActive ? "bg-primary text-on-primary shadow-lg shadow-primary/25 scale-105" : "bg-surface-container-low text-on-surface-variant group-hover:bg-surface-variant"}`}>
                                                <Icon className="w-5 h-5" />
                                            </div>
                                            <span className={`text-[10px] font-bold text-center leading-tight transition-colors ${isActive ? "text-primary" : "text-on-surface-variant/70"}`}>
                                                {item.name}
                                            </span>
                                        </Link>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Floating Glass Bar */}
            <nav className="relative flex justify-around items-center px-3 py-3 bg-surface-container/80 backdrop-blur-2xl rounded-[2.5rem] border border-outline/10 shadow-[0_8px_32px_rgba(0,0,0,0.12)]">
                {mainNavItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={handleNavClick}
                            className="relative flex flex-col items-center justify-center w-14 h-12 group active:scale-90 transition-transform"
                        >
                            <AnimatePresence>
                                {isActive && !isMenuOpen && (
                                    <motion.div
                                        layoutId="bottom-nav-indicator"
                                        className="absolute -top-1 w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_10px_rgba(0,139,139,0.8)]"
                                        initial={false}
                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                    />
                                )}
                            </AnimatePresence>

                            <div className={`flex items-center justify-center rounded-2xl p-2.5 transition-all duration-300 ${isActive && !isMenuOpen ? "text-primary" : "text-on-surface-variant/60"}`}>
                                <Icon
                                    className={`w-6 h-6 transition-all duration-300 ${isActive && !isMenuOpen ? "scale-110" : "scale-100 group-hover:scale-105"}`}
                                    strokeWidth={isActive && !isMenuOpen ? 2.5 : 2}
                                />
                            </div>

                            <span className={`text-[9px] font-bold uppercase tracking-tighter transition-all duration-300 ${isActive && !isMenuOpen ? "text-primary opacity-100" : "text-on-surface-variant/40 opacity-0 -translate-y-1"}`}>
                                {item.name}
                            </span>
                        </Link>
                    );
                })}

                {/* More Button */}
                <button
                    onClick={toggleMenu}
                    className="relative flex flex-col items-center justify-center w-14 h-12 group active:scale-95 transition-transform"
                >
                    <div className={`flex items-center justify-center rounded-2xl p-2.5 transition-all duration-300 ${isMenuOpen ? "text-primary bg-primary/10" : "text-on-surface-variant/60"}`}>
                        {isMenuOpen ? (
                            <X className="w-6 h-6 transition-all duration-300" strokeWidth={2.5} />
                        ) : (
                            <MoreHorizontal className="w-6 h-6 transition-all duration-300" strokeWidth={2} />
                        )}
                    </div>
                    <span className={`text-[9px] font-bold uppercase tracking-tighter transition-all duration-300 ${isMenuOpen ? "text-primary opacity-100" : "text-on-surface-variant/40 opacity-0 -translate-y-1"}`}>
                        Más
                    </span>
                </button>
            </nav>
        </div>
    );
}

