export interface IProject {
    _id: string;
    posterImgUrl: string;
    thumbImgUrl: string;
    title: string;
    price: number;
    desc: string;
    included: string[];
    features: string[];
    liveLink: string;
    purchaseLink: string;
    playlistLink: string;
}

export interface IBlog {
    _id: string;
    imgUrl: string;
    title: string;
    price: number;
    desc: string;
}
export interface ICarousel {
    _id: string;
    thumbImgUrl?: string;
}

export type SearchParamProps = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

export interface Sponsor {
  id: string;
  name: string;
  category: string;
}
