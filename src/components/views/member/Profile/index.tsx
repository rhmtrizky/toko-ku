import MemberLayout from '@/components/layouts/MemberLayout';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Image from 'next/image';

type PropTypes = {
  profile: any;
};

const ProfileMemberView = (props: PropTypes) => {
  const { profile } = props;

  return (
    <MemberLayout>
      <div className="text-2xl font-bold mb-3">Profile</div>
      <div className="w-full flex gap-5">
        <div className="w-1/4 border-2 border-color-gray p-3">
          <div className="w-full h-full flex justify-center flex-col items-center">
            <Image
              className="rounded-full p-3"
              src={profile.data?.image}
              alt="profile"
              width={200}
              height={200}
            />
            <p className="text-center text-sm p-3 bg-color-gray rounded-md">
              Upload new Aavatar, larger image will be resize automatically
              <br /> Maximum image size is <b>1 MB</b>
            </p>
            <input
              type="file"
              className="absolute w-full h-full opacity-0"
            />
            <Button
              label="Change Avatar"
              type="submit"
              className="bg-color-green text-color-primary py-2 px-1 rounded-md mt-3 font-semibold px-3"
            />
          </div>
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
