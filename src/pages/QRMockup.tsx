export const QRMockup = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-md w-full text-center">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <img 
            src="/images/Logo.svg" 
            alt="tips'yo" 
            className="h-8 w-auto"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
          <span className="text-2xl font-semibold text-primary">tips'yo</span>
        </div>

        {/* Heading */}
        <h1 className="font-jost text-4xl font-medium text-gray-900 mb-2">
          Scan to Tip
        </h1>
        
        {/* Subheading */}
        <p className="text-gray-600 text-lg mb-8">
          Express your gratitude
        </p>

        {/* QR Code */}
        <div className="bg-gray-50 rounded-2xl p-6 mb-8 inline-block">
          <div className="w-48 h-48 bg-white rounded-xl p-4 flex items-center justify-center">
            {/* QR Code placeholder - в реальном проекте использовать библиотеку qrcode.react */}
            <div className="w-full h-full bg-gray-900 rounded-lg flex items-center justify-center text-white text-xs">
              QR Code
              <br />
              /employees
            </div>
          </div>
        </div>

        {/* Instructions */}
        <p className="text-gray-500 text-sm">
          Point your camera at the QR code
        </p>
      </div>
    </div>
  );
};
