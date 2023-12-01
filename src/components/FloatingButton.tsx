import Link from 'next/link';

interface FloatingButtonProps {
  children: React.ReactNode;
  href: string;
}

const FloatingButton = ({ children, href }: FloatingButtonProps) => {
  return (
    <Link
      href={href}
      className='flex items-center justify-center border-0 border-transparent 
      rounded-full shadow-xl cursor-pointer aspect-square 
      fixed bottom-5 right-5 w-14 bg-green-400 text-white hover:bg-green-500 transition-colors'
    >
      {children}
    </Link>
  );
};

export default FloatingButton;
