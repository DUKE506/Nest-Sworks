import { AddDeptDto } from 'src/department/dto/add-dept.dto';
import { Department } from 'src/department/entities/department.entity';
import { CreateAdmin } from 'src/user/dto/create-admin.dto';
import { User } from 'src/user/entities/user.entity';
import { Workplace } from 'src/workplace/entities/workplace.entity';
import { WorkplaceAdmin } from 'src/workplace/entities/workplace-admin.entity';
import { DataSource } from 'typeorm';
import { Building } from 'src/building/entities/building.entity';
import { Floor } from 'src/building/entities/floor.entity';
import { Room } from 'src/building/entities/room.entity';
import { Facility } from 'src/facility/entities/facility.enrity';
import { Voc } from 'src/voc/entities/voc.entity';
import { NotFoundError } from 'rxjs';
import { Permission, PermissionEnum } from 'src/perm/entities/work-perm.entity';
import { CreatePermissionDto } from 'src/perm/dto/create-perm';

const dataSource = new DataSource({
  type: 'postgres', // 사용 중인 데이터베이스 타입
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'stecdev1234!',
  database: 'sworks',
  entities: [
    Department,
    User,
    Workplace,
    WorkplaceAdmin,
    Building,
    Floor,
    Room,
    Facility,
    Voc,
    Permission,
  ],
  synchronize: true, // 개발 환경에서만 사용
});

const seed = async () => {
  await dataSource.initialize();
  console.log(dataSource.entityMetadatas.map((meta) => meta.name)); // 👈 출력

  const departmentRepository = dataSource.getRepository(Department);
  const userRepository = dataSource.getRepository(User);
  const permRepository = dataSource.getRepository(Permission);

  //부서 생성
  const dept: AddDeptDto = {
    name: '시스템개발연구소',
  };
  console.log('Adding Department...');
  const resDept = await departmentRepository.save(dept);
  console.log('Department Success');

  //운영관리자권한 생성
  const masterPermission: CreatePermissionDto = {
    name: '운영관리자 권한',
    permission: PermissionEnum.운영관리자,
    basicPerm: 2,
    machinePerm: 2,
    electricPerm: 2,
    liftPerm: 2,
    firePerm: 2,
    buildingPerm: 2,
    networkPerm: 2,
    beautyPerm: 2,
    securityPerm: 2,
    userPerm: 2,
    vocPerm: 2,
  };

  const normalPermission: CreatePermissionDto = {
    name: '일반관리자 권한',
    permission: PermissionEnum.일반관리자,
    basicPerm: 2,
    machinePerm: 2,
    electricPerm: 2,
    liftPerm: 2,
    firePerm: 2,
    buildingPerm: 2,
    networkPerm: 2,
    beautyPerm: 2,
    securityPerm: 2,
    userPerm: 2,
    vocPerm: 2,
  };
  console.log('Adding Permission...');

  await permRepository.insert({ ...masterPermission });
  console.log('Master Permission Success');

  await permRepository.insert({ ...normalPermission });
  console.log('Normal Permission Success');

  //관리자 생성
  const user: CreateAdmin = {
    name: '이동희',
    account: 'duke',
    password: 'duke1128!',
    phone: '01032665670',
    email: 'duke@gmail.com',
    department: 1,
  };
  console.log('Adding Admin...');
  const hasDept = await departmentRepository.findOne({
    where: { id: resDept.id },
  });

  const hasPerm = await permRepository.findOne({
    where: { name: masterPermission.name },
  });

  if (!hasDept) return console.log('부서가 존재하지 않습니다.');
  if (!hasPerm) return console.log('권한이 존재하지 않습니다.');

  await userRepository.insert({
    ...user,
    department: hasDept,
    status: 'WORK',
    permission: { id: hasPerm.id },
  });
  console.log('Admin Success');
};

seed().catch((err) => {
  console.error('Seeder 실패', err);
  process.exit(1);
});
