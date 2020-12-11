import {Interest} from "./interest";

export class User {
  public id: number;
  public name: string;
  public email: string;
  public roles: Array<String>;
  public company: string;
  public interest: Array<Interest>

  constructor(props: any) {
    this.id = props.id
    this.name = props.name;
    this.email = props.email;
    this.company = props.company;
    this.roles = props.roles;
    this.interest = props.interests.map((interest: any) => {
      return new Interest(interest);
    });
  }
}
