import './globals.css';

export const metadata = { title: 'AI Resume Roaster' };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-orange-50 text-gray-900">{children}</body>
    </html>
  );
}
