import MemberLayout from '@/components/layouts/MemberLayout';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { uploadFile } from '@/lib/firebase/service';
import userService from '@/services/user';
import Image from 'next/image';
import { useState } from 'react';

type PropTypes = {
  profile: any;
  setProfile: any;
  session: any;
};

const ProfileMemberView = (props: PropTypes) => {
  const { profile, setProfile, session } = props;
  const [changeImage, setChangeImage] = useState<any>({});
  const [errorUploadImage, setErrorUploadImage] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  console.log(profile);

  const handleChangeProfilePicture = (e: any) => {
    try {
      e.preventDefault();
      const file = e.target[0].files[0];
      console.log(file);

      setIsLoading(true);
      if (file) {
        uploadFile(profile?.data?.id, file, async (status: boolean, downloadURL: string) => {
          console.log(status);
          if (status) {
            try {
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
                setIsLoading(false);
                setChangeImage({});
                e.target[0].value = '';
              }
            } catch (error) {
              console.log(error);
              setChangeImage({});
              e.target[0].value = '';
              setIsLoading(false);
            }
          } else {
            setErrorUploadImage({
              message: 'Image size too large, please upload image less than 1mb',
              status: true,
            });
            setTimeout(() => {
              setChangeImage({});
              e.target[0].value = '';
              setIsLoading(false);
              setErrorUploadImage({
                message: '',
                status: false,
              });
            }, 5000);
          }
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <MemberLayout>
      <div className="text-2xl font-bold mb-3">Profile</div>
      <div className="w-full flex gap-5">
        <div className="w-1/4 border-2 border-color-gray p-3">
          <form onSubmit={handleChangeProfilePicture}>
            <div className="w-full h-full flex justify-center flex-col items-center py-3">
              {profile.data?.image ? (
                <Image
                  className="rounded-full p-3 w-56 h-52"
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
              {errorUploadImage.status && <p className="text-color-red font-semibold text-center text-sm italic">*{errorUploadImage.message}</p>}

              {changeImage.name && (
                <Button
                  type="submit"
                  label={isLoading ? 'Upload ...' : 'Upload Profile'}
                  className="bg-color-green text-color-primary py-2 px-1 rounded-md mt-1 font-semibold px-3"
                />
              )}
            </div>
          </form>
        </div>
        <div className="w-3/4 border-2 border-color-gray px-5 py-7 rounded-md">
          <form
            className="flex flex-col gap-2"
            action=""
            // onSubmit={handleUpdateUser}
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
            />
            <Input
              label="Password"
              type="password"
              name="password"
              placeholder="Password"
            />
            <div className="flex justify-end">
              <Button
                // label={isLoading ? 'Updating...' : 'Update'}
                label={'Update'}
                type="submit"
                className="bg-color-blue text-color-primary py-2 px-1 rounded-md mt-3 font-semibold px-3"
              />
            </div>
          </form>
        </div>
      </div>
    </MemberLayout>
  );
};

export default ProfileMemberView;
