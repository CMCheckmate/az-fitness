import AccountForm from '@/app/ui/account-form';

export default function LoginPage() {
    return (
        <div className='p-10 flex justify-center items-center'>
            <div className='w-1/2 p-10 shadow-lg'>
                <AccountForm />
            </div>
        </div>
    );
};
