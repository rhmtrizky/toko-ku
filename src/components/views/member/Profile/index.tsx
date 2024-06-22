import MemberLayout from '@/components/layouts/MemberLayout';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import ProgressUi from '@/components/ui/Progress';
import { uploadFile } from '@/lib/firebase/service';
import userService from '@/services/user';
import { useState } from 'react';
import ModalUpdatePassword from './ModalUpdatePassword';
import Image from 'next/image';

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

  const handleUpdateProfile = async (e: any) => {
    e.preventDefault();
    setIsLoading('profile');
    const form: any = e.target as HTMLFormElement;
    const data = {
      fullname: form.fullname.value,
    };

    const result = await userService.updateProfile(profile.data.id, data, session.data?.accessToken);
    if (result.status == 200) {
      setProfile({
        ...profile,
        data: {
          ...profile.data,
          fullname: data.fullname,
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
      <MemberLayout>
        <div className="text-2xl font-bold mb-3">Profile</div>
        <div className="my-3">{progressPercent.status && <ProgressUi percent={progressPercent.progressPercent} />}</div>
        <div className="w-full flex gap-5">
          <div className="w-1/4 border-2 border-color-gray p-3">
            <form onSubmit={handleChangeProfilePicture}>
              <div className="w-full h-full flex justify-center flex-col items-center py-3">
                {profile.data?.image ? (
                  <Image
                    className="rounded-full p-3 w-48 h-48 object-cover"
                    src={profile.data?.image}
                    alt="profile"
                    width={200}
                    height={200}
                  />
                ) : (
                  <div className="rounded-full p-3 w-48 h-48 bg-color-gray flex justify-center items-center mb-4">
                    <h1 className="text-7xl font-bold text-color-blue">{profile.data?.fullname.charAt(0)}</h1>
                  </div>
                )}

                <div className="relative ">
                  {changeImage.name ? (
                    <p className="text-center text-sm p-3 bg-color-gray rounded-md">{changeImage.name}</p>
                  ) : (
                    <div className="text-center text-sm p-3 bg-color-gray rounded-md">
                      <p>Upload new Aavatar, larger image will be resize automatically</p>
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
          <div className="w-3/4 border-2 border-color-gray px-5 py-7 rounded-md">
            <form
              className="flex flex-col gap-2 mt-3"
              action=""
              onSubmit={handleUpdateProfile}
            >
              <Input
                label="Fullname"
                type="fullname"
                name="fullname"
                defaultValue={profile?.data?.fullname}
              />

              <Input
                label="Email"
                type="email"
                name="email"
                defaultValue={profile?.data?.email}
                disabled
              />
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
                  className="bg-color-blue text-color-primary py-2 px-1 rounded-md mt-3 font-semibold px-3"
                />
              </div>
            </form>
          </div>
        </div>
      </MemberLayout>
      {openModal && (
        <ModalUpdatePassword
          profile={profile}
          session={session}
          setOpenModal={setOpenModal}
          setToaster={setToaster}
        />
      )}
    </>
  );
};

export default ProfileMemberView;
