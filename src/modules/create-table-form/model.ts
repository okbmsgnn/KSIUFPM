export type StepType = 'hours' | 'days' | 'month';

export interface TableFormData {
  name: string;
  description: string;
  tags: string;
  startDate: Date | null;
  endDate: Date | null;
  colorPalette: [string, string, string, string];
  step: { type: StepType; value: number };
}
