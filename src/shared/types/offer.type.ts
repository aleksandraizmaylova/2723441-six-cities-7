import { User } from './user.type.js';
import { City } from './city.type.js';
import { Coordinates } from './coordinates.type.js';
import { AccommodationType } from './accommodation-type.type.js';
import { Amenity } from './amenity.type.js';

export type Offer = {
  title: string;
  description: string;
  publishDate: Date;
  city?: City;
  preview: string;
  photos: string[];
  isPremium: boolean;
  isFavourite: boolean;
  rating: number;
  accommodationType?: AccommodationType
  roomsCount: number;
  guestsCount: number;
  rentalCost: number;
  amenities?: Amenity[];
  author: User;
  commentsCount: number;
  coordinates: Coordinates;
}
