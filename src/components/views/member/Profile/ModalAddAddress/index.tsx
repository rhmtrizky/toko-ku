import Button from '@/components/ui/Button';
import InputUi from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';

import userService from '@/services/user';
import { Select, SelectItem } from '@nextui-org/react';
import axios from 'axios';
import { FormEvent, useEffect, useState } from 'react';

type PropTypes = {
  session: any;
  setToaster: any;
  profile: any;
  setProfile: any;
  setModalOpenNewAddress: any;
};

type AlertTypes = {
  message: string;
  status: boolean;
  type: string;
  statusCode?: any;
};

const ModalAddAddress = (props: PropTypes) => {
  const { session, setToaster, profile, setProfile, setModalOpenNewAddress } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [subdistricts, setSubdistricts] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedSubdistrict, setSelectedSubdistrict] = useState('');

  const getNameProvince = () => {
    if (selectedProvince) {
      const province: any = provinces.find((province: any) => province.id == selectedProvince);
      return province.nama;
    }
  };
  const getNameCity = () => {
    if (selectedCity) {
      const city: any = cities.find((city: any) => city.id == selectedCity);
      return city.nama;
    }
  };
  const getNameDistrict = () => {
    if (selectedSubdistrict) {
      const subdistrict: any = subdistricts.find((subdistrict: any) => subdistrict.id == selectedSubdistrict);
      return subdistrict.nama;
    }
  };

  const options = [
    {
      label: 'Alamat Utama',
      value: 'true',
    },
    {
      label: 'Bukana Alamat Utama',
      value: 'false',
    },
  ];

  useEffect(() => {
    axios.get(`https://dev.farizdotid.com/api/daerahindonesia/provinsi`).then((response) => {
      setProvinces(response.data.provinsi);
      setCities([]);
      setSubdistricts([]);
    });
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      axios
        .get(`https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=${selectedProvince}`)
        .then((response) => {
          setCities(response.data.kota_kabupaten);
          setSubdistricts([]);
        })
        .catch((error) => console.error('Error fetching cities:', error));
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedCity) {
      axios
        .get(`https://dev.farizdotid.com/api/daerahindonesia/kecamatan?id_kota=${selectedCity}`)
        .then((response) => {
          setSubdistricts(response.data.kecamatan);
        })
        .catch((error) => console.error('Error fetching subdistricts:', error));
    }
  }, [selectedCity]);

  const handleAddAddress = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      setIsLoading(true);
      const form = event.target as HTMLFormElement;
      const newAddress = {
        recipient: form['recipient'].value,
        detailAddress: form['detailAddress'].value,
        phoneNumber: form['phoneNumber'].value,
        province: getNameProvince(),
        city: getNameCity(),
        district: getNameDistrict(),
        postalCode: form['postalCode'].value,
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
          label="Nama Penerima"
          type="text"
          name="recipient"
          placeholder="Recipient"
          required={true}
        />
        <Select
          name="province"
          labelPlacement={'inside'}
          label={'Provinsi'}
          value={selectedProvince}
          onChange={(e) => setSelectedProvince(e.target.value)}
          required={true}
        >
          {provinces.map((province: any) => (
            <SelectItem
              key={province.id}
              value={province.id}
            >
              {province.nama}
            </SelectItem>
          ))}
        </Select>
        <Select
          name="city"
          labelPlacement={'inside'}
          label={'Kabupaten/Kota'}
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          disabled={!selectedProvince}
          required={true}
        >
          {cities.map((city: any) => (
            <SelectItem
              key={city.id}
              value={city.id}
            >
              {city.nama}
            </SelectItem>
          ))}
        </Select>
        <Select
          name="district"
          labelPlacement={'inside'}
          label={'Kecamatan'}
          value={selectedSubdistrict}
          onChange={(e) => setSelectedSubdistrict(e.target.value)}
          disabled={!selectedCity}
          required={true}
        >
          {subdistricts.map((subdistrict: any) => (
            <SelectItem
              key={subdistrict.id}
              value={subdistrict.id}
            >
              {subdistrict.nama}
            </SelectItem>
          ))}
        </Select>

        <InputUi
          label="Detail Alamat"
          type="text"
          name="detailAddress"
          placeholder="Detail Address"
          required={true}
        />
        <InputUi
          label="Kode Pos"
          type="number"
          name="postalCode"
          placeholder="Postal Code"
          required={true}
        />
        <InputUi
          label="Nomor Penerima"
          type="number"
          name="phoneNumber"
          placeholder="+62xxxxxxxxxx"
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
          label={'Alamat Utama'}
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
