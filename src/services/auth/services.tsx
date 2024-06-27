import { addData, retrieveDataByField } from '@/lib/firebase/service';
import bcrypt from 'bcrypt';

export async function signUp(
  userData: {
    email: string;
    fullname: string;
    password: string;
    phoneNumber: string;
    image?: string;
    role: string;
  },
  callback: Function
) {
  const dataEmail = await retrieveDataByField('users', 'email', userData.email);
  const dataPhoneNumber = await retrieveDataByField('users', 'phoneNumber', userData.phoneNumber);

  if (dataEmail.length > 0 || dataPhoneNumber.length > 0) {
    callback(false);
  } else {
    if (!userData.role) {
      userData.role = 'member';
    }
    userData.image = '';
    userData.password = await bcrypt.hash(userData.password, 10);
    addData('users', userData, (result: boolean) => {
      if (result) {
        callback(result);
      }
    });
  }
}

export async function signIn(email: string) {
  const data = await retrieveDataByField('users', 'email', email);

  if (data) {
    return data[0];
  } else {
    return null;
  }
}

export async function loginWithGoogle(
  data: {
    id?: string;
    email: string;
    password?: string;
    role?: string;
  },
  callback: Function
) {
  const user = await retrieveDataByField('users', 'email', data.email);
  if (user?.length > 0) {
    callback(user[0]);
  } else {
    data.role = 'member';
    await addData('users', data, (status: boolean, res: any) => {
      const userId = res.path.split('/').pop();
      data.id = userId;
      if (status) {
        callback(data);
      }
    });
  }
}

export async function loginWithGithub(data: any, callback: Function) {
  const user = await retrieveDataByField('users', 'email', data.email);

  if (user?.length > 0) {
    callback(user[0]);
  } else {
    data.role == 'member';
    addData('users', data, (result: boolean) => {
      if (result) {
        callback(data);
      }
    });
  }
}
