import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SIET Inceptron',
  description: 'A scroll-driven cinematic animation experience',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.cdnfonts.com/css/cindie-mono"
        />
      </head>
      <body style={{ margin: 0, padding: 0, background: '#000' }}>
        {children}
      </body>
    </html>
  );
}
