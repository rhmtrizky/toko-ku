import AlertUi from '@/components/ui/Alert';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';
import userService from '@/services/user';
import { FormEvent, useState } from 'react';

type PropTypes = {
  profile: any;
  session: any;
  setAlert: any;
  setOpenModal: any;
  alert: any;
};

const ModalUpdatePassword = (props: PropTypes) => {
  const { profile, session, setAlert, setOpenModal, alert } = props;
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdatPassword = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      setIsLoading(true);
      const form: any = event.target as HTMLFormElement;
      const data = {
        password: form['new-password'].value,
        oldPassword: form['old-password'].value,
        encryptedPassword: profile.data.password,
      };
      const result = await userService.updateProfile(profile.data.id, data, session.data?.accessToken);
      console.log(result);
      if (result.status == 200) {
        setAlert({
          message: result.data.message,
          status: true,
          type: 'password',
          statusCode: 200,
        });
        setTimeout(() => {
          setAlert({
            message: '',
            status: false,
            type: 'password',
            statusCode: 200,
          });
        }, 3000);
        setOpenModal(false);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error.response.data.message);

      setIsLoading(false);
      setAlert({
        message: error.response.data.message,
        status: true,
        type: 'password',
        statusCode: 400,
      });
      setTimeout(() => {
        setAlert({
          message: '',
          status: false,
          type: 'password',
          statusCode: 400,
        });
      }, 3000);
    }
  };
  return (
    <Modal onClose={() => setOpenModal(false)}>
      <h1 className="text-xl font-semibold mb-3">Change Password</h1>
      <form
        className="flex flex-col gap-2"
        action=""
        onSubmit={handleUpdatPassword}
      >
        {alert?.status && alert?.type == 'password' && alert?.statusCode == 400 && (
          <div>
            <AlertUi
              message={alert.message}
              type="error"
            />
          </div>
        )}
        <Input
          label="Password"
          type="password"
          name="old-password"
          placeholder="Password"
        />
        <Input
          label="New Password"
          type="password"
          name="new-password"
          placeholder="Password"
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

export default ModalUpdatePassword;
