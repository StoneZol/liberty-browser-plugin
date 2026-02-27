import { Input } from "../input";
import { Label } from "../label";
import { Button } from "../button";
import useRegFormHook from "./RegForm.hooks";


const RegForm = () => {
    const { form, onSubmit } = useRegFormHook()
    return (
        <section className='flex flex-col gap-4 p-4'>
            <h2 className='text-2xl font-bold'>Yo Anon! We don't care who u r.</h2>
            <form className='flex flex-col gap-4 bg-card p-4 rounded-lg'>
                <div className='flex flex-col gap-2'>
                    <Label htmlFor='Password'>Password</Label>
                    <Input {...form.register('Password')} type='password' id='Password' />
                    {form.formState.errors.Password && <p className='text-red-500'>{form.formState.errors.Password.message}</p>}
                </div>
                <div className='flex flex-col gap-2'>
                    <Label htmlFor='ConfirmPassword'>Confirm password</Label>
                    <Input {...form.register('ConfirmPassword')} type='password' id='ConfirmPassword' />
                    {form.formState.errors.ConfirmPassword && <p className='text-red-500'>{form.formState.errors.ConfirmPassword.message}</p>}
                </div>
                <div className='flex flex-col gap-2'>
                    <Label htmlFor='AlertPassword'>Alert password</Label>
                    <Input {...form.register('AlertPassword')} type='password' id='AlertPassword' />
                    {form.formState.errors.AlertPassword && <p className='text-red-500'>{form.formState.errors.AlertPassword.message}</p>}
                </div>
                <div className='flex flex-col gap-2'>
                    <Label htmlFor='ConfirmAlertPassword'>Confirm alert password</Label>
                    <Input {...form.register('ConfirmAlertPassword')} type='password' id='ConfirmAlertPassword' />
                    {form.formState.errors.ConfirmAlertPassword && <p className='text-red-500'>{form.formState.errors.ConfirmAlertPassword.message}</p>}
                </div>
                <Button type='button' onClick={form.handleSubmit(onSubmit)}>Register</Button>
            </form>
        </section>
    );
};

export default RegForm;