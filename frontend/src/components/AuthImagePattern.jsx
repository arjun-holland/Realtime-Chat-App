const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-gray-100 min-h-screen px-6">
      <div className="flex flex-col items-center justify-center text-center space-y-8">
        {/* Grid of Animated Squares */}
        <div className="grid grid-cols-3 gap-5">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`w-24 h-24 rounded-2xl transition-all duration-1000 ${
                i % 2 === 0
                  ? "bg-blue-500 animate-pulse"
                  : "bg-blue-400"
              }`}
            />
          ))}
        </div>

        {/* Title and Subtitle */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {title}
          </h2>
          <p className="text-gray-600 max-w-md mx-auto">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthImagePattern;
