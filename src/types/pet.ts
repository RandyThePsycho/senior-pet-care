// src/types/pet.ts
// 宠物档案相关类型定义

export type PetType = 'dog' | 'cat';

export type PetSize = 'toy' | 'small' | 'medium' | 'large' | 'giant';

export type WeightUnit = 'lb' | 'kg';

// 主要健康状况（多选）
export type Condition =
  | 'arthritis'
  | 'kidney_disease'
  | 'dementia'
  | 'cancer'
  | 'incontinence'
  | 'mobility_loss'
  | 'chronic_pain'
  | 'heart_disease'
  | 'vision_hearing_loss'
  | 'not_diagnosed';

export interface PetProfile {
  petName: string; // optional, 可为空字符串
  petType: PetType;
  age: number | null;
  weight: number | null;
  weightUnit: WeightUnit;
  size: PetSize | null; // dog 时必填
  conditions: Condition[];
}

// 选项元数据（用于渲染表单 label）
export const CONDITION_OPTIONS: { value: Condition; label: string }[] = [
  { value: 'arthritis', label: 'Arthritis' },
  { value: 'kidney_disease', label: 'Kidney disease' },
  { value: 'dementia', label: 'Dementia / cognitive decline' },
  { value: 'cancer', label: 'Cancer' },
  { value: 'incontinence', label: 'Incontinence' },
  { value: 'mobility_loss', label: 'Mobility loss' },
  { value: 'chronic_pain', label: 'Chronic pain' },
  { value: 'heart_disease', label: 'Heart disease' },
  { value: 'vision_hearing_loss', label: 'Vision / hearing loss' },
  { value: 'not_diagnosed', label: 'Not diagnosed / unsure' },
];

export const SIZE_OPTIONS: { value: PetSize; label: string }[] = [
  { value: 'toy', label: 'Toy' },
  { value: 'small', label: 'Small' },
  { value: 'medium', label: 'Medium' },
  { value: 'large', label: 'Large' },
  { value: 'giant', label: 'Giant' },
];
