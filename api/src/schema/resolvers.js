import { GraphQLUpload } from "apollo-server-express";
import Mutation from "./Mutation";
import Query from "./Query";
import Subscription from "./Subscription";
import userResolver from "../User/user-resolver";
import userModuleResolver from "../User/usermodule-resolver";
import moduleResolver from "../Module/module-resolver";
import groupResolver from "../Group/group-resolver";
import userGroupResolver from "../UserGroup/usergroup-resolver";
import postResolver from "../Post/post-resolver";
import commentResolver from "../Comment/comment-resolver";
import invitationResolver from "../Invitation/invitation-resolver";

const resolvers = {
  Upload: GraphQLUpload,
  Mutation,
  Query,
  User: userResolver,
  Module: moduleResolver,
  UserModule: userModuleResolver,
  Group: groupResolver,
  UserGroup: userGroupResolver,
  Post: postResolver,
  Comment: commentResolver,
  Invitation: invitationResolver,
  Subscription,
};

export default resolvers;
