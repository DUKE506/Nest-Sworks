import { AddDeptDto } from 'src/department/dto/add-dept.dto';
import { Department } from 'src/department/entities/department.entity';
import { CreateAdmin } from 'src/user/dto/create-admin.dto';
import { User } from 'src/user/entities/user.entity';
import { Workplace } from 'src/workplace/entities/workplace.entity';
import { WorkplaceAdmin } from 'src/workplace/entities/workplace-admin.entity';
import { DataSource } from 'typeorm';

const dataSource = new DataSource({
  type: 'postgres', // 사용 중인 데이터베이스 타입
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'stecdev1234!',
  database: 'sworks',
  entities: [Department, User, Workplace, WorkplaceAdmin],
  synchronize: true, // 개발 환경에서만 사용
});

const seed = async () => {
  await dataSource.initialize();
  console.log(dataSource.entityMetadatas.map((meta) => meta.name)); // 👈 출력

  const departmentRepository = dataSource.getRepository(Department);
  const userRepository = dataSource.getRepository(User);

  //부서 생성
  const dept: AddDeptDto = {
    name: '시스템개발연구소',
  };
  console.log('Adding Department...');
  const resDept = await departmentRepository.save(dept);
  console.log('Department Success');

  //관리자 생성
  const user: CreateAdmin = {
    name: '이동희',
    account: 'duke',
    password: 'duke1128!',
    phone: '01032665670',
    email: 'duke@gmail.com',
    permission: 'MANAGER',
    department: resDept,
  };
  console.log('Adding Admin...');
  await userRepository.insert(user);
  console.log('Admin Success');
};

seed().catch((err) => {
  console.error('Seeder 실패', err);
  process.exit(1);
});
