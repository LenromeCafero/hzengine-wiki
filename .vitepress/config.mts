import { defineConfig } from "vitepress";
import { generateSidebar } from "vitepress-sidebar";
import renpy_tmLanguage from "./renpy.tmLanguage.json";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "HZ-Engine Wiki",
  description: "hzegine wiki",
  head: [
    [
      "link",
      {
        rel: "icon",
        href: "/static/Cafero_avatar_320x320_transparent.png",
      },
    ],
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "首页", link: "/" },
      { text: "Wiki", link: "/wiki" },
    ],
    sidebarMenuLabel: "目录",
    outlineTitle: "文章导航",
    returnToTopLabel: "返回顶部",
    sidebar: generateSidebar({
      /* Options... */
      documentRootPath: "/",
      scanStartPath: "/wiki",
      useTitleFromFileHeading: true,
      useFolderTitleFromIndexFile: true,
      sortMenusOrderNumericallyFromLink: true,
      sortFolderTo: "bottom",
    }),
    socialLinks: [{ icon: "github", link: "https://github.com/LenromeCafero" }],
    footer: {
      message: "",
      copyright: "Copyright © 2024 Lenrome Cafero",
    },
    // feature
    editLink: {
      pattern: "https://github.com/LenromeCafero/hzengine-wiki/edit/main/:path",
      text: "在 GitHub 上编辑此页",
    },
    docFooter: {
      prev: "上一页",
      next: "下一页",
    },
    search: {
      provider: "local",
    },
  },
  markdown: {
    lineNumbers: true,
    shikiSetup: (shiki) => {
      shiki.loadLanguageSync([renpy_tmLanguage as any]);
    },
  },
});
