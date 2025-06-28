import React, { useState } from 'react';

const Home: React.FC = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className='min-h-screen min-w-screen flex flex-col'>
            <header className='bg-gray-800 text-white flex items-center justify-between px-4 py-3'>
                <div className='flex items-center'>
                    <button 
                        onClick={toggleSidebar} 
                        className='mr-4 focus:outline-none'
                    >
                        <svg
                            className='w-6 h-6'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M4 6h16M4 12h16M4 18h16'
                            />
                        </svg>
                    </button>
                    <h1 className='text-xl font-bold'>Blog</h1>
                </div>
                <nav className="flex flex-col md:flex-row">
                    <button className='bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded mb-2 md:mr-2 md:mb-0'>
                        Entrar
                    </button>
                    <button className='bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded'>
                        Cadastrar
                    </button>
                </nav>
            </header>

            {isSidebarOpen && (
                <aside className='fixed top-0 left-0 w-64 h-full bg-gray-700 text-white p-4'>
                    <button 
                        onClick={toggleSidebar} 
                        className='mb-4 focus:outline-none'
                    >
                        Fechar
                    </button>
                    <ul>
                        <li className='py-2 border-b border-gray-600'>Item 1</li>
                        <li className='py-2 border-b border-gray-600'>Item 2</li>
                        <li className='py-2 border-b border-gray-600'>Item 3</li>
                    </ul>
                </aside>
            )}

            <main className='p-4'>
                <h2 className='text-2xl mt-6'>Bem-vindo ao Blog</h2>
                <p className='mt-4'>
                    Aqui você encontrará os últimos artigos e novidades sobre diversos temas.
                    Explore nossos posts e aproveite a leitura!
                </p>
            </main>
            
            <footer className='bg-gray-800 text-white text-center p-4'>
                <p>&copy; {new Date().getFullYear()} Blog. Todos os direitos reservados.</p>
            </footer>
        </div>
    );
};

export default Home;