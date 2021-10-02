import { auth } from "../auth/jwt";
import { generateError } from "../errors/errors";
import { invitationEmail } from "../utils/emails";

const invitationMutations = {
  async createInvitation(parent, { data }, { req, User, Invitation }, info) {
    const user = await auth(req, User);
    const invited = await Promise.all(
      data.emails.map(async (email) => {
        await invitationEmail(email, data.description, user._id);
        const invitation = await Invitation.findOne({
          email,
        });
        if (!invitation) {
          const invite = await new Invitation({
            email,
            description: data.description,
            owned: user._id,
          }).save();
          return invite;
        }
        if (invitation.accepted)
          return generateError(
            `Email "${invitation.email}" exist Already`,
            "CONFLICT"
          );
        invitation.invitationDate = Date.now();
        return await invitation.save();
      })
    );

    return invited;
  },
  async acceptInvitation(parent, { email }, { req, User, Invitation }, info) {
    await auth(req, User);
    const invitation = await Invitation.findOne({ email });
    if (!invitation)
      return generateError(
        "No Invitation with the provided email!",
        "NOT_FOUND"
      );
    invitation.accepted = true;
    return invitation.save();
  },

  async updateInvitation(parent, { data }, { req, User, Invitation }, info) {
    await auth(req, User);
    const invitation = await Invitation.findOne({ _id: data._id });
    if (!invitation)
      return generateError("No Invitation with the provided ID!", "NOT_FOUND");
    Object.assign(invitation, data);
    return invitation.save();
  },

  async deleteInvitation(parent, { _id }, { req, User, Invitation }, info) {
    await auth(req, User);
    const invitation = await Invitation.findByIdAndDelete(_id);
    if (!invitation)
      return generateError("No Invitation with the provided ID!", "NOT_FOUND");
    return invitation;
  },

  async deleteAllInvitation(parent, args, { req, User, Invitation }, info) {
    await auth(req, User);
    await Invitation.deleteMany({});
    return "invitations deleted";
  },
};

export default invitationMutations;
