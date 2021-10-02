import userMutations from "../User/user-mutations";
import tokenMutations from "../Token/token-mutations";
import groupMutations from "../Group/group-mutations";
import moduleMutations from "../Module/module-mutations";
import userGroupMutations from "../UserGroup/usergroup-mutations";
import postMutations from "../Post/post-mutations";
import commentMutations from "../Comment/comment-mutations";
import invitationMutations from "../Invitation/invitation-mutations";
import jobMutations from "../Jobs/job-mutation";

const Mutation = {
  ...userMutations,
  ...tokenMutations,
  ...moduleMutations,
  ...groupMutations,
  ...userGroupMutations,
  ...postMutations,
  ...commentMutations,
  ...invitationMutations,
  ...jobMutations,
};

export default Mutation;
