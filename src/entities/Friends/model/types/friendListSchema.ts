import {User} from "@/entities/User";

export interface UserIfno {
    id: number,
    user_id: number,
    friend_id: number,
    pending: boolean,
    message: string
}
export interface Friends {
    user: User,
    info: UserIfno
}

export interface addFriendPost {
    friend_id: number,
    message: string
}

export interface acceptFriendInvite {
    id: number,
    accept: boolean
}

export interface FriendListSchema {
    isLoading: boolean,
    error: string | undefined,

    actual_friends: Array<Friends>
    sent_invites: Array<Friends>
    received_invites: Array<Friends>
}

export interface getUsersSchema {
    isLoading?: boolean,
    error?: string,
    userList?: User[]
}
