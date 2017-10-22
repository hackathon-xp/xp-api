import * as Hapi from 'hapi';
import * as mongoose from 'mongoose';
import * as joi from 'joi';
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

  
  public async balanceWallet(
    request: Hapi.Request,
    reply: Hapi.ReplyNoContinue
  ): Promise<Hapi.ReplyValue> {
    try {
      const { payload } = request;

      const user = await this.walletModel.update({ '_id': payload.old_id }, {
        $set: {
          'status': 'inactive'
        }
      });
      var newWallet = await this.walletModel.create({
        userId: user.userId,
        investments: payload.investments_id
      });
      reply(newWallet);
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
  
  /**
   * @returns [Returns the Route object for HapiRouter to setup]
   * @memberOf HelloWorldRoute
   */
  private getBalanceWallet(): Hapi.RouteConfiguration {
    return <Hapi.RouteConfiguration>{
      path: '/balanceWallet',
      method: 'POST',
      config: {
        description: 'Balanceia a wallet de um usuário',
        notes: 'Retorna wallet balanceada',
        tags: ['api'],
        validate: {
          payload: {
            old_id: joi.string().required(),
            investments_id: joi.array().required()
          },
        },
        handler: (req: any, reply: any) => this.balanceWallet(req, reply),
      },
    };
  }

  public routes(): Hapi.RouteConfiguration[] {
    return [this.getWallet(), this.getBalanceWallet(), this.createWallet()];
  }
}
