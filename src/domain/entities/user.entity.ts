export class UserEntity {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
  documentNumber?: string;
  documentType?: string;
  phone?: string;
  address?: string;
}
