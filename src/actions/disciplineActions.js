import { v4 } from 'uuid';

export function createDiscipline(discipline, courseId) {
  return {
    type: 'CREATE_DISCIPLINE',
    discipline: {...discipline, id: v4(), courseId},
  }
}

export function editDiscipline(discipline, courseId) {
  return {
    type: 'EDIT_DISCIPLINE',
    discipline
  }
}

export function removeDiscipline(id) {
  return {
    type: 'REMOVE_DISCIPLINE',
    id
  }
}