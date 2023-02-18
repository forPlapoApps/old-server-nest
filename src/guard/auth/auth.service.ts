import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import admin from 'firebase-admin';

const firebase_params = {
  apiKey:            process.env.NEXT_PUBLIC_apiKey,
  authDomain:        process.env.NEXT_PUBLIC_authDomain,
  projectId:         process.env.NEXT_PUBLIC_projectId,
  storageBucket:     process.env.NEXT_PUBLIC_storageBucket,
  messagingSenderId: process.env.NEXT_PUBLIC_messagingSenderId,
  appId:             process.env.NEXT_PUBLIC_appId,
  measurementId:     process.env.NEXT_PUBLIC_measurementId,
};

admin.initializeApp(firebase_params);

@Injectable()
export class AuthService {
  async validateUser(idToken: string): Promise<any> {
    if (!idToken) throw new UnauthorizedException('認証されていません');

    try {
      const user = await admin.auth().verifyIdToken(idToken);
      console.log(user)
      return user;
    } catch (e) {
      throw new HttpException('Forbidden', e);
    }
  }
}
