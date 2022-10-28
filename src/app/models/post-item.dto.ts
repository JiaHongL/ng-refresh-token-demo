import { UserInfoDto } from './user-info.dto';

export interface PostItemDto {
  id: number;

  title: string;

  body: string;

  cover: string;

  tags: string[];

  user: UserInfoDto;
}
