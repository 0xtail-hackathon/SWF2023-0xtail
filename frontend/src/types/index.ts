export {};

declare global {
    interface UserInfo {
        username: string;
        profileUrl: string;
    }

    interface HERITAGE {
        address: string;
        category: string;
        collectionNumber: string;
        createdAt: string;
        currentLocation: string;
        era: string;
        excavationLocation: string;
        id: string;
        imgUrl: string;
        imgUrlReq: string;
        name: string;
        size: string;
        updatedAt: string;
        description: string;
    }

    interface CROWD_SALE_INFO {
        address: string;
        createdAt: string;
        expiredDate: string;
        id: string;
        name: string;
        startDate: string;
        updatedAt: string;
        value: string;
        description: string;
    }

    interface FundInfo {
        amount: number;
        artifactName: string;
        createdAt?: string;
        id?: string;
        updatedAt?: string;
        userName: string;
    }

    interface ApiResponse<T> {
        code: string;
        data: T;
    }
}
