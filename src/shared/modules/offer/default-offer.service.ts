import {OfferService} from './offer-service.interface.js';
import {CreateOfferDto} from './dto/create-offer.dto.js';
import {DocumentType, types} from '@typegoose/typegoose';
import {OfferEntity} from './offer.entity.js';
import {Component} from '../../types/index.js';
import {inject} from 'inversify';
import {Logger} from '../../libs/logger/index.js';

export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>
  ) {}

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New category created: ${dto.title}`);
    return result;
  }

  public async findOrCreate(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const existedCategory = await this.findByTitle(dto.title);

    if (existedCategory) {
      return existedCategory;
    }

    return this.create(dto);
  }

  private async findByTitle(title: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findOne({title}).exec();
  }
}
