import React from "react";
import HeroImg from "../../assets/HeroImg.png";
import PrimaryButton from "../PrimaryButton/PrimaryButton";

function Hero() {
  return (
    <div className="h-full overflow-y-auto scrollbar-hide bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 relative">
      {/* Decorative Background Elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-cyan-300/30 to-blue-300/30 rounded-full blur-3xl pointer-events-none animate-float"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-tr from-indigo-300/20 to-purple-300/20 rounded-full blur-3xl pointer-events-none animate-float-delayed"></div>
      
      {/* Main Content */}
      <div className="relative z-10 min-h-full flex items-center px-6 py-12 lg:px-12">
        <div className="w-full max-w-7xl mx-auto">
          <div className="flex flex-col-reverse lg:flex-row justify-between items-center gap-12 lg:gap-16">
            {/* Left side - Text content */}
            <div className="lg:w-1/2 animate-slideInLeft">
              <div className="space-y-6">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-100/80 backdrop-blur-sm rounded-full border border-cyan-200 animate-fadeIn">
                  <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></span>
                  <span className="text-sm font-medium text-cyan-700">
                    Your Digital Brain
                  </span>
                </div>

                {/* Main Heading */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
                  Make{" "}
                  <span className="relative inline-block">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 text-5xl sm:text-6xl lg:text-7xl font-extrabold">
                      Note
                    </span>
                    {/* Decorative underline */}
                    <svg
                      className="absolute -bottom-2 left-0 w-full"
                      height="12"
                      viewBox="0 0 200 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2 10C50 5 150 5 198 10"
                        stroke="url(#gradient)"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%">
                          <stop offset="0%" stopColor="#0891b2" />
                          <stop offset="100%" stopColor="#2563eb" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </span>
                  -Taking Effortless
                </h1>

                <h2 className="text-2xl sm:text-3xl font-semibold text-gray-700">
                  Organize Your Ideas with Ease
                </h2>

                {/* Description */}
                <p className="text-gray-600 text-lg leading-relaxed max-w-xl">
                  Capture your thoughts instantly, manage tasks efficiently, and
                  keep everything organized in one beautiful and simple workspace
                  designed for productivity.
                </p>

                {/* Features List */}
                <div className="flex flex-wrap gap-4 pt-4">
                  {["Quick Capture", "Smart Organization", "Cloud Sync"].map(
                    (feature, index) => (
                      <div
                        key={feature}
                        className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 animate-fadeIn"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <svg
                          className="w-5 h-5 text-cyan-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-sm font-medium text-gray-700">
                          {feature}
                        </span>
                      </div>
                    )
                  )}
                </div>

                {/* CTA Button */}
                <div className="pt-4">
                  <PrimaryButton text={"Get Started"} />
                </div>

                {/* Social Proof */}
                <div className="flex items-center gap-6 pt-6 animate-fadeIn" style={{ animationDelay: "400ms" }}>
                  <div>
                    <div className="text-3xl font-bold text-gray-900">10K+</div>
                    <div className="text-sm text-gray-600">Active Users</div>
                  </div>
                  <div className="w-px h-12 bg-gray-300"></div>
                  <div>
                    <div className="text-3xl font-bold text-gray-900">50K+</div>
                    <div className="text-sm text-gray-600">Notes Created</div>
                  </div>
                  <div className="w-px h-12 bg-gray-300"></div>
                  <div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-5 h-5 text-yellow-400 fill-current"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      ))}
                    </div>
                    <div className="text-sm text-gray-600">5.0 Rating</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Image */}
            <div className="lg:w-1/2 animate-slideInRight">
              <div className="relative">
                {/* Glow effect behind image */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/30 to-blue-400/30 rounded-3xl blur-2xl transform scale-95"></div>
                
                {/* Image container */}
                <div className="relative transform hover:scale-105 transition-transform duration-500">
                  <img
                    src={HeroImg}
                    alt="NoteImage"
                    className="w-full h-auto drop-shadow-2xl rounded-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;