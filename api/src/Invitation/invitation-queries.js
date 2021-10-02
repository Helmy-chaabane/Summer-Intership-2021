import { auth } from "../auth/jwt";

const invitationQueries = {
  async invitations(
    parent,
    { accepted, isPending = false },
    { req, User, Invitation },
    info
  ) {
    const user = await auth(req, User);
    return Invitation.find({ accepted, isPending, owned: user._id })
      .sort({ acceptedDate: -1, invitationDate: -1 })
      .exec();
  },
};

export default invitationQueries;
