import { UserType } from './user-type.type.js';
import {Offer} from './offer.type.js';

export type User = {
  name: string;
  email: string;
  avatarPath: string;
  password: string;
  type?: UserType;
  favouriteOffers?: Offer[];
}
