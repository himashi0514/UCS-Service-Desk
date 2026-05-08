import { Navbar } from './Navbar';

export function Layout(props) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <Navbar />
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        {props.children}
      </main>
    </div>
  );
}