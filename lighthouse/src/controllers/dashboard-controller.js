import { db } from "../models/db.js";
import { GroupSpec } from "../models/joi-schemas.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const groups = await db.groupStore.getUserGroups(loggedInUser._id);
      const viewData = {
        title: "My Lighthouse Dashboard",
        user: loggedInUser,
        groups: groups,
      };
      return h.view("dashboard-view", viewData);
    },
  },

  addGroup: {
    validate: {
      payload: GroupSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("dashboard-view", { title: "Add group error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const newGroup = {
        userid: loggedInUser._id,
        title: request.payload.title,
      };
      await db.groupStore.addGroup(newGroup);
      return h.redirect("/dashboard");
    },
  },

  deleteGroup: {
    handler: async function (request, h) {
      const group = await db.groupStore.getGroupById(request.params.id);
      await db.groupStore.deleteGroupById(group._id);
      return h.redirect("/dashboard");
    },
  },
};
