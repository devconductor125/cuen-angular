export class CommentByMonitoring {
  id: number;
  description: string;
  monitoring_id: string;
  monitoring_point_id?: any;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export class User {
  names?: any;
  last_names?: any;
  name: string;
  email: string;
}

export class Image {
  id: number;
  name: string;
  monitoring_point_id: string;
  created_at: string;
  updated_at: string;
}

export class Comment {
  id: number;
  description: string;
  monitoring_id: string;
  monitoring_point_id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export class Point {
  id: number;
  coordinate: string;
  images: Image[];
  comments: Comment[];
}

export class Budget {
  action_name: string;
  action_type: string;
  material_name: string;
  material_type: string;
}

export class MonitoreoDetail {
  id: number;
  title: string;
  hash_map: string;
  start: string;
  end: string;
  date_start: string;
  date_deadline: string;
  type_monitoring: string;
  comment_by_monitoring: CommentByMonitoring[];
  user: User;
  geojson_feature: string;
  points: Point[];
  budget: Budget;
}
