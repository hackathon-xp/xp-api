import * as Hapi from 'hapi';
import * as mongoose from 'mongoose';
import * as joi from 'joi';

import WalletModel from './../models/WalletModel';
import * as joi from 'joi';
export class WalletRoute {
  private walletModel: mongoose.Model<mongoose.Document>;

  constructor() {
    this.walletModel = WalletModel;
  }
<<<<<<< HEAD

  public async wallet(
=======
  private async wallet(
>>>>>>> b58b2152de45adadf3817890b4e4fdbaaf16cee9
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

<<<<<<< HEAD
  public async balanceWallet(
    request: Hapi.Request,
    reply: Hapi.ReplyNoContinue
  ): Promise<Hapi.ReplyValue> {
    try {
      const user = await this.walletModel.update({ '_id': request.payload.old_id }, {
        $set: {
          'status': 'inactive'
        }
      });
      return await this.walletModel.create({
        userId: user.userId,
        investments: request.payload.investments_id
      });
=======
  private async createWalletFn(
    request: Hapi.Request,
    reply: Hapi.ReplyNoContinue,
  ): Promise<Hapi.ReplyValue> {
    try {
      const { payload } = request;

      const user = await this.walletModel.create(payload);
      return reply(user);
>>>>>>> b58b2152de45adadf3817890b4e4fdbaaf16cee9
    } catch (e) {
      console.log(`ERRO`, e);
      return reply(e);
    }
  }
<<<<<<< HEAD
  
=======
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

>>>>>>> b58b2152de45adadf3817890b4e4fdbaaf16cee9
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
              old_id: joi.number().required(),
              investments_id: joi.array().required()
            },
          },
          handler: (req: any, reply: any) => this.balanceWallet(req, reply),
        },
      };
    }

  public routes(): Hapi.RouteConfiguration[] {
<<<<<<< HEAD
    return [this.getWallet(), this.getBalanceWallet()];
=======
    return [this.getWallet(), this.createWallet()];
>>>>>>> b58b2152de45adadf3817890b4e4fdbaaf16cee9
  }
}
