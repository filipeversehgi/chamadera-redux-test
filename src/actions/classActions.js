import { v4 } from 'node-uuid';

export function attendClass(classe) {
  return { type: 'CHANGE_CLASS_STATUS', classe: { ...classe, id: v4(), status: 'presenca' }}
}

export function missClass(classe) {
  return { type: 'CHANGE_CLASS_STATUS', classe: { ...classe, id: v4(), status: 'falta' } }
}

export function resetClass(id) {
  return { type: 'DELETE_ATTENDANCE', id }
}