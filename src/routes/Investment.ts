import * as Hapi from 'hapi';
import * as mongoose from 'mongoose';
import * as joi from 'joi';
const fetch = require('node-fetch');
import InvestmentModel from '../models/InvestmentModel';
export class InvestmentRoute {
  private investmentModel: mongoose.Model<mongoose.Document>;

  constructor() {
    this.investmentModel = InvestmentModel;
  }
  async getRecommendations(customerId: number) {
    const res = await fetch(
      // tslint:disable-next-line:max-line-length
      'https://ussouthcentral.services.azureml.net/workspaces/e71bfeab7ae04db087ab9a0b7b8857b1/services/07f1ee3004724314a54d476697b99ef7/execute?api-version=2.0&format=swagger',
      {
        method: 'POST',
        body: JSON.stringify({
          Inputs: {
            input1: [
              {
                CD_CLIENTE: customerId,
              },
            ],
          },
          GlobalParameters: {},
        }),
        headers: {
          Authorization:
            // tslint:disable-next-line:max-line-length
            'Bearer DFPefz+jyiWCZ+4TSuy9slyMoAfkHTeBS5/6/sD5EeBPGZtEv7zYGlTDqMd1UeHB8jiHTCULd/+/QO6chKVHMg==',
        },
      },
    );
    return res.json();
  }
  /**  
   * Create a new investment
   * 
   * @param {Hapi.Request} request 
   * @param {Hapi.ReplyNoContinue} reply 
   * @returns {Promise<Hapi.ReplyValue>} 
   * @memberof InvestmentRoute
   */

  public async recommendations(
    request: Hapi.Request,
    reply: Hapi.ReplyNoContinue,
  ): Promise<Hapi.ReplyValue> {
    try {
      const { customer_id } = request.params;
      // tslint:disable-next-line:radix
      const result = await this.getRecommendations(parseInt(customer_id));
      const data = result.Results.output1[0];
      const ids = Object.keys(data)
        .filter(key => key.indexOf('Item') !== -1)
        // tslint:disable-next-line:radix
        .map(key => parseInt(data[key]));

      const investment = await this.investmentModel
        .find({
          CD_FUNDO: { $in: ids },
        })
        .limit(20);
      console.log('quantidade', investment.length);
      return reply({ investment });
    } catch (e) {
      console.log(`ERROR: `, e);
      return reply(e);
    }
  }

  private listInvestment(): Hapi.RouteConfiguration {
    return <Hapi.RouteConfiguration>{
      path: '/investment/{customer_id}',
      method: 'GET',
      config: {
        description: 'Obter recomendação de investimento',
        notes: 'Obter recomendação de investimento',
        tags: ['api', 'investment'],
        handler: (req: any, reply: any) => this.recommendations(req, reply),
        validate: {
          params: {
            customer_id: joi.number().required(),
          },
        },
      },
    };
  }

  public routes(): Hapi.RouteConfiguration[] {
    return [this.listInvestment()];
  }
}
