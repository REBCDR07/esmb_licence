export interface StudentInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  major: string;
}

export interface ProjectInfo {
  topic: string;
  generalObjective: string;
  specificObjectives: [string, string, string];
}

export interface AppState {
  step: number;
  studentInfo: StudentInfo;
  projectInfo: ProjectInfo;
}

export enum Step {
  STUDENT_INFO = 1,
  PROJECT_INFO = 2,
  REVIEW = 3,
}

export interface AISuggestion {
  generalObjective: string;
  specificObjectives: string[];
}
