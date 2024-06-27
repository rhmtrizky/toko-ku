import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import GoogleIcon from '../../../../../public/googleIcon.png';
import GithubIcon from '../../../../../public/githubIcon.png';
import Button from '@/components/ui/Button';
import AuthLayout from '@/components/layouts/AuthLayout';
import InputUi from '@/components/ui/Input';

const LoginView = () => {
  const { push, query } = useRouter();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
  });
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const form = event.target as HTMLFormElement;
    const callbackUrl: any = query.callbackUrl || '/';
    const res = await signIn('credentials', {
      redirect: false,
      email: form.email.value,
      password: form.password.value,
      callbackUrl,
    });

    if (!form.email.value || !form.password.value) {
      setFormErrors({
        email: !form.email.value ? 'Email is required' : '',
        password: !form.password.value ? 'Password is required' : '',
      });
      setTimeout(() => {
        setFormErrors({
          email: '',
          password: '',
        });
      }, 3000);
      setIsLoading(false);
      return;
    }
    if (!res?.error) {
      push(callbackUrl);
      setIsLoading(false);
      form.reset();
    } else {
      setIsLoading(false);
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, 3000);
    }
  };
  return (
    <AuthLayout
      title="LOGIN"
      link="/auth/register"
      linkText="Don't have an account?"
      linkTitle="Create an account"
      isError={isError}
      errorText="Invalid email or password"
      subChildren={
        <>
          <div className="flex justify-center items-center gap-2 w-full">
            <div className="text-color-primary h-0.5 w-full bg-color-primary" />
            <p className="text-color-primary italic text-sm">or</p>
            <div className="text-color-primary h-0.5 w-full bg-color-primary" />
          </div>
          <div className="flex justify-center items-center gap-2 mt-1">
            <Button
              type="button"
              className=" flex justify-center items-center bg-color-primary text-color-dark py-2 px-3 rounded-md"
              onClick={() => signIn('google', { callbackUrl: '/', redirect: false })}
              icon={GoogleIcon}
            />
            <Button
              type="button"
              className=" flex justify-center items-center bg-color-primary text-color-dark py-2 px-3 rounded-md"
              onClick={() => signIn('github', { callbackUrl: '/', redirect: false })}
              icon={GithubIcon}
            />
          </div>
        </>
      }
    >
      <div>
        <form
          className="flex flex-col gap-2"
          action=""
          onSubmit={handleSubmit}
        >
          <InputUi
            type="email"
            name="email"
            placeholder="Email"
          />
          {formErrors.email && <div className="text-color-red">{formErrors.email}</div>}
          <InputUi
            type="password"
            name="password"
            placeholder="Password"
          />
          {formErrors.password && <div className="text-color-red">{formErrors.password}</div>}
          <Button
            label={isLoading ? 'Loading...' : 'Sign In'}
            type="submit"
            className="bg-color-red font-semibold text-color-primary py-2 px-1 rounded-md mt-5"
          />
        </form>
      </div>
    </AuthLayout>
  );
};

export default LoginView;
