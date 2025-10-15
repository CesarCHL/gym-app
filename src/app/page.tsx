import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Blur */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(8px)",
          transform: "scale(1.1)"
        }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70 z-10" />
      
      {/* Content */}
      <div className="relative z-20 text-center px-4">
        <h1 className="text-6xl md:text-7xl font-bold text-white mb-4 drop-shadow-2xl">APEX GRIND</h1>
        <p className="text-gray-200 text-xl md:text-2xl mb-8 drop-shadow-lg">Train Smarter, Not Harder</p>
        <Link 
          href="/auth/login"
          className="inline-block bg-white text-black font-semibold py-4 px-10 rounded-lg hover:bg-gray-200 transition-all duration-200 shadow-2xl hover:shadow-white/20 hover:scale-105"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}
