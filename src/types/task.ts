export type Task = {
  id: string;
  title: string;
  start: Date;
  end: Date;
  achievement: boolean;
  createdAt: Date;
  startFilter?: Date;
  endFilter?: Date;
};

export type TaskForMilestone = {
  id: string;
  title: string;
  start: Date;
  end: Date;
  achievement: boolean;
  createdAt: Date;
  startFilter: Date;
  endFilter: Date;
  changed?: boolean;
};

export type TaskForToDo = {
  id: string;
  title: string;
  start: Date;
  end: Date;
  achievement: boolean;
  createdAt: Date;
  startFilter: number;
  endFilter: number;
};
