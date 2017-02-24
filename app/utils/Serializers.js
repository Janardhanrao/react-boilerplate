export function roomListResponseSerializer(room) {
  return {
    roomId: room.room_id,
    userStatus: room.user_status,
    daysLeft: room.days_left,
    roomMembersCount: room.room_members_count,
    roomMembersDetails: room.room_member_details,
    roomName: room.room_name,
    leaderBoardRank: room.leaderboard_rank,
  }
}

export function roomMemberSerializer(roomMember) {
  return {
    memberPic: roomMember.member_pic,
    memberName: roomMember.member_name,
  }
}
export default {
  roomListResponseSerializer,
  roomMemberSerializer,
}
