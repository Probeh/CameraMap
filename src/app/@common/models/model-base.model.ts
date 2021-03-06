export class ModelBase<T extends ModelBase<T>> {
  // ======================================= //
  public id: number;
  public name: string;
  public created?: Date;
  public description?: string;
  // ======================================= //
  constructor(name: string, id: number) {
    this.name = name;
    this.id = id;
    this.created = new Date();
  }
  // ======================================= //
}
