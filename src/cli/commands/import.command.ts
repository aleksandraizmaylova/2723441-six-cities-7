import { Command } from './command.interface.js';
import { TSVFileReader } from '../../shared/libs/file-reader/index.js';
import { createOffer, getErrorMessage, getMongoURI } from '../../shared/helpers/index.js';
import { DefaultOfferService, OfferModel, OfferService } from '../../shared/modules/offer/index.js';
import { DatabaseClient, MongoDatabaseClient } from '../../shared/libs/database-client/index.js';
import { Logger } from '../../shared/libs/logger/index.js';
import { PinoLogger } from '../../shared/libs/logger/index.js';
import { DEFAULT_DB_PORT } from './command.constant.js';
import {Offer} from '../../shared/types/index.js';

export class ImportCommand implements Command {
  private offerService: OfferService;
  private databaseClient: DatabaseClient;
  private readonly logger: Logger;

  constructor() {
    this.onImportedLine = this.onImportedLine.bind(this);
    this.onCompleteImport = this.onCompleteImport.bind(this);

    this.logger = new PinoLogger();
    this.offerService = new DefaultOfferService(this.logger, OfferModel);
    this.databaseClient = new MongoDatabaseClient(this.logger);
  }

  private async onImportedLine(line: string, resolve: () => void) {
    const offer = createOffer(line);
    await this.saveOffer(offer);
    resolve();
  }

  private onCompleteImport(count: number) {
    console.info(`${count} rows imported.`);
    this.databaseClient.disconnect();
  }

  private async saveOffer(offer: Offer) {
    await this.offerService.create({
      title: offer.title,
      description: offer.description,
      publishDate: offer.publishDate,
      city: offer.city,
      preview: offer.preview,
      photos: offer.photos,
      isPremium: offer.isPremium,
      rating: offer.rating,
      accommodationType: offer.accommodationType,
      roomsCount: offer.roomsCount,
      guestsCount: offer.guestsCount,
      rentalCost: offer.rentalCost,
      amenities: offer.amenities,
      author: offer.author,
      coordinates: offer.coordinates,
    });
  }

  public getName(): string {
    return '--import';
  }

  public async execute(filename: string, login: string, password: string, host: string, dbname: string): Promise<void> {
    const uri = getMongoURI(login, password, host, DEFAULT_DB_PORT, dbname);

    await this.databaseClient.connect(uri);

    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on('line', this.onImportedLine);
    fileReader.on('end', this.onCompleteImport);

    try {
      await fileReader.read();
    } catch (error) {
      console.error(`Can't import data from file: ${filename}`);
      console.error(getErrorMessage(error));
    }
  }
}
