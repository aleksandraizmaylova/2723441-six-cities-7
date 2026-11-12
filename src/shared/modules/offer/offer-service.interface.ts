import {CreateOfferDto} from './dto/create-offer.dto.js';
import {OfferEntity} from './offer.entity.js';
import {DocumentType} from '@typegoose/typegoose';

export interface OfferService {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  findOrCreate(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
}
