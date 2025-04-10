import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    name: 'account',
    description: '아이디',
    example: 'account123',
  })
  account: string;

  @ApiProperty({
    name: 'password',
    description: '비밀번호',
    example: 'password123!',
  })
  password: string;
}
