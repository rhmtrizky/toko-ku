import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import authService from '@/services/auth';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';

const RegisterView = () => {
  const { push } = useRouter();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const form = event.target as HTMLFormElement;
    const data = {
      email: form.email.value,
      fullname: form.fullname.value,
      password: form.password.value,
    };

    const result = await authService.registerAccount(data);

    if (result.status == 200) {
      form.reset();
      push('/auth/login');
      setIsLoading(false);
    } else {
      form.reset();
      setIsLoading(false);
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, 3000);
      console.log('error disini');
    }
  };
  return (
    <div className="flex w-full h-screen justify-center items-center">
      <form
        className="w-96 flex flex-col gap-2 px-10 py-5 rounded-md shadow-2xl"
        action=""
        onSubmit={handleSubmit}
      >
        <h1 className="flex justify-center font-bold text-2xl my-3">Register</h1>

        <Input
          label="email"
          type="email"
          name="email"
          placeholder="example@example.com"
        />
        <Input
          label="fullname"
          type="text"
          name="fullname"
          placeholder="Full Name"
        />
        <Input
          label="password"
          type="password"
          name="password"
          placeholder="password"
        />
        <Button
          label={isLoading ? 'Loading...' : 'Register'}
          type="submit"
          className="bg-color-blue text-color-primary py-2 px-1 rounded-md"
        />
        {isError && <p className="text-color-red text-sm italic">Email is already registered</p>}

        <div className="flex gap-1 text-sm">
          <p>Have an account? </p>
          <Link href={'/auth/login'}>
            <p className="font-semibold text-color-green italic">Login</p>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterView;
