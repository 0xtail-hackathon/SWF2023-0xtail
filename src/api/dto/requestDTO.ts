import {Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

export class CreatWalletRequestDTO {
  userName: string;
}

export class SendFundRequestDTO {
  userName: string;
  artifactName: string;
  amount: number
}

export class GenerateArtifactRequestDTO {
  name?: string;
  address?: string;
  excavation_location?: string;
  current_location?: string;
  era?: string;
  category?: string;
  size?: string;
  collection_number?: number;
  imageUrl?: string;
  value?: number;
  startDate?: string;
  expiredDate?: string;
}
