import React from 'react';
import '../estilos/globales.css';


export const metadata = {
  title: 'La Barra en Casa',
  description: 'Tu dispenser de previa interactivo',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-slate-950 text-white antialiased">
        {children}
      </body>
    </html>
  );
}