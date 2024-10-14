// src/app/layout.tsx

import './globals.css';

export const metadata = {
  title: 'Agenda Fácil',
  description: 'Aplicativo de agendamento fácil',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-100">
        <div className="container mx-auto p-4">
          <header className="py-4 text-center">
            <h1 className="text-4xl font-bold text-blue-600">Agenda Fácil</h1>
            <p className="text-gray-600 mt-2">Organize seus eventos de forma simples!</p>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
