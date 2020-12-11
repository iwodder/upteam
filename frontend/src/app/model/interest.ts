export class Interest {

  id: number;
  public language: string;
  public level: string;

  constructor(props: any) {
    this.id = props.id;
    this.language = props.language;
    this.level = props.level;
  }
}
