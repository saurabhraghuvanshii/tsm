const { randomUUID } = require('crypto');
const taskService = require('../services/task.service');

const DAY = 24 * 60 * 60 * 1000;

const dateFromToday = (days) => new Date(Date.now() + days * DAY).toISOString().slice(0, 10);
const isoDaysAgo = (days) => new Date(Date.now() - days * DAY).toISOString();

const SEED_TASKS = [
  { title: 'Finalize Q4 roadmap', description: 'Consolidate feedback from product and engineering leads and publish the Q4 roadmap.', status: 'in_progress', priority: 'high', due: 3, created: 9 },
  { title: 'Fix login redirect bug', description: 'Users are sent to the home page instead of their original destination after signing in.', status: 'pending', priority: 'high', due: -2, created: 6 },
  { title: 'Update onboarding docs', description: 'Refresh setup steps for new engineers to reflect the Node 20 upgrade and new env variables.', status: 'pending', priority: 'medium', due: 7, created: 5 },
  { title: 'Review pull request #142', description: 'Review the pagination refactor and leave comments on edge cases around empty pages.', status: 'completed', priority: 'medium', due: -1, created: 4 },
  { title: 'Prepare sprint demo', description: 'Assemble a short walkthrough of the new task filters and theme toggle for Friday demo.', status: 'pending', priority: 'medium', due: 2, created: 3 },
  { title: 'Renew SSL certificate', description: 'Certificate for the staging domain expires soon; renew and verify the deployment.', status: 'pending', priority: 'high', due: -4, created: 12 },
  { title: 'Clean up unused feature flags', description: 'Remove flags that have been fully rolled out for more than 30 days.', status: 'in_progress', priority: 'low', due: 14, created: 8 },
  { title: 'Organize team offsite', description: 'Shortlist venues, collect availability, and draft a rough agenda for the offsite.', status: 'pending', priority: 'low', due: null, created: 2 },
  { title: 'Write release notes v2.3', description: 'Summarize new features, fixes, and known issues for the upcoming v2.3 release.', status: 'completed', priority: 'medium', due: -6, created: 10 },
  { title: 'Audit accessibility on forms', description: 'Check labels, focus order, and error announcements on create and edit task forms.', status: 'in_progress', priority: 'medium', due: 5, created: 1 },
];

const seedTasks = () => {
  taskService.reset(
    SEED_TASKS.map(({ due, created, ...rest }) => {
      const timestamp = isoDaysAgo(created);
      return {
        id: randomUUID(),
        ...rest,
        dueDate: due === null ? null : dateFromToday(due),
        createdAt: timestamp,
        updatedAt: timestamp,
      };
    }),
  );
};

module.exports = { seedTasks };
