import { Department } from 'src/department/entities/department.entity';
import { UserPermissionType } from '../entities/user.entity';

export class CreateAdmin {
  name: string;
  account: string;
  password: string;
  email: string;
  phone: string;
  permission: UserPermissionType;
  department: string;

  constructor({
    name,
    account,
    password,
    email,
    phone,
    permission,
    department,
  }: {
    name: string;
    account: string;
    password: string;
    email: string;
    phone: string;
    permission: UserPermissionType;
    department: string;
  }) {
    this.name = name;
    this.account = account;
    this.password = password;
    this.email = email;
    this.phone = phone;
    this.permission = permission;
    this.department = department;
  }
}
