import { gql } from "apollo-server-express";

import {
  userTypes,
  userQueriesDefs,
  userMutationsDefs,
  userInputs,
} from "../User/user-typedefs";

import {
  tokenTypes,
  tokenQueriesDefs,
  tokenMutationsDefs,
} from "../Token/token-typedef";

import {
  groupTypes,
  groupQueriesDefs,
  groupMutationsDefs,
  groupInputs,
} from "../Group/group-typedefs";

import {
  moduleTypes,
  moduleQueriesDefs,
  moduleMutationsDefs,
  moduleInputs,
} from "../Module/module-typdefs";

import {
  userGroupTypes,
  userGroupQueriesDefs,
  userGroupMutationsDefs,
  userGroupInputs,
} from "../UserGroup/usergroup-typdefs";

import {
  postTypes,
  postQueriesDefs,
  postMutationsDefs,
  postSubscriptionDefs,
  postInputs,
} from "../Post/post-typedefs";

import {
  commentTypes,
  commentQueriesDefs,
  commentMutationsDefs,
  commentSubscriptionDefs,
  commentInputs,
} from "../Comment/comment-typdefs";

import {
  invitationTypes,
  invitationQueriesDefs,
  invitationMutationsDefs,
  invitationInputs,
} from "../Invitation/invitation-typedefs";

import {
  jobTypes,
  jobQueriesDefs,
  jobMutationsDefs,
  jobInputs,
} from "../Jobs/job.typedefs";

const typeDefs = gql`

  scalar Date
  scalar Upload
  
  ${userTypes}
 
  ${tokenTypes}

  ${moduleTypes}

  ${groupTypes}

  ${userGroupTypes}

  ${postTypes}

  ${commentTypes}

  ${invitationTypes}

  ${jobTypes}
 

  type Query {

    ${userQueriesDefs}
    
    ${tokenQueriesDefs}

    ${moduleQueriesDefs}

    ${groupQueriesDefs}
    
    ${userGroupQueriesDefs}
   
    ${postQueriesDefs}

    ${commentQueriesDefs}

    ${invitationQueriesDefs}
   
   ${jobQueriesDefs}
  }

  type Mutation {

    ${userMutationsDefs}

    ${tokenMutationsDefs}

    ${moduleMutationsDefs}
    
    ${groupMutationsDefs}

    ${userGroupMutationsDefs}
 
    ${postMutationsDefs}

    ${commentMutationsDefs}

    ${invitationMutationsDefs}

    ${jobMutationsDefs}
  
  }

  type Subscription {

    ${commentSubscriptionDefs}

    ${postSubscriptionDefs}
  
  }

  ${userInputs}

  ${moduleInputs}

  ${groupInputs}

  ${userGroupInputs}

  ${postInputs}

  ${commentInputs}

  ${invitationInputs}

  ${jobInputs}
`;

export default typeDefs;
