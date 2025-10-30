// Compatibility layer: expose CHS data under the expected API
export type { UseCase } from '../_data.chs';
import { USE_CASES } from '../_data.chs';

// Ensure Prompt Library order matches the Getting Started accordion
// Desired order by use case id:
// 1) 'redesign-assignment'
// 2) 'lecture-notes'
// 3) 'case-studies'
// 4) 'scaffold-student-work'
// 5) 'build-in-class-activity'
// 6) 'rubrics-feedback'
const ORDER: Record<string, number> = {
	'redesign-assignment': 1,
	'lecture-notes': 2,
	'case-studies': 3,
	'scaffold-student-work': 4,
	'build-in-class-activity': 5,
	'rubrics-feedback': 6,
};

export const readyUseCases = [...USE_CASES].sort((a, b) => {
	const ra = ORDER[a.id] ?? 999;
	const rb = ORDER[b.id] ?? 999;
	return ra - rb || a.title.localeCompare(b.title);
});
