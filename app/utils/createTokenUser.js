const createTokenUser = (user) => {
  return {
    name: user.name,
    userId: user._id,
    role: user.role,
    email: user.email,
    organizer: user.organizer,
  };
};

const createTokenParticipant = (participant) => {
  return {
    participantId: participant._id,
    firstname: participant.firstname,
    lastname: participant.lastname,
    email: participant.email,
  };
};

module.exports = { createTokenUser, createTokenParticipant };
