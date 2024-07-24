import AuthForm from "./components/AuthForm";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Content */}
      <main className="flex-grow bg-white p-6">
        <div className="max-w-lg mx-auto">
          {/* Image at the top */}
          <div className="mb-6">
            <img
              src="/images/app-logo.png"
              alt="Transaction Manager"
              className="w-full h-auto object-cover"
            />
          </div>
          <h1 className="text-black text-3xl font-bold mb-4">
            Welcome to Transaction Manager
          </h1>
          <p className="text-gray-700 mb-6">
            Your personal space to curate and manage your transactions. Sign in to create, view, edit, and delete transactions from your list.
          </p>
          <div className="bg-green-50 p-4 rounded shadow-md">
            <AuthForm />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-green-100 p-4">
        <div className="max-w-lg mx-auto text-center">
          <p className="text-gray-800">
            © {new Date().getFullYear()} Transaction Manager. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  
  );
}
