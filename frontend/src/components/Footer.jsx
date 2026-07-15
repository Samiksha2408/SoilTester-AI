import { Mail, Phone, Globe, Leaf } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo */}
        <div>
          <h2 className="text-3xl font-bold text-green-500">SmartAgriAI</h2>

          <p className="mt-4 text-gray-400">
            Helping farmers make smarter decisions using AI-powered technology.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>

          <ul className="space-y-3 text-gray-400">
            <li>Home</li>
            <li>Features</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact</h3>

          <div className="space-y-4 text-gray-400">
            <div className="flex items-center gap-2">
              <Mail size={18} />
              smartagriai@gmail.com
            </div>

            <div className="flex items-center gap-2">
              <Phone size={18} />
              +91 9876543210
            </div>
          </div>
        </div>

        {/* Follow */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Follow Us</h3>

          <div className="flex gap-5">
            <Globe className="hover:text-green-500 cursor-pointer transition" />
            <Leaf className="hover:text-green-500 cursor-pointer transition" />
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-12 pt-6 text-center text-gray-500">
        © 2026 SmartAgriAI. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;
