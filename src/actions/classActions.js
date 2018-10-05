export function attendClass(classId) {
  return { type: "CHANGE_CLASS_STATUS", classId, wentTo: true };
}

export function missClass(classId) {
  return { type: "CHANGE_CLASS_STATUS", classId, wentTo: false };
}

export function resetClass(classId) {
  return { type: 'CHANGE_CLASS_STATUS', classId, wentTo: undefined };
}