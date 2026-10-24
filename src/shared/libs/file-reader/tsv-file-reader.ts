import { FileReader } from './file-reader.interface.js';
import { readFileSync } from 'node:fs';
import { isAccommodationType, isAmenityArray, isCity, isUserType, Offer} from '../../types/index.js';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(
    private readonly filename: string
  ) {}

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      throw new Error('File was not read');
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => line.split('\t'))
      .map(([title, description, publishDate, city, preview, photos, isPremium, isFavourite, rating, accommodationType, roomsCount, guestsCount, rentalCost, amenities, author, commentsCount, coordinates]) => ({
        title,
        description,
        publishDate: new Date(publishDate),
        city: isCity(city),
        preview,
        photos: photos.split(';'),
        isPremium: isPremium === 'true',
        isFavourite: isFavourite === 'true',
        rating: Number.parseFloat(rating),
        accommodationType: isAccommodationType(accommodationType),
        roomsCount: Number.parseInt(roomsCount, 10),
        guestsCount: Number.parseInt(guestsCount, 10),
        rentalCost: Number.parseInt(rentalCost, 10),
        amenities: isAmenityArray(amenities.split(';')),
        author: {
          name: author.split(';')[0],
          email: author.split(';')[1],
          avatarPath: author.split(';')[2],
          password: author.split(';')[3],
          type: isUserType(author.split(';')[4]),
        },
        commentsCount: Number.parseInt(commentsCount, 10),
        coordinates: {
          latitude: Number.parseFloat(coordinates.split(';')[0]),
          longitude: Number.parseFloat(coordinates.split(';')[1]),
        }
      }));
  }
}
