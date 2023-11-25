export type DraftStatus = DraftStatusEnum.NOT_SEEN | DraftStatusEnum.SEEN | DraftStatusEnum.PENDING | DraftStatusEnum.APPROVED;
export type DraftTypes = DraftTypeEnum.DRAFT | DraftTypeEnum.POST;
export type AccountType = AccountTypeEnum.SUPER | AccountTypeEnum.ADMIN | AccountTypeEnum.USER | AccountTypeEnum.GUEST;
export type UserActivityType = UserActivityEnum.CREATE | UserActivityEnum.DELETE | UserActivityEnum.UPDATE;
export type SearchType = SearchTypeEnum.POST | SearchTypeEnum.DRAFT | SearchTypeEnum.FAVORITE;
export type SavingDraftType = SavingTypeEnum.SAVING | SavingTypeEnum.WARNING | SavingTypeEnum.TEMPORAL;

export enum SavingTypeEnum {
  SAVING = 'saving',
  WARNING = 'warning',
  TEMPORAL = 'temporal'
}

export enum DraftStatusEnum {
  NOT_SEEN = 'not-seen',
  SEEN = 'seen',
  PENDING = 'pending',
  APPROVED = 'approved',
  ALL = 'all'
}

export enum DraftTypeEnum {
  DRAFT = 'draft',
  POST = 'post'
}

export enum AccountTypeEnum {
  SUPER = 'Super',
  ADMIN = 'Admin',
  USER = 'User',
  GUEST = 'Guest'
}

export enum UserActivityEnum {
  CREATE = 'create',
  DELETE = 'delete',
  UPDATE = 'update'
}

export enum SearchTypeEnum {
  POST = 'post',
  DRAFT = 'draft',
  FAVORITE = 'favorite'
}

export enum ValidatorEnum {
  MIN_LENGTH = 'minlength',
  MAX_LENGTH = 'maxlength',
  REQUIRED = 'required',
  PATTERN = 'pattern',
  EMAIL = 'email',
  PASSWORD = 'password'
}
