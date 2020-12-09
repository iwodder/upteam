import {Interest} from "./interest";

export class User {
  id: number;
  name: string;
  email: string;
  roles: Array<String>;
  company: string;
  interest: Array<Interest>

  constructor(props: any) {
    this.id = props.id
    this.name = props.name;
    this.email = props.email;
    this.company = props.company;
    this.roles = props.roles;
    this.interest = props.interests;
  }
}
