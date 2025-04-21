import { ApiProperty } from '@nestjs/swagger';
import { Column } from 'typeorm';

export class EditPermDto {
  @ApiProperty({
    name: 'permMachine',
    description: '기계권한',
    example: 'true',
  })
  @Column()
  permMachine: boolean;

  @ApiProperty({
    name: 'permElectronic',
    description: '전기권한',
    example: 'true',
  })
  @Column()
  permElectronic: boolean;

  @ApiProperty({
    name: 'permLift',
    description: '승강권한',
    example: 'true',
  })
  @Column()
  permLift: boolean;

  @ApiProperty({
    name: 'permFire',
    description: '소방권한',
    example: 'true',
  })
  @Column()
  permFire: boolean;

  @ApiProperty({
    name: 'permConstruct',
    description: '건축권한',
    example: 'true',
  })
  @Column()
  permConstruct: boolean;

  @ApiProperty({
    name: 'permNetwork',
    description: '통신권한',
    example: 'true',
  })
  @Column()
  permNetwork: boolean;

  @ApiProperty({
    name: 'permBeauty',
    description: '미화권한',
    example: 'true',
  })
  @Column()
  permBeauty: boolean;

  @ApiProperty({
    name: 'permSecurity',
    description: '보안권한',
    example: 'true',
  })
  @Column()
  permSecurity: boolean;

  @ApiProperty({
    name: 'permVoc',
    description: '민원권한',
    example: 'true',
  })
  @Column()
  permVoc: boolean;
}
