import { AnimatedThemeToggler } from '../animated-theme-toggler';

const Header = () => {
    return (
        <header className='w-full h-16 bg-background border-b border-border flex items-center justify-between p-4'>
            <div className='flex items-center gap-2'>
                <img src="/liberty48.png" alt="Liberty" className='w-12 h-12' />
                Liberty
            </div>
            <AnimatedThemeToggler />
        </header>
    );
};

export default Header;