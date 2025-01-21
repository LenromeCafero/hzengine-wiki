import { defineConfig, UserConfig } from "vitepress";
import { withSidebar } from "vitepress-sidebar";
import { withI18n } from 'vitepress-i18n';
import renpy_tmLanguage from "./renpy.tmLanguage.json";
import type { VitePressI18nOptions } from 'vitepress-i18n/types';
import { VitePressSidebarOptions } from "vitepress-sidebar/types";
import { Highlighter } from "shiki";

const defaultLocale: string = 'zh';
const supportLocales: string[] = [defaultLocale, 'en'];

const vitePressSidebarConfig: VitePressSidebarOptions = {
  /* Options... */
  documentRootPath: `/`,
  scanStartPath: `${defaultLocale}/wiki/`,
  useTitleFromFileHeading: true,
  useFolderTitleFromIndexFile: true,
  sortMenusOrderNumericallyFromLink: true,
  sortFolderTo: "bottom",
  // debugPrint: true,
};

const vitePressI18nConfig: VitePressI18nOptions = {
  // VitePress I18n config
  locales: ['zh', 'en'], // first locale 'zh' is root locale
  // searchProvider: 'local' // enable search with auto translation
};

const vitePressConfig: UserConfig = {
  title: "HZ-Engine Wiki",
  description: "hzegine wiki",
  lastUpdated: true,
  head: [
    [
      "link",
      {
        rel: "icon",
        href: "/static/icon.png",
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
    // sidebar: generateSidebar({}),
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
  cleanUrls: true,
  rewrites: {
    'docs/zh/wiki/:rest*': ':rest*'
  },
  markdown: {
    lineNumbers: true,
    shikiSetup: (shiki: Highlighter) => {
      shiki.loadLanguageSync([renpy_tmLanguage as any]);
    },
  },
}

export default defineConfig(
  withSidebar(withI18n(vitePressConfig, vitePressI18nConfig), vitePressSidebarConfig)
);
