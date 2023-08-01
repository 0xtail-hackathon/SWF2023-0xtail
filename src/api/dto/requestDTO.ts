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
  excavationLocation?: string;
  currentLocation?: string;
  era?: string;
  category?: string;
  size?: string;
  collectionNumber?: string;
  imgUrl?: string;
  value?: number;
  startDate?: string;
  expiredDate?: string;
}

export class CloseCrowdsaleRequestDTO {
  name?: string;
}
