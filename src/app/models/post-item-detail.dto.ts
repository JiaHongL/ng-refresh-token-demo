import { UserInfoDto } from './user-info.dto';

export interface PostItemDetailDto {
  id: number | null;

  postId: number;

  title: string;

  body: string;

  cover: string;

  tags: string[];

  user: UserInfoDto;

}
