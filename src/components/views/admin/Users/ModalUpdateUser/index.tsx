import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';
import Select from '@/components/ui/Select';
import userService from '@/services/user';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

type PropTypes = {
  updatedUser: any;
  setUpdatedUser: any;
  setUsersData: any;
};

const ModalUpdateUser = (props: PropTypes) => {
  const { updatedUser, setUpdatedUser, setUsersData } = props;
  const [isLoading, setIsLoading] = useState(false);
  const session: any = useSession();

  const handleUpdateUser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const form: any = event.target as HTMLFormElement;
    const data = {
      fullname: form.fullname.value,
      email: form.email.value,
      password: form.password.value,
      role: form.role.value,
    };

    try {
      const result = await userService.updateUser(updatedUser.id, data, session.data?.accessToken);

      if (result.status == 200) {
        setIsLoading(false);
        setUpdatedUser({});
        const { data } = await userService.getAllUsers(session.data?.accessToken);
        setUsersData(data.data);
      }
    } catch (error) {
      setIsLoading(false);
      setIsLoading(false);
      setUpdatedUser({});
    }
  };
  return (
    <Modal onClose={() => setUpdatedUser({})}>
      <h1 className="text-2xl font-semibold mb-3">Update User</h1>
      <form
        className="flex flex-col gap-2"
        action=""
        onSubmit={handleUpdateUser}
      >
        <Input
          label="Fullname"
          type="fullname"
          name="fullname"
          defaultValue={updatedUser.fullname}
        />
        <Input
          label="Email"
          type="email"
          name="email"
          defaultValue={updatedUser.email}
        />
        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="Password"
        />
        <Select
          label="Role"
          className="w-full border-2 border-color-gray px-3 py-2 rounded-md bg-color-input"
          name="role"
          defaultValue={updatedUser.role}
          options={[
            { value: 'admin', label: 'Admin' },
            { value: 'member', label: 'Member' },
          ]}
        />
        <Button
          label={isLoading ? 'Updating...' : 'Update'}
          type="submit"
          className="bg-color-blue text-color-primary py-2 px-1 rounded-md mt-3"
        />
      </form>
    </Modal>
  );
};

export default ModalUpdateUser;
