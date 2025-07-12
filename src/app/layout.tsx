"use client"
import Link from "next/link";
import { useState } from "react";
import './globals.css'

export default function Layout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Dashboard" },
    { href: "/teachers", label: "Teachers" },
    { href: "/classes", label: "Classes" },
    { href: "/pay", label: "Payments" },
  ];

  return (
    <html>
      <body> 
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center shadow-md">
        <h1 className="text-xl font-bold">Teacher UPI App</h1>
        <button
          className="md:hidden block"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="material-icons">{menuOpen ? "close" : "menu"}</span>
        </button>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:underline hover:scale-105 transition-transform"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </header>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="md:hidden bg-blue-500 text-white flex flex-col p-4 transition-all duration-300">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="py-2 hover:underline"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}

      {/* Main Content */}
      <main className="flex-1 p-4">{children}</main>
    </div>
    </body> 
    </html>  
  );
}
