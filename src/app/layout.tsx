import './globals.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

export const metadata = {
  title: 'My Portfolio',
  description: 'Full Stack Developer Portfolio',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}