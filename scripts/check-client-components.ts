import fs from "fs"
import { glob } from "glob"

/**
 * Checks if a file contains React hooks but is missing the "use client" directive
 */
async function checkClientComponents() {
  // Get all TypeScript and TSX files
  const files = await glob("**/*.{ts,tsx}", {
    ignore: ["node_modules/**", ".next/**", "scripts/**", "**/*.d.ts"],
  })

  const reactHooks = [
    "useState",
    "useEffect",
    "useContext",
    "useReducer",
    "useCallback",
    "useMemo",
    "useRef",
    "useImperativeHandle",
    "useLayoutEffect",
    "useDebugValue",
    "useTransition",
    "useDeferredValue",
    "useId",
    "useSearchParams",
    "usePathname",
    "useRouter",
    "useFormState",
    "useFormStatus",
    "useOptimistic",
    "useActionState",
  ]

  const hookRegex = new RegExp(`\\b(${reactHooks.join("|")})\\b`, "g")
  const useClientRegex = /['"]use client['"]/

  const issues = []

  for (const file of files) {
    // Skip files in the api directory as they don't need "use client"
    if (file.includes("/api/") || file.includes("\\api\\")) continue

    const content = fs.readFileSync(file, "utf8")

    // Check if file contains React hooks
    const hasHooks = hookRegex.test(content)

    // Check if file has "use client" directive
    const hasUseClient = useClientRegex.test(content)

    // If file has hooks but no "use client" directive, report it
    if (hasHooks && !hasUseClient) {
      issues.push(file)
    }
  }

  return issues
}

// Run the check
checkClientComponents().then((issues) => {
  if (issues.length > 0) {
    console.error('❌ Found components using React hooks without "use client" directive:')
    issues.forEach((file) => console.error(`  - ${file}`))
    process.exit(1)
  } else {
    console.log('✅ All components using React hooks have "use client" directive')
    process.exit(0)
  }
})

