import * as Hapi from 'hapi';
import * as mongoose from 'mongoose';

import UserModel from './../models/UserModel';
export class HelloWorldRoute {
  private userModel: mongoose.Model<mongoose.Document>;

  constructor() {
    this.userModel = UserModel;
  }
  public async helloWorld(
    request: Hapi.Request,
    reply: Hapi.ReplyNoContinue,
  ): Promise<Hapi.ReplyValue> {
    try {
      const result = await this.userModel.create({ name: '123' });
      const user = await this.userModel.find({}).lean(true);
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
  private getHelloWord(): Hapi.RouteConfiguration {
    return <Hapi.RouteConfiguration>{
      path: '/helloWorld',
      method: 'GET',
      config: {
        description: 'Listar todos os produtos',
        notes: 'Retorna os produtos',
        tags: ['api'],
        handler: (req: any, reply: any) => this.helloWorld(req, reply),
      },
    };
  }

  public routes(): Hapi.RouteConfiguration[] {
    return [this.getHelloWord()];
  }
}
