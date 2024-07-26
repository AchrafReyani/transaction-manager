import AuthForm from "./AuthForm";

export default function Main() {
    return (
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
    )
}