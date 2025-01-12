import './globals.css';

export const metadata = {
    title: 'Creative Brainstorming Assistant',
    description: 'An app to spark creativity and generate ideas.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className="bg-gray-100 text-gray-900">
                <header className="bg-blue-600 text-white py-4 shadow-md">
                    <div className="container mx-auto text-center">
                        <h1 className="text-3xl font-bold">Creative Brainstorming Assistant</h1>
                    </div>
                </header>
                <main className="container mx-auto py-8">{children}</main>
                <footer className="bg-gray-800 text-gray-300 py-4 text-center">
                    <p>© {new Date().getFullYear()} Creative Brainstorming Assistant. All rights reserved.</p>
                </footer>
            </body>
        </html>
    );
}
