import AuthLayout from '@/components/layouts/AuthLayout';
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
  const [formErrors, setFormErrors] = useState({
    email: '',
    fullname: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const form = event.target as HTMLFormElement;
    const data = {
      email: form.email.value,
      fullname: form.fullname.value,
      phoneNumber: form.phoneNumber.value,
      password: form.password.value,
    };

    const dataConfirmPassword = form.confirmPassword.value;

    const formErrors = {
      email: !data.email ? 'Email is required' : '',
      fullname: !data.fullname ? 'Fullname is required' : '',
      phoneNumber: !data.phoneNumber ? 'Phone number is required' : '',
      password: !data.password ? 'Password is required' : '',
      confirmPassword: !dataConfirmPassword ? 'Confirm password is required' : '',
    };

    if (data.password !== dataConfirmPassword) {
      formErrors.confirmPassword = 'Password and confirm password do not match';
    }

    const hasErrors = Object.values(formErrors).some((error) => error);

    if (hasErrors) {
      setFormErrors(formErrors);
      setTimeout(() => {
        setFormErrors({
          email: '',
          fullname: '',
          phoneNumber: '',
          password: '',
          confirmPassword: '',
        });
      }, 3000);

      setIsLoading(false);
      return;
    }

    try {
      const result = await authService.registerAccount(data);

      if (result.status == 200) {
        form.reset();
        push('/auth/login');
        setIsLoading(false);
      }
    } catch (error) {
      form.reset();
      setIsLoading(false);
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, 3000);
    }
  };

  return (
    <AuthLayout
      title="Register"
      link="/auth/login"
      linkText="Have an account?"
      linkTitle="Login"
      isError={isError}
      errorText="Email/Phone number already registered"
    >
      <div>
        <form
          className="flex flex-col gap-2"
          action=""
          onSubmit={handleSubmit}
        >
          <Input
            type="text"
            name="fullname"
            placeholder="Fullname"
          />
          {formErrors.fullname && <div className="text-color-red">{formErrors.fullname}</div>}

          <Input
            type="email"
            name="email"
            placeholder="Email"
          />
          {formErrors.email && <div className="text-color-red">{formErrors.email}</div>}
          <Input
            type="number"
            name="phoneNumber"
            placeholder="Phone Number"
          />
          {formErrors.phoneNumber && <div className="text-color-red">{formErrors.phoneNumber}</div>}

          <Input
            type="password"
            name="password"
            placeholder="Password"
          />
          {formErrors.password && <div className="text-color-red">{formErrors.password}</div>}
          <Input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
          />
          {formErrors.confirmPassword && <div className="text-color-red">{formErrors.confirmPassword}</div>}

          <Button
            label={isLoading ? 'Loading...' : 'Register'}
            type="submit"
            className="bg-color-red text-color-primary py-2 px-1 rounded-md mt-5"
          />
        </form>
      </div>
    </AuthLayout>
  );
};

export default RegisterView;
