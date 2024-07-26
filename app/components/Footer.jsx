// components/Footer.js
export default function Footer() {
    return (
      <footer className="bg-green-100 p-4 mt-8">
        <div className="max-w-lg mx-auto text-center">
          <p className="text-gray-800">
            © {new Date().getFullYear()} Transaction Manager. All rights reserved.
          </p>
        </div>
      </footer>
    );
  }


  