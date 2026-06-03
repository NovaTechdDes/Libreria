import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { Providers } from './provider';

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: '--font-plus-jakarta-sans',
  subsets: ['latin'],
  display: 'swap',
  weight: ['200', '300', '400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'Libreria Lachi',
  description: 'Carrito Online para la carga de pedidos de juguetes y libreria lachi',
  icons: {
    icon: "/favicon.webp"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${plusJakartaSans.variable} ${plusJakartaSans.variable} scroll-smooth h-full w-full antialiased`}>
      <body className="min-h-full flex flex-col w-full">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
