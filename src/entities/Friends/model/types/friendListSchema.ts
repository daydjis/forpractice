export interface Friends {
    user: {
        id: number,
        login: string,
        name: string,
        lastname: string,
        age: number,
        avatar: string,
        city: string,
        country: string
    },
    info: {
        id: number,
        user_id: number,
        friend_id: number,
        pending: boolean,
        message: string
    }
}

export interface FriendListSchema {
    isLoading: boolean,
    error: string | undefined,

    actual_friends: Array<Friends>
    sent_invites: Array<Friends>
    received_invites: Array<Friends>
}
