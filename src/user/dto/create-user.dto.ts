import { Department } from 'src/department/entities/department.entity';
import { UserPermissionType } from '../entities/user.entity';

export class CreateUser {
  name: string;
  account: string;
  password: string;
  email: string;
  phone: string;

  constructor({
    name,
    account,
    password,
    email,
    phone,
  }: {
    name: string;
    account: string;
    password: string;
    email: string;
    phone: string;
  }) {
    this.name = name;
    this.account = account;
    this.password = password;
    this.email = email;
    this.phone = phone;
  }
}
