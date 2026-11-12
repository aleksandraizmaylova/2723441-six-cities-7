import {ContainerModule} from 'inversify';
import {types} from '@typegoose/typegoose';
import {Component} from '../../types/index.js';
import {OfferService} from './offer-service.interface.js';
import {DefaultOfferService} from './default-offer.service.js';
import {OfferEntity, OfferModel} from './offer.entity.js';

export function createOfferContainer() {
  return new ContainerModule((options) => {
    options.bind<OfferService>(Component.OfferService).to(DefaultOfferService);
    options.bind<types.ModelType<OfferEntity>>(Component.OfferModel).toConstantValue(OfferModel);
  });
}
