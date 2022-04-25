import {BoardType} from "../enum/board-type.enum";
import {SensorModel} from "./sensor.model";

export class BoardModel {
  id: string;
  name: string;
  type: BoardType;
  lastActiveAt: Date;
  sensors: SensorModel[];


  constructor(id: string, name: string, type: BoardType, lastActiveAt: Date, sensors: SensorModel[]) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.lastActiveAt = lastActiveAt;
    this.sensors = sensors;
  }

  public static createEmptyBoard(): BoardModel {
    return new BoardModel('', '', BoardType.GENERIC, new Date(), []);
  }
}
