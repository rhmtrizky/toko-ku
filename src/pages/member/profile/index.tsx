import ProfileMemberView from '@/components/views/member/Profile';
import userService from '@/services/user';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

const MemberAdminProfile = () => {
  const [profile, setProfile] = useState({});
  const session: any = useSession();
  useEffect(() => {
    const getProfile = async () => {
      try {
        const data = await userService.getProfile(session.data?.accessToken);
        setProfile(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProfile();
  }, [session]);
  return <ProfileMemberView profile={profile} />;
};

export default MemberAdminProfile;
