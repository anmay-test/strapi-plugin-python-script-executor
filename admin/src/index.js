import pluginPkg from "../../package.json";
import pluginId from "./pluginId";
import App from "./containers/App";
import Initializer from "./containers/Initializer";
import lifecycles from "./lifecycles";
import trads from "./translations";
import Settings from "./components/Settings";

export default (strapi) => {
  const pluginDescription =
    pluginPkg.strapi.description || pluginPkg.description;
  const icon = pluginPkg.strapi.icon;
  const name = pluginPkg.strapi.name;

  // Declare the links that will be injected into the settings menu
  const menuSection = {
    id: pluginId,
    title: {
      id: `${pluginId}.settings`,
      defaultMessage: "Console Script",
    },
    links: [
      {
        title: {
          id: `${pluginId}.environment`,
          defaultMessage: "Environment Variables",
        },
        to: `${strapi.settingsBaseURL}/${pluginId}/environment`,
        // Component: SettingLink,
        //     // Bool : https://reacttraining.com/react-router/web/api/Route/exact-bool
        //     exact: false,
        // name: "setting",
        permissions: [
          {
            action: `plugins::${pluginId}.read`,
            subject: null,
          },
        ],
      },
    ],
  };

  const plugin = {
    blockerComponent: null,
    blockerComponentProps: {},
    description: pluginDescription,
    icon,
    id: pluginId,
    initializer: Initializer,
    injectedComponents: [],
    isReady: false,
    isRequired: pluginPkg.strapi.required || false,
    layout: null,
    lifecycles,
    mainComponent: App,
    name,
    preventComponentRendering: false,
    trads,
    menu: {
      collectionTypesSectionLinks: [
        {
          isDisplayed: false,
          label: "Test",
          schema: { modelType: "contentType", kind: "collectionType" },
          uid: `plugins::${pluginId}.PythonScript`,
        },
      ],
      pluginsSectionLinks: [
        {
          destination: `/plugins/${pluginId}`,
          icon,
          label: {
            id: `${pluginId}.plugin.name`,
            defaultMessage: name,
          },
          name,
          permissions: [
            {
              action: `plugins::${pluginId}.read`, // action is registerd at bootstrap file
              subject: null,
            },
          ],
        },
      ],
    },
    settings: {
      mainComponent: Settings,
      menuSection,
    },
  };

  return strapi.registerPlugin(plugin);
};
