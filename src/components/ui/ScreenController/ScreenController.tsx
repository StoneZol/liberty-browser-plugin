import { AuthForm } from '../AuthForm';
import RegForm from '../RegForm/RegForm';
import useScreenStore from '@/stores/screenStore';
import { useLibertyCoreStore } from '@/hooks/useLibertyCore';
import { useEffect } from 'react';
const ScreenController = () => {
    const { hasReg } = useLibertyCoreStore()
    const { screen, setScreen } = useScreenStore()
    useEffect(() => {
        if (hasReg) {
            setScreen('login')
        }
    }, [hasReg])
    switch (screen) {
        case 'reg':
            return <RegForm />
        case 'login':
            return <AuthForm />
        case 'main':
            return <div>Main</div>
        default:
            return null
    }
};

export default ScreenController;