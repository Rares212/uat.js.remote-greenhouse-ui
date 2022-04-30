import {ConfigParamModel} from "./config-param.model";
import {BoardModel} from "./board.model";

export class GreenhouseModel {
  id: string;
  createdAt: Date;
  name: string;
  description: string;
  address: string;
  surface: number;
  parameters: ConfigParamModel[];
  boards: BoardModel[];


  constructor(id: string, createdAt: Date, name: string, description: string, address: string, surface: number, parameters: ConfigParamModel[], boards: BoardModel[]) {
    this.id = id;
    this.createdAt = createdAt;
    this.name = name;
    this.description = description;
    this.address = address;
    this.surface = surface;
    this.parameters = parameters;
    this.boards = boards;
  }
}
