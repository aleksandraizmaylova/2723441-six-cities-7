import {defaultClasses, getModelForClass, prop, modelOptions, Ref} from '@typegoose/typegoose';
import { Offer, User, UserType, UserTypes } from '../../types/index.js';
import {createSHA256} from '../../helpers/index.js';
import {OfferEntity} from '../offer/index.js';

export interface UserEntity extends defaultClasses.Base {
}

@modelOptions({
  schemaOptions: {
    collection: 'users'
  }
})

export class UserEntity extends defaultClasses.TimeStamps implements User {
  @prop({required: true, default: ''})
  public name: string;

  @prop({unique: true, required: true})
  public email: string;

  @prop({required: false, default: ''})
  public avatarPath: string;

  @prop({required: true, default: ''})
  public password: string;

  @prop({required: true, default: 'Standard', enum: UserTypes, type: () => String})
  public type?: UserType;

  @prop({required: false, default: []})
  public favouriteOffers: Offer[];

  @prop({
    ref: OfferEntity,
    required: false,
    default: []
  })
  public favouriteOffersIds?: Ref<OfferEntity>[];

  constructor(userData: User) {
    super();
    this.name = userData.name;
    this.email = userData.email;
    this.avatarPath = userData.avatarPath;
    this.password = '';
    this.type = userData.type;
    this.favouriteOffers = [];
  }

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
