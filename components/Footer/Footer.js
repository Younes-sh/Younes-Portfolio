export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4 text-center">
        <p>&copy; {new Date().getFullYear()} My Portfolio. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-4">
          <a href="https://github.com/Younes-sh" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/younes-sheikhlar/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
            LinkedIn
          </a>
          <a href="mailto:sheikhlaryounes@gmail.com" className="hover:text-blue-400">
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}