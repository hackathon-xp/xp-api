import * as Hapi from 'hapi';
import * as mongoose from 'mongoose';

import WalletModel from './../models/WalletModel';
import * as joi from 'joi';
export class WalletRoute {
  private walletModel: mongoose.Model<mongoose.Document>;

  constructor() {
    this.walletModel = WalletModel;
  }
  private async wallet(
    request: Hapi.Request,
    reply: Hapi.ReplyNoContinue,
  ): Promise<Hapi.ReplyValue> {
    try {
      const user = await this.walletModel.find({}).lean(true);
      return reply(user);
    } catch (e) {
      console.log(`ERRO`, e);
      return reply(e);
    }
  }

  private async createWalletFn(
    request: Hapi.Request,
    reply: Hapi.ReplyNoContinue,
  ): Promise<Hapi.ReplyValue> {
    try {
      const { payload } = request;

      const user = await this.walletModel.create(payload);
      return reply(user);
    } catch (e) {
      console.log(`ERRO`, e);
      return reply(e);
    }
  }
  /**
   * @returns [Returns the Route object for HapiRouter to setup]
   * @memberOf HelloWorldRoute
   */
  private createWallet(): Hapi.RouteConfiguration {
    return <Hapi.RouteConfiguration>{
      path: '/wallet',
      method: 'POST',
      config: {
        validate: {
          payload: {
            userId: joi.string().required(),
            investments: joi.array(),
          },
        },
        description: 'Cria uma carteira',
        notes: 'Cria uma carteira',
        tags: ['api'],
        handler: (req: any, reply: any) => this.createWalletFn(req, reply),
      },
    };
  }

  /**
   * @returns [Returns the Route object for HapiRouter to setup]
   * @memberOf HelloWorldRoute
   */
  private getWallet(): Hapi.RouteConfiguration {
    return <Hapi.RouteConfiguration>{
      path: '/wallet',
      method: 'GET',
      config: {
        description: 'Listar todos as wallets',
        notes: 'Retorna wallets',
        tags: ['api'],
        handler: (req: any, reply: any) => this.wallet(req, reply),
      },
    };
  }

  public routes(): Hapi.RouteConfiguration[] {
    return [this.getWallet(), this.createWallet()];
  }
}
