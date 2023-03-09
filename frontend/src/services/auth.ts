import { User, IUser } from '../models';
import { api } from '../api/api';


function signIn (email?: string, password?: string): Promise<User> {
  return api.post('/users/signIn', { isPublic: true, data: { email, password } }).then(user => new User(user));
}

function signUp (data?: { username?: string, image?: string, email?: string, password?: string }): Promise<IUser> {
  return api.post('/users/signUp', { isPublic: true, data });
}

function me (): Promise<User> {
  return api.get('/users/me').then(user => new User(user));
}

export default {
  signIn,
  signUp,
  me,
};
