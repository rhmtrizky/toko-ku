import Button from '@/components/ui/Button';
import InputUi from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';

import userService from '@/services/user';
import { Select, SelectItem } from '@nextui-org/react';
import { FormEvent, useState } from 'react';

type PropTypes = {
  session: any;
  setToaster: any;
  profile: any;
  setProfile: any;
  openModalNewAddress: any;
  setModalOpenNewAddress: any;
};

type AlertTypes = {
  message: string;
  status: boolean;
  type: string;
  statusCode?: any;
};

const ModalAddAddress = (props: PropTypes) => {
  const { session, setToaster, profile, setProfile, openModalNewAddress, setModalOpenNewAddress } = props;
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

  const handleAddAddress = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      setIsLoading(true);
      const form = event.target as HTMLFormElement;
      const newAddress = {
        recipient: form['recipient'].value,
        detailAddress: form['detailAddress'].value,
        note: form['note'].value,
        isMain: form['isMain'].value === 'true', // Convert back to boolean
      };

      let allAddress = [...profile?.data?.address];
      if (allAddress.length > 0) {
        allAddress = allAddress.map((address, index) => ({
          ...address,
          isMain: newAddress.isMain ? false : address.isMain,
        }));
        allAddress.push(newAddress);
      } else {
        allAddress = [newAddress];
      }

      const result = await userService.updateProfile(profile.data.id, { address: allAddress }, session.data?.accessToken);
      if (result.status === 200) {
        const data = await userService.getProfile(session.data?.accessToken);
        setProfile(data.data);
        setToaster({
          variant: 'success',
          message: 'Success Create Address',
        });

        setModalOpenNewAddress(false);
        setIsLoading(false);
      }
    } catch (error: any) {
      console.log(error);

      setIsLoading(false);
      setModalOpenNewAddress(false);
      setToaster({
        variant: 'error',
        message: 'Failed Create Address',
      });
    }
  };

  return (
    <Modal onClose={() => setModalOpenNewAddress(false)}>
      <h1 className="text-xl font-semibold mb-3">Create New Address</h1>
      <form
        className="flex flex-col gap-2"
        onSubmit={handleAddAddress}
      >
        <InputUi
          label="Recipient"
          type="text"
          name="recipient"
          placeholder="Recipient"
          required={true}
        />
        <InputUi
          label="Detail Address"
          type="text"
          name="detailAddress"
          placeholder="Detail Address"
          required={true}
        />
        <InputUi
          label="Notes Address"
          type="text"
          name="note"
          placeholder="Notes Address"
        />
        <Select
          name="isMain"
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
          label={isLoading ? 'Submitting...' : 'Submit'}
          type="submit"
          className="bg-color-blue text-color-primary py-2 px-1 rounded-md mt-3"
        />
      </form>
    </Modal>
  );
};

export default ModalAddAddress;
