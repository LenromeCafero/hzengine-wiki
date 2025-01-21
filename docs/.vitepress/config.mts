import { defineConfig } from "vitepress";
// https://github.com/QC2168/vite-plugin-vitepress-auto-sidebar
// import AutoSidebar from "vite-plugin-vitepress-auto-sidebar";
// https://github.com/jooy2/vitepress-sidebar
import { withSidebar } from "vitepress-sidebar";
import { withI18n } from "vitepress-i18n";

import renpy_tmLanguage from "./renpy.tmLanguage.json";


const rootLocale = "zhHans";
const supportedLocales = [rootLocale, "en"];
// https://vitepress-i18n.cdget.com/
const vitePressI18nConfig = {
    rootLocale: rootLocale,
    locales: supportedLocales,
};

// https://vitepress.dev/reference/site-config
const vitePressConfig = {
    title: "HZ-Engine Wiki",
    description: "hzegine wiki",
    head: [
        [
            "link",
            {
                rel: "icon",
                href: "/static/icon.png",
            },
        ],
    ],
    // vite: {
    //     plugins: [
    //         // add plugin
    //         AutoSidebar({
    //             titleFromFile: true,
    //             // You can also set options to adjust sidebar data
    //             // see option document below
    //         }),
    //     ],
    // },
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: "Home", link: "/" },
            { text: "Wiki", link: "/wiki" },
        ],
        sidebarMenuLabel: "目录",
        outlineTitle: "文章导航",
        returnToTopLabel: "返回顶部",
        sidebar: [],
        socialLinks: [
            { icon: "github", link: "https://github.com/vuejs/vitepress" },
        ],
        footer: {
            message: "",
            copyright: "Copyright © 2024 Lenrome Cafero",
        },
        // feature
        editLink: {
            pattern:
                "https://github.com/LenromeCafero/hzengine-wiki/edit/main/:path",
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
    rewrites: {
        "zhHans/:rest*": ":rest*",
    },
    markdown: {
        lineNumbers: true,
        shikiSetup: (shiki) => {
          shiki.loadLanguageSync([renpy_tmLanguage as any]);
        },
      },
    

};
const commonSidebarConfigs = {
    /* Options... */
    
    useTitleFromFileHeading: true,
    useFolderTitleFromIndexFile: true,
    sortMenusOrderNumericallyFromLink: true,
    sortFolderTo: "bottom",
};

const vitePressSidebarConfig = [
    ...supportedLocales.map((lang) => {
        return {
            ...commonSidebarConfigs,
            ...(rootLocale === lang ? {} : { basePath: `/${lang}/` }), // If using `rewrites` option
            documentRootPath: `/docs/${lang}`,
            resolvePath: rootLocale === lang ? "/" : `/${lang}/`,
        };
    }),
];
export default defineConfig(
    withSidebar(
        withI18n(vitePressConfig, vitePressI18nConfig),
        vitePressSidebarConfig
    )
);
