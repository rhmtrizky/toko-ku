import Button from '@/components/ui/Button';
import ProgressUi from '@/components/ui/Progress';
import { uploadFile } from '@/lib/firebase/service';
import userService from '@/services/user';
import { useState } from 'react';
import ModalUpdatePassword from './ModalUpdatePassword';
import Image from 'next/image';
import { RiErrorWarningLine } from 'react-icons/ri';
import ModalUpdateAddress from './ModalUpdateAddress';
import ModalAddAddress from './ModalAddAddress';

type PropTypes = {
  profile: any;
  setProfile: any;
  session: any;
  setToaster: any;
};

const ProfileMemberView = (props: PropTypes) => {
  const { profile, setProfile, session, setToaster } = props;
  const [changeImage, setChangeImage] = useState<any>({});
  const [isLoading, setIsLoading] = useState('');
  const [progressPercent, setProgressPercent] = useState<any>({});
  const [openModal, setOpenModal] = useState(false);
  const [selectAddress, setSelectAddress] = useState(0);
  const [openModalAddress, setOpenModalAddress] = useState({});
  const [openModalNewAddress, setModalOpenNewAddress] = useState(false);

  const handleUpdateProfile = async (e: any) => {
    e.preventDefault();
    setIsLoading('profile');
    const form: any = e.target as HTMLFormElement;
    const data = {
      fullname: form.fullname.value,
      phoneNumber: form.phoneNumber.value,
    };

    const result = await userService.updateProfile(profile.data.id, data, session.data?.accessToken);
    if (result.status == 200) {
      setProfile({
        ...profile,
        data: {
          ...profile.data,
          fullname: data.fullname,
          phoneNumber: data.phoneNumber,
        },
      });
      setToaster({
        variant: 'success',
        message: 'Success Update Profile',
      });
      setIsLoading('');
    } else {
      setIsLoading('');
      setToaster({
        variant: 'error',
        message: 'Failed Update Profile',
      });
    }
  };

  const handleChangeProfilePicture = (e: any) => {
    try {
      e.preventDefault();
      const file = e.target[0].files[0];

      setIsLoading('image');
      if (file) {
        uploadFile(
          profile?.data?.id,
          'users',
          'profile',
          file,
          (status: boolean, progressPercent: number) => {
            setProgressPercent({
              status: status,
              progressPercent: progressPercent.toFixed(2),
            });
          },
          async (status: boolean, downloadURL: string) => {
            if (status) {
              const data = {
                image: downloadURL,
              };

              const result = await userService.updateProfile(profile.data.id, data, session.data?.accessToken);
              if (result.status == 200) {
                setProfile({
                  ...profile,
                  data: {
                    ...profile.data,
                    image: downloadURL,
                  },
                });
                setProgressPercent({
                  status: !status,
                  progressPercent: 0,
                });
                setToaster({
                  variant: 'success',
                  message: 'Success Update Profile Image',
                });
                setIsLoading('');
                setChangeImage({});
                e.target[0].value = '';
              }
            } else {
              setToaster({
                variant: 'error',
                message: 'Size image should be less than 1MB',
              });
              setIsLoading('');
              setChangeImage({});
              e.target[0].value = '';
            }
          }
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="w-full min-h-screen h-auto flex flex-col justify-center px-20 py-10">
        <div className="text-2xl font-bold text-color-pink">Profile</div>
        <div className="my-3">{progressPercent.status && <ProgressUi percent={progressPercent.progressPercent} />}</div>
        <div className="w-full flex lg:flex-row md:flex-row sm:flex-col flex-col justify-center lg:items-start md:items-start sm:items-center items-center gap-5">
          <div className="lg:w-2/5 md:w-2/5 sm:w-[350px] w-[350px] border-2 border-color-gray p-3">
            <form onSubmit={handleChangeProfilePicture}>
              <div className="w-full h-full flex justify-center flex-col items-center py-3">
                {profile.data?.image ? (
                  <Image
                    className="rounded-full w-48 h-48 object-cover border-2 border-color-gray mb-4"
                    src={profile.data?.image}
                    alt="profile"
                    width={200}
                    height={200}
                  />
                ) : (
                  <div className="rounded-full p-3 w-48 h-48 bg-color-gray flex justify-center items-center mb-4">
                    <h1 className="text-7xl font-bold text-color-blue">{profile.data?.fullname?.charAt(0)}</h1>
                  </div>
                )}

                <div className="relative">
                  {changeImage.name ? (
                    <p className="text-center text-sm p-3 bg-color-gray rounded-md">{changeImage.name}</p>
                  ) : (
                    <div className="text-center text-sm p-3 bg-color-gray rounded-md">
                      <p>Upload new avatar, larger image will be resize automatically</p>
                      <br />
                      <div>
                        <p>
                          Maximum image size is <b>1 MB</b>
                        </p>
                        <p>
                          Accepted formats: <b>.jpg, .jpeg, .png</b>
                        </p>
                        <p className="underline text-color-blue mt-1">
                          <b>Choose Picture</b>
                        </p>
                      </div>
                    </div>
                  )}
                  <input
                    type="file"
                    className="absolute bg-color-gray z-0 bottom-0 left-0 w-full h-full opacity-0"
                    onChange={(e: any) => {
                      e.preventDefault();
                      setChangeImage(e.currentTarget.files[0]);
                    }}
                  />
                </div>

                {changeImage.name && (
                  <Button
                    type="submit"
                    label={isLoading == 'image' ? 'Upload ...' : 'Upload Profile'}
                    className="bg-color-green text-color-primary py-2 px-1 rounded-md mt-3 font-semibold px-3"
                  />
                )}
              </div>
            </form>
          </div>
          <div className="lg:w-3/5 md:w-3/5 sm:w-[350px] w-[350px]  border-2 border-color-gray px-5 py-7 rounded-md">
            <form
              className="flex flex-col gap-4 mt-3"
              action=""
              onSubmit={handleUpdateProfile}
            >
              <input
                type="fullname"
                name="fullname"
                defaultValue={profile.data?.fullname}
                className="w-full py-2 px-3  bg-color-white shadow-md rounded-md text-color-dark"
                style={{ outline: 'none' }}
                required
              />

              <input
                type="email"
                name="email"
                defaultValue={profile.data?.email}
                className="w-full py-2 px-3  bg-color-gray shadow-md rounded-md text-color-dark opacity-70"
                disabled
                style={{ outline: 'none' }}
              />
              <input
                type="number"
                name="phoneNumber"
                placeholder="+62 8xxxxx"
                defaultValue={profile.data?.phoneNumber}
                className="w-full py-2 px-3  bg-color-white shadow-md rounded-md text-color-dark"
                style={{ outline: 'none' }}
                required
              />
              {profile?.data?.phoneNumber == '' && (
                <p className="text-sm text-color-red flex items-center gap-1">
                  <span>
                    <RiErrorWarningLine size={20} />
                  </span>
                  Please fill a valid phone number
                </p>
              )}
              <div className="w-full flex flex-col gap-1 border-2 border-color-gray rounded-md p-3 bg-color-white">
                <h3 className="font-semibold">Shipping Address</h3>
                {profile.data?.address?.map((item: any, id: number) => (
                  <div
                    className={`w-full flex justify-between border-2 border-color-gray rounded-md p-3 mb-1 ${item.isMain ? 'bg-color-gray opacity-85' : 'bg-color-white'}`}
                    key={id}
                    onClick={() => {
                      setSelectAddress(id);
                      setOpenModalAddress(item);
                    }}
                  >
                    <div className="w-4/5 flex flex-col gap-1">
                      <p className="font-bold text-color-dark text-md">{item.recipient}</p>
                      <p className="text-color-dark lg:text-sm md:text-sm sm:text-sm text-sm">{item.phoneNumber}</p>
                      <p className="text-color-dark lg:text-sm md:text-sm sm:text-sm text-sm">
                        {item.detailAddress}, {item.district}, {item.city}, {item.province}, {item.postcalCode}
                      </p>
                      {item.note !== '' ? <p className="italic text-sm">Note : {item.note}</p> : <p className="italic text-sm">Note : No Note</p>}
                    </div>
                    {item.isMain && <div className="flex justify-center items-center bg-color-blue font-semibold text-color-primary py-1 px-1 rounded-md w-1/5 h-8 lg:text-sm md:text-sm sm:text-xs text-xs text-justify">Main</div>}
                  </div>
                ))}
                <Button
                  label={'Add New Address'}
                  type="button"
                  className="bg-color-pink text-color-primary py-2 px-1 rounded-md mt-3 font-semibold px-3"
                  onClick={() => setModalOpenNewAddress(true)}
                />
              </div>

              <label
                htmlFor="Password"
                className="font-semibold"
              >
                Password
              </label>
              {profile?.data?.type == 'google' || profile?.data?.type == 'github' ? (
                <Button
                  type="button"
                  label="Change Password"
                  className="bg-color-gray text-color-dark py-2 px-1 rounded-md font-semibold px-3 w-44 opacity-40"
                  onClick={() => setOpenModal(true)}
                  disabled
                />
              ) : (
                <Button
                  type="button"
                  label="Change Password"
                  className="bg-color-gray text-color-dark py-2 px-1 rounded-md font-semibold px-3 w-44"
                  onClick={() => setOpenModal(true)}
                />
              )}

              <div className="flex justify-between items-center">
                <Button
                  label={isLoading == 'profile' ? 'Updating...' : 'Update'}
                  type="submit"
                  className="bg-color-pink text-color-primary py-2 px-1 rounded-md mt-3 font-semibold px-3"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
      {openModal && (
        <ModalUpdatePassword
          profile={profile}
          session={session}
          setOpenModal={setOpenModal}
          setToaster={setToaster}
        />
      )}
      {Object.keys(openModalAddress).length > 0 && (
        <ModalUpdateAddress
          profile={profile}
          setProfile={setProfile}
          selectAddress={selectAddress}
          session={session}
          setToaster={setToaster}
          openModalAddress={openModalAddress}
          setOpenModalAddress={setOpenModalAddress}
        />
      )}
      {openModalNewAddress && (
        <ModalAddAddress
          profile={profile}
          setProfile={setProfile}
          session={session}
          setToaster={setToaster}
          openModalNewAddress={openModalNewAddress}
          setModalOpenNewAddress={setModalOpenNewAddress}
        />
      )}
    </>
  );
};

export default ProfileMemberView;
