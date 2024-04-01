import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import GoogleIcon from '../../../../../public/googleIcon.png';
import GithubIcon from '../../../../../public/githubIcon.png';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import AuthLayout from '@/components/layouts/AuthLayout';

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
      title="Login"
      link="/auth/register"
      linkText="Don't have an account?"
      linkTitle="Register"
      isError={isError}
      errorText="Invalid email or password"
      subChildren={
        <>
          <hr className="text-color-gray" />
          <div className="flex flex-col gap-2">
            <Button
              label="Google"
              type="button"
              className="bg-color-primary text-color-dark py-2 px-1 rounded-md"
              onClick={() => signIn('google', { callbackUrl: '/', redirect: false })}
              icon={GoogleIcon}
            />
            <Button
              label="Github"
              type="button"
              className="bg-color-primary text-color-dark py-2 px-1 rounded-md"
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
          <Input
            label="email"
            type="email"
            name="email"
            placeholder="example@example.com"
          />
          {formErrors.email && <div className="text-color-red">{formErrors.email}</div>}
          <Input
            label="password"
            type="password"
            name="password"
            placeholder="password"
          />
          {formErrors.password && <div className="text-color-red">{formErrors.password}</div>}
          <Button
            label={isLoading ? 'Loading' : 'Login'}
            type="submit"
            className="bg-color-green text-color-primary py-2 px-1 rounded-md"
          />
        </form>
      </div>
    </AuthLayout>
  );
};

export default LoginView;
