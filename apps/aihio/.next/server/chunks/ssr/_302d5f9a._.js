module.exports = {

"[project]/apps/aihio/node_modules/next/dist/client/app-dir/link.js (client reference/proxy) <module evaluation>": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const { createClientModuleProxy } = __turbopack_context__.r("[project]/apps/aihio/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server-edge.js [app-rsc] (ecmascript)");
__turbopack_context__.n(createClientModuleProxy("[project]/apps/aihio/node_modules/next/dist/client/app-dir/link.js <module evaluation>"));
}}),
"[project]/apps/aihio/node_modules/next/dist/client/app-dir/link.js (client reference/proxy)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const { createClientModuleProxy } = __turbopack_context__.r("[project]/apps/aihio/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server-edge.js [app-rsc] (ecmascript)");
__turbopack_context__.n(createClientModuleProxy("[project]/apps/aihio/node_modules/next/dist/client/app-dir/link.js"));
}}),
"[project]/apps/aihio/node_modules/next/dist/client/app-dir/link.js [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$28$client__reference$2f$proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/apps/aihio/node_modules/next/dist/client/app-dir/link.js (client reference/proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$28$client__reference$2f$proxy$29$__ = __turbopack_context__.i("[project]/apps/aihio/node_modules/next/dist/client/app-dir/link.js (client reference/proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$28$client__reference$2f$proxy$29$__);
}}),
"[project]/apps/aihio/node_modules/lucide-react/dist/esm/shared/src/utils.js [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s({
    "hasA11yProp": (()=>hasA11yProp),
    "mergeClasses": (()=>mergeClasses),
    "toCamelCase": (()=>toCamelCase),
    "toKebabCase": (()=>toKebabCase),
    "toPascalCase": (()=>toPascalCase)
});
const toKebabCase = (string)=>string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const toCamelCase = (string)=>string.replace(/^([A-Z])|[\s-_]+(\w)/g, (match, p1, p2)=>p2 ? p2.toUpperCase() : p1.toLowerCase());
const toPascalCase = (string)=>{
    const camelCase = toCamelCase(string);
    return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};
const mergeClasses = (...classes)=>classes.filter((className, index, array)=>{
        return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
    }).join(" ").trim();
const hasA11yProp = (props)=>{
    for(const prop in props){
        if (prop.startsWith("aria-") || prop === "role" || prop === "title") {
            return true;
        }
    }
};
;
 //# sourceMappingURL=utils.js.map
}}),
"[project]/apps/aihio/node_modules/lucide-react/dist/esm/defaultAttributes.js [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s({
    "default": (()=>defaultAttributes)
});
var defaultAttributes = {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round"
};
;
 //# sourceMappingURL=defaultAttributes.js.map
}}),
"[project]/apps/aihio/node_modules/lucide-react/dist/esm/Icon.js [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s({
    "default": (()=>Icon)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/aihio/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$defaultAttributes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/aihio/node_modules/lucide-react/dist/esm/defaultAttributes.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/aihio/node_modules/lucide-react/dist/esm/shared/src/utils.js [app-rsc] (ecmascript)");
;
;
;
const Icon = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["forwardRef"])(({ color = "currentColor", size = 24, strokeWidth = 2, absoluteStrokeWidth, className = "", children, iconNode, ...rest }, ref)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createElement"])("svg", {
        ref,
        ...__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$defaultAttributes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"],
        width: size,
        height: size,
        stroke: color,
        strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["mergeClasses"])("lucide", className),
        ...!children && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["hasA11yProp"])(rest) && {
            "aria-hidden": "true"
        },
        ...rest
    }, [
        ...iconNode.map(([tag, attrs])=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createElement"])(tag, attrs)),
        ...Array.isArray(children) ? children : [
            children
        ]
    ]);
});
;
 //# sourceMappingURL=Icon.js.map
}}),
"[project]/apps/aihio/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s({
    "default": (()=>createLucideIcon)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/aihio/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/aihio/node_modules/lucide-react/dist/esm/shared/src/utils.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$Icon$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/aihio/node_modules/lucide-react/dist/esm/Icon.js [app-rsc] (ecmascript)");
;
;
;
const createLucideIcon = (iconName, iconNode)=>{
    const Component = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["forwardRef"])(({ className, ...props }, ref)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createElement"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$Icon$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
            ref,
            iconNode,
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["mergeClasses"])(`lucide-${(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toKebabCase"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPascalCase"])(iconName))}`, `lucide-${iconName}`, className),
            ...props
        }));
    Component.displayName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPascalCase"])(iconName);
    return Component;
};
;
 //# sourceMappingURL=createLucideIcon.js.map
}}),
"[project]/apps/aihio/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s({
    "__iconNode": (()=>__iconNode),
    "default": (()=>ArrowLeft)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/aihio/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-rsc] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "m12 19-7-7 7-7",
            key: "1l729n"
        }
    ],
    [
        "path",
        {
            d: "M19 12H5",
            key: "x3x0zl"
        }
    ]
];
const ArrowLeft = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])("arrow-left", __iconNode);
;
 //# sourceMappingURL=arrow-left.js.map
}}),
"[project]/apps/aihio/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-rsc] (ecmascript) <export default as ArrowLeft>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "ArrowLeft": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])
});
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/aihio/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-rsc] (ecmascript)");
}}),
"[project]/node_modules/@radix-ui/react-compose-refs/dist/index.mjs [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// packages/react/compose-refs/src/compose-refs.tsx
__turbopack_context__.s({
    "composeRefs": (()=>composeRefs),
    "useComposedRefs": (()=>useComposedRefs)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/aihio/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
;
function setRef(ref, value) {
    if (typeof ref === "function") {
        return ref(value);
    } else if (ref !== null && ref !== void 0) {
        ref.current = value;
    }
}
function composeRefs(...refs) {
    return (node)=>{
        let hasCleanup = false;
        const cleanups = refs.map((ref)=>{
            const cleanup = setRef(ref, node);
            if (!hasCleanup && typeof cleanup == "function") {
                hasCleanup = true;
            }
            return cleanup;
        });
        if (hasCleanup) {
            return ()=>{
                for(let i = 0; i < cleanups.length; i++){
                    const cleanup = cleanups[i];
                    if (typeof cleanup == "function") {
                        cleanup();
                    } else {
                        setRef(refs[i], null);
                    }
                }
            };
        }
    };
}
function useComposedRefs(...refs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useCallback"])(composeRefs(...refs), refs);
}
;
 //# sourceMappingURL=index.mjs.map
}}),
"[project]/node_modules/@radix-ui/react-slot/dist/index.mjs [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// packages/react/slot/src/slot.tsx
__turbopack_context__.s({
    "Root": (()=>Slot),
    "Slot": (()=>Slot),
    "Slottable": (()=>Slottable),
    "createSlot": (()=>createSlot),
    "createSlottable": (()=>createSlottable)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/aihio/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$compose$2d$refs$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-compose-refs/dist/index.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/aihio/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-runtime.js [app-rsc] (ecmascript)");
;
;
;
// @__NO_SIDE_EFFECTS__
function createSlot(ownerName) {
    const SlotClone = /* @__PURE__ */ createSlotClone(ownerName);
    const Slot2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["forwardRef"])((props, forwardedRef)=>{
        const { children, ...slotProps } = props;
        const childrenArray = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Children"].toArray(children);
        const slottable = childrenArray.find(isSlottable);
        if (slottable) {
            const newElement = slottable.props.children;
            const newChildren = childrenArray.map((child)=>{
                if (child === slottable) {
                    if (__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Children"].count(newElement) > 1) return __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Children"].only(null);
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isValidElement"])(newElement) ? newElement.props.children : null;
                } else {
                    return child;
                }
            });
            return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(SlotClone, {
                ...slotProps,
                ref: forwardedRef,
                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isValidElement"])(newElement) ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cloneElement"])(newElement, void 0, newChildren) : null
            });
        }
        return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(SlotClone, {
            ...slotProps,
            ref: forwardedRef,
            children
        });
    });
    Slot2.displayName = `${ownerName}.Slot`;
    return Slot2;
}
var Slot = /* @__PURE__ */ createSlot("Slot");
// @__NO_SIDE_EFFECTS__
function createSlotClone(ownerName) {
    const SlotClone = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["forwardRef"])((props, forwardedRef)=>{
        const { children, ...slotProps } = props;
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isValidElement"])(children)) {
            const childrenRef = getElementRef(children);
            const props2 = mergeProps(slotProps, children.props);
            if (children.type !== __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Fragment"]) {
                props2.ref = forwardedRef ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$compose$2d$refs$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["composeRefs"])(forwardedRef, childrenRef) : childrenRef;
            }
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cloneElement"])(children, props2);
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Children"].count(children) > 1 ? __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Children"].only(null) : null;
    });
    SlotClone.displayName = `${ownerName}.SlotClone`;
    return SlotClone;
}
var SLOTTABLE_IDENTIFIER = Symbol("radix.slottable");
// @__NO_SIDE_EFFECTS__
function createSlottable(ownerName) {
    const Slottable2 = ({ children })=>{
        return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Fragment"], {
            children
        });
    };
    Slottable2.displayName = `${ownerName}.Slottable`;
    Slottable2.__radixId = SLOTTABLE_IDENTIFIER;
    return Slottable2;
}
var Slottable = /* @__PURE__ */ createSlottable("Slottable");
function isSlottable(child) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isValidElement"])(child) && typeof child.type === "function" && "__radixId" in child.type && child.type.__radixId === SLOTTABLE_IDENTIFIER;
}
function mergeProps(slotProps, childProps) {
    const overrideProps = {
        ...childProps
    };
    for(const propName in childProps){
        const slotPropValue = slotProps[propName];
        const childPropValue = childProps[propName];
        const isHandler = /^on[A-Z]/.test(propName);
        if (isHandler) {
            if (slotPropValue && childPropValue) {
                overrideProps[propName] = (...args)=>{
                    childPropValue(...args);
                    slotPropValue(...args);
                };
            } else if (slotPropValue) {
                overrideProps[propName] = slotPropValue;
            }
        } else if (propName === "style") {
            overrideProps[propName] = {
                ...slotPropValue,
                ...childPropValue
            };
        } else if (propName === "className") {
            overrideProps[propName] = [
                slotPropValue,
                childPropValue
            ].filter(Boolean).join(" ");
        }
    }
    return {
        ...slotProps,
        ...overrideProps
    };
}
function getElementRef(element) {
    let getter = Object.getOwnPropertyDescriptor(element.props, "ref")?.get;
    let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
    if (mayWarn) {
        return element.ref;
    }
    getter = Object.getOwnPropertyDescriptor(element, "ref")?.get;
    mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
    if (mayWarn) {
        return element.props.ref;
    }
    return element.props.ref || element.ref;
}
;
 //# sourceMappingURL=index.mjs.map
}}),
"[project]/node_modules/class-variance-authority/dist/index.mjs [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/**
 * Copyright 2022 Joe Bell. All rights reserved.
 *
 * This file is licensed to you under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with the
 * License. You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR REPRESENTATIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */ __turbopack_context__.s({
    "cva": (()=>cva),
    "cx": (()=>cx)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-rsc] (ecmascript)");
;
const falsyToString = (value)=>typeof value === "boolean" ? `${value}` : value === 0 ? "0" : value;
const cx = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["clsx"];
const cva = (base, config)=>(props)=>{
        var _config_compoundVariants;
        if ((config === null || config === void 0 ? void 0 : config.variants) == null) return cx(base, props === null || props === void 0 ? void 0 : props.class, props === null || props === void 0 ? void 0 : props.className);
        const { variants, defaultVariants } = config;
        const getVariantClassNames = Object.keys(variants).map((variant)=>{
            const variantProp = props === null || props === void 0 ? void 0 : props[variant];
            const defaultVariantProp = defaultVariants === null || defaultVariants === void 0 ? void 0 : defaultVariants[variant];
            if (variantProp === null) return null;
            const variantKey = falsyToString(variantProp) || falsyToString(defaultVariantProp);
            return variants[variant][variantKey];
        });
        const propsWithoutUndefined = props && Object.entries(props).reduce((acc, param)=>{
            let [key, value] = param;
            if (value === undefined) {
                return acc;
            }
            acc[key] = value;
            return acc;
        }, {});
        const getCompoundVariantClassNames = config === null || config === void 0 ? void 0 : (_config_compoundVariants = config.compoundVariants) === null || _config_compoundVariants === void 0 ? void 0 : _config_compoundVariants.reduce((acc, param)=>{
            let { class: cvClass, className: cvClassName, ...compoundVariantOptions } = param;
            return Object.entries(compoundVariantOptions).every((param)=>{
                let [key, value] = param;
                return Array.isArray(value) ? value.includes({
                    ...defaultVariants,
                    ...propsWithoutUndefined
                }[key]) : ({
                    ...defaultVariants,
                    ...propsWithoutUndefined
                })[key] === value;
            }) ? [
                ...acc,
                cvClass,
                cvClassName
            ] : acc;
        }, []);
        return cx(base, getVariantClassNames, getCompoundVariantClassNames, props === null || props === void 0 ? void 0 : props.class, props === null || props === void 0 ? void 0 : props.className);
    };
}}),
"[project]/node_modules/void-elements/index.js [app-rsc] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
/**
 * This file automatically generated from `pre-publish.js`.
 * Do not manually edit.
 */ module.exports = {
    "area": true,
    "base": true,
    "br": true,
    "col": true,
    "embed": true,
    "hr": true,
    "img": true,
    "input": true,
    "link": true,
    "meta": true,
    "param": true,
    "source": true,
    "track": true,
    "wbr": true
};
}}),
"[project]/node_modules/html-parse-stringify/dist/html-parse-stringify.module.js [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$void$2d$elements$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/void-elements/index.js [app-rsc] (ecmascript)");
;
var t = /\s([^'"/\s><]+?)[\s/>]|([^\s=]+)=\s?(".*?"|'.*?')/g;
function n(n) {
    var r = {
        type: "tag",
        name: "",
        voidElement: !1,
        attrs: {},
        children: []
    }, i = n.match(/<\/?([^\s]+?)[/\s>]/);
    if (i && (r.name = i[1], (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$void$2d$elements$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"][i[1]] || "/" === n.charAt(n.length - 2)) && (r.voidElement = !0), r.name.startsWith("!--"))) {
        var s = n.indexOf("--\x3e");
        return {
            type: "comment",
            comment: -1 !== s ? n.slice(4, s) : ""
        };
    }
    for(var a = new RegExp(t), c = null; null !== (c = a.exec(n));)if (c[0].trim()) if (c[1]) {
        var o = c[1].trim(), l = [
            o,
            ""
        ];
        o.indexOf("=") > -1 && (l = o.split("=")), r.attrs[l[0]] = l[1], a.lastIndex--;
    } else c[2] && (r.attrs[c[2]] = c[3].trim().substring(1, c[3].length - 1));
    return r;
}
var r = /<[a-zA-Z0-9\-\!\/](?:"[^"]*"|'[^']*'|[^'">])*>/g, i = /^\s*$/, s = Object.create(null);
function a(e, t) {
    switch(t.type){
        case "text":
            return e + t.content;
        case "tag":
            return e += "<" + t.name + (t.attrs ? function(e) {
                var t = [];
                for(var n in e)t.push(n + '="' + e[n] + '"');
                return t.length ? " " + t.join(" ") : "";
            }(t.attrs) : "") + (t.voidElement ? "/>" : ">"), t.voidElement ? e : e + t.children.reduce(a, "") + "</" + t.name + ">";
        case "comment":
            return e + "\x3c!--" + t.comment + "--\x3e";
    }
}
var c = {
    parse: function(e, t) {
        t || (t = {}), t.components || (t.components = s);
        var a, c = [], o = [], l = -1, m = !1;
        if (0 !== e.indexOf("<")) {
            var u = e.indexOf("<");
            c.push({
                type: "text",
                content: -1 === u ? e : e.substring(0, u)
            });
        }
        return e.replace(r, function(r, s) {
            if (m) {
                if (r !== "</" + a.name + ">") return;
                m = !1;
            }
            var u, f = "/" !== r.charAt(1), h = r.startsWith("\x3c!--"), p = s + r.length, d = e.charAt(p);
            if (h) {
                var v = n(r);
                return l < 0 ? (c.push(v), c) : ((u = o[l]).children.push(v), c);
            }
            if (f && (l++, "tag" === (a = n(r)).type && t.components[a.name] && (a.type = "component", m = !0), a.voidElement || m || !d || "<" === d || a.children.push({
                type: "text",
                content: e.slice(p, e.indexOf("<", p))
            }), 0 === l && c.push(a), (u = o[l - 1]) && u.children.push(a), o[l] = a), (!f || a.voidElement) && (l > -1 && (a.voidElement || a.name === r.slice(2, -1)) && (l--, a = -1 === l ? c : o[l]), !m && "<" !== d && d)) {
                u = -1 === l ? c : o[l].children;
                var x = e.indexOf("<", p), g = e.slice(p, -1 === x ? void 0 : x);
                i.test(g) && (g = " "), (x > -1 && l + u.length >= 0 || " " !== g) && u.push({
                    type: "text",
                    content: g
                });
            }
        }), c;
    },
    stringify: function(e) {
        return e.reduce(function(e, t) {
            return e + a("", t);
        }, "");
    }
};
const __TURBOPACK__default__export__ = c;
 //# sourceMappingURL=html-parse-stringify.module.js.map
}}),
"[project]/node_modules/react-i18next/dist/es/utils.js [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "getDisplayName": (()=>getDisplayName),
    "hasLoadedNamespace": (()=>hasLoadedNamespace),
    "isObject": (()=>isObject),
    "isString": (()=>isString),
    "loadLanguages": (()=>loadLanguages),
    "loadNamespaces": (()=>loadNamespaces),
    "warn": (()=>warn),
    "warnOnce": (()=>warnOnce)
});
const warn = (i18n, code, msg, rest)=>{
    const args = [
        msg,
        {
            code,
            ...rest || {}
        }
    ];
    if (i18n?.services?.logger?.forward) {
        return i18n.services.logger.forward(args, 'warn', 'react-i18next::', true);
    }
    if (isString(args[0])) args[0] = `react-i18next:: ${args[0]}`;
    if (i18n?.services?.logger?.warn) {
        i18n.services.logger.warn(...args);
    } else if (console?.warn) {
        console.warn(...args);
    }
};
const alreadyWarned = {};
const warnOnce = (i18n, code, msg, rest)=>{
    if (isString(msg) && alreadyWarned[msg]) return;
    if (isString(msg)) alreadyWarned[msg] = new Date();
    warn(i18n, code, msg, rest);
};
const loadedClb = (i18n, cb)=>()=>{
        if (i18n.isInitialized) {
            cb();
        } else {
            const initialized = ()=>{
                setTimeout(()=>{
                    i18n.off('initialized', initialized);
                }, 0);
                cb();
            };
            i18n.on('initialized', initialized);
        }
    };
const loadNamespaces = (i18n, ns, cb)=>{
    i18n.loadNamespaces(ns, loadedClb(i18n, cb));
};
const loadLanguages = (i18n, lng, ns, cb)=>{
    if (isString(ns)) ns = [
        ns
    ];
    if (i18n.options.preload && i18n.options.preload.indexOf(lng) > -1) return loadNamespaces(i18n, ns, cb);
    ns.forEach((n)=>{
        if (i18n.options.ns.indexOf(n) < 0) i18n.options.ns.push(n);
    });
    i18n.loadLanguages(lng, loadedClb(i18n, cb));
};
const hasLoadedNamespace = (ns, i18n, options = {})=>{
    if (!i18n.languages || !i18n.languages.length) {
        warnOnce(i18n, 'NO_LANGUAGES', 'i18n.languages were undefined or empty', {
            languages: i18n.languages
        });
        return true;
    }
    return i18n.hasLoadedNamespace(ns, {
        lng: options.lng,
        precheck: (i18nInstance, loadNotPending)=>{
            if (options.bindI18n?.indexOf('languageChanging') > -1 && i18nInstance.services.backendConnector.backend && i18nInstance.isLanguageChangingTo && !loadNotPending(i18nInstance.isLanguageChangingTo, ns)) return false;
        }
    });
};
const getDisplayName = (Component)=>Component.displayName || Component.name || (isString(Component) && Component.length > 0 ? Component : 'Unknown');
const isString = (obj)=>typeof obj === 'string';
const isObject = (obj)=>typeof obj === 'object' && obj !== null;
}}),
"[project]/node_modules/react-i18next/dist/es/TransWithoutContext.js [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "Trans": (()=>Trans),
    "nodesToString": (()=>nodesToString)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/aihio/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$html$2d$parse$2d$stringify$2f$dist$2f$html$2d$parse$2d$stringify$2e$module$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/html-parse-stringify/dist/html-parse-stringify.module.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-i18next/dist/es/utils.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$defaults$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-i18next/dist/es/defaults.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$i18nInstance$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-i18next/dist/es/i18nInstance.js [app-rsc] (ecmascript)");
;
;
;
;
;
const hasChildren = (node, checkLength)=>{
    if (!node) return false;
    const base = node.props?.children ?? node.children;
    if (checkLength) return base.length > 0;
    return !!base;
};
const getChildren = (node)=>{
    if (!node) return [];
    const children = node.props?.children ?? node.children;
    return node.props?.i18nIsDynamicList ? getAsArray(children) : children;
};
const hasValidReactChildren = (children)=>Array.isArray(children) && children.every(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isValidElement"]);
const getAsArray = (data)=>Array.isArray(data) ? data : [
        data
    ];
const mergeProps = (source, target)=>{
    const newTarget = {
        ...target
    };
    newTarget.props = Object.assign(source.props, target.props);
    return newTarget;
};
const nodesToString = (children, i18nOptions, i18n, i18nKey)=>{
    if (!children) return '';
    let stringNode = '';
    const childrenArray = getAsArray(children);
    const keepArray = i18nOptions?.transSupportBasicHtmlNodes ? i18nOptions.transKeepBasicHtmlNodesFor ?? [] : [];
    childrenArray.forEach((child, childIndex)=>{
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isString"])(child)) {
            stringNode += `${child}`;
            return;
        }
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isValidElement"])(child)) {
            const { props, type } = child;
            const childPropsCount = Object.keys(props).length;
            const shouldKeepChild = keepArray.indexOf(type) > -1;
            const childChildren = props.children;
            if (!childChildren && shouldKeepChild && !childPropsCount) {
                stringNode += `<${type}/>`;
                return;
            }
            if (!childChildren && (!shouldKeepChild || childPropsCount) || props.i18nIsDynamicList) {
                stringNode += `<${childIndex}></${childIndex}>`;
                return;
            }
            if (shouldKeepChild && childPropsCount === 1 && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isString"])(childChildren)) {
                stringNode += `<${type}>${childChildren}</${type}>`;
                return;
            }
            const content = nodesToString(childChildren, i18nOptions, i18n, i18nKey);
            stringNode += `<${childIndex}>${content}</${childIndex}>`;
            return;
        }
        if (child === null) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["warn"])(i18n, 'TRANS_NULL_VALUE', `Passed in a null value as child`, {
                i18nKey
            });
            return;
        }
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isObject"])(child)) {
            const { format, ...clone } = child;
            const keys = Object.keys(clone);
            if (keys.length === 1) {
                const value = format ? `${keys[0]}, ${format}` : keys[0];
                stringNode += `{{${value}}}`;
                return;
            }
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["warn"])(i18n, 'TRANS_INVALID_OBJ', `Invalid child - Object should only have keys {{ value, format }} (format is optional).`, {
                i18nKey,
                child
            });
            return;
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["warn"])(i18n, 'TRANS_INVALID_VAR', `Passed in a variable like {number} - pass variables for interpolation as full objects like {{number}}.`, {
            i18nKey,
            child
        });
    });
    return stringNode;
};
const renderNodes = (children, targetString, i18n, i18nOptions, combinedTOpts, shouldUnescape)=>{
    if (targetString === '') return [];
    const keepArray = i18nOptions.transKeepBasicHtmlNodesFor || [];
    const emptyChildrenButNeedsHandling = targetString && new RegExp(keepArray.map((keep)=>`<${keep}`).join('|')).test(targetString);
    if (!children && !emptyChildrenButNeedsHandling && !shouldUnescape) return [
        targetString
    ];
    const data = {};
    const getData = (childs)=>{
        const childrenArray = getAsArray(childs);
        childrenArray.forEach((child)=>{
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isString"])(child)) return;
            if (hasChildren(child)) getData(getChildren(child));
            else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isObject"])(child) && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isValidElement"])(child)) Object.assign(data, child);
        });
    };
    getData(children);
    const ast = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$html$2d$parse$2d$stringify$2f$dist$2f$html$2d$parse$2d$stringify$2e$module$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].parse(`<0>${targetString}</0>`);
    const opts = {
        ...data,
        ...combinedTOpts
    };
    const renderInner = (child, node, rootReactNode)=>{
        const childs = getChildren(child);
        const mappedChildren = mapAST(childs, node.children, rootReactNode);
        return hasValidReactChildren(childs) && mappedChildren.length === 0 || child.props?.i18nIsDynamicList ? childs : mappedChildren;
    };
    const pushTranslatedJSX = (child, inner, mem, i, isVoid)=>{
        if (child.dummy) {
            child.children = inner;
            mem.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cloneElement"])(child, {
                key: i
            }, isVoid ? undefined : inner));
        } else {
            mem.push(...__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Children"].map([
                child
            ], (c)=>{
                const props = {
                    ...c.props
                };
                delete props.i18nIsDynamicList;
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createElement"])(c.type, {
                    ...props,
                    key: i,
                    ref: c.ref
                }, isVoid ? null : inner);
            }));
        }
    };
    const mapAST = (reactNode, astNode, rootReactNode)=>{
        const reactNodes = getAsArray(reactNode);
        const astNodes = getAsArray(astNode);
        return astNodes.reduce((mem, node, i)=>{
            const translationContent = node.children?.[0]?.content && i18n.services.interpolator.interpolate(node.children[0].content, opts, i18n.language);
            if (node.type === 'tag') {
                let tmp = reactNodes[parseInt(node.name, 10)];
                if (rootReactNode.length === 1 && !tmp) tmp = rootReactNode[0][node.name];
                if (!tmp) tmp = {};
                const child = Object.keys(node.attrs).length !== 0 ? mergeProps({
                    props: node.attrs
                }, tmp) : tmp;
                const isElement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isValidElement"])(child);
                const isValidTranslationWithChildren = isElement && hasChildren(node, true) && !node.voidElement;
                const isEmptyTransWithHTML = emptyChildrenButNeedsHandling && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isObject"])(child) && child.dummy && !isElement;
                const isKnownComponent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isObject"])(children) && Object.hasOwnProperty.call(children, node.name);
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isString"])(child)) {
                    const value = i18n.services.interpolator.interpolate(child, opts, i18n.language);
                    mem.push(value);
                } else if (hasChildren(child) || isValidTranslationWithChildren) {
                    const inner = renderInner(child, node, rootReactNode);
                    pushTranslatedJSX(child, inner, mem, i);
                } else if (isEmptyTransWithHTML) {
                    const inner = mapAST(reactNodes, node.children, rootReactNode);
                    pushTranslatedJSX(child, inner, mem, i);
                } else if (Number.isNaN(parseFloat(node.name))) {
                    if (isKnownComponent) {
                        const inner = renderInner(child, node, rootReactNode);
                        pushTranslatedJSX(child, inner, mem, i, node.voidElement);
                    } else if (i18nOptions.transSupportBasicHtmlNodes && keepArray.indexOf(node.name) > -1) {
                        if (node.voidElement) {
                            mem.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createElement"])(node.name, {
                                key: `${node.name}-${i}`
                            }));
                        } else {
                            const inner = mapAST(reactNodes, node.children, rootReactNode);
                            mem.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createElement"])(node.name, {
                                key: `${node.name}-${i}`
                            }, inner));
                        }
                    } else if (node.voidElement) {
                        mem.push(`<${node.name} />`);
                    } else {
                        const inner = mapAST(reactNodes, node.children, rootReactNode);
                        mem.push(`<${node.name}>${inner}</${node.name}>`);
                    }
                } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isObject"])(child) && !isElement) {
                    const content = node.children[0] ? translationContent : null;
                    if (content) mem.push(content);
                } else {
                    pushTranslatedJSX(child, translationContent, mem, i, node.children.length !== 1 || !translationContent);
                }
            } else if (node.type === 'text') {
                const wrapTextNodes = i18nOptions.transWrapTextNodes;
                const content = shouldUnescape ? i18nOptions.unescape(i18n.services.interpolator.interpolate(node.content, opts, i18n.language)) : i18n.services.interpolator.interpolate(node.content, opts, i18n.language);
                if (wrapTextNodes) {
                    mem.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createElement"])(wrapTextNodes, {
                        key: `${node.name}-${i}`
                    }, content));
                } else {
                    mem.push(content);
                }
            }
            return mem;
        }, []);
    };
    const result = mapAST([
        {
            dummy: true,
            children: children || []
        }
    ], ast, getAsArray(children || []));
    return getChildren(result[0]);
};
const fixComponentProps = (component, index, translation)=>{
    const componentKey = component.key || index;
    const comp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cloneElement"])(component, {
        key: componentKey
    });
    if (!comp.props || !comp.props.children || translation.indexOf(`${index}/>`) < 0 && translation.indexOf(`${index} />`) < 0) {
        return comp;
    }
    function Componentized() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createElement"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Fragment"], null, comp);
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createElement"])(Componentized, {
        key: componentKey
    });
};
const generateArrayComponents = (components, translation)=>components.map((c, index)=>fixComponentProps(c, index, translation));
const generateObjectComponents = (components, translation)=>{
    const componentMap = {};
    Object.keys(components).forEach((c)=>{
        Object.assign(componentMap, {
            [c]: fixComponentProps(components[c], c, translation)
        });
    });
    return componentMap;
};
const generateComponents = (components, translation, i18n, i18nKey)=>{
    if (!components) return null;
    if (Array.isArray(components)) {
        return generateArrayComponents(components, translation);
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isObject"])(components)) {
        return generateObjectComponents(components, translation);
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["warnOnce"])(i18n, 'TRANS_INVALID_COMPONENTS', `<Trans /> "components" prop expects an object or array`, {
        i18nKey
    });
    return null;
};
function Trans({ children, count, parent, i18nKey, context, tOptions = {}, values, defaults, components, ns, i18n: i18nFromProps, t: tFromProps, shouldUnescape, ...additionalProps }) {
    const i18n = i18nFromProps || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$i18nInstance$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getI18n"])();
    if (!i18n) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["warnOnce"])(i18n, 'NO_I18NEXT_INSTANCE', `Trans: You need to pass in an i18next instance using i18nextReactModule`, {
            i18nKey
        });
        return children;
    }
    const t = tFromProps || i18n.t.bind(i18n) || ((k)=>k);
    const reactI18nextOptions = {
        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$defaults$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getDefaults"])(),
        ...i18n.options?.react
    };
    let namespaces = ns || t.ns || i18n.options?.defaultNS;
    namespaces = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isString"])(namespaces) ? [
        namespaces
    ] : namespaces || [
        'translation'
    ];
    const nodeAsString = nodesToString(children, reactI18nextOptions, i18n, i18nKey);
    const defaultValue = defaults || nodeAsString || reactI18nextOptions.transEmptyNodeValue || i18nKey;
    const { hashTransKey } = reactI18nextOptions;
    const key = i18nKey || (hashTransKey ? hashTransKey(nodeAsString || defaultValue) : nodeAsString || defaultValue);
    if (i18n.options?.interpolation?.defaultVariables) {
        values = values && Object.keys(values).length > 0 ? {
            ...values,
            ...i18n.options.interpolation.defaultVariables
        } : {
            ...i18n.options.interpolation.defaultVariables
        };
    }
    const interpolationOverride = values || count !== undefined && !i18n.options?.interpolation?.alwaysFormat || !children ? tOptions.interpolation : {
        interpolation: {
            ...tOptions.interpolation,
            prefix: '#$?',
            suffix: '?$#'
        }
    };
    const combinedTOpts = {
        ...tOptions,
        context: context || tOptions.context,
        count,
        ...values,
        ...interpolationOverride,
        defaultValue,
        ns: namespaces
    };
    const translation = key ? t(key, combinedTOpts) : defaultValue;
    const generatedComponents = generateComponents(components, translation, i18n, i18nKey);
    const content = renderNodes(generatedComponents || children, translation, i18n, reactI18nextOptions, combinedTOpts, shouldUnescape);
    const useAsParent = parent ?? reactI18nextOptions.defaultTransParent;
    return useAsParent ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createElement"])(useAsParent, additionalProps, content) : content;
}
}}),
"[project]/apps/aihio/node_modules/lucide-react/dist/esm/icons/menu.js [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s({
    "__iconNode": (()=>__iconNode),
    "default": (()=>Menu)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/aihio/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-rsc] (ecmascript)");
;
const __iconNode = [
    [
        "line",
        {
            x1: "4",
            x2: "20",
            y1: "12",
            y2: "12",
            key: "1e0a9i"
        }
    ],
    [
        "line",
        {
            x1: "4",
            x2: "20",
            y1: "6",
            y2: "6",
            key: "1owob3"
        }
    ],
    [
        "line",
        {
            x1: "4",
            x2: "20",
            y1: "18",
            y2: "18",
            key: "yk5zj1"
        }
    ]
];
const Menu = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])("menu", __iconNode);
;
 //# sourceMappingURL=menu.js.map
}}),
"[project]/apps/aihio/node_modules/lucide-react/dist/esm/icons/menu.js [app-rsc] (ecmascript) <export default as Menu>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "Menu": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])
});
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/aihio/node_modules/lucide-react/dist/esm/icons/menu.js [app-rsc] (ecmascript)");
}}),

};

//# sourceMappingURL=_302d5f9a._.js.map