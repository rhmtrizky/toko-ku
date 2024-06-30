import Button from '@/components/ui/Button';
import InputUi from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';
import SelectUi from '@/components/ui/Select';
import userService from '@/services/user';
import { useSession } from 'next-auth/react';
import { FormEvent, useState } from 'react';

type PropTypes = {
  updatedUser: any;
  setUpdatedUser: any;
  setUsersData: any;
  setToaster: any;
};

const ModalUpdateUser = (props: PropTypes) => {
  const { updatedUser, setUpdatedUser, setUsersData, setToaster } = props;

  const [isLoading, setIsLoading] = useState(false);
  const session: any = useSession();

  const handleUpdateUser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const form: any = event.target as HTMLFormElement;
    const data = {
      fullname: form.fullname.value,
      email: form.email.value,
      phoneNumber: form.phoneNumber.value,
      password: form.password.value === null ? updatedUser.password : form.password.value,
      role: form.role.value,
    };

    try {
      const result = await userService.updateUser(updatedUser.id, data, session.data?.accessToken);

      if (result.status == 200) {
        setIsLoading(false);
        setUpdatedUser({});
        const { data } = await userService.getAllUsers(session.data?.accessToken);
        setUsersData(data.data);
        setToaster({
          variant: 'success',
          message: 'Success Update User',
        });
      }
    } catch (error) {
      setIsLoading(false);
      setIsLoading(false);
      setUpdatedUser({});
      setToaster({
        variant: 'error',
        message: 'Failed Update User',
      });
    }
  };
  return (
    <Modal onClose={() => setUpdatedUser({})}>
      <h1 className="text-lg font-semibold mb-5">Update User</h1>
      <form
        className="flex flex-col gap-4"
        action=""
        onSubmit={handleUpdateUser}
      >
        <InputUi
          label="Fullname"
          type="fullname"
          name="fullname"
          placeholder="Fullname"
          defaultValue={updatedUser.fullname}
          required={true}
        />
        <InputUi
          label="Email"
          type="email"
          name="email"
          placeholder="Email"
          defaultValue={updatedUser.email}
          required={true}
        />
        <InputUi
          label="Phone Number"
          type="number"
          name="phoneNumber"
          placeholder="Phone Number"
          defaultValue={updatedUser.phoneNumber}
          required={true}
        />
        <InputUi
          label="Password"
          type="password"
          name="password"
          placeholder="Password"
        />
        <SelectUi
          label="Role"
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
