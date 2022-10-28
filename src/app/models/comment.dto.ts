import { UserInfoDto } from './user-info.dto';

export interface CommentDto {
  id: number | null;

  body: string;

  postsId: number | null;

  user: UserInfoDto;
}
