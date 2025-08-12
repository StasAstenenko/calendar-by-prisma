import Link from 'next/link';

export default function Home() {
  return (
    <div className='font-sans min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 to-indigo-100 p-8 sm:p-20'>
      <main className='flex flex-col gap-8 w-full max-w-sm bg-white rounded-lg shadow-lg p-10'>
        <h1 className='text-3xl font-semibold text-center text-gray-800 mb-6'>
          Ласкаво просимо!
        </h1>

        <Link
          href='/login'
          className='block text-center bg-blue-600 text-white font-medium py-3 rounded-md shadow-md hover:bg-blue-700 transition'
        >
          Увійти
        </Link>

        <Link
          href='/register'
          className='block text-center bg-indigo-500 text-white font-medium py-3 rounded-md shadow-md hover:bg-indigo-600 transition'
        >
          Зареєструватися
        </Link>
      </main>
    </div>
  );
}
