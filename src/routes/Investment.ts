import * as Hapi from 'hapi';
import * as mongoose from 'mongoose';
import * as joi from 'joi';

import InvestmentModel from '../models/InvestmentModel';
export class InvestmentRoute {
  private investmentModel: mongoose.Model<mongoose.Document>;

  constructor() {
    this.investmentModel = InvestmentModel;
  }

  /**
   * Create a new investment
   * 
   * @param {Hapi.Request} request 
   * @param {Hapi.ReplyNoContinue} reply 
   * @returns {Promise<Hapi.ReplyValue>} 
   * @memberof InvestmentRoute
   */
  public async create(
    request: Hapi.Request,
    reply: Hapi.ReplyNoContinue,
  ): Promise<Hapi.ReplyValue> {
    try {
      const investment = await this.investmentModel.create({
        refId: request.payload.refId,
      });
      return reply(investment);
    } catch (e) {
      console.log(`ERROR: `, e);
      return reply(e);
    }
  }

  /**
   * @returns [Returns the Route object for HapiRouter to setup]
   * @memberOf HelloWorldRoute
   */
  private createInvestment(): Hapi.RouteConfiguration {
    return <Hapi.RouteConfiguration>{
      path: '/investment',
      method: 'POST',
      config: {
        description: 'Criar um investmento',
        notes: 'Retorna o investimento criado',
        tags: ['api', 'investment'],
        handler: (req: any, reply: any) => this.create(req, reply),
        validate: {
          payload: {
            refId: joi
              .string()
              .min(1)
              .required(),
          },
        },
      },
    };
  }

  public routes(): Hapi.RouteConfiguration[] {
    return [this.createInvestment()];
  }
}
