import { v4 } from 'node-uuid';

export function createDiscipline(discipline, courseId) {
  return {
    type: 'CREATE_DISCIPLINE',
    discipline: {...discipline, id: v4(), courseId}
  }
}

export function editDiscipline(discipline, courseId) {
  return {
    type: 'EDIT_DISCIPLINE',
    discipline
  }
}

export function deleteDiscipline(id) {
  return {
    type: 'DELETE_DISCIPLINE',
    id
  }
}