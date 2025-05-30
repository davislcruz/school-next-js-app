import { Link } from "wouter";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Welcome</h1>
          <p className="text-gray-600 mb-8">This is a placeholder page</p>
          
          <div className="space-y-4">
            <Link 
              href="/messages" 
              className="block w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Go to Messages
            </Link>
            
            <a 
              href="#" 
              className="block w-full bg-gray-200 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-300 transition-colors"
            >
              Placeholder Link 1
            </a>
            
            <a 
              href="#" 
              className="block w-full bg-gray-200 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-300 transition-colors"
            >
              Placeholder Link 2
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
