import { Document } from "mongoose";

interface EmailAddress {
  email_address: string;
  id: string;
  linked_to: Array<{ id: string; type: string }>;
  object: string;
  reserved: boolean;
  verification: {
    attempts: null | number;
    expire_at: null | number;
    status: string;
    strategy: string;
  };
}

interface ExternalAccount {
  approved_scopes: string;
  avatar_url: string;
  email_address: string;
  first_name: string;
  id: string;
  identification_id: string;
  image_url: string;
  label: null | string;
  last_name: string;
  object: string;
  provider: string;
  provider_user_id: string;
  public_metadata: object;
  username: string;
  verification: {
    attempts: null | number;
    expire_at: null | number;
    status: string;
    strategy: string;
  };
}
  
export interface Payload {
  data: {
    backup_code_enabled: boolean;
    banned: boolean;
    birthday: string;
    create_organization_enabled: boolean;
    created_at: number;
    delete_self_enabled: boolean;
    email_addresses: EmailAddress[];
    external_accounts: ExternalAccount[];
    external_id: null | string;
    first_name: string;
    gender: string;
    has_image: boolean;
    id: string;
    image_url: string;
    last_name: string;
    last_sign_in_at: null | number;
    locked: boolean;
    object: string;
    password_enabled: boolean;
    phone_numbers: [];
    primary_email_address_id: string;
    primary_phone_number_id: null | string;
    primary_web3_wallet_id: null | string;
    private_metadata: object;
    profile_image_url: string;
    public_metadata: object;
    saml_accounts: [];
    totp_enabled: boolean;
    two_factor_enabled: boolean;
    unsafe_metadata: object;
    updated_at: number;
    username: string;
    web3_wallets: [];
  };
  object: string;
  type: string;
}

export interface UserModelType extends Document {
  _id: string,
  clerkUserId: string,
  username: string,
  email: string,
  imageUrl: string,
  following: string[],
  followedBy: string[],
  __v: number,
  createdAt: string,
  updatedAt: string
}