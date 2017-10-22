import * as Hapi from 'hapi';
import * as mongoose from 'mongoose';

import WalletModel from './../models/WalletModel';
export class WalletRoute {
  private walletModel: mongoose.Model<mongoose.Document>;

  constructor() {
    this.walletModel = WalletModel;
  }
  public async wallet(
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
    return [this.getWallet()];
  }
}
