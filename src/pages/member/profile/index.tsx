import ProfileMemberView from '@/components/views/member/Profile';
import userService from '@/services/user';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

const MemberAdminProfile = () => {
  const [profile, setProfile] = useState({});
  const session: any = useSession();
  useEffect(() => {
    if (session.data?.accessToken && Object.keys(profile).length === 0) {
      const getProfile = async () => {
        try {
          const data = await userService.getProfile(session.data?.accessToken);
          setProfile(data.data);
        } catch (error) {
          console.log(error);
        }
      };
      getProfile();
    }
  }, [session, profile]);

  return (
    <ProfileMemberView
      profile={profile}
      setProfile={setProfile}
      session={session}
    />
  );
};

export default MemberAdminProfile;
