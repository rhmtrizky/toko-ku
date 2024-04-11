import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import userService from '@/services/user';
import { useSession } from 'next-auth/react';
import { FormEvent, useState } from 'react';

type PropTypes = {
  deletedUser: any;
  setDeletedUser: any;
  setUsersData: any;
  setToaster: any;
};

const ModalDeleteUser = (props: PropTypes) => {
  const { deletedUser, setDeletedUser, setUsersData, setToaster } = props;
  const [isLoading, setIsLoading] = useState(false);
  const session: any = useSession();

  const handleDeleteUser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const result = await userService.deleteUser(deletedUser.id, session.data?.accessToken);
      if (result.status == 200) {
        setIsLoading(false);
        setDeletedUser({});
        const { data } = await userService.getAllUsers(session.data?.accessToken);
        setUsersData(data.data);
        setToaster({
          variant: 'success',
          message: 'Success Delete User',
        });
      }
    } catch (error) {
      setIsLoading(false);
      setIsLoading(false);
      setDeletedUser({});
      setToaster({
        variant: 'error',
        message: 'Failed Delete User',
      });
    }
  };
  return (
    <Modal onClose={() => setDeletedUser('')}>
      <h1 className="text-xl font-semibold mb-3">
        Are you sure to delete <span className="text-color-red">{`"${deletedUser.fullname}"`}</span>?
      </h1>
      <div className="flex justify-end gap-3 mt-5">
        <Button
          label="Cancel"
          type="button"
          onClick={() => setDeletedUser({})}
          className="bg-color-gray text-color-dark py-1 px-3 rounded-md font-semibold"
        />
        <Button
          label={isLoading ? 'Deleting' : 'Delete'}
          type="button"
          onClick={handleDeleteUser}
          className="bg-color-red text-color-primary py-1 px-3 rounded-md font-semibold"
        />
      </div>
    </Modal>
  );
};

export default ModalDeleteUser;
