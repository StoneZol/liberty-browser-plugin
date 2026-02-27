import { useLibertyCoreStore } from "@/hooks/useLibertyCore";
import { Button } from "../button";
import useScreenStore from "@/stores/screenStore";
import { Input } from "../input";
import { Label } from "../label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AuthFormSchema, type AuthFormSchemaType } from "./AuthForm.types";


const AuthForm = () => {
    const { deleteAllData, getStoreData, getHash, derivePassword, getResetPassHash } = useLibertyCoreStore()
    const { setScreen } = useScreenStore()
    const handleResetData = () => {
        deleteAllData()
        setScreen('reg')
    }
    const form = useForm({
        resolver: zodResolver(AuthFormSchema),
        defaultValues: {
            Password: '',
        }
    })
    const onSubmit = (data: AuthFormSchemaType) => {
        const passwordHash = getHash(data.Password)
        console.log(passwordHash)
        console.log(getResetPassHash())
        if (passwordHash === getResetPassHash()) {
            console.log('Ahting  надо удалять все данные')
            // handleResetData()
            return
        }
        derivePassword(passwordHash)
        const storeData = getStoreData()
        if (storeData.data.user === 'anon') {
            console.log('Anon user')
        }

    }
    return (
        <section className="flex flex-col gap-4 p-4">
            <h2 className="text-2xl font-bold">Welcome back Anon!</h2>
            <form className="flex flex-col gap-4 bg-card p-4 rounded-lg">
                <Label htmlFor="password">Password</Label>
                <Input type="password" placeholder="Password" id="password" {...form.register('Password')} />
                <Button type="button" onClick={form.handleSubmit(onSubmit)}>SignIn</Button>
                <Button type="button" onClick={handleResetData}>ResetAllData</Button>
            </form>
        </section>
    );
};

export default AuthForm;