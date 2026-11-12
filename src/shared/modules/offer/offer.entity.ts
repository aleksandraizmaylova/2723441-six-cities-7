import {defaultClasses, getModelForClass, prop} from '@typegoose/typegoose';
import {AccommodationType, Amenity, City, Coordinates, Offer, User} from '../../types/index.js';

export interface OfferEntity extends defaultClasses.Base {}

export class OfferEntity extends defaultClasses.TimeStamps implements Offer {
  @prop({ required: true, default: '', unique: true })
  public title: string;

  @prop({ required: true, default: '' })
  public description: string;

  @prop({ required: true })
  public publishDate: Date;

  @prop({ required: true })
  public city?: City;

  @prop({ required: true, default: '' })
  public preview: string;

  @prop({ required: true, default: [] })
  public photos: string[];

  @prop({ required: true, default: false })
  public isPremium: boolean;

  @prop({ required: true, default: 5 })
  public rating: number;

  @prop({ required: true })
  public accommodationType?: AccommodationType;

  @prop({ required: true, default: 1 })
  public roomsCount: number;

  @prop({ required: true, default: 1 })
  public guestsCount: number;

  @prop({ required: true, default: 100 })
  public rentalCost: number;

  @prop({ required: true })
  public amenities?: Amenity[];

  @prop({ required: true })
  public author: User;

  @prop({ required: false, default: 0 })
  public commentsCount: number;

  @prop({ required: true })
  public coordinates: Coordinates;

  constructor(offerData: Offer) {
    super();
    this.title = offerData.title;
    this.description = offerData.description;
    this.publishDate = offerData.publishDate;
    this.city = offerData.city;
    this.preview = offerData.preview;
    this.photos = offerData.photos;
    this.isPremium = offerData.isPremium;
    this.rating = offerData.rating;
    this.accommodationType = offerData.accommodationType;
    this.roomsCount = offerData.roomsCount;
    this.guestsCount = offerData.guestsCount;
    this.rentalCost = offerData.rentalCost;
    this.amenities = offerData.amenities;
    this.author = offerData.author;
    this.commentsCount = offerData.commentsCount;
    this.coordinates = offerData.coordinates;
  }
}

export const OfferModel = getModelForClass(OfferEntity);
