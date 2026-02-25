import { AnimatedThemeToggler } from '../animated-theme-toggler';

const Header = () => {
    return (
        <header className='w-80 h-16 bg-background border-b border-border'>
            <AnimatedThemeToggler />
        </header>
    );
};

export default Header;