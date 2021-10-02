import userQueries from "../User/user-queries";
import tokenQueries from "../Token/token-queries";
import moduleQueries from "../Module/module-queries";
import groupQueries from "../Group/group-queries";
import userGroupQueries from "../UserGroup/usergroup-queries";
import postQueries from "../Post/post-queries";
import commentQueries from "../Comment/comment-queries";
import invitationQueries from "../Invitation/invitation-queries";
import jobQueries from "../Jobs/job-queries";

const Query = {
  ...userQueries,
  ...moduleQueries,
  ...groupQueries,
  ...userGroupQueries,
  ...postQueries,
  ...commentQueries,
  ...tokenQueries,
  ...invitationQueries,
  ...jobQueries,
};

export default Query;
