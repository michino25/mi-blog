export interface Category {
  _id: string;
  code: string;
  name: string;
}

export interface UserInfo {
  _id?: string;
  username?: string;
  email?: string;
  profilePic?: string;
}

export interface Post {
  _id: string;
  summary: string;
  photo: string;
  createdAt: string;
  author: {
    _id: string;
    username: string;
    email: string;
    profilePic: string;
  };
  title: string;
  content: string;
  category: {
    _id: string;
    code: string;
    name: string;
  };
  upvote: [];
}
