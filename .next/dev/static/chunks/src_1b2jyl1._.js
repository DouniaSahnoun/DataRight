(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/layout/app-shell.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AppShell",
    ()=>AppShell
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/menu.mjs [app-client] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/rotate-ccw.mjs [app-client] (ecmascript) <export default as RotateCcw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.mjs [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$brand$2d$logo$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/brand-logo.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/sidebar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/store.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
const TITLES = {
    "/": "Contract Memory",
    "/cartographie": "Cartographie",
    "/documents": "Documents",
    "/droits": "Registre des droits",
    "/avenants": "Avenants"
};
function AppShell({ children }) {
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const [mobileOpen, setMobileOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const { resetDemo, documents } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex h-dvh overflow-hidden bg-ink-50",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "hidden lg:block",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Sidebar"], {}, void 0, false, {
                    fileName: "[project]/src/components/layout/app-shell.tsx",
                    lineNumber: 28,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/layout/app-shell.tsx",
                lineNumber: 27,
                columnNumber: 7
            }, this),
            mobileOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-40 lg:hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        "aria-label": "Fermer le menu",
                        className: "absolute inset-0 bg-ink-950/30",
                        onClick: ()=>setMobileOpen(false)
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/app-shell.tsx",
                        lineNumber: 33,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-y-0 left-0 animate-fade-up shadow-xl",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Sidebar"], {
                            onNavigate: ()=>setMobileOpen(false)
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/app-shell.tsx",
                            lineNumber: 40,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/app-shell.tsx",
                        lineNumber: 39,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/layout/app-shell.tsx",
                lineNumber: 32,
                columnNumber: 9
            }, this) : null,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex min-w-0 flex-1 flex-col",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                        className: "flex h-14 shrink-0 items-center justify-between gap-3 border-b border-ink-200 bg-white/80 px-4 backdrop-blur-sm sm:px-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex min-w-0 items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "ghost",
                                        size: "icon-sm",
                                        className: "lg:hidden",
                                        onClick: ()=>setMobileOpen((open)=>!open),
                                        "aria-label": "Ouvrir le menu",
                                        children: mobileOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {}, void 0, false, {
                                            fileName: "[project]/src/components/layout/app-shell.tsx",
                                            lineNumber: 55,
                                            columnNumber: 29
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {}, void 0, false, {
                                            fileName: "[project]/src/components/layout/app-shell.tsx",
                                            lineNumber: 55,
                                            columnNumber: 37
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/app-shell.tsx",
                                        lineNumber: 48,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$brand$2d$logo$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BrandMark"], {
                                        size: 28,
                                        className: "lg:hidden"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/app-shell.tsx",
                                        lineNumber: 59,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "min-w-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "truncate text-sm font-semibold text-ink-900",
                                                children: TITLES[pathname] ?? "DataRight"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/app-shell.tsx",
                                                lineNumber: 61,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "hidden truncate text-[11px] text-ink-400 sm:block",
                                                children: [
                                                    documents.length,
                                                    " document",
                                                    documents.length > 1 ? "s" : "",
                                                    " au dossier"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/layout/app-shell.tsx",
                                                lineNumber: 64,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/layout/app-shell.tsx",
                                        lineNumber: 60,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/layout/app-shell.tsx",
                                lineNumber: 47,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "ghost",
                                    size: "icon-sm",
                                    title: "Réinitialiser la démonstration",
                                    onClick: ()=>{
                                        if (window.confirm("Réinitialiser le dossier ? Les documents importés et la conversation seront perdus.")) {
                                            resetDemo();
                                        }
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__["RotateCcw"], {}, void 0, false, {
                                        fileName: "[project]/src/components/layout/app-shell.tsx",
                                        lineNumber: 85,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/app-shell.tsx",
                                    lineNumber: 71,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/app-shell.tsx",
                                lineNumber: 70,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/layout/app-shell.tsx",
                        lineNumber: 46,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                        className: "min-h-0 flex-1 overflow-hidden",
                        children: children
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/app-shell.tsx",
                        lineNumber: 90,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/layout/app-shell.tsx",
                lineNumber: 45,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/layout/app-shell.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, this);
}
_s(AppShell, "z5/+ea1NYws6W+mjiRwJpTA9IDU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"]
    ];
});
_c = AppShell;
var _c;
__turbopack_context__.k.register(_c, "AppShell");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/layout/brand-logo.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BrandMark",
    ()=>BrandMark
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
function BrandMark({ size = 36, className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative block shrink-0 overflow-hidden rounded-lg bg-[#0f0e0d]", className),
        style: {
            width: size,
            height: size
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            src: "/logo.jpg",
            alt: "",
            fill: true,
            sizes: `${size * 2}px`,
            priority: true,
            "aria-hidden": true,
            className: "object-contain"
        }, void 0, false, {
            fileName: "[project]/src/components/layout/brand-logo.tsx",
            lineNumber: 25,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/layout/brand-logo.tsx",
        lineNumber: 18,
        columnNumber: 5
    }, this);
}
_c = BrandMark;
var _c;
__turbopack_context__.k.register(_c, "BrandMark");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/layout/sidebar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Sidebar",
    ()=>Sidebar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$stack$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileStack$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-stack.mjs [app-client] (ecmascript) <export default as FileStack>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$git$2d$compare$2d$arrows$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GitCompareArrows$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/git-compare-arrows.mjs [app-client] (ecmascript) <export default as GitCompareArrows>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$messages$2d$square$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessagesSquare$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/messages-square.mjs [app-client] (ecmascript) <export default as MessagesSquare>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$network$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Network$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/network.mjs [app-client] (ecmascript) <export default as Network>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scale$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Scale$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/scale.mjs [app-client] (ecmascript) <export default as Scale>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$brand$2d$logo$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/brand-logo.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/store.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
const TOOLS = [
    {
        href: "/",
        label: "Contract Memory",
        description: "Questions & réponses sourcées",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$messages$2d$square$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessagesSquare$3e$__["MessagesSquare"]
    },
    {
        href: "/cartographie",
        label: "Cartographie",
        description: "Composants et revenus associés",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$network$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Network$3e$__["Network"]
    },
    {
        href: "/documents",
        label: "Documents",
        description: "Import et bibliothèque",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$stack$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileStack$3e$__["FileStack"]
    },
    {
        href: "/droits",
        label: "Registre des droits",
        description: "Clauses extraites",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scale$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Scale$3e$__["Scale"]
    },
    {
        href: "/avenants",
        label: "Avenants",
        description: "Liens à valider",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$git$2d$compare$2d$arrows$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GitCompareArrows$3e$__["GitCompareArrows"]
    }
];
const GROUPS = [
    {
        title: "Espace de travail",
        items: TOOLS
    }
];
function Sidebar({ onNavigate }) {
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const { documents, links, clauses, financials } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"])();
    const pendingLinks = links.filter((link)=>link.status === "suggested").length;
    const counts = {
        "/cartographie": financials.components.length,
        "/documents": documents.length,
        "/droits": clauses.length,
        "/avenants": pendingLinks || undefined
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
        className: "flex h-full w-[248px] shrink-0 flex-col border-r border-ink-200 bg-white",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                href: "/",
                onClick: onNavigate,
                className: "flex items-center gap-2.5 px-5 py-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$brand$2d$logo$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BrandMark"], {
                        size: 36
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/sidebar.tsx",
                        lineNumber: 72,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "leading-tight",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "block text-[15px] font-semibold tracking-tight text-ink-900",
                                children: "DataRight"
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/sidebar.tsx",
                                lineNumber: 74,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "block text-[11px] text-ink-500",
                                children: "Mémoire contractuelle"
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/sidebar.tsx",
                                lineNumber: 77,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/layout/sidebar.tsx",
                        lineNumber: 73,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/layout/sidebar.tsx",
                lineNumber: 67,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: "flex flex-1 flex-col gap-4 overflow-y-auto px-3",
                children: GROUPS.map((group)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-0.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "px-3 pb-1 text-[10.5px] font-semibold tracking-wide text-ink-400 uppercase",
                                children: group.title
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/sidebar.tsx",
                                lineNumber: 86,
                                columnNumber: 13
                            }, this),
                            group.items.map((item)=>{
                                const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                                const Icon = item.icon;
                                const count = counts[item.href];
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: item.href,
                                    onClick: onNavigate,
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("group flex items-start gap-3 rounded-lg px-3 py-2 transition-colors", active ? "bg-brand-50 text-brand-800" : "text-ink-600 hover:bg-ink-50 hover:text-ink-900"),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("mt-0.5 size-4 shrink-0", active ? "text-brand-600" : "text-ink-400 group-hover:text-ink-600"),
                                            "aria-hidden": true
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/sidebar.tsx",
                                            lineNumber: 107,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "min-w-0 flex-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-[13px] font-medium",
                                                            children: item.label
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/layout/sidebar.tsx",
                                                            lineNumber: 116,
                                                            columnNumber: 23
                                                        }, this),
                                                        count ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("rounded-full px-1.5 py-px text-[10px] font-semibold", item.href === "/avenants" ? "bg-amber-100 text-amber-800" : "bg-ink-100 text-ink-600"),
                                                            children: count
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/layout/sidebar.tsx",
                                                            lineNumber: 118,
                                                            columnNumber: 25
                                                        }, this) : null
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/layout/sidebar.tsx",
                                                    lineNumber: 115,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "mt-0.5 block text-[11px] text-ink-400",
                                                    children: item.description
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/layout/sidebar.tsx",
                                                    lineNumber: 130,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/layout/sidebar.tsx",
                                            lineNumber: 114,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, item.href, true, {
                                    fileName: "[project]/src/components/layout/sidebar.tsx",
                                    lineNumber: 96,
                                    columnNumber: 17
                                }, this);
                            })
                        ]
                    }, group.title, true, {
                        fileName: "[project]/src/components/layout/sidebar.tsx",
                        lineNumber: 85,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/layout/sidebar.tsx",
                lineNumber: 83,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/layout/sidebar.tsx",
        lineNumber: 66,
        columnNumber: 5
    }, this);
}
_s(Sidebar, "2WHrZRPx3yEC94dGpZ7PbDrXsVY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"]
    ];
});
_c = Sidebar;
var _c;
__turbopack_context__.k.register(_c, "Sidebar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/button.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button,
    "buttonVariants",
    ()=>buttonVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-slot/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
;
const buttonVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40 focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:shrink-0", {
    variants: {
        variant: {
            primary: "bg-brand-600 text-white shadow-sm hover:bg-brand-700 active:bg-brand-800",
            secondary: "border border-ink-200 bg-white text-ink-800 shadow-xs hover:border-ink-300 hover:bg-ink-50",
            ghost: "text-ink-600 hover:bg-ink-100 hover:text-ink-900",
            subtle: "bg-ink-100 text-ink-700 hover:bg-ink-200",
            danger: "border border-rose-200 bg-white text-rose-700 hover:border-rose-300 hover:bg-rose-50"
        },
        size: {
            sm: "h-8 px-3 text-[13px] [&_svg]:size-3.5",
            md: "h-9.5 px-4 [&_svg]:size-4",
            lg: "h-11 px-5 [&_svg]:size-4",
            icon: "size-9 [&_svg]:size-4",
            "icon-sm": "size-7 [&_svg]:size-3.5"
        }
    },
    defaultVariants: {
        variant: "secondary",
        size: "md"
    }
});
const Button = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = ({ className, variant, size, asChild = false, ...props }, ref)=>{
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slot"] : "button";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(buttonVariants({
            variant,
            size
        }), className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/button.tsx",
        lineNumber: 45,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = Button;
Button.displayName = "Button";
;
var _c, _c1;
__turbopack_context__.k.register(_c, "Button$React.forwardRef");
__turbopack_context__.k.register(_c1, "Button");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/finance/dataset.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEMO_FINANCIAL_GRAPH",
    ()=>DEMO_FINANCIAL_GRAPH,
    "DOCUMENT_IDS",
    ()=>DOCUMENT_IDS,
    "FINANCE_DATASET",
    ()=>FINANCE_DATASET,
    "buildGraphFromMaster",
    ()=>buildGraphFromMaster,
    "dayBefore",
    ()=>dayBefore,
    "formatDateFr",
    ()=>formatDateFr
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [app-client] (ecmascript) <export * as z>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$finance$2f$dataset$2f$finance_master_developpeuse$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/finance/dataset/finance_master_developpeuse.json.[json].cjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$finance$2f$dataset$2f$source$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/finance/dataset/source.json.[json].cjs [app-client] (ecmascript)");
;
;
;
/**
 * Jeu de démonstration issu des packs ZIP de /data.
 *
 * `scripts/extract-finance-data.mts` extrait `finance_master_developpeuse.json`
 * dans `./dataset/` ; ce module le valide puis le traduit en graphe
 * [Composant] → [Fonctionnalité] → [Ligne de revenu] pour la cartographie.
 *
 * Répartition des rôles :
 *  - le fichier fournit les **faits** : produits et ARR, composants,
 *    dépendances produit ↔ composant, documents, remédiations, scénario ;
 *  - ce module fournit les **rattachements** au registre des clauses
 *    (`lib/mock/clauses.ts`), que le modèle financier ne connaît pas.
 *
 * Les montants ne sont jamais recopiés d'un statut ou d'un résumé du fichier :
 * les postes affichés sont recalculés par `computeRevenuePartition()` à partir
 * des clauses, et `financial_summary` ne sert que de valeur de contrôle.
 */ // --- Schéma : seuls les champs exploités sont exigés -------------------------
const MasterSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    metadata: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        company: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
            company_name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
            description: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
            total_arr_eur: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().finite().nonnegative()
        }),
        as_of_date: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().regex(/^\d{4}-\d{2}-\d{2}$/),
        synthetic_demo_data: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().optional()
    }),
    financial_summary: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        total_arr_eur: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number(),
        before_d05: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
            explicit_restriction_arr_eur: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number(),
            insufficient_evidence_arr_eur: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number(),
            arr_requiring_review_eur: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number(),
            arr_cleared_eur: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number()
        }),
        after_d05: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
            explicit_restriction_arr_eur: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number(),
            insufficient_evidence_arr_eur: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number(),
            arr_requiring_review_eur: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number(),
            arr_cleared_eur: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number()
        })
    }),
    products: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        product_id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        product_name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        arr_eur: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().finite().nonnegative(),
        reason_after_d05: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        next_action: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()
    })),
    components: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        component_id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        component_name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        document_ids: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()),
        key_condition: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()
    })),
    dependencies: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        product_id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        component_id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        use_description: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()
    })),
    documents: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        document_id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        entity: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        counterparty: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        effective_date: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().nullable(),
        parent_document_id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().nullable(),
        status: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()
    })),
    remediation: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        action_id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        priority: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number(),
        issue: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        arr_concerned_eur: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().finite().nonnegative(),
        owner: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        action: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        evidence_to_close: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        target_date: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        status: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()
    })),
    tests: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        category: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        question: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        source: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        clause: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        page: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number(),
        status: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()
    })),
    demo_script: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        time: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        speaker: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        screen: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        message: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()
    }))
});
const DOCUMENT_IDS = {
    D01: "doc-d01-atlas",
    D02: "doc-d02-helixlm",
    D03: "doc-d03-vectorgrid",
    D04: "doc-d04-horizon",
    D05: "doc-d05-atlas-am1",
    D06: "doc-d06-horizon-sec",
    D07: "doc-d07-ocrvision",
    D08: "doc-d08-reportforge"
};
const FEATURE_IDS = {
    P01: {
        id: "feat-clauselens",
        description: "Extraction de clauses et classification des points d'attention contractuels."
    },
    P02: {
        id: "feat-dealroom",
        description: "Recherche sémantique dans les data rooms de transaction."
    },
    P03: {
        id: "feat-boardpack",
        description: "Génération de synthèses de transaction à destination des comités."
    }
};
/**
 * Composants du modèle financier → nœuds de la cartographie.
 *
 * **Atlas (C02) est scindé par produit.** L'avenant D05 n'autorise le corpus que
 * pour ClauseLens Enterprise et exclut nommément DealRoom Search (art. 2.2) : un
 * nœud unique étendrait à DealRoom une permission que l'avenant lui refuse. Le
 * périmètre DealRoom est donc gouverné à la fois par la restriction de D01 et
 * par l'exclusion de D05 ; valider l'avenant lève la première, pas la seconde.
 *
 * **D07 et D08 ne sont pas rattachés** (`documentId: null`) : D07 lie VisionCore
 * à Asteria AI UK Ltd et D08 n'est pas signé. Aucun des deux ne prouve un droit
 * d'Asteria AI SAS, d'où « Information manquante » et non une restriction.
 */ const COMPONENT_BINDINGS = {
    C01: {
        id: "cmp-helixlm",
        kind: "service",
        documentId: DOCUMENT_IDS.D02,
        // L'usage générateur de revenus est le déploiement hébergé (D02 art. 2.1) ;
        // l'interdiction de distribuer les poids encadre le produit sans gouverner ce statut.
        clauseIds: [
            "cl-d02-hosted"
        ],
        relatedClauseIds: [
            "cl-d02-weights",
            "cl-d02-access",
            "cl-d02-report"
        ]
    },
    C02: {
        P01: {
            id: "cmp-atlas-clauselens",
            kind: "dataset",
            documentId: DOCUMENT_IDS.D01,
            clauseIds: [
                "cl-d01-commercial"
            ],
            relatedClauseIds: [
                "cl-d01-grant",
                "cl-d05-logs",
                "cl-d05-quarterly"
            ],
            scope: "usage ClauseLens"
        },
        P02: {
            id: "cmp-atlas-dealroom",
            kind: "dataset",
            documentId: DOCUMENT_IDS.D01,
            clauseIds: [
                "cl-d01-commercial",
                "cl-d05-scope"
            ],
            relatedClauseIds: [
                "cl-d01-training"
            ],
            scope: "usage DealRoom"
        }
    },
    C03: {
        id: "cmp-vectorgrid",
        kind: "api",
        documentId: DOCUMENT_IDS.D03,
        clauseIds: [
            "cl-d03-saas"
        ],
        relatedClauseIds: [
            "cl-d03-limit",
            "cl-d03-excess",
            "cl-d03-reporting"
        ]
    },
    C04: {
        id: "cmp-reportforge",
        kind: "library",
        documentId: null,
        clauseIds: []
    },
    C05: {
        id: "cmp-ocrvision",
        kind: "api",
        documentId: null,
        clauseIds: []
    }
};
/**
 * Remédiations → produits dont elles conditionnent les revenus. Sert à
 * dédupliquer les totaux : R02 et R03 portent sur les mêmes 160 K€ de BoardPack.
 */ const REMEDIATION_FEATURES = {
    R01: [
        "feat-dealroom"
    ],
    R02: [
        "feat-boardpack"
    ],
    R03: [
        "feat-boardpack"
    ],
    R04: [
        "feat-clauselens"
    ],
    R05: [
        "feat-clauselens"
    ]
};
// --- Traduction en graphe ----------------------------------------------------
function bindingFor(componentId, productId) {
    const binding = COMPONENT_BINDINGS[componentId];
    if (!binding) return null;
    if ("id" in binding) return binding;
    return binding[productId] ?? null;
}
function formatDateFr(iso) {
    const [year, month, day] = iso.split("-");
    return `${day}/${month}/${year}`;
}
function buildGraphFromMaster(data) {
    const issues = [];
    const documents = new Map(data.documents.map((doc)=>[
            doc.document_id,
            doc
        ]));
    const components = new Map();
    const featureComponents = new Map();
    const featureIdOf = (productId)=>FEATURE_IDS[productId]?.id ?? `feat-${productId.toLowerCase()}`;
    for (const dependency of data.dependencies){
        const product = data.products.find((entry)=>entry.product_id === dependency.product_id);
        const source = data.components.find((entry)=>entry.component_id === dependency.component_id);
        if (!product || !source) {
            issues.push({
                level: "warning",
                message: `Dépendance ${dependency.product_id} → ${dependency.component_id} ignorée : produit ou composant inconnu.`
            });
            continue;
        }
        const binding = bindingFor(source.component_id, product.product_id);
        const counterparty = source.document_ids.map((id)=>documents.get(id)?.counterparty).find(Boolean);
        // Composant absent des rattachements : il reste cartographié, sans clause,
        // et relève donc de l'information manquante jusqu'à qualification.
        const node = binding ? {
            id: binding.id,
            name: binding.scope ? `${source.component_name} (${binding.scope})` : source.component_name,
            description: `${source.type} — ${source.key_condition}`,
            kind: binding.kind,
            vendor: counterparty ?? "Fournisseur non renseigné",
            documentId: binding.documentId,
            clauseIds: binding.clauseIds,
            relatedClauseIds: binding.relatedClauseIds,
            evidenceNote: binding.documentId === null ? source.key_condition : undefined
        } : {
            id: `cmp-${source.component_id.toLowerCase()}`,
            name: source.component_name,
            description: `${source.type} — ${source.key_condition}`,
            kind: "service",
            vendor: counterparty ?? "Fournisseur non renseigné",
            documentId: null,
            clauseIds: [],
            evidenceNote: source.key_condition
        };
        if (!binding) {
            issues.push({
                level: "warning",
                message: `Composant ${source.component_id} (${source.component_name}) sans rattachement au registre des clauses : classé en information manquante.`
            });
        }
        components.set(node.id, node);
        const featureId = featureIdOf(product.product_id);
        const list = featureComponents.get(featureId) ?? [];
        if (!list.includes(node.id)) list.push(node.id);
        featureComponents.set(featureId, list);
    }
    const features = data.products.map((product)=>({
            id: featureIdOf(product.product_id),
            name: product.product_name,
            description: FEATURE_IDS[product.product_id]?.description ?? "",
            componentIds: featureComponents.get(featureIdOf(product.product_id)) ?? []
        }));
    // Le modèle financier donne un ARR par produit : une ligne de revenu chacun.
    const revenueLines = data.products.map((product)=>({
            id: `rev-${featureIdOf(product.product_id).replace(/^feat-/, "")}`,
            label: `ARR ${product.product_name}`,
            featureId: featureIdOf(product.product_id),
            amount: product.arr_eur,
            period: `ARR au ${formatDateFr(data.metadata.as_of_date)}`
        }));
    const sum = revenueLines.reduce((total, line)=>total + line.amount, 0);
    if (sum !== data.metadata.company.total_arr_eur) {
        issues.push({
            level: "warning",
            message: `La somme des ARR produits (${sum} EUR) diffère de l'ARR total déclaré (${data.metadata.company.total_arr_eur} EUR).`
        });
    }
    return {
        graph: {
            components: [
                ...components.values()
            ],
            features,
            revenueLines
        },
        issues
    };
}
// --- Jeu chargé --------------------------------------------------------------
const parsed = MasterSchema.parse(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$finance$2f$dataset$2f$finance_master_developpeuse$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]);
const built = buildGraphFromMaster(parsed);
/** Avenant qui fait basculer la comparaison avant / après (D05 pour ce dossier). */ const amendment = parsed.documents.find((doc)=>doc.parent_document_id !== null && doc.type === "Avenant" && doc.effective_date);
const FINANCE_DATASET = {
    /** Provenance : archive et entrée ZIP d'origine, empreinte SHA-256. */ source: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$finance$2f$dataset$2f$source$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    company: parsed.metadata.company,
    asOfDate: parsed.metadata.as_of_date,
    synthetic: parsed.metadata.synthetic_demo_data ?? false,
    graph: built.graph,
    issues: built.issues,
    products: parsed.products.map((product)=>({
            ...product,
            featureId: FEATURE_IDS[product.product_id]?.id ?? `feat-${product.product_id.toLowerCase()}`
        })),
    documents: parsed.documents,
    remediation: parsed.remediation.map((entry)=>({
            ...entry,
            featureIds: REMEDIATION_FEATURES[entry.action_id] ?? []
        })),
    tests: parsed.tests,
    demoScript: parsed.demo_script,
    /** Résultats attendus du financier : valeurs de contrôle, jamais affichées telles quelles. */ expected: parsed.financial_summary,
    amendment: amendment ? {
        masterId: amendment.document_id,
        documentId: DOCUMENT_IDS[amendment.document_id] ?? amendment.document_id,
        effectiveDate: amendment.effective_date
    } : null
};
const DEMO_FINANCIAL_GRAPH = FINANCE_DATASET.graph;
function dayBefore(iso) {
    const date = new Date(`${iso}T00:00:00Z`);
    date.setUTCDate(date.getUTCDate() - 1);
    return date.toISOString().slice(0, 10);
}
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/finance/dataset/finance_master_developpeuse.json.[json].cjs [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = JSON.parse("{\"metadata\":{\"project\":\"DataRights DD + Contract Memory\",\"company\":{\"company_id\":\"CO01\",\"company_name\":\"Asteria AI SAS\",\"description\":\"Startup B2B qui automatise l'analyse contractuelle et la recherche documentaire pour les equipes de due diligence.\",\"currency\":\"EUR\",\"reporting_metric\":\"Annual recurring revenue (ARR)\",\"total_arr_eur\":700000},\"currency\":\"EUR\",\"as_of_date\":\"2026-09-23\",\"synthetic_demo_data\":true,\"purpose\":\"LexHack 2026 prototype and demonstration\"},\"financial_summary\":{\"total_arr_eur\":700000,\"before_d05\":{\"explicit_restriction_arr_eur\":540000,\"insufficient_evidence_arr_eur\":160000,\"arr_requiring_review_eur\":700000,\"share_requiring_review\":1.0,\"arr_cleared_eur\":0},\"after_d05\":{\"explicit_restriction_arr_eur\":240000,\"insufficient_evidence_arr_eur\":160000,\"arr_requiring_review_eur\":400000,\"share_requiring_review\":0.5714285714285714,\"arr_cleared_eur\":300000},\"change\":{\"explicit_restriction_arr_eur\":-300000,\"arr_requiring_review_eur\":-300000,\"share_requiring_review_points\":-0.42857142857142855},\"interpretation\":\"Les montants représentent l'ARR associé à un point contractuel à vérifier. Ils ne constituent ni une perte, ni une provision, ni une décote automatique.\"},\"products\":[{\"product_id\":\"P01\",\"product_name\":\"ClauseLens Enterprise\",\"arr_eur\":300000,\"status_before_d05\":\"Restriction explicite\",\"status_after_d05\":\"Droit commercial documenté sous conditions\",\"arr_review_before_eur\":300000,\"arr_review_after_eur\":0,\"change_arr_review_eur\":-300000,\"reason_after_d05\":\"D05 autorise Atlas pour ClauseLens à compter du 1er juillet 2026, sous réserve de journalisation, reporting et non-distribution.\",\"next_action\":\"Suivre les journaux d'accès et le reporting trimestriel prévus par D05.\"},{\"product_id\":\"P02\",\"product_name\":\"DealRoom Search\",\"arr_eur\":240000,\"status_before_d05\":\"Restriction explicite\",\"status_after_d05\":\"Restriction explicite\",\"arr_review_before_eur\":240000,\"arr_review_after_eur\":240000,\"change_arr_review_eur\":0,\"reason_after_d05\":\"D05 exclut expressément DealRoom Search de la permission commerciale.\",\"next_action\":\"Obtenir un avenant signé couvrant DealRoom Search ou remplacer Atlas dans ce produit.\"},{\"product_id\":\"P03\",\"product_name\":\"BoardPack Studio\",\"arr_eur\":160000,\"status_before_d05\":\"Preuve insuffisante\",\"status_after_d05\":\"Preuve insuffisante\",\"arr_review_before_eur\":160000,\"arr_review_after_eur\":160000,\"change_arr_review_eur\":0,\"reason_after_d05\":\"D07 couvre une autre entité et D08 est un brouillon non signé.\",\"next_action\":\"Obtenir des droits exécutés au nom d'Asteria AI SAS pour OCRVision et ReportForge.\"}],\"components\":[{\"component_id\":\"C01\",\"component_name\":\"HelixLM 7B\",\"type\":\"Modèle de fondation\",\"document_ids\":[\"D02\"],\"status_after_d05\":\"Droit commercial documenté\",\"key_condition\":\"Déploiement hébergé autorisé; redistribution des poids interdite.\"},{\"component_id\":\"C02\",\"component_name\":\"Atlas Business Corpus\",\"type\":\"Jeu de données\",\"document_ids\":[\"D01\",\"D05\"],\"status_after_d05\":\"Droit limité par produit et par date\",\"key_condition\":\"ClauseLens autorisé à partir du 1er juillet 2026; DealRoom Search reste exclu; aucune distribution des données.\"},{\"component_id\":\"C03\",\"component_name\":\"VectorGrid Enterprise\",\"type\":\"Recherche vectorielle\",\"document_ids\":[\"D03\"],\"status_after_d05\":\"Droit commercial documenté\",\"key_condition\":\"Usage SaaS autorisé avec plafond mensuel et reporting trimestriel.\"},{\"component_id\":\"C04\",\"component_name\":\"ReportForge Community\",\"type\":\"Génération de rapports\",\"document_ids\":[\"D08\"],\"status_after_d05\":\"Preuve insuffisante\",\"key_condition\":\"D08 est un brouillon non signé et ses conditions ne sont pas effectives.\"},{\"component_id\":\"C05\",\"component_name\":\"OCRVision API\",\"type\":\"Reconnaissance de caractères\",\"document_ids\":[\"D07\"],\"status_after_d05\":\"Mauvaise entité contractante\",\"key_condition\":\"D07 couvre Asteria AI UK Ltd et ne prouve aucun droit pour Asteria AI SAS.\"}],\"dependencies\":[{\"product_id\":\"P01\",\"component_id\":\"C01\",\"use_description\":\"Generates clause summaries and classifications.\",\"product_name\":\"ClauseLens Enterprise\",\"component_name\":\"HelixLM 7B\",\"status_after_d05\":\"Droit commercial documenté\",\"evidence\":\"D02\"},{\"product_id\":\"P01\",\"component_id\":\"C02\",\"use_description\":\"Provides examples used in production prompt retrieval and model evaluation.\",\"product_name\":\"ClauseLens Enterprise\",\"component_name\":\"Atlas Business Corpus\",\"status_after_d05\":\"Droit limité par produit et par date\",\"evidence\":\"D01, D05\"},{\"product_id\":\"P01\",\"component_id\":\"C03\",\"use_description\":\"Stores and searches contract embeddings.\",\"product_name\":\"ClauseLens Enterprise\",\"component_name\":\"VectorGrid Enterprise\",\"status_after_d05\":\"Droit commercial documenté\",\"evidence\":\"D03\"},{\"product_id\":\"P02\",\"component_id\":\"C02\",\"use_description\":\"Provides examples used in production retrieval quality tuning.\",\"product_name\":\"DealRoom Search\",\"component_name\":\"Atlas Business Corpus\",\"status_after_d05\":\"Droit limité par produit et par date\",\"evidence\":\"D01, D05\"},{\"product_id\":\"P02\",\"component_id\":\"C03\",\"use_description\":\"Runs semantic search across due diligence documents.\",\"product_name\":\"DealRoom Search\",\"component_name\":\"VectorGrid Enterprise\",\"status_after_d05\":\"Droit commercial documenté\",\"evidence\":\"D03\"},{\"product_id\":\"P03\",\"component_id\":\"C01\",\"use_description\":\"Drafts transaction summaries.\",\"product_name\":\"BoardPack Studio\",\"component_name\":\"HelixLM 7B\",\"status_after_d05\":\"Droit commercial documenté\",\"evidence\":\"D02\"},{\"product_id\":\"P03\",\"component_id\":\"C04\",\"use_description\":\"Renders customer-facing reports.\",\"product_name\":\"BoardPack Studio\",\"component_name\":\"ReportForge Community\",\"status_after_d05\":\"Preuve insuffisante\",\"evidence\":\"D08\"},{\"product_id\":\"P03\",\"component_id\":\"C05\",\"use_description\":\"Extracts text from scanned source documents.\",\"product_name\":\"BoardPack Studio\",\"component_name\":\"OCRVision API\",\"status_after_d05\":\"Mauvaise entité contractante\",\"evidence\":\"D07\"}],\"documents\":[{\"document_id\":\"D01\",\"file_name\":\"D01_Atlas_Data_License.pdf\",\"type\":\"Licence de données\",\"entity\":\"Asteria AI SAS\",\"counterparty\":\"DataForge Ltd\",\"effective_date\":\"2026-01-01\",\"parent_document_id\":null,\"status\":\"Exécuté\",\"financial_effect\":\"Restriction initiale concernant 540 000 EUR d'ARR.\"},{\"document_id\":\"D02\",\"file_name\":\"D02_HelixLM_Model_License.pdf\",\"type\":\"Licence de modèle\",\"entity\":\"Asteria AI SAS\",\"counterparty\":\"Helix Labs GmbH\",\"effective_date\":\"2026-02-01\",\"parent_document_id\":null,\"status\":\"Exécuté\",\"financial_effect\":\"Droit commercial documenté; aucune exposition financière classée.\"},{\"document_id\":\"D03\",\"file_name\":\"D03_VectorGrid_Enterprise_Agreement.pdf\",\"type\":\"Licence logiciel et API\",\"entity\":\"Asteria AI SAS\",\"counterparty\":\"VectorGrid Inc\",\"effective_date\":\"2026-02-15\",\"parent_document_id\":null,\"status\":\"Exécuté\",\"financial_effect\":\"Droit commercial documenté avec obligations de reporting.\"},{\"document_id\":\"D04\",\"file_name\":\"D04_Horizon_Bank_Subscription.pdf\",\"type\":\"Contrat client SaaS\",\"entity\":\"Asteria AI SAS\",\"counterparty\":\"Horizon Bank SA\",\"effective_date\":\"2026-03-01\",\"parent_document_id\":null,\"status\":\"Exécuté\",\"financial_effect\":\"Contrat client relié à ClauseLens; obligations de sécurité précisées par D06.\"},{\"document_id\":\"D05\",\"file_name\":\"D05_Atlas_Amendment_No1.pdf\",\"type\":\"Avenant\",\"entity\":\"Asteria AI SAS\",\"counterparty\":\"DataForge Ltd\",\"effective_date\":\"2026-07-01\",\"parent_document_id\":\"D01\",\"status\":\"Exécuté pour la démonstration\",\"financial_effect\":\"Réduit l'ARR sous restriction explicite de 540 000 EUR à 240 000 EUR.\"},{\"document_id\":\"D06\",\"file_name\":\"D06_Horizon_Security_Addendum.pdf\",\"type\":\"Addendum de sécurité\",\"entity\":\"Asteria AI SAS\",\"counterparty\":\"Horizon Bank SA\",\"effective_date\":\"2026-03-01\",\"parent_document_id\":\"D04\",\"status\":\"Exécuté pour la démonstration\",\"financial_effect\":\"Ajoute une obligation conditionnelle de notification sous 24 heures; aucun montant assimilé à une perte.\"},{\"document_id\":\"D07\",\"file_name\":\"D07_OCRVision_UK_Agreement.pdf\",\"type\":\"Contrat API\",\"entity\":\"Asteria AI UK Ltd\",\"counterparty\":\"VisionCore Inc\",\"effective_date\":\"2026-04-01\",\"parent_document_id\":null,\"status\":\"Exécuté par une autre entité\",\"financial_effect\":\"Ne sécurise pas les droits d'Asteria AI SAS; contribue au contrôle de 160 000 EUR d'ARR de BoardPack.\"},{\"document_id\":\"D08\",\"file_name\":\"D08_ReportForge_Order_Form_Draft.pdf\",\"type\":\"Projet de bon de commande\",\"entity\":\"Asteria AI SAS\",\"counterparty\":\"ReportForge Systems\",\"effective_date\":null,\"parent_document_id\":null,\"status\":\"Brouillon non signé\",\"financial_effect\":\"Ne sécurise aucun droit; contribue au contrôle de 160 000 EUR d'ARR de BoardPack.\"}],\"remediation\":[{\"action_id\":\"R01\",\"priority\":1,\"issue\":\"Atlas non autorisé dans DealRoom Search\",\"arr_concerned_eur\":240000,\"owner\":\"Finance + Juridique + Produit\",\"action\":\"Négocier un avenant commercial ou retirer Atlas de DealRoom Search.\",\"evidence_to_close\":\"Avenant signé couvrant P02 ou preuve de remplacement technique.\",\"target_date\":\"Avant soumission finale\",\"status\":\"Ouvert\"},{\"action_id\":\"R02\",\"priority\":2,\"issue\":\"ReportForge non exécuté\",\"arr_concerned_eur\":160000,\"owner\":\"Achats + Juridique\",\"action\":\"Signer un contrat commercial au nom d'Asteria AI SAS.\",\"evidence_to_close\":\"Bon de commande et conditions signés.\",\"target_date\":\"Avant mise en production\",\"status\":\"Ouvert\"},{\"action_id\":\"R03\",\"priority\":2,\"issue\":\"OCRVision contracté par la mauvaise entité\",\"arr_concerned_eur\":160000,\"owner\":\"Juridique\",\"action\":\"Obtenir un avenant d'affiliation, une novation ou un contrat SAS.\",\"evidence_to_close\":\"Document signé donnant explicitement les droits à Asteria AI SAS.\",\"target_date\":\"Avant mise en production\",\"status\":\"Ouvert\"},{\"action_id\":\"R04\",\"priority\":3,\"issue\":\"Conditions opérationnelles de D05\",\"arr_concerned_eur\":300000,\"owner\":\"Produit + Conformité\",\"action\":\"Conserver les journaux d'accès et produire le reporting trimestriel.\",\"evidence_to_close\":\"Journal d'accès et rapport trimestriel daté.\",\"target_date\":\"Chaque trimestre\",\"status\":\"À suivre\"},{\"action_id\":\"R05\",\"priority\":3,\"issue\":\"Test de sécurité Horizon\",\"arr_concerned_eur\":300000,\"owner\":\"Sécurité\",\"action\":\"Réaliser le test annuel et transmettre le résumé exécutif.\",\"evidence_to_close\":\"Rapport de test et preuve de transmission; l'acceptation du client reste distincte.\",\"target_date\":\"Annuel\",\"status\":\"À suivre\"}],\"tests\":[{\"id\":\"Q01\",\"category\":\"Direct\",\"question\":\"Can Asteria use the Atlas Business Corpus in a commercial product?\",\"expected\":\"Not under D01 alone. D01 limits use to internal non-production research and evaluation and prohibits commercial use.\",\"source\":\"D01\",\"clause\":\"2.1 and 3.1(a)\",\"page\":1,\"status\":\"supported\",\"visibility\":\"Développeuse\",\"acceptance_rule\":\"Conclusion, conditions et citation correctes\"},{\"id\":\"Q02\",\"category\":\"Direct\",\"question\":\"May HelixLM be deployed to customers through Asteria's hosted service?\",\"expected\":\"Yes, if customers access it through Asteria's hosted service and do not receive the model weights.\",\"source\":\"D02\",\"clause\":\"2.1 and 3.1\",\"page\":1,\"status\":\"supported_with_condition\",\"visibility\":\"Développeuse\",\"acceptance_rule\":\"Conclusion, conditions et citation correctes\"},{\"id\":\"Q03\",\"category\":\"Direct\",\"question\":\"When is the VectorGrid usage report due?\",\"expected\":\"Within 15 calendar days after each calendar quarter.\",\"source\":\"D03\",\"clause\":\"4.1\",\"page\":2,\"status\":\"supported\",\"visibility\":\"Développeuse\",\"acceptance_rule\":\"Conclusion, conditions et citation correctes\"},{\"id\":\"Q04\",\"category\":\"Direct\",\"question\":\"How does the Horizon Bank subscription renew?\",\"expected\":\"It renews for successive 12-month periods unless either party gives at least 60 days' written notice.\",\"source\":\"D04\",\"clause\":\"5.2\",\"page\":2,\"status\":\"supported\",\"visibility\":\"Développeuse\",\"acceptance_rule\":\"Conclusion, conditions et citation correctes\"},{\"id\":\"Q05\",\"category\":\"Direct\",\"question\":\"Which product receives a commercial-use permission under the Atlas amendment?\",\"expected\":\"ClauseLens Enterprise only. The amendment does not authorise Atlas use in DealRoom Search or other products.\",\"source\":\"D05\",\"clause\":\"2.1 and 2.2\",\"page\":1,\"status\":\"supported_with_condition\",\"visibility\":\"Développeuse\",\"acceptance_rule\":\"Conclusion, conditions et citation correctes\"},{\"id\":\"Q06\",\"category\":\"Direct\",\"question\":\"When must Asteria notify Horizon Bank of a security incident?\",\"expected\":\"Within 24 hours after confirmation that a Security Incident affects Horizon Bank Customer Data.\",\"source\":\"D06\",\"clause\":\"3.1\",\"page\":1,\"status\":\"supported_with_condition\",\"visibility\":\"Développeuse\",\"acceptance_rule\":\"Conclusion, conditions et citation correctes\"},{\"id\":\"Q07\",\"category\":\"Direct\",\"question\":\"Which legal entity is licensed to use OCRVision API?\",\"expected\":\"Asteria AI UK Ltd. The agreement does not grant rights to affiliates unless VisionCore consents in writing.\",\"source\":\"D07\",\"clause\":\"1.2 and 2.1\",\"page\":1,\"status\":\"supported\",\"visibility\":\"Développeuse\",\"acceptance_rule\":\"Conclusion, conditions et citation correctes\"},{\"id\":\"Q08\",\"category\":\"Direct\",\"question\":\"Is the ReportForge order form currently effective?\",\"expected\":\"No. It is an unsigned draft and states that it has no effect until signed by both parties.\",\"source\":\"D08\",\"clause\":\"1.1 and 6.1\",\"page\":1,\"status\":\"supported\",\"visibility\":\"Développeuse\",\"acceptance_rule\":\"Conclusion, conditions et citation correctes\"},{\"id\":\"Q09\",\"category\":\"Reformulation\",\"question\":\"Can Asteria hand HelixLM's model weights to a customer?\",\"expected\":\"No. Customers may access functionality through the hosted service, but the weights may not be distributed.\",\"source\":\"D02\",\"clause\":\"3.1 and 3.2\",\"page\":1,\"status\":\"supported\",\"visibility\":\"Développeuse\",\"acceptance_rule\":\"Conclusion, conditions et citation correctes\"},{\"id\":\"Q10\",\"category\":\"Reformulation\",\"question\":\"May raw Atlas records be exposed to ClauseLens customers after the amendment?\",\"expected\":\"No. D05 permits limited use in ClauseLens but prohibits exposing or distributing the underlying data to customers.\",\"source\":\"D05\",\"clause\":\"2.3\",\"page\":1,\"status\":\"supported\",\"visibility\":\"Développeuse\",\"acceptance_rule\":\"Conclusion, conditions et citation correctes\"},{\"id\":\"Q11\",\"category\":\"Reformulation\",\"question\":\"What recurring evidence must Asteria give VectorGrid?\",\"expected\":\"A quarterly usage report showing documents processed and active production workspaces.\",\"source\":\"D03\",\"clause\":\"4.1\",\"page\":2,\"status\":\"supported\",\"visibility\":\"Développeuse\",\"acceptance_rule\":\"Conclusion, conditions et citation correctes\"},{\"id\":\"Q12\",\"category\":\"Reformulation\",\"question\":\"Does every service outage trigger Horizon Bank's 24-hour incident notice?\",\"expected\":\"No. The 24-hour notice applies only after confirmation that a Security Incident affects Horizon Bank Customer Data.\",\"source\":\"D06\",\"clause\":\"2.1 and 3.1\",\"page\":1,\"status\":\"supported_with_condition\",\"visibility\":\"Développeuse\",\"acceptance_rule\":\"Conclusion, conditions et citation correctes\"}],\"demo_script\":[{\"time\":\"0:00–0:20\",\"speaker\":\"Financier\",\"screen\":\"Synthèse\",\"message\":\"Asteria génère 700 000 EUR d'ARR. Avant lecture des avenants, la totalité nécessite une vérification contractuelle.\"},{\"time\":\"0:20–0:55\",\"speaker\":\"Développeuse\",\"screen\":\"Contract Memory\",\"message\":\"Recherche Atlas et affiche D01, D05, la date d'effet et les produits concernés.\"},{\"time\":\"0:55–1:25\",\"speaker\":\"Financier\",\"screen\":\"Comparaison avant/après\",\"message\":\"D05 sécurise 300 000 EUR d'ARR de ClauseLens, mais laisse 240 000 EUR sous restriction et 160 000 EUR avec preuve insuffisante.\"},{\"time\":\"1:25–2:05\",\"speaker\":\"Développeuse\",\"screen\":\"Questions complexes\",\"message\":\"Teste la date, la mauvaise entité D07 et le brouillon D08; l'IA cite ou s'abstient.\"},{\"time\":\"2:05–2:40\",\"speaker\":\"Financier\",\"screen\":\"Remédiation\",\"message\":\"Priorise R01, R02 et R03 selon l'ARR concerné et la preuve nécessaire pour clôturer.\"},{\"time\":\"2:40–3:00\",\"speaker\":\"Financier\",\"screen\":\"Conclusion\",\"message\":\"Contract Memory transforme les contrats en décisions vérifiables, datées et reliées aux revenus.\"}],\"decision_rules\":[\"Compter chaque produit une seule fois dans la catégorie la plus prioritaire.\",\"Ordre de priorité: restriction explicite, preuve insuffisante, droit commercial documenté.\",\"Appliquer une autorisation uniquement au produit, à l'entité et à la période couverts.\",\"Écarter les brouillons non signés comme preuve de droits effectifs.\",\"Répondre information insuffisante lorsque la preuve manque.\",\"Ne jamais présenter l'ARR concerné comme une perte certaine ou une valorisation.\"]}");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/finance/dataset/source.json.[json].cjs [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = {
    "archive": "Pack_developpeuse_finance.zip",
    "entry": "data/finance_master_developpeuse.json",
    "modifiedAt": "2026-09-23T10:57:06.000Z",
    "sha256": "3072b0babaf89e154fee146c39a111fe09625d3bad936583f4dbca4295e30323"
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/mock/clauses.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MOCK_ADDENDUM_LINKS",
    ()=>MOCK_ADDENDUM_LINKS,
    "MOCK_CLAUSES",
    ()=>MOCK_CLAUSES
]);
const MOCK_CLAUSES = [
    // --- D01 · Atlas Business Corpus (DataForge Ltd) ---
    {
        id: "cl-d01-commercial",
        documentId: "doc-d01-atlas",
        page: 1,
        title: "Usage commercial du corpus interdit",
        category: "Usage commercial",
        status: "restriction",
        summary: "Rédaction initiale de l'article 3.1(a) : le corpus Atlas ne peut être utilisé dans aucun produit ni service commercial.",
        excerpt: "Licensee shall not: (a) use the Licensed Data in any commercial product or service;"
    },
    {
        id: "cl-d01-grant",
        documentId: "doc-d01-atlas",
        page: 1,
        title: "Licence limitée à la recherche interne non productive",
        category: "Usage interne",
        status: "permission",
        summary: "Droit d'usage limité, non exclusif et non transférable, réservé à la recherche et à l'évaluation internes hors production.",
        excerpt: "Licensor grants Licensee a limited, non-exclusive, non-transferable right to use the Licensed Data solely for internal, non-production research and evaluation purposes."
    },
    {
        id: "cl-d01-training",
        documentId: "doc-d01-atlas",
        page: 1,
        title: "Entraînement et récupération en production interdits",
        category: "Données",
        status: "restriction",
        summary: "Interdiction d'entraîner, d'affiner ou d'alimenter un modèle de production à partir du corpus.",
        excerpt: "(b) use the Licensed Data to train, fine-tune or retrieve content for a production model;"
    },
    {
        id: "cl-d01-distribution",
        documentId: "doc-d01-atlas",
        page: 1,
        title: "Distribution du corpus interdite",
        category: "Redistribution",
        status: "restriction",
        summary: "Aucune distribution du corpus sous quelque forme que ce soit.",
        excerpt: "(c) distribute the Licensed Data;"
    },
    {
        id: "cl-d01-affiliate",
        documentId: "doc-d01-atlas",
        page: 1,
        title: "Accès des filiales et clients soumis à accord écrit",
        category: "Redistribution",
        status: "restriction",
        summary: "Aucun accès ne peut être ouvert à une filiale ou à un client sans accord écrit préalable du concédant.",
        excerpt: "(d) permit access by any affiliate or customer without Licensor's prior written consent."
    },
    {
        id: "cl-d01-incident",
        documentId: "doc-d01-atlas",
        page: 2,
        title: "Notification d'accès non autorisé sous 48 heures",
        category: "Obligations",
        status: "review",
        summary: "Obligation de notifier le concédant dans les 48 heures suivant la découverte d'un accès non autorisé : procédure interne à confirmer.",
        excerpt: "Licensee shall notify Licensor within forty-eight (48) hours after discovering unauthorised access to the Licensed Data."
    },
    {
        id: "cl-d01-deletion",
        documentId: "doc-d01-atlas",
        page: 2,
        title: "Suppression du corpus au terme du contrat",
        category: "Données",
        status: "restriction",
        summary: "À l'échéance ou en cas de résiliation, l'usage cesse et le corpus est supprimé, hors une copie d'archive chiffrée.",
        excerpt: "On expiry or termination, Licensee shall stop using and delete the Licensed Data, except for one encrypted legal archive copy."
    },
    // --- D05 · Avenant n° 1 au contrat Atlas ---
    {
        id: "cl-d05-permission",
        documentId: "doc-d05-atlas-am1",
        page: 1,
        title: "Usage commercial autorisé pour ClauseLens Enterprise",
        category: "Usage commercial",
        status: "permission",
        summary: "Par dérogation à l'article 3.1(a) du contrat initial, le corpus Atlas peut être exploité en production dans ClauseLens Enterprise.",
        excerpt: "Despite Section 3.1(a) of D01, Licensee may use the Licensed Data in ClauseLens Enterprise for production retrieval, evaluation and quality monitoring."
    },
    {
        id: "cl-d05-scope",
        documentId: "doc-d05-atlas-am1",
        page: 1,
        title: "Périmètre limité : DealRoom Search et BoardPack Studio exclus",
        category: "Usage commercial",
        status: "restriction",
        summary: "L'autorisation ne vaut que pour ClauseLens Enterprise : elle ne couvre ni DealRoom Search, ni BoardPack Studio, ni aucun autre produit.",
        excerpt: "This permission applies only to ClauseLens Enterprise and does not authorise use in DealRoom Search, BoardPack Studio or any other product."
    },
    {
        id: "cl-d05-nodisclosure",
        documentId: "doc-d05-atlas-am1",
        page: 1,
        title: "Corpus sous-jacent non exposable aux clients",
        category: "Redistribution",
        status: "restriction",
        summary: "Le corpus lui-même ne peut être exposé, reproduit ni distribué à un client, y compris dans le produit autorisé.",
        excerpt: "Licensee shall not expose, reproduce or distribute the underlying Licensed Data to any customer."
    },
    {
        id: "cl-d05-logs",
        documentId: "doc-d05-atlas-am1",
        page: 1,
        title: "Journalisation des accès par produit",
        category: "Obligations",
        status: "review",
        summary: "Condition de l'autorisation : conserver des journaux par produit traçant les accès au corpus.",
        excerpt: "Licensee shall retain product-level logs showing when the Licensed Data is accessed."
    },
    {
        id: "cl-d05-quarterly",
        documentId: "doc-d05-atlas-am1",
        page: 1,
        title: "Synthèse trimestrielle sous 20 jours",
        category: "Obligations",
        status: "review",
        summary: "Condition de l'autorisation : transmettre au concédant une synthèse trimestrielle dans les 20 jours calendaires suivant chaque trimestre.",
        excerpt: "Licensee shall provide Licensor with a quarterly summary within twenty (20) calendar days after each quarter."
    },
    {
        id: "cl-d05-affiliate",
        documentId: "doc-d05-atlas-am1",
        page: 2,
        title: "Autorisation non extensible aux filiales",
        category: "Redistribution",
        status: "restriction",
        summary: "L'autorisation bénéficie à Asteria AI SAS seule et ne s'étend à aucune filiale sans accord écrit du concédant.",
        excerpt: "The permission granted by this Amendment applies only to Asteria AI SAS and does not extend to an affiliate without Licensor's written consent."
    },
    // --- D02 · HelixLM 7B (Helix Labs GmbH) ---
    {
        id: "cl-d02-hosted",
        documentId: "doc-d02-helixlm",
        page: 1,
        title: "Déploiement commercial en service hébergé autorisé",
        category: "Usage commercial",
        status: "permission",
        summary: "Droit non exclusif de déployer le modèle au sein des services hébergés d'Asteria et de les facturer aux clients.",
        excerpt: "Licensor grants Licensee a non-exclusive right to deploy the Model as part of Licensee's hosted commercial services and to charge customers for those services."
    },
    {
        id: "cl-d02-finetune",
        documentId: "doc-d02-helixlm",
        page: 1,
        title: "Versions affinées internes autorisées",
        category: "Usage interne",
        status: "permission",
        summary: "Création de versions affinées internes autorisée, pour le même usage que celui concédé.",
        excerpt: "Licensee may create internal fine-tuned versions for the same permitted use."
    },
    {
        id: "cl-d02-weights",
        documentId: "doc-d02-helixlm",
        page: 1,
        title: "Distribution des poids du modèle interdite",
        category: "Redistribution",
        status: "restriction",
        summary: "Les poids du modèle ne peuvent être distribués ni mis à disposition d'un tiers.",
        excerpt: "Licensee shall not distribute or provide the Model weights to any third party."
    },
    {
        id: "cl-d02-access",
        documentId: "doc-d02-helixlm",
        page: 1,
        title: "Accès client exclusivement via le service hébergé",
        category: "Redistribution",
        status: "restriction",
        summary: "L'accès des clients doit passer par le service hébergé d'Asteria, sans remise du modèle.",
        excerpt: "Customer access must remain through Licensee's Hosted Service."
    },
    {
        id: "cl-d02-outputs",
        documentId: "doc-d02-helixlm",
        page: 1,
        title: "Livraison des sorties du modèle aux clients",
        category: "Données",
        status: "review",
        summary: "Les sorties peuvent être livrées aux clients, sous réserve du droit applicable et du contrat client : à cadrer contrat par contrat.",
        excerpt: "Outputs may be delivered to customers, subject to applicable law and the customer agreement."
    },
    {
        id: "cl-d02-report",
        documentId: "doc-d02-helixlm",
        page: 2,
        title: "Rapport annuel d'usage au 15 janvier",
        category: "Obligations",
        status: "review",
        summary: "Une synthèse de l'année civile écoulée est due au plus tard le 15 janvier de chaque année.",
        excerpt: "A summary report for the prior calendar year is due by 15 January each year."
    },
    // --- D03 · VectorGrid Enterprise (VectorGrid Inc) ---
    {
        id: "cl-d03-saas",
        documentId: "doc-d03-vectorgrid",
        page: 1,
        title: "Revente en SaaS commercial autorisée",
        category: "Usage commercial",
        status: "permission",
        summary: "Le service peut être utilisé pour fournir des produits SaaS commerciaux aux clients d'Asteria.",
        excerpt: "Customer may use the service to provide commercial software-as-a-service products to its own customers."
    },
    {
        id: "cl-d03-limit",
        documentId: "doc-d03-vectorgrid",
        page: 1,
        title: "Plafond d'un million de documents par mois",
        category: "Obligations",
        status: "review",
        summary: "L'abonnement couvre un million de documents traités par mois civil : volume à surveiller.",
        excerpt: "The subscription includes up to one million (1,000,000) documents processed per calendar month."
    },
    {
        id: "cl-d03-excess",
        documentId: "doc-d03-vectorgrid",
        page: 1,
        title: "Dépassement soumis à accord écrit du fournisseur",
        category: "Usage commercial",
        status: "review",
        summary: "Tout dépassement du plafond requiert l'accord écrit préalable du fournisseur.",
        excerpt: "Excess usage requires Provider's written approval and may be charged at the rates in the applicable order form."
    },
    {
        id: "cl-d03-customerdata",
        documentId: "doc-d03-vectorgrid",
        page: 1,
        title: "Traitement des données client limité au service",
        category: "Données",
        status: "permission",
        summary: "Le fournisseur ne traite les données client que pour fournir, sécuriser et supporter le service.",
        excerpt: "Provider may process Customer Data only to provide, secure and support the service, unless the parties agree otherwise in writing."
    },
    {
        id: "cl-d03-reporting",
        documentId: "doc-d03-vectorgrid",
        page: 2,
        title: "Rapport d'usage trimestriel sous 15 jours",
        category: "Obligations",
        status: "review",
        summary: "Un rapport d'usage est dû dans les 15 jours calendaires suivant chaque trimestre civil.",
        excerpt: "Within fifteen (15) calendar days after each calendar quarter, Customer shall provide a usage report showing documents processed and active production workspaces."
    },
    // --- D04 · Abonnement ClauseLens Enterprise (Horizon Bank SA) ---
    {
        id: "cl-d04-subscription",
        documentId: "doc-d04-horizon",
        page: 1,
        title: "Accès client à ClauseLens Enterprise",
        category: "Usage commercial",
        status: "permission",
        summary: "Asteria, en qualité de fournisseur, ouvre à Horizon Bank l'accès à ClauseLens Enterprise.",
        excerpt: "Provider grants Customer access to ClauseLens Enterprise for contract analysis and risk classification."
    },
    {
        id: "cl-d04-volume",
        documentId: "doc-d04-horizon",
        page: 1,
        title: "Plafond de deux millions de pages par an",
        category: "Obligations",
        status: "review",
        summary: "L'abonnement couvre deux millions de pages traitées par année d'abonnement.",
        excerpt: "The subscription includes up to two million (2,000,000) pages processed during each subscription year."
    },
    {
        id: "cl-d04-documents",
        documentId: "doc-d04-horizon",
        page: 1,
        title: "Documents client traités pour le seul service",
        category: "Données",
        status: "permission",
        summary: "Les documents déposés par Horizon Bank ne sont traités que pour fournir, sécuriser et supporter le service.",
        excerpt: "Provider may process those documents only to provide, secure and support ClauseLens Enterprise and as otherwise instructed in writing by Customer."
    },
    {
        id: "cl-d04-renewal",
        documentId: "doc-d04-horizon",
        page: 2,
        title: "Reconduction tacite, préavis de 60 jours",
        category: "Obligations",
        status: "review",
        summary: "L'abonnement se reconduit par périodes de douze mois sauf préavis écrit d'au moins 60 jours avant le terme.",
        excerpt: "The Subscription automatically renews for successive twelve-month periods unless either party gives at least sixty (60) days' written notice before the end of the then-current term."
    },
    {
        id: "cl-d04-availability",
        documentId: "doc-d04-horizon",
        page: 2,
        title: "Engagement de disponibilité à 99,5 %",
        category: "Obligations",
        status: "review",
        summary: "Objectif de disponibilité mensuelle de 99,5 %, hors maintenance planifiée et événements hors contrôle.",
        excerpt: "Provider targets 99.5 percent monthly availability, excluding scheduled maintenance and events outside Provider's reasonable control."
    },
    // --- D06 · Avenant sécurité Horizon Bank ---
    {
        id: "cl-d06-notification",
        documentId: "doc-d06-horizon-sec",
        page: 1,
        title: "Notification d'incident sous 24 heures",
        category: "Obligations",
        status: "review",
        summary: "Asteria doit notifier Horizon Bank dans les 24 heures suivant la confirmation d'un incident touchant ses données.",
        excerpt: "Provider shall notify Customer within twenty-four (24) hours after confirming that a Security Incident affects Customer Data."
    },
    {
        id: "cl-d06-audit",
        documentId: "doc-d06-horizon-sec",
        page: 2,
        title: "Test de sécurité indépendant annuel",
        category: "Obligations",
        status: "review",
        summary: "Un test de sécurité indépendant annuel est dû, avec remise de la synthèse dans les 30 jours suivant sa réalisation.",
        excerpt: "Provider shall perform an annual independent security test and deliver the executive summary to Customer within thirty (30) days after completion."
    },
    {
        id: "cl-d06-precedence",
        documentId: "doc-d06-horizon-sec",
        page: 2,
        title: "Primauté de l'avenant sur la notification d'incident",
        category: "Obligations",
        status: "review",
        summary: "D04 reste en vigueur ; en cas de contradiction sur la notification d'incident, c'est l'avenant qui prévaut.",
        excerpt: "D04 remains in force. If this Addendum conflicts with D04 on security incident notification, this Addendum controls."
    },
    // --- D07 · OCRVision API (VisionCore Inc) — signé par l'entité britannique ---
    {
        id: "cl-d07-entity",
        documentId: "doc-d07-ocrvision",
        page: 1,
        title: "Contrat limité à Asteria AI UK Ltd",
        category: "Périmètre contractuel",
        status: "restriction",
        summary: "Le « Client » désigne Asteria AI UK Ltd seule : société mère, filiales et affiliées sont exclues sauf accord écrit.",
        excerpt: "'Customer' means Asteria AI UK Ltd only and excludes its parent, subsidiaries and other affiliates unless Provider gives prior written consent."
    },
    {
        id: "cl-d07-noaffiliate",
        documentId: "doc-d07-ocrvision",
        page: 1,
        title: "Aucun droit concédé à Asteria AI SAS",
        category: "Périmètre contractuel",
        status: "restriction",
        summary: "Le contrat énonce expressément qu'il ne concède aucun droit à Asteria AI SAS ni à aucune autre affiliée.",
        excerpt: "No right is granted to Asteria AI SAS or any other affiliate by this Agreement."
    },
    {
        id: "cl-d07-commercial",
        documentId: "doc-d07-ocrvision",
        page: 1,
        title: "Usage commercial hébergé réservé à l'entité signataire",
        category: "Usage commercial",
        status: "permission",
        summary: "L'intégration de l'API dans des services hébergés commerciaux est autorisée — au bénéfice d'Asteria AI UK Ltd uniquement.",
        excerpt: "Customer may integrate OCRVision API into Customer's commercial hosted services."
    },
    {
        id: "cl-d07-resell",
        documentId: "doc-d07-ocrvision",
        page: 1,
        title: "Revente des identifiants d'API interdite",
        category: "Redistribution",
        status: "restriction",
        summary: "Les identifiants d'accès à l'API ne peuvent être revendus.",
        excerpt: "Customer shall not resell API credentials."
    },
    {
        id: "cl-d07-assignment",
        documentId: "doc-d07-ocrvision",
        page: 2,
        title: "Cession ou sous-licence à une affiliée interdite",
        category: "Redistribution",
        status: "restriction",
        summary: "Le contrat ne peut être cédé ni sous-licencié à une affiliée sans accord écrit du fournisseur.",
        excerpt: "Customer may not assign or sublicense this Agreement to an affiliate without Provider's written consent."
    },
    // --- D08 · Bon de commande ReportForge (projet non signé) ---
    {
        id: "cl-d08-draft",
        documentId: "doc-d08-reportforge",
        page: 1,
        title: "Projet non signé, sans effet contractuel",
        category: "Périmètre contractuel",
        status: "insufficient",
        summary: "Le document est un projet de négociation : il ne produit aucun effet tant qu'il n'est pas signé par les deux parties.",
        excerpt: "This document is an unsigned draft for negotiation and has no contractual effect until signed by authorised representatives of both parties."
    },
    {
        id: "cl-d08-nolicence",
        documentId: "doc-d08-reportforge",
        page: 1,
        title: "Aucune licence concédée par la circulation du projet",
        category: "Périmètre contractuel",
        status: "insufficient",
        summary: "La transmission du projet ne concède ni licence ni service.",
        excerpt: "No licence or service is granted by circulation of this draft."
    },
    {
        id: "cl-d08-production",
        documentId: "doc-d08-reportforge",
        page: 1,
        title: "Droits de déploiement en production subordonnés à signature",
        category: "Usage commercial",
        status: "insufficient",
        summary: "Les droits de déploiement en production supposent la signature du bon de commande et des conditions cadres visées.",
        excerpt: "Production deployment rights remain subject to execution of this Order Form and the referenced master terms."
    },
    {
        id: "cl-d08-masterterms",
        documentId: "doc-d08-reportforge",
        page: 2,
        title: "Conditions cadres absentes du dossier",
        category: "Périmètre contractuel",
        status: "insufficient",
        summary: "Les conditions cadres référencées ne sont pas jointes : limitations, garanties, droits sur les données et résiliation restent non convenus.",
        excerpt: "The master terms referenced in this draft are not attached. The parties have not agreed limitations, warranty terms, data rights or termination rights."
    }
];
const MOCK_ADDENDUM_LINKS = [
    {
        id: "link-d05-commercial",
        addendumDocumentId: "doc-d05-atlas-am1",
        addendumClauseId: "cl-d05-permission",
        originDocumentId: "doc-d01-atlas",
        originClauseId: "cl-d01-commercial",
        confidence: 0.92,
        rationale: "L'avenant vise expressément « Section 3.1(a) of D01 » et lui substitue une autorisation. Même contrepartie (DataForge Ltd), date d'effet postérieure (1er juillet 2026), mention « EXECUTED ».",
        status: "suggested"
    },
    {
        id: "link-d05-distribution",
        addendumDocumentId: "doc-d05-atlas-am1",
        addendumClauseId: "cl-d05-nodisclosure",
        originDocumentId: "doc-d01-atlas",
        originClauseId: "cl-d01-distribution",
        confidence: 0.57,
        rationale: "Recouvrement lexical sur l'interdiction de distribuer le corpus. L'avenant précise toutefois à l'article 4.1 que D01 « remains unchanged and in full force » hors des points qu'il modifie : le lien peut n'être qu'un rappel, et non une substitution.",
        status: "suggested"
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/mock/corpus.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MOCK_DOCUMENTS",
    ()=>MOCK_DOCUMENTS
]);
/**
 * Dossier de démonstration : la data room fictive d'Asteria AI SAS.
 *
 * Les huit documents reproduisent mot pour mot les PDF du dossier `example/`
 * (D01 à D08), tels que l'extraction paginée de `lib/pdf/extract.ts` les
 * restitue. C'est la condition de la traçabilité : un extrait du registre ou
 * d'une réponse doit se retrouver littéralement dans la page annoncée.
 *
 * Les articles à portée financière restent présents dans le texte affiché mais
 * ne sont pas indexés (voir `OUT_OF_SCOPE` dans `lib/rag/chunking.ts`) :
 * DataRight n'analyse que les droits, permissions, restrictions et obligations.
 */ const ATLAS = {
    id: "doc-d01-atlas",
    title: "Atlas Business Corpus Data Licence Agreement",
    counterparty: "DataForge Ltd",
    kind: "license",
    reference: "D01",
    effectiveDate: "2026-01-01",
    addedAt: "2026-08-03T09:12:00.000Z",
    source: "mock",
    pageCount: 2,
    pages: [
        {
            number: 1,
            text: `Atlas Business Corpus Data Licence Agreement
Document ID D01 | Effective date 1 January 2026
Party Role
DataForge Ltd Licensor
Asteria AI SAS Licensee
1. Definitions
1.1 'Licensed Data' means the Atlas Business Corpus and accompanying metadata supplied by Licensor. 1.2
'Production Use' means use in a system made available to external users or used to deliver a paid service.
2. Licence Grant
2.1 Licensor grants Licensee a limited, non-exclusive, non-transferable right to use the Licensed Data solely for
internal, non-production research and evaluation purposes. 2.2 No implied rights are granted.
3. Restrictions
3.1 Licensee shall not: (a) use the Licensed Data in any commercial product or service; (b) use the Licensed Data to
train, fine-tune or retrieve content for a production model; (c) distribute the Licensed Data; or (d) permit access by
any affiliate or customer without Licensor's prior written consent.
FICTITIOUS DOCUMENT FOR LEXHACK DEMONSTRATION Page 1`
        },
        {
            number: 2,
            text: `4. Security and Incidents
4.1 Licensee shall apply reasonable technical and organisational measures. 4.2 Licensee shall notify Licensor within
forty-eight (48) hours after discovering unauthorised access to the Licensed Data.
5. Term and Deletion
5.1 This Agreement continues for twelve (12) months. 5.2 On expiry or termination, Licensee shall stop using and
delete the Licensed Data, except for one encrypted legal archive copy.
6. Termination
6.1 Licensor may terminate immediately for a material breach of Sections 2 or 3. 6.2 Termination does not create an
automatic damages amount; available remedies depend on applicable law and proven loss.
7. General
7.1 Amendments must be in writing and signed by both parties. 7.2 This Agreement is governed by the laws of
France, without prejudice to mandatory rules.
AGREED FOR DEMONSTRATION PURPOSES
The names, amounts and obligations in this document are fictitious and are provided solely to test the LexHack
prototype.
FICTITIOUS DOCUMENT FOR LEXHACK DEMONSTRATION Page 2`
        }
    ]
};
const HELIXLM = {
    id: "doc-d02-helixlm",
    title: "HelixLM Commercial Model Licence Agreement",
    counterparty: "Helix Labs GmbH",
    kind: "license",
    reference: "D02",
    effectiveDate: "2026-02-01",
    addedAt: "2026-08-03T09:18:00.000Z",
    source: "mock",
    pageCount: 2,
    pages: [
        {
            number: 1,
            text: `HelixLM Commercial Model Licence Agreement
Document ID D02 | Effective date 1 February 2026
Party Role
Helix Labs GmbH Licensor
Asteria AI SAS Licensee
1. Definitions
1.1 'Model' means HelixLM 7B, including the model weights and tokenizer. 1.2 'Hosted Service' means a service
operated by Licensee where end users access functionality without receiving the Model weights.
2. Commercial Licence
2.1 Licensor grants Licensee a non-exclusive right to deploy the Model as part of Licensee's hosted commercial
services and to charge customers for those services. 2.2 Licensee may create internal fine-tuned versions for the
same permitted use.
3. Distribution Restrictions
3.1 Licensee shall not distribute or provide the Model weights to any third party. 3.2 Customer access must remain
through Licensee's Hosted Service. 3.3 Outputs may be delivered to customers, subject to applicable law and the
customer agreement.
FICTITIOUS DOCUMENT FOR LEXHACK DEMONSTRATION Page 1`
        },
        {
            number: 2,
            text: `4. Usage Records
4.1 Licensee shall maintain records sufficient to identify the commercial services using the Model. 4.2 A summary
report for the prior calendar year is due by 15 January each year.
5. Fees
5.1 The annual licence fee is EUR 48,000, payable in quarterly instalments. 5.2 Usage above the separately agreed
compute allowance may incur additional fees.
6. Term
6.1 The initial term is twelve (12) months. 6.2 The Agreement renews for successive twelve-month periods unless
either party gives sixty (60) days' written notice.
7. General
7.1 Amendments require a written instrument signed by both parties. 7.2 This Agreement is governed by German
law.
AGREED FOR DEMONSTRATION PURPOSES
The names, amounts and obligations in this document are fictitious and are provided solely to test the LexHack
prototype.
FICTITIOUS DOCUMENT FOR LEXHACK DEMONSTRATION Page 2`
        }
    ]
};
const VECTORGRID = {
    id: "doc-d03-vectorgrid",
    title: "VectorGrid Enterprise Software and API Agreement",
    counterparty: "VectorGrid Inc",
    kind: "license",
    reference: "D03",
    effectiveDate: "2026-02-15",
    addedAt: "2026-08-03T09:24:00.000Z",
    source: "mock",
    pageCount: 2,
    pages: [
        {
            number: 1,
            text: `VectorGrid Enterprise Software and API Agreement
Document ID D03 | Effective date 15 February 2026
Party Role
VectorGrid Inc Provider
Asteria AI SAS Customer
1. Service
1.1 Provider shall make the VectorGrid embedding and vector search service available to Customer. 1.2 Customer
may use the service to provide commercial software-as-a-service products to its own customers.
2. Usage Limit
2.1 The subscription includes up to one million (1,000,000) documents processed per calendar month. 2.2 Excess
usage requires Provider's written approval and may be charged at the rates in the applicable order form.
3. Customer Data
3.1 Customer retains its rights in Customer Data. 3.2 Provider may process Customer Data only to provide, secure
and support the service, unless the parties agree otherwise in writing.
FICTITIOUS DOCUMENT FOR LEXHACK DEMONSTRATION Page 1`
        },
        {
            number: 2,
            text: `4. Reporting
4.1 Within fifteen (15) calendar days after each calendar quarter, Customer shall provide a usage report showing
documents processed and active production workspaces. 4.2 Provider may request reasonable supporting records
once per year.
5. Fees and Payment
5.1 The annual subscription fee is EUR 36,000. 5.2 Invoices are payable within thirty (30) days.
6. Term and Suspension
6.1 The initial term is twelve (12) months. 6.2 Provider may suspend access after written notice if Customer
materially exceeds the Usage Limit and does not agree a remediation plan within ten (10) business days.
7. General
7.1 This Agreement is governed by the laws of England and Wales. 7.2 Amendments must be signed by both
parties.
AGREED FOR DEMONSTRATION PURPOSES
The names, amounts and obligations in this document are fictitious and are provided solely to test the LexHack
prototype.
FICTITIOUS DOCUMENT FOR LEXHACK DEMONSTRATION Page 2`
        }
    ]
};
const HORIZON = {
    id: "doc-d04-horizon",
    title: "ClauseLens Enterprise Subscription Agreement — Horizon Bank",
    counterparty: "Horizon Bank SA",
    kind: "terms",
    reference: "D04",
    effectiveDate: "2026-03-01",
    addedAt: "2026-08-03T09:31:00.000Z",
    source: "mock",
    pageCount: 2,
    pages: [
        {
            number: 1,
            text: `ClauseLens Enterprise Subscription Agreement
Document ID D04 | Effective date 1 March 2026
Party Role
Asteria AI SAS Provider
Horizon Bank SA Customer
1. Subscription
1.1 Provider grants Customer access to ClauseLens Enterprise for contract analysis and risk classification. 1.2 The
subscription includes up to two million (2,000,000) pages processed during each subscription year.
2. Fees
2.1 Customer shall pay an annual subscription fee of EUR 120,000, invoiced in advance. 2.2 Fees exclude
applicable taxes.
3. Customer Documents
3.1 Customer retains all rights in documents it uploads. 3.2 Provider may process those documents only to provide,
secure and support ClauseLens Enterprise and as otherwise instructed in writing by Customer.
FICTITIOUS DOCUMENT FOR LEXHACK DEMONSTRATION Page 1`
        },
        {
            number: 2,
            text: `4. Service Levels
4.1 Provider targets 99.5 percent monthly availability, excluding scheduled maintenance and events outside
Provider's reasonable control. 4.2 Service credits are Customer's sole contractual remedy for a verified availability
shortfall.
5. Term and Renewal
5.1 The initial subscription term is twelve (12) months from the Effective Date. 5.2 The Subscription automatically
renews for successive twelve-month periods unless either party gives at least sixty (60) days' written notice before
the end of the then-current term.
6. Confidentiality
6.1 Each party shall protect the other party's confidential information and use it only to perform this Agreement.
7. General
7.1 This Agreement is governed by French law. 7.2 Any amendment must be in writing and signed by authorised
representatives of both parties.
AGREED FOR DEMONSTRATION PURPOSES
The names, amounts and obligations in this document are fictitious and are provided solely to test the LexHack
prototype.
FICTITIOUS DOCUMENT FOR LEXHACK DEMONSTRATION Page 2`
        }
    ]
};
const ATLAS_AMENDMENT = {
    id: "doc-d05-atlas-am1",
    title: "Amendment No 1 to Atlas Business Corpus Data Licence",
    counterparty: "DataForge Ltd",
    kind: "addendum",
    reference: "D05",
    effectiveDate: "2026-07-01",
    addedAt: "2026-08-03T09:37:00.000Z",
    source: "mock",
    amends: "doc-d01-atlas",
    pageCount: 2,
    pages: [
        {
            number: 1,
            text: `Amendment No 1 to Atlas Business Corpus Data Licence
Document ID D05 | Effective date 1 July 2026 | Status EXECUTED FOR DEMONSTRATION
Party Role
DataForge Ltd Licensor
Asteria AI SAS Licensee
1. Background and Effective Date
1.1 This Amendment modifies the Atlas Business Corpus Data Licence Agreement identified as D01. 1.2 This
Amendment takes effect on 1 July 2026. Capitalised terms retain the meanings given in D01.
2. Limited Commercial Permission
2.1 Despite Section 3.1(a) of D01, Licensee may use the Licensed Data in ClauseLens Enterprise for production
retrieval, evaluation and quality monitoring. 2.2 This permission applies only to ClauseLens Enterprise and does not
authorise use in DealRoom Search, BoardPack Studio or any other product. 2.3 Licensee shall not expose,
reproduce or distribute the underlying Licensed Data to any customer.
3. Conditions
3.1 Licensee shall retain product-level logs showing when the Licensed Data is accessed. 3.2 Licensee shall provide
Licensor with a quarterly summary within twenty (20) calendar days after each quarter.
FICTITIOUS DOCUMENT FOR LEXHACK DEMONSTRATION Page 1`
        },
        {
            number: 2,
            text: `4. Continuing Effect
4.1 Except as expressly modified by this Amendment, D01 remains unchanged and in full force. 4.2 If this
Amendment conflicts with D01, this Amendment controls only for the subject matter and product scope stated here.
5. No Affiliate Expansion
5.1 The permission granted by this Amendment applies only to Asteria AI SAS and does not extend to an affiliate
without Licensor's written consent.
6. General
6.1 This Amendment may be executed in counterparts. 6.2 French law continues to govern D01 and this
Amendment.
DOCUMENT STATUS
The names, amounts and obligations in this document are fictitious and are provided solely to test the LexHack
prototype.
FICTITIOUS DOCUMENT FOR LEXHACK DEMONSTRATION Page 2`
        }
    ]
};
const HORIZON_SECURITY = {
    id: "doc-d06-horizon-sec",
    title: "Horizon Bank Security Addendum",
    counterparty: "Horizon Bank SA",
    kind: "addendum",
    reference: "D06",
    effectiveDate: "2026-03-01",
    addedAt: "2026-08-03T09:44:00.000Z",
    source: "mock",
    amends: "doc-d04-horizon",
    pageCount: 2,
    pages: [
        {
            number: 1,
            text: `Horizon Bank Security Addendum
Document ID D06 | Effective date 1 March 2026 | Status EXECUTED FOR DEMONSTRATION
Party Role
Asteria AI SAS Provider
Horizon Bank SA Customer
1. Relationship to Subscription Agreement
1.1 This Addendum supplements the ClauseLens Enterprise Subscription Agreement identified as D04. 1.2 Defined
terms not stated here have the meanings given in D04.
2. Security Incident
2.1 'Security Incident' means confirmed unauthorised access to, acquisition of, or disclosure of Customer Data. A
service outage that does not involve Customer Data is not, by itself, a Security Incident.
3. Notification
3.1 Provider shall notify Customer within twenty-four (24) hours after confirming that a Security Incident affects
Customer Data. 3.2 The initial notice shall describe the known scope, affected systems and containment actions, to
the extent known.
FICTITIOUS DOCUMENT FOR LEXHACK DEMONSTRATION Page 1`
        },
        {
            number: 2,
            text: `4. Testing and Evidence
4.1 Provider shall perform an annual independent security test and deliver the executive summary to Customer
within thirty (30) days after completion. Delivery does not constitute Customer acceptance unless Customer confirms
acceptance in writing.
5. Remediation
5.1 Provider shall address material findings according to a documented remediation plan. 5.2 The parties shall agree
any customer-specific deadline in writing.
6. Continuing Effect
6.1 D04 remains in force. If this Addendum conflicts with D04 on security incident notification, this Addendum
controls.
DOCUMENT STATUS
The names, amounts and obligations in this document are fictitious and are provided solely to test the LexHack
prototype.
FICTITIOUS DOCUMENT FOR LEXHACK DEMONSTRATION Page 2`
        }
    ]
};
const OCRVISION = {
    id: "doc-d07-ocrvision",
    title: "OCRVision API Enterprise Agreement (Asteria AI UK Ltd)",
    counterparty: "VisionCore Inc",
    kind: "license",
    reference: "D07",
    effectiveDate: "2026-04-01",
    addedAt: "2026-08-03T09:51:00.000Z",
    source: "mock",
    pageCount: 2,
    pages: [
        {
            number: 1,
            text: `OCRVision API Enterprise Agreement
Document ID D07 | Effective date 1 April 2026 | Status EXECUTED FOR DEMONSTRATION
Party Role
VisionCore Inc Provider
Asteria AI UK Ltd Customer
1. Customer and Scope
1.1 Provider shall supply the OCRVision API to Customer. 1.2 'Customer' means Asteria AI UK Ltd only and
excludes its parent, subsidiaries and other affiliates unless Provider gives prior written consent.
2. Commercial Use
2.1 Customer may integrate OCRVision API into Customer's commercial hosted services. No right is granted to
Asteria AI SAS or any other affiliate by this Agreement. 2.2 Customer shall not resell API credentials.
3. Data Processing
3.1 Provider may process submitted files only to provide and secure OCRVision API. 3.2 Customer shall not submit
files it lacks authority to process.
FICTITIOUS DOCUMENT FOR LEXHACK DEMONSTRATION Page 1`
        },
        {
            number: 2,
            text: `4. Fees
4.1 Customer shall pay GBP 18,000 per year for up to 500,000 pages. 4.2 Excess usage is charged according to the
order form.
5. Term
5.1 The initial term is twelve (12) months. 5.2 Renewal requires a new order form unless the parties agree an
automatic renewal in writing.
6. Assignment and Affiliates
6.1 Customer may not assign or sublicense this Agreement to an affiliate without Provider's written consent.
DOCUMENT STATUS
The names, amounts and obligations in this document are fictitious and are provided solely to test the LexHack
prototype.
FICTITIOUS DOCUMENT FOR LEXHACK DEMONSTRATION Page 2`
        }
    ]
};
const REPORTFORGE = {
    id: "doc-d08-reportforge",
    title: "ReportForge Enterprise Order Form (projet non signé)",
    counterparty: "ReportForge Systems",
    kind: "other",
    reference: "D08",
    // Le document porte la mention « Effective date Not effective » : aucune date
    // d'effet ne peut être affichée tant qu'il n'est pas signé.
    effectiveDate: "—",
    addedAt: "2026-08-03T09:58:00.000Z",
    source: "mock",
    pageCount: 2,
    pages: [
        {
            number: 1,
            text: `ReportForge Enterprise Order Form
Document ID D08 | Effective date Not effective | Status UNSIGNED DRAFT
Party Role
ReportForge Systems Proposed licensor
Asteria AI SAS Proposed customer
1. Draft Status
1.1 This document is an unsigned draft for negotiation and has no contractual effect until signed by authorised
representatives of both parties. 1.2 No licence or service is granted by circulation of this draft.
2. Proposed Product
2.1 The proposed subscription would cover ReportForge Enterprise for use in BoardPack Studio. 2.2 Production
deployment rights remain subject to execution of this Order Form and the referenced master terms.
3. Proposed Term
3.1 The proposed initial term is twelve (12) months from an effective date to be inserted at signature.
FICTITIOUS DOCUMENT FOR LEXHACK DEMONSTRATION Page 1`
        },
        {
            number: 2,
            text: `4. Proposed Fees
4.1 The non-binding proposed annual fee is EUR 12,000. 4.2 Taxes and excess usage fees would be added if an
agreement is executed.
5. Missing Master Terms
5.1 The master terms referenced in this draft are not attached. The parties have not agreed limitations, warranty
terms, data rights or termination rights.
6. Execution
6.1 This draft becomes effective only when both parties sign it. No signatures appear in this document.
DOCUMENT STATUS
The names, amounts and obligations in this document are fictitious and are provided solely to test the LexHack
prototype.
FICTITIOUS DOCUMENT FOR LEXHACK DEMONSTRATION Page 2`
        }
    ]
};
const MOCK_DOCUMENTS = [
    ATLAS,
    ATLAS_AMENDMENT,
    HELIXLM,
    VECTORGRID,
    HORIZON,
    HORIZON_SECURITY,
    OCRVISION,
    REPORTFORGE
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/mock/scripted-answers.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SCRIPTED_ANSWERS",
    ()=>SCRIPTED_ANSWERS,
    "SUGGESTED_QUESTIONS",
    ()=>SUGGESTED_QUESTIONS
]);
const SCRIPTED_ANSWERS = [
    {
        id: "q-atlas-commercial",
        question: "Pouvons-nous exploiter le corpus Atlas dans un produit commercial ?",
        all: [
            [
                "atlas",
                "corpus"
            ],
            [
                "commercial",
                "commerciale",
                "exploiter",
                "exploitation",
                "produit"
            ]
        ],
        draft: {
            status: "permission",
            summary: "Oui, mais pour ClauseLens Enterprise uniquement. L'avenant n° 1 du 1er juillet 2026 déroge à l'article 3.1(a) du contrat initial et autorise l'usage du corpus Atlas en production dans ce seul produit. DealRoom Search et BoardPack Studio en sont expressément exclus et restent sous la restriction d'origine.",
            caveats: [
                "L'autorisation ne couvre ni DealRoom Search, ni BoardPack Studio, ni aucun autre produit (avenant, art. 2.2).",
                "Le corpus lui-même ne peut être exposé, reproduit ni distribué à un client (avenant, art. 2.3).",
                "Des journaux par produit traçant les accès au corpus doivent être conservés (avenant, art. 3.1).",
                "Une synthèse trimestrielle est due au concédant dans les 20 jours suivant chaque trimestre (avenant, art. 3.2).",
                "L'autorisation bénéficie à Asteria AI SAS seule et ne s'étend à aucune filiale (avenant, art. 5.1)."
            ],
            citations: [
                {
                    documentId: "doc-d05-atlas-am1",
                    page: 1,
                    excerpt: "Despite Section 3.1(a) of D01, Licensee may use the Licensed Data in ClauseLens Enterprise for production retrieval, evaluation and quality monitoring.",
                    role: "avenant",
                    clauseId: "cl-d05-permission"
                },
                {
                    documentId: "doc-d01-atlas",
                    page: 1,
                    excerpt: "Licensee shall not: (a) use the Licensed Data in any commercial product or service;",
                    role: "modifiée par avenant",
                    clauseId: "cl-d01-commercial"
                },
                {
                    documentId: "doc-d05-atlas-am1",
                    page: 1,
                    excerpt: "This permission applies only to ClauseLens Enterprise and does not authorise use in DealRoom Search, BoardPack Studio or any other product.",
                    role: "contexte",
                    clauseId: "cl-d05-scope"
                }
            ]
        }
    },
    {
        id: "q-helixlm-hosted",
        question: "Pouvons-nous déployer HelixLM auprès de nos clients via notre service hébergé ?",
        all: [
            [
                "helixlm",
                "helix",
                "modele"
            ],
            [
                "heberge",
                "hebergee",
                "deployer",
                "clients",
                "service"
            ]
        ],
        draft: {
            status: "permission",
            summary: "Oui. Le contrat HelixLM concède un droit non exclusif de déployer le modèle au sein des services hébergés d'Asteria et d'en facturer l'accès aux clients. La condition est que les clients n'accèdent jamais aux poids du modèle.",
            caveats: [
                "Les poids du modèle ne peuvent être distribués ni remis à un tiers (art. 3.1).",
                "L'accès des clients doit rester intégralement médiatisé par le service hébergé (art. 3.2).",
                "Un rapport annuel d'usage est dû au plus tard le 15 janvier (art. 4.2)."
            ],
            citations: [
                {
                    documentId: "doc-d02-helixlm",
                    page: 1,
                    excerpt: "Licensor grants Licensee a non-exclusive right to deploy the Model as part of Licensee's hosted commercial services and to charge customers for those services.",
                    role: "principale",
                    clauseId: "cl-d02-hosted"
                },
                {
                    documentId: "doc-d02-helixlm",
                    page: 1,
                    excerpt: "Licensee shall not distribute or provide the Model weights to any third party.",
                    role: "contexte",
                    clauseId: "cl-d02-weights"
                },
                {
                    documentId: "doc-d02-helixlm",
                    page: 1,
                    excerpt: "Customer access must remain through Licensee's Hosted Service.",
                    role: "contexte",
                    clauseId: "cl-d02-access"
                }
            ]
        }
    },
    {
        id: "q-vectorgrid-reporting",
        question: "Dans quel délai devons-nous transmettre le rapport d'usage VectorGrid ?",
        all: [
            [
                "vectorgrid",
                "vector"
            ],
            [
                "rapport",
                "reporting",
                "delai",
                "transmettre",
                "usage",
                "trimestre",
                "trimestriel"
            ]
        ],
        draft: {
            status: "permission",
            summary: "Dans les quinze (15) jours calendaires suivant la fin de chaque trimestre civil. Le rapport doit indiquer le nombre de documents traités et les espaces de production actifs.",
            caveats: [
                "Le fournisseur peut par ailleurs demander des pièces justificatives une fois par an (art. 4.2).",
                "Le plafond contractuel est d'un million de documents traités par mois civil (art. 2.1)."
            ],
            citations: [
                {
                    documentId: "doc-d03-vectorgrid",
                    page: 2,
                    excerpt: "Within fifteen (15) calendar days after each calendar quarter, Customer shall provide a usage report showing documents processed and active production workspaces.",
                    role: "principale",
                    clauseId: "cl-d03-reporting"
                },
                {
                    documentId: "doc-d03-vectorgrid",
                    page: 1,
                    excerpt: "Customer may use the service to provide commercial software-as-a-service products to its own customers.",
                    role: "contexte",
                    clauseId: "cl-d03-saas"
                }
            ]
        }
    },
    {
        id: "q-horizon-renewal",
        question: "Comment se renouvelle l'abonnement Horizon Bank ?",
        all: [
            [
                "horizon",
                "bank",
                "abonnement"
            ],
            [
                "renouvelle",
                "renouvellement",
                "reconduction",
                "preavis",
                "resiliation",
                "echeance"
            ]
        ],
        draft: {
            status: "permission",
            summary: "Par reconduction tacite, pour des périodes successives de douze mois. Chaque partie peut s'y opposer par un préavis écrit d'au moins soixante (60) jours avant le terme de la période en cours.",
            caveats: [
                "Le préavis doit être écrit et parvenir avant la fin de la période en cours (art. 5.2).",
                "La durée initiale est de douze mois à compter de la date d'effet, soit le 1er mars 2026 (art. 5.1)."
            ],
            citations: [
                {
                    documentId: "doc-d04-horizon",
                    page: 2,
                    excerpt: "The Subscription automatically renews for successive twelve-month periods unless either party gives at least sixty (60) days' written notice before the end of the then-current term.",
                    role: "principale",
                    clauseId: "cl-d04-renewal"
                },
                {
                    documentId: "doc-d04-horizon",
                    page: 1,
                    excerpt: "Provider grants Customer access to ClauseLens Enterprise for contract analysis and risk classification.",
                    role: "contexte",
                    clauseId: "cl-d04-subscription"
                }
            ]
        }
    },
    {
        id: "q-ocrvision-commercial",
        question: "Le dossier permet-il d'utiliser l'API OCRVision commercialement ?",
        all: [
            [
                "ocrvision",
                "ocr"
            ],
            [
                "commercial",
                "commerciale",
                "commercialement",
                "utiliser",
                "droit",
                "exploiter"
            ]
        ],
        draft: {
            status: "insufficient",
            summary: "Information insuffisante pour Asteria AI SAS. Le dossier contient bien un contrat OCRVision, mais il lie VisionCore Inc à Asteria AI UK Ltd et écarte explicitement Asteria AI SAS. Aucun accord exécuté au nom de l'entité qui exploite BoardPack Studio ne figure au dossier.",
            caveats: [
                "Le contrat D07 définit le « Client » comme Asteria AI UK Ltd seule, à l'exclusion de la société mère et des affiliées (art. 1.2).",
                "La cession ou la sous-licence à une affiliée suppose l'accord écrit du fournisseur (art. 6.1).",
                "Deux voies possibles : verser au dossier un accord au nom d'Asteria AI SAS, ou obtenir l'accord écrit d'extension prévu à l'article 1.2."
            ],
            citations: [
                {
                    documentId: "doc-d07-ocrvision",
                    page: 1,
                    excerpt: "No right is granted to Asteria AI SAS or any other affiliate by this Agreement.",
                    role: "contexte",
                    clauseId: "cl-d07-noaffiliate"
                },
                {
                    documentId: "doc-d07-ocrvision",
                    page: 1,
                    excerpt: "'Customer' means Asteria AI UK Ltd only and excludes its parent, subsidiaries and other affiliates unless Provider gives prior written consent.",
                    role: "contexte",
                    clauseId: "cl-d07-entity"
                }
            ]
        }
    }
];
const SUGGESTED_QUESTIONS = SCRIPTED_ANSWERS.map(_c = (entry)=>entry.question);
_c1 = SUGGESTED_QUESTIONS;
var _c, _c1;
__turbopack_context__.k.register(_c, "SUGGESTED_QUESTIONS$SCRIPTED_ANSWERS.map");
__turbopack_context__.k.register(_c1, "SUGGESTED_QUESTIONS");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/rag/chunking.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "chunkCorpus",
    ()=>chunkCorpus,
    "chunkDocument",
    ()=>chunkDocument
]);
/**
 * Articles hors périmètre : DataRight n'indexe aucune stipulation financière.
 *
 * Le repère est le vocabulaire de la redevance (« fee », « conditions
 * financières ») ou un montant libellé dans une devise — pas la simple mention
 * d'une facturation, afin qu'un plafond d'usage assorti d'un renvoi tarifaire
 * reste, lui, indexé comme la clause d'usage qu'il est.
 */ const OUT_OF_SCOPE = /\[article non indexé par dataright\]|conditions financières|\bfees?\b|\b(?:eur|gbp|usd|chf)\s?[\d ,.]/i;
const ARTICLE_PREFIX = /^(?:article\s+)?(\d+(?:\.\d+)*)/i;
/** Regroupe les lignes d'une page en blocs cohérents (un alinéa = un bloc). */ function splitPageIntoBlocks(text) {
    const blocks = [];
    let current = [];
    let currentOffset = 0;
    let cursor = 0;
    const flush = ()=>{
        const joined = current.join("\n").trim();
        if (joined.length > 0) blocks.push({
            text: joined,
            offset: currentOffset
        });
        current = [];
    };
    for (const line of text.split("\n")){
        const lineStart = cursor;
        cursor += line.length + 1;
        const trimmed = line.trim();
        if (trimmed.length === 0) {
            flush();
            continue;
        }
        // Un nouvel alinéa numéroté ou un titre d'article ouvre un bloc.
        if (current.length > 0 && ARTICLE_PREFIX.test(trimmed)) flush();
        if (current.length === 0) currentOffset = lineStart;
        current.push(trimmed);
    }
    flush();
    return blocks;
}
function chunkDocument(doc) {
    const chunks = [];
    for (const page of doc.pages){
        for (const block of splitPageIntoBlocks(page.text)){
            if (OUT_OF_SCOPE.test(block.text)) continue;
            if (block.text.length < 24) continue;
            const article = ARTICLE_PREFIX.exec(block.text)?.[1];
            chunks.push({
                id: `${doc.id}:p${page.number}:${block.offset}`,
                documentId: doc.id,
                documentTitle: doc.title,
                page: page.number,
                offset: block.offset,
                text: block.text,
                article
            });
        }
    }
    return chunks;
}
function chunkCorpus(docs) {
    return docs.flatMap(chunkDocument);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/rag/engine.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ask",
    ()=>ask,
    "locateExcerpt",
    ()=>locateExcerpt
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rag$2f$chunking$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/rag/chunking.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rag$2f$provider$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/rag/provider.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rag$2f$retriever$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/rag/retriever.ts [app-client] (ecmascript)");
;
;
;
function locateExcerpt(pageText, excerpt) {
    const map = [];
    let flat = "";
    let previousWasSpace = false;
    for(let i = 0; i < pageText.length; i += 1){
        const char = pageText[i];
        if (/\s/.test(char)) {
            if (previousWasSpace || flat.length === 0) continue;
            flat += " ";
            map.push(i);
            previousWasSpace = true;
            continue;
        }
        flat += char;
        map.push(i);
        previousWasSpace = false;
    }
    const needle = excerpt.replace(/\s+/g, " ").trim();
    if (needle.length === 0) return null;
    const index = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rag$2f$retriever$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalize"])(flat).indexOf((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rag$2f$retriever$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalize"])(needle));
    if (index === -1) return null;
    const start = map[index];
    const end = (map[index + needle.length - 1] ?? start) + 1;
    return {
        start,
        end,
        text: pageText.slice(start, end)
    };
}
function findDocument(documents, id) {
    return documents.find((doc)=>doc.id === id);
}
/** Garde les citations vérifiables, écarte les autres. */ function verifyCitations(draft, documents) {
    const citations = [];
    let rejected = 0;
    for (const candidate of draft.citations){
        const doc = findDocument(documents, candidate.documentId);
        const page = doc?.pages.find((entry)=>entry.number === candidate.page);
        if (!doc || !page) {
            rejected += 1;
            continue;
        }
        const located = locateExcerpt(page.text, candidate.excerpt);
        if (!located) {
            rejected += 1;
            continue;
        }
        citations.push({
            documentId: doc.id,
            documentTitle: doc.title,
            page: page.number,
            excerpt: located.text,
            score: candidate.score ?? 1,
            clauseId: candidate.clauseId,
            role: candidate.role ?? "principale"
        });
    }
    return {
        citations,
        rejected
    };
}
function clauseForCitation(clauses, citation) {
    if (citation.clauseId) {
        const byId = clauses.find((clause)=>clause.id === citation.clauseId);
        if (byId) return byId;
    }
    const needle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rag$2f$retriever$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalize"])(citation.excerpt.replace(/\s+/g, " ").trim());
    return clauses.find((clause)=>clause.documentId === citation.documentId && clause.page === citation.page && needle.includes((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rag$2f$retriever$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalize"])(clause.excerpt.replace(/\s+/g, " ").trim())));
}
/** Applique la préséance de l'avenant sur les clauses citées. */ function resolveAddendum(citations, documents, clauses, links, draftStatus) {
    const extraCaveats = [];
    for (const citation of citations){
        const clause = clauseForCitation(clauses, citation);
        if (!clause) continue;
        const link = links.find((entry)=>entry.originClauseId === clause.id && entry.status !== "rejected");
        const rejectedLink = links.find((entry)=>entry.originClauseId === clause.id && entry.status === "rejected");
        const activeLink = link ?? rejectedLink;
        if (!activeLink) continue;
        const addendumDoc = findDocument(documents, activeLink.addendumDocumentId);
        const originDoc = findDocument(documents, activeLink.originDocumentId);
        const addendumClause = clauses.find((entry)=>entry.id === activeLink.addendumClauseId);
        if (!addendumDoc || !originDoc || !addendumClause) continue;
        // Lien écarté par un utilisateur : la rédaction initiale reprend ses droits.
        if (activeLink.status === "rejected") {
            return {
                citations: citations.filter((entry)=>entry.documentId !== addendumDoc.id).map((entry)=>entry === citation ? {
                        ...entry,
                        role: "principale"
                    } : entry),
                status: clause.status,
                summary: `Le lien avec « ${addendumDoc.title} » a été écarté manuellement : c'est la rédaction initiale qui s'applique. ${clause.summary}`,
                notice: {
                    addendumDocumentId: addendumDoc.id,
                    addendumTitle: addendumDoc.title,
                    originDocumentId: originDoc.id,
                    originTitle: originDoc.title,
                    confirmed: false,
                    message: `Un avenant modifiant cette clause existe au dossier, mais le lien a été rejeté. Réactivez-le depuis l'onglet Avenants pour qu'il prévale.`
                },
                extraCaveats
            };
        }
        const addendumPage = addendumDoc.pages.find((page)=>page.number === addendumClause.page);
        const located = addendumPage ? locateExcerpt(addendumPage.text, addendumClause.excerpt) : null;
        const withAddendum = citations.map((entry)=>entry === citation ? {
                ...entry,
                role: "modifiée par avenant"
            } : entry);
        const alreadyCited = withAddendum.some((entry)=>entry.clauseId === addendumClause.id);
        if (!alreadyCited && located) {
            withAddendum.unshift({
                documentId: addendumDoc.id,
                documentTitle: addendumDoc.title,
                page: addendumClause.page,
                excerpt: located.text,
                score: 1,
                clauseId: addendumClause.id,
                role: "avenant"
            });
        }
        // L'avenant en tête : c'est la règle applicable.
        withAddendum.sort((a, b)=>{
            const weight = (role)=>role === "avenant" ? 0 : role === "modifiée par avenant" ? 1 : 2;
            return weight(a.role) - weight(b.role);
        });
        const confirmed = activeLink.status === "confirmed";
        if (!confirmed) {
            extraCaveats.push("Le lien entre l'avenant et la clause d'origine n'a pas encore été validé manuellement : la réponse est donnée sous réserve.");
        }
        return {
            citations: withAddendum,
            notice: {
                addendumDocumentId: addendumDoc.id,
                addendumTitle: addendumDoc.title,
                originDocumentId: originDoc.id,
                originTitle: originDoc.title,
                confirmed,
                message: confirmed ? `La clause d'origine de « ${originDoc.title} » est remplacée par « ${addendumDoc.title} ». La règle de l'avenant prévaut.` : `Lien détecté (confiance ${Math.round(activeLink.confidence * 100)} %) entre « ${addendumDoc.title} » et la clause d'origine, en attente de validation manuelle.`
            },
            status: confirmed ? draftStatus : "review",
            extraCaveats
        };
    }
    return {
        citations,
        extraCaveats
    };
}
async function ask({ question, documents, clauses, links, provider = new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rag$2f$provider$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MockAnswerProvider"]() }) {
    const chunks = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rag$2f$chunking$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["chunkCorpus"])(documents);
    const retrieved = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rag$2f$retriever$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["retrieve"])(question, chunks);
    const draft = await provider.synthesize({
        question,
        retrieved,
        documents
    });
    const { citations, rejected } = verifyCitations(draft, documents);
    const caveats = [
        ...draft.caveats
    ];
    if (rejected > 0) {
        caveats.push(`${rejected} citation${rejected > 1 ? "s" : ""} proposée${rejected > 1 ? "s" : ""} par le moteur ${rejected > 1 ? "ont" : "a"} été écartée${rejected > 1 ? "s" : ""} : le passage n'a pas été retrouvé dans la page annoncée.`);
    }
    const base = {
        id: `ans-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
        question,
        status: draft.status,
        summary: draft.summary,
        citations,
        caveats,
        createdAt: new Date().toISOString(),
        engine: provider.name
    };
    // Une réponse affirmative sans citation vérifiée n'est jamais affichée.
    if (citations.length === 0 && base.status !== "insufficient") {
        return {
            ...base,
            status: "insufficient",
            summary: "Information insuffisante. Le moteur n'a pas pu justifier sa réponse par un passage vérifiable du dossier ; la synthèse a donc été écartée."
        };
    }
    // Une réponse sans conclusion n'a rien à requalifier : un avenant, validé ou
    // non, ne rend pas le dossier plus disert sur une question qu'il ne traite
    // pas. On laisse donc « Information insuffisante » tel quel.
    if (base.status === "insufficient") return base;
    const resolution = resolveAddendum(citations, documents, clauses, links, base.status);
    return {
        ...base,
        citations: resolution.citations,
        status: resolution.status ?? base.status,
        summary: resolution.summary ?? base.summary,
        caveats: [
            ...base.caveats,
            ...resolution.extraCaveats
        ],
        addendum: resolution.notice
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/rag/provider.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CONFIDENCE_FLOOR",
    ()=>CONFIDENCE_FLOOR,
    "MockAnswerProvider",
    ()=>MockAnswerProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mock$2f$scripted$2d$answers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/mock/scripted-answers.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rag$2f$retriever$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/rag/retriever.ts [app-client] (ecmascript)");
;
;
const CONFIDENCE_FLOOR = 0.34;
const PERMISSION_MARKERS = [
    "est autorise",
    "sont autorises",
    "concede au",
    "peut realiser",
    "le client peut",
    "beneficie"
];
const RESTRICTION_MARKERS = [
    "interdit",
    "interdiction",
    "s'interdit",
    "ne confere aucun",
    "ne s'etend pas"
];
const REVIEW_MARKERS = [
    "accord ecrit prealable",
    "autorisation ecrite prealable",
    "cas par cas",
    "sous reserve",
    "requiert la signature",
    "soumis a"
];
function classify(text) {
    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rag$2f$retriever$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalize"])(text);
    const restriction = RESTRICTION_MARKERS.some((marker)=>value.includes(marker));
    const permission = PERMISSION_MARKERS.some((marker)=>value.includes(marker));
    const review = REVIEW_MARKERS.some((marker)=>value.includes(marker));
    if (restriction && !permission) return "restriction";
    if (permission && review) return "review";
    if (permission) return "permission";
    if (review) return "review";
    if (restriction) return "restriction";
    return "review";
}
/** Première phrase du passage, tronquée proprement. */ function leadSentence(text, max = 240) {
    const flat = text.replace(/\s+/g, " ").trim();
    const end = flat.search(/\.\s|\.$/);
    const sentence = end > 40 ? flat.slice(0, end + 1) : flat;
    return sentence.length > max ? `${sentence.slice(0, max).trimEnd()}…` : sentence;
}
function matchScripted(question) {
    const tokens = new Set((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rag$2f$retriever$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tokenize"])(question));
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mock$2f$scripted$2d$answers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SCRIPTED_ANSWERS"].find((entry)=>entry.all.every((group)=>group.some((term)=>tokens.has(term))));
}
class MockAnswerProvider {
    name = "mock";
    async synthesize({ question, retrieved }) {
        const scripted = matchScripted(question);
        if (scripted) return structuredClone(scripted.draft);
        const best = retrieved[0];
        if (!best || best.coverage < CONFIDENCE_FLOOR) {
            return {
                status: "insufficient",
                summary: "Information insuffisante. Aucun passage du dossier ne traite cette question de manière suffisamment directe pour fonder une réponse. Importez le contrat concerné ou reformulez la question en nommant le produit ou le type d'usage visé.",
                caveats: [
                    "DataRight ne répond jamais sans citation : en l'absence de passage pertinent, aucune conclusion n'est produite."
                ],
                citations: retrieved.slice(0, 2).map((entry)=>({
                        documentId: entry.chunk.documentId,
                        page: entry.chunk.page,
                        excerpt: entry.chunk.text,
                        role: "contexte",
                        score: entry.score
                    }))
            };
        }
        const status = classify(best.chunk.text);
        const article = best.chunk.article ? ` (art. ${best.chunk.article})` : "";
        const opening = status === "permission" ? "Usage couvert par une clause explicite" : status === "restriction" ? "Restriction explicite dans le dossier" : "Clause conditionnelle : validation juridique requise";
        return {
            status,
            summary: `${opening} — ${best.chunk.documentTitle}, page ${best.chunk.page}${article} : ${leadSentence(best.chunk.text)}`,
            caveats: status === "review" ? [
                "Le passage retenu subordonne l'usage à une condition ou à un accord : faire valider par la direction juridique."
            ] : [],
            citations: retrieved.slice(0, 3).map((entry, index)=>({
                    documentId: entry.chunk.documentId,
                    page: entry.chunk.page,
                    excerpt: entry.chunk.text,
                    role: index === 0 ? "principale" : "contexte",
                    score: entry.score
                }))
        };
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/rag/retriever.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "expandQuery",
    ()=>expandQuery,
    "normalize",
    ()=>normalize,
    "retrieve",
    ()=>retrieve,
    "tokenize",
    ()=>tokenize
]);
/**
 * Retrieval lexical (BM25 simplifié) adapté au vocabulaire juridique.
 *
 * Pas d'embeddings ici : le moteur de démonstration doit tourner entièrement
 * hors-ligne et rester inspectable — chaque score est explicable par les termes
 * qui l'ont produit. L'interface `retrieve()` est la couche à remplacer par une
 * recherche vectorielle le jour où un index distant est branché.
 *
 * Le dossier de démonstration est rédigé en anglais et les questions se posent
 * en français : les familles de termes portent donc les deux langues. Elles
 * n'interviennent que dans le **classement**. La couverture
 * (`ScoredChunk.coverage`), elle, ne compte que les termes littéralement
 * retrouvés — c'est ce qui permet au moteur de reconnaître qu'un dossier est
 * muet sur une question, et cette mesure ne doit pas être assouplie.
 */ const STOPWORDS = new Set([
    "les",
    "des",
    "une",
    "aux",
    "pour",
    "par",
    "que",
    "qui",
    "dans",
    "sur",
    "est",
    "son",
    "ses",
    "nos",
    "notre",
    "avec",
    "sans",
    "sous",
    "cette",
    "cet",
    "ces",
    "ont",
    "avons",
    "peut",
    "peuvent",
    "pouvons",
    "doit",
    "doivent",
    "etre",
    "avoir",
    "fait",
    "faire",
    "plus",
    "tout",
    "tous",
    "toute",
    "toutes",
    "leur",
    "leurs",
    "elle",
    "nous",
    "vous",
    "ils",
    "elles",
    "quel",
    "quelle",
    "quelles",
    "quels",
    "combien",
    "comment",
    "pourquoi",
    "est-ce",
    "duree",
    // Anglais : mots-outils et auxiliaires omniprésents dans les contrats.
    "the",
    "and",
    "for",
    "with",
    "not",
    "any",
    "are",
    "was",
    "were",
    "shall",
    "may",
    "must",
    "will",
    "would",
    "should",
    "could",
    "can",
    "this",
    "that",
    "these",
    "those",
    "from",
    "has",
    "have",
    "been",
    "its",
    "their",
    "which",
    "what",
    "when",
    "where",
    "who",
    "whom",
    "such",
    "than",
    "then",
    "there",
    "here",
    "into",
    "out",
    "per",
    "each",
    "both",
    "all",
    "other",
    "only",
    "also",
    "more",
    "most",
    "does",
    "did",
    "upon",
    "under",
    "unless",
    "within",
    "after",
    "before",
    "during",
    "between"
]);
/** Familles de termes : une question et une clause parlent rarement la même langue. */ const SYNONYM_GROUPS = [
    [
        "commercial",
        "commerciale",
        "commercially",
        "commercialisation",
        "exploitation",
        "exploiter",
        "hebergee",
        "heberge",
        "hosted",
        "saas",
        "monetisable",
        "production"
    ],
    [
        "droit",
        "droits",
        "autorise",
        "autorisation",
        "autorises",
        "authorise",
        "authorised",
        "permission",
        "permis",
        "permitted",
        "concede",
        "grant",
        "grants",
        "granted",
        "licence",
        "license",
        "right",
        "rights"
    ],
    [
        "interdit",
        "interdiction",
        "interdire",
        "restriction",
        "restrictions",
        "restreint",
        "restrict",
        "restricted",
        "exclu",
        "exclut",
        "excludes",
        "excluded",
        "prohibe",
        "prohibited"
    ],
    [
        "redistribuer",
        "redistribution",
        "distribuer",
        "distribution",
        "distribute",
        "revendre",
        "revente",
        "resell",
        "sous",
        "licencier",
        "sublicense",
        "ceder",
        "assign",
        "partager",
        "provide"
    ],
    [
        "cache",
        "mise",
        "conservation",
        "conserver",
        "retain",
        "retention",
        "stocker",
        "stockage",
        "supprimer",
        "delete",
        "archive",
        "jours",
        "days",
        "calendaires",
        "calendar"
    ],
    [
        "marque",
        "marques",
        "logo",
        "logos",
        "trademark",
        "marketing",
        "communication",
        "commerciaux",
        "nom"
    ],
    [
        "ia",
        "modele",
        "model",
        "apprentissage",
        "entrainer",
        "entrainement",
        "train",
        "training",
        "tune",
        "weights",
        "automatique",
        "derive",
        "derives",
        "derived"
    ],
    [
        "client",
        "clients",
        "customer",
        "customers",
        "tiers",
        "third",
        "party",
        "parties",
        "prestataire",
        "utilisateur",
        "utilisateurs",
        "users"
    ],
    [
        "composant",
        "composants",
        "component",
        "bibliotheque",
        "library",
        "module",
        "sdk",
        "logiciel",
        "software",
        "service",
        "api"
    ],
    [
        "donnees",
        "data",
        "dataset",
        "corpus",
        "licensed",
        "jeux",
        "cartographiques"
    ],
    [
        "filiale",
        "filiales",
        "affiliate",
        "affiliates",
        "entite",
        "entity",
        "parent",
        "subsidiaries",
        "perimetre",
        "scope"
    ],
    [
        "rapport",
        "reporting",
        "report",
        "synthese",
        "summary",
        "notifier",
        "notify",
        "notification",
        "notice",
        "trimestriel",
        "trimestre",
        "quarter",
        "quarterly",
        "annuel",
        "annual"
    ],
    [
        "renouvelle",
        "renouvellement",
        "reconduction",
        "renew",
        "renews",
        "renewal",
        "resiliation",
        "resilier",
        "terminate",
        "termination",
        "term",
        "preavis",
        "echeance",
        "expiry"
    ],
    [
        "plafond",
        "limite",
        "limit",
        "volume",
        "million",
        "documents",
        "pages",
        "usage",
        "excess",
        "depassement"
    ]
];
/** Marques diacritiques combinantes, retirées après décomposition NFD. */ const DIACRITICS = /[̀-ͯ]/g;
function normalize(value) {
    return value.normalize("NFD").replace(DIACRITICS, "").toLowerCase();
}
function tokenize(value) {
    return normalize(value).split(/[^a-z0-9]+/).filter((token)=>token.length > 2 && !STOPWORDS.has(token));
}
function expandQuery(tokens) {
    const weights = new Map();
    for (const token of tokens)weights.set(token, 1);
    for (const group of SYNONYM_GROUPS){
        if (!tokens.some((token)=>group.includes(token))) continue;
        for (const related of group){
            if (!weights.has(related)) weights.set(related, 0.45);
        }
    }
    return weights;
}
const K1 = 1.4;
const B = 0.72;
function retrieve(question, chunks, limit = 6) {
    if (chunks.length === 0) return [];
    const queryTokens = tokenize(question);
    if (queryTokens.length === 0) return [];
    const coreTokens = new Set(queryTokens);
    const weights = expandQuery(queryTokens);
    const docTokens = chunks.map((chunk)=>tokenize(chunk.text));
    const avgLength = docTokens.reduce((sum, tokens)=>sum + tokens.length, 0) / chunks.length;
    const documentFrequency = new Map();
    for (const tokens of docTokens){
        for (const token of new Set(tokens)){
            documentFrequency.set(token, (documentFrequency.get(token) ?? 0) + 1);
        }
    }
    const scored = chunks.map((chunk, index)=>{
        const tokens = docTokens[index];
        const frequencies = new Map();
        for (const token of tokens){
            frequencies.set(token, (frequencies.get(token) ?? 0) + 1);
        }
        let score = 0;
        const matched = [];
        for (const [term, weight] of weights){
            const tf = frequencies.get(term);
            if (!tf) continue;
            const df = documentFrequency.get(term) ?? 0;
            const idf = Math.log(1 + (chunks.length - df + 0.5) / (df + 0.5));
            const saturation = tf * (K1 + 1) / (tf + K1 * (1 - B + B * tokens.length / (avgLength || 1)));
            score += weight * idf * saturation;
            if (weight === 1) matched.push(term);
        }
        // Bonus de proximité : la question reprise presque littéralement compte double.
        const normalizedChunk = normalize(chunk.text);
        const bigrams = queryTokens.slice(0, -1).map((token, i)=>`${token} ${queryTokens[i + 1]}`);
        for (const bigram of bigrams){
            if (normalizedChunk.includes(bigram)) score += 1.2;
        }
        return {
            chunk,
            score,
            coverage: coreTokens.size > 0 ? matched.length / coreTokens.size : 0,
            matchedTerms: matched
        };
    });
    const best = Math.max(...scored.map((entry)=>entry.score), 0);
    if (best <= 0) return [];
    return scored.map((entry)=>({
            ...entry,
            score: entry.score / best
        })).filter((entry)=>entry.score > 0.12).sort((a, b)=>b.score - a.score).slice(0, limit);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/store.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StoreProvider",
    ()=>StoreProvider,
    "useStore",
    ()=>useStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$finance$2f$dataset$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/finance/dataset.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mock$2f$clauses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/mock/clauses.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mock$2f$corpus$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/mock/corpus.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rag$2f$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/rag/engine.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
// v3 : cartographie issue des packs ZIP de /data et date de référence.
const STORAGE_KEY = "dataright.state.v3";
const StoreContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
function initialState() {
    return {
        documents: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mock$2f$corpus$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MOCK_DOCUMENTS"],
        clauses: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mock$2f$clauses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MOCK_CLAUSES"],
        links: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mock$2f$clauses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MOCK_ADDENDUM_LINKS"],
        messages: [],
        financials: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$finance$2f$dataset$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEMO_FINANCIAL_GRAPH"],
        financialIssues: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$finance$2f$dataset$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FINANCE_DATASET"].issues,
        referenceDate: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$finance$2f$dataset$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FINANCE_DATASET"].asOfDate
    };
}
function StoreProvider({ children }) {
    _s();
    const [state, setState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialState);
    const [hydrated, setHydrated] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [viewerTarget, setViewerTarget] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [pending, setPending] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const saveTimer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "StoreProvider.useEffect": ()=>{
            try {
                const raw = window.localStorage.getItem(STORAGE_KEY);
                if (raw) {
                    const parsed = JSON.parse(raw);
                    // Un état plus ancien peut ne pas porter la cartographie : on complète
                    // plutôt que d'écarter toute la session.
                    if (!parsed.financials) parsed.financials = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$finance$2f$dataset$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEMO_FINANCIAL_GRAPH"];
                    if (!parsed.financialIssues) parsed.financialIssues = [];
                    if (!parsed.referenceDate) parsed.referenceDate = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$finance$2f$dataset$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FINANCE_DATASET"].asOfDate;
                    if (Array.isArray(parsed.documents) && parsed.documents.length > 0) {
                        // Hydratation depuis localStorage : la source n'existe pas au rendu
                        // serveur, la reprise ne peut donc avoir lieu qu'après le montage, une
                        // seule fois — le rendu en cascade est ici voulu et borné.
                        // eslint-disable-next-line react-hooks/set-state-in-effect
                        setState(parsed);
                    }
                }
            } catch  {
            // Stockage indisponible (navigation privée) : on reste sur le jeu de démo.
            }
            setHydrated(true);
        }
    }["StoreProvider.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "StoreProvider.useEffect": ()=>{
            if (!hydrated) return;
            if (saveTimer.current) clearTimeout(saveTimer.current);
            saveTimer.current = setTimeout({
                "StoreProvider.useEffect": ()=>{
                    try {
                        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
                    } catch  {
                    // Quota dépassé : la session reste fonctionnelle, sans persistance.
                    }
                }
            }["StoreProvider.useEffect"], 400);
            return ({
                "StoreProvider.useEffect": ()=>{
                    if (saveTimer.current) clearTimeout(saveTimer.current);
                }
            })["StoreProvider.useEffect"];
        }
    }["StoreProvider.useEffect"], [
        state,
        hydrated
    ]);
    const openInViewer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[openInViewer]": (target)=>{
            setViewerTarget(target);
        }
    }["StoreProvider.useCallback[openInViewer]"], []);
    const askQuestion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[askQuestion]": async (question)=>{
            const trimmed = question.trim();
            if (trimmed.length === 0 || pending) return;
            const userMessage = {
                id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createId"])("msg"),
                role: "user",
                content: trimmed,
                createdAt: new Date().toISOString()
            };
            const placeholder = {
                id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createId"])("msg"),
                role: "assistant",
                content: "",
                createdAt: new Date().toISOString(),
                pending: true
            };
            setState({
                "StoreProvider.useCallback[askQuestion]": (current)=>({
                        ...current,
                        messages: [
                            ...current.messages,
                            userMessage,
                            placeholder
                        ]
                    })
            }["StoreProvider.useCallback[askQuestion]"]);
            setPending(true);
            const snapshot = state;
            // Latence simulée pour que l'état de chargement reste perceptible.
            await new Promise({
                "StoreProvider.useCallback[askQuestion]": (resolve)=>setTimeout(resolve, 420)
            }["StoreProvider.useCallback[askQuestion]"]);
            const answer = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rag$2f$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ask"])({
                question: trimmed,
                documents: snapshot.documents,
                clauses: snapshot.clauses,
                links: snapshot.links
            });
            setState({
                "StoreProvider.useCallback[askQuestion]": (current)=>({
                        ...current,
                        messages: current.messages.map({
                            "StoreProvider.useCallback[askQuestion]": (message)=>message.id === placeholder.id ? {
                                    ...message,
                                    pending: false,
                                    content: answer.summary,
                                    answer
                                } : message
                        }["StoreProvider.useCallback[askQuestion]"])
                    })
            }["StoreProvider.useCallback[askQuestion]"]);
            setPending(false);
            const first = answer.citations[0];
            if (first) {
                setViewerTarget({
                    documentId: first.documentId,
                    page: first.page,
                    highlight: first.excerpt
                });
            }
        }
    }["StoreProvider.useCallback[askQuestion]"], [
        pending,
        state
    ]);
    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "StoreProvider.useMemo[value]": ()=>({
                ...state,
                hydrated,
                viewerTarget,
                openInViewer,
                pending,
                askQuestion,
                addDocument: ({
                    "StoreProvider.useMemo[value]": ({ document, clauses, links })=>setState({
                            "StoreProvider.useMemo[value]": (current)=>({
                                    ...current,
                                    documents: [
                                        document,
                                        ...current.documents
                                    ],
                                    clauses: [
                                        ...clauses,
                                        ...current.clauses
                                    ],
                                    links: [
                                        ...links,
                                        ...current.links
                                    ]
                                })
                        }["StoreProvider.useMemo[value]"])
                })["StoreProvider.useMemo[value]"],
                removeDocument: ({
                    "StoreProvider.useMemo[value]": (documentId)=>setState({
                            "StoreProvider.useMemo[value]": (current)=>({
                                    ...current,
                                    documents: current.documents.filter({
                                        "StoreProvider.useMemo[value]": (doc)=>doc.id !== documentId
                                    }["StoreProvider.useMemo[value]"]),
                                    clauses: current.clauses.filter({
                                        "StoreProvider.useMemo[value]": (clause)=>clause.documentId !== documentId
                                    }["StoreProvider.useMemo[value]"]),
                                    links: current.links.filter({
                                        "StoreProvider.useMemo[value]": (link)=>link.addendumDocumentId !== documentId && link.originDocumentId !== documentId
                                    }["StoreProvider.useMemo[value]"])
                                })
                        }["StoreProvider.useMemo[value]"])
                })["StoreProvider.useMemo[value]"],
                updateDocument: ({
                    "StoreProvider.useMemo[value]": (documentId, patch)=>setState({
                            "StoreProvider.useMemo[value]": (current)=>({
                                    ...current,
                                    documents: current.documents.map({
                                        "StoreProvider.useMemo[value]": (doc)=>doc.id === documentId ? {
                                                ...doc,
                                                ...patch
                                            } : doc
                                    }["StoreProvider.useMemo[value]"])
                                })
                        }["StoreProvider.useMemo[value]"])
                })["StoreProvider.useMemo[value]"],
                updateClause: ({
                    "StoreProvider.useMemo[value]": (clauseId, patch)=>setState({
                            "StoreProvider.useMemo[value]": (current)=>({
                                    ...current,
                                    clauses: current.clauses.map({
                                        "StoreProvider.useMemo[value]": (clause)=>clause.id === clauseId ? {
                                                ...clause,
                                                ...patch,
                                                edited: true
                                            } : clause
                                    }["StoreProvider.useMemo[value]"])
                                })
                        }["StoreProvider.useMemo[value]"])
                })["StoreProvider.useMemo[value]"],
                deleteClause: ({
                    "StoreProvider.useMemo[value]": (clauseId)=>setState({
                            "StoreProvider.useMemo[value]": (current)=>({
                                    ...current,
                                    clauses: current.clauses.filter({
                                        "StoreProvider.useMemo[value]": (clause)=>clause.id !== clauseId
                                    }["StoreProvider.useMemo[value]"]),
                                    links: current.links.filter({
                                        "StoreProvider.useMemo[value]": (link)=>link.addendumClauseId !== clauseId && link.originClauseId !== clauseId
                                    }["StoreProvider.useMemo[value]"])
                                })
                        }["StoreProvider.useMemo[value]"])
                })["StoreProvider.useMemo[value]"],
                setLinkStatus: ({
                    "StoreProvider.useMemo[value]": (linkId, status)=>setState({
                            "StoreProvider.useMemo[value]": (current)=>({
                                    ...current,
                                    links: current.links.map({
                                        "StoreProvider.useMemo[value]": (link)=>link.id === linkId ? {
                                                ...link,
                                                status
                                            } : link
                                    }["StoreProvider.useMemo[value]"]),
                                    clauses: current.clauses.map({
                                        "StoreProvider.useMemo[value]": (clause)=>{
                                            const link = current.links.find({
                                                "StoreProvider.useMemo[value].link": (entry)=>entry.id === linkId
                                            }["StoreProvider.useMemo[value].link"]);
                                            if (!link || clause.id !== link.originClauseId) return clause;
                                            return {
                                                ...clause,
                                                supersededBy: status === "confirmed" ? link.addendumClauseId : undefined
                                            };
                                        }
                                    }["StoreProvider.useMemo[value]"])
                                })
                        }["StoreProvider.useMemo[value]"])
                })["StoreProvider.useMemo[value]"],
                replaceFinancials: ({
                    "StoreProvider.useMemo[value]": (graph, issues)=>setState({
                            "StoreProvider.useMemo[value]": (current)=>({
                                    ...current,
                                    financials: graph,
                                    financialIssues: issues
                                })
                        }["StoreProvider.useMemo[value]"])
                })["StoreProvider.useMemo[value]"],
                resetFinancials: ({
                    "StoreProvider.useMemo[value]": ()=>setState({
                            "StoreProvider.useMemo[value]": (current)=>({
                                    ...current,
                                    financials: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$finance$2f$dataset$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEMO_FINANCIAL_GRAPH"],
                                    financialIssues: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$finance$2f$dataset$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FINANCE_DATASET"].issues
                                })
                        }["StoreProvider.useMemo[value]"])
                })["StoreProvider.useMemo[value]"],
                setReferenceDate: ({
                    "StoreProvider.useMemo[value]": (date)=>setState({
                            "StoreProvider.useMemo[value]": (current)=>({
                                    ...current,
                                    referenceDate: date
                                })
                        }["StoreProvider.useMemo[value]"])
                })["StoreProvider.useMemo[value]"],
                clearConversation: ({
                    "StoreProvider.useMemo[value]": ()=>setState({
                            "StoreProvider.useMemo[value]": (current)=>({
                                    ...current,
                                    messages: []
                                })
                        }["StoreProvider.useMemo[value]"])
                })["StoreProvider.useMemo[value]"],
                resetDemo: ({
                    "StoreProvider.useMemo[value]": ()=>{
                        setState(initialState());
                        setViewerTarget(null);
                    }
                })["StoreProvider.useMemo[value]"]
            })
    }["StoreProvider.useMemo[value]"], [
        state,
        hydrated,
        viewerTarget,
        openInViewer,
        pending,
        askQuestion
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StoreContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/lib/store.tsx",
        lineNumber: 276,
        columnNumber: 10
    }, this);
}
_s(StoreProvider, "pFhT6IJN1dKByZ1sYeFDZvIKhyE=");
_c = StoreProvider;
function useStore() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(StoreContext);
    if (!context) throw new Error("useStore doit être utilisé dans <StoreProvider>");
    return context;
}
_s1(useStore, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "StoreProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn,
    "createId",
    ()=>createId,
    "formatBytes",
    ()=>formatBytes,
    "formatDate",
    ()=>formatDate,
    "formatDateTime",
    ()=>formatDateTime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
function formatDate(iso) {
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return iso;
    return new Intl.DateTimeFormat("fr-FR", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    }).format(date);
}
function formatDateTime(iso) {
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return iso;
    return new Intl.DateTimeFormat("fr-FR", {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit"
    }).format(date);
}
function formatBytes(bytes) {
    if (!bytes) return "—";
    const units = [
        "o",
        "Ko",
        "Mo"
    ];
    let value = bytes;
    let unit = 0;
    while(value >= 1024 && unit < units.length - 1){
        value /= 1024;
        unit += 1;
    }
    return `${value.toFixed(value >= 10 || unit === 0 ? 0 : 1)} ${units[unit]}`;
}
function createId(prefix) {
    return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_1b2jyl1._.js.map