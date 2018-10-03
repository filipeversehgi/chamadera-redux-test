import { v4 } from 'node-uuid';

export function createCourse(course) {
    return { type: 'CREATE_COURSE', course: {...course, id: v4() } }
}

export function editCourse(course) {
    return { type: 'EDIT_COURSE', course}
}

export function removeCourse(id) {
    return { type: 'REMOVE_COURSE', id }
}