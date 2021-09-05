export interface Authorizer {
  id: number;
  userSystemId: string;
  userName: string;
  fullName: string;
  processTypeId: string;
  processTypeName: number;
  sortOrder: number;
  required: boolean;
}