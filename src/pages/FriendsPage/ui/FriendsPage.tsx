import {
    FriendsList,
    useGetFriend,
    useGetUsers
} from '@/entities/Friends';
import { Loader } from '@/shared/ui/deprecated/Loader';

interface FriendsPageProps {
    className?: string;
}
export const FriendsPage = ({className}: FriendsPageProps) => {

    const { data, refetch, isLoading } = useGetFriend(null)
    const allUsers = useGetUsers(null)
    if (allUsers.data) {
        return (
            <FriendsList
                refreshFriend={refetch}
                isLoading={isLoading}
                actualFriends={data?.actual_friends.map(item => ({ ...item.user, acceptId: item.info.id }))}
                allUser={allUsers?.data}
                receivedInvites={data?.received_invites.map(item => ({ ...item.user, acceptId: item.info.id }))}
                sentInvites={data?.sent_invites.map(item => ({ ...item.user, acceptId: item.info.id }))}
            />
        )
    } return  (<Loader/>)

}

