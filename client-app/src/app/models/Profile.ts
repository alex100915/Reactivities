import { User } from "./user";

export interface Profile{
    username:string;
    displayName: string;
    image? : string;
    bio? : string;
    photos? : Photo[]
}

export class Profile implements Profile{
    constructor(user: User){
        this.username=user.username;
        this.displayName=user.displayName;
        this.image=user.image;
    }
}

export interface Photo{
    id: string,
    url: string,
    isMain: boolean
}

export interface UpdateAbout{
    displayName: string;
    bio? : string;
}

export  class UpdateAbout implements UpdateAbout{
    constructor(profile: Profile){
        this.displayName=profile.displayName;
        this.bio=profile.bio;
    }
}