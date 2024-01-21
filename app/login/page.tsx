import Login from '@/app/ui/login-form';

export default function LoginPage() {
    return (
        <div className='p-10 flex justify-center items-center'>
            <div className='w-1/2 p-10 shadow-lg'>
                <h2 className='my-5 text-3xl text-red-600 font-bold'>Please Login to Continue</h2>
                <Login />
            </div>
        </div>
    );
};
