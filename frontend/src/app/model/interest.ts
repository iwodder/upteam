export class Interest {

  id: number;
  language: string;
  level: string;

  constructor(props: any) {
    this.id = props.id;
    this.language = props.language;
    this.level = props.level;
  }
}
