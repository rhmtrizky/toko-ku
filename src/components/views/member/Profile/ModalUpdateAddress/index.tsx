import Button from '@/components/ui/Button';
import InputUi from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';

import userService from '@/services/user';
import { Select, SelectItem } from '@nextui-org/react';
import { FormEvent, useState } from 'react';

type PropTypes = {
  selectAddress: any;
  session: any;
  setToaster: any;
  profile: any;
  openModalAddress: any;
  setOpenModalAddress: any;
  setProfile: any;
};

type AlertTypes = {
  message: string;
  status: boolean;
  type: string;
  statusCode?: any;
};

const ModalUpdateAddress = (props: PropTypes) => {
  const { selectAddress, session, setToaster, profile, openModalAddress, setOpenModalAddress, setProfile } = props;
  const [isLoading, setIsLoading] = useState(false);

  const options = [
    {
      label: 'Main Address',
      value: 'true',
    },
    {
      label: 'Sub Address',
      value: 'false',
    },
  ];

  const handleUpdateAddress = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      setIsLoading(true);
      const form = event.target as HTMLFormElement;
      const newAddress = {
        recipient: form['recipient'].value,
        detailAddress: form['detailAddress'].value,
        note: form['note'].value,
        isMain: form['isMain'].value === 'true',
      };

      let updatedAddress = [...profile.data.address];
      updatedAddress = updatedAddress.map((address, index) => ({
        ...address,
        isMain: index !== selectAddress && newAddress.isMain ? false : address.isMain,
      }));
      updatedAddress[selectAddress] = newAddress;

      const result = await userService.updateProfile(profile.data.id, { address: updatedAddress }, session.data?.accessToken);
      if (result.status === 200) {
        const data = await userService.getProfile(session.data?.accessToken);
        setProfile(data.data);
        setToaster({
          variant: 'success',
          message: 'Success Update Address',
        });
        setOpenModalAddress(false);
        setIsLoading(false);
      }
    } catch (error: any) {
      setIsLoading(false);
      setOpenModalAddress(false);
      setToaster({
        variant: 'error',
        message: 'Failed Update Address',
      });
    }
  };

  return (
    <Modal onClose={() => setOpenModalAddress(false)}>
      <h1 className="text-xl font-semibold mb-3">Change Address</h1>
      <form
        className="flex flex-col gap-2"
        onSubmit={handleUpdateAddress}
      >
        <InputUi
          label="Recipient"
          type="text"
          name="recipient"
          placeholder="Recipient"
          defaultValue={openModalAddress?.recipient}
        />
        <InputUi
          label="Detail Address"
          type="text"
          name="detailAddress"
          placeholder="Detail Address"
          defaultValue={openModalAddress?.detailAddress}
        />
        <InputUi
          label="Notes Address"
          type="text"
          name="note"
          placeholder="Notes Address"
          defaultValue={openModalAddress?.note}
        />
        <Select
          name="isMain"
          defaultSelectedKeys={openModalAddress?.isMain ? ['true'] : ['false']}
          labelPlacement={'inside'}
          label={'Main Address'}
        >
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
            >
              {option.label}
            </SelectItem>
          ))}
        </Select>
        <Button
          label={isLoading ? 'Updating...' : 'Update'}
          type="submit"
          className="bg-color-blue text-color-primary py-2 px-1 rounded-md mt-3"
        />
      </form>
    </Modal>
  );
};

export default ModalUpdateAddress;
