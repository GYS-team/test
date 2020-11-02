import { useState } from "react";
import { createContainer } from "unstated-next";
export interface Student {
  id: number;
  name: string;
  email?: string;
  score: number;
}

export const parseToStudent = (data: any): Student => ({
  id: data.id,
  // TODO: there could be a better design to address this problem,
  // which allows some items here to be `null` or `undefined`
  name: data.name,
  email: data.email ? data.email : "",
  score: data.score,
});

export const Filter = createContainer(() => {
  const [studentName, setStudentName] = useState<string | undefined>("");
  const [studentId, setStudentId] = useState<number | undefined>(0);
  const [studentScore, setStudentScore] = useState<number>(0);

  const clearFilter = () => {
    setStudentName("");
    setStudentId(0);
    setStudentScore(0);
  };

  const filter = (student: Student): boolean =>
    // if studentName is not null, match name
    (!studentName || student.name.match(studentName) != null) &&
    // if studentId is not null, match Id
    (!studentId || student.id === studentId) &&
    // match Score
    (studentScore <= 0 || student.score > studentScore);

  return {
    filterInfo: {
      studentName,
      setStudentName,
      studentId,
      setStudentId,
      studentScore,
      setStudentScore,
    },
    clearFilter,
    filter,
  };
});
