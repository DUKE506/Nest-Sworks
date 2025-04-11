import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  private readonly user: User;

  /**
   * 사용자ID 중복검사
   * --
   * @param account
   */
  async duplicatedUser(account: string) {
    const res = await this.userRepository.findOne({
      where: {
        account,
      },
    });
  }

  async findAll() {
    return await this.userRepository.find();
  }

  /**
   * 관리자 생성
   * @param admin
   * @returns
   */
  async createAdmin(admin: User) {
    const res = await this.userRepository.insert(admin);
    console.log('결과 : ', res);

    return res;
  }

  async findOne(account: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: {
        account,
      },
    });
  }
}
