import { Department } from 'src/department/entities/department.entity';
import { UserPermissionType } from '../entities/user.entity';

export class CreateAdmin {
  name: string;
  account: string;
  password: string;
  email: string;
  phone: string;
  department: number;
  permission?: string;

  constructor({
    name,
    account,
    password,
    email,
    phone,
    department,
    permission,
  }: {
    name: string;
    account: string;
    password: string;
    email: string;
    phone: string;
    department: number;
    permission: string;
  }) {
    this.name = name;
    this.account = account;
    this.password = password;
    this.email = email;
    this.phone = phone;
    this.department = department;
    this.permission = permission;
  }
}
