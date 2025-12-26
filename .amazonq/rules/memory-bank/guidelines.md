# Development Guidelines and Standards

## Code Quality Standards

### TypeScript Usage
- **Strict Type Safety**: Use explicit types for function parameters and return values
- **Type Guards**: Implement runtime type checking for external data (GraphQL responses)
- **Null Safety**: Handle null/undefined values explicitly with optional chaining and nullish coalescing
- **Generic Types**: Use generics for reusable functions like `graphqlRequest<T>`

### Error Handling Patterns
- **Service Layer**: Always wrap GraphQL calls in try-catch blocks
- **Error Propagation**: Re-throw errors from services to allow higher-level handling
- **Graceful Degradation**: Provide fallback behavior when API calls fail
- **Error Logging**: Use console.warn for non-critical errors, console.error for critical failures

### Data Transformation Standards
- **Raw Data Processing**: Transform external API data into internal types immediately
- **Type Conversion**: Explicitly convert types (String(), Number(), Boolean()) rather than implicit coercion
- **Null Handling**: Use nullish coalescing (??) for default values
- **Array Safety**: Check Array.isArray() before array operations

## Structural Conventions

### File Organization
- **Service Files**: Export async functions with descriptive names (fetchLaunches, addUserService)
- **Type Definitions**: Co-locate types with their usage, import with `type` keyword
- **Query Separation**: Keep GraphQL queries in separate files from services
- **Default Exports**: Use default exports for main components, named exports for utilities

### Naming Conventions
- **Functions**: Use verb-noun pattern (fetchUsers, deleteUserService)
- **Types**: Use PascalCase for interfaces and types (User, Launch, FetchUsersArgs)
- **Variables**: Use camelCase with descriptive names (launchesRaw, flickr_images)
- **Constants**: Use UPPER_SNAKE_CASE for module-level constants (GRAPHQL_ENDPOINT)

### Import/Export Patterns
- **Type Imports**: Use `import type` for TypeScript types
- **Relative Imports**: Use relative paths for local modules
- **Barrel Exports**: Group related exports in index files
- **Named Imports**: Prefer named imports over default imports for utilities

## Implementation Patterns

### Service Layer Architecture
```typescript
// Standard service function pattern
export async function fetchResource({ param1, param2 = defaultValue }: ArgsType): Promise<ReturnType | undefined> {
    try {
        const data = await graphqlRequest<ResponseType>(QUERY, variables);
        return transformData(data);
    } catch (err) {
        throw err; // Re-throw for higher-level handling
    }
}
```

### Data Transformation Pattern
```typescript
// Transform external data to internal types
const transformed = rawData.map((raw) => {
    const r = raw as Record<string, any>;
    return {
        id: String(r.id ?? ''),
        name: r.name ?? '',
        active: typeof r.active === 'boolean' ? r.active : null,
    } as InternalType;
});
```

### GraphQL Client Usage
```typescript
// Generic GraphQL request with proper typing
const data = await graphqlRequest<{ resource: Array<Record<string, unknown>> }>(
    QUERY, 
    variables
);
```

### React Router Configuration
```typescript
// Declarative routing with layout wrapper
<BrowserRouter>
    <MainLayout>
        <Routes>
            <Route path="/" element={<Navigate to="/default" replace />} />
            <Route path="/resource" element={<ResourcePage />} />
            <Route path="/resource/:id" element={<ResourceDetailPage />} />
        </Routes>
    </MainLayout>
</BrowserRouter>
```

## Testing Standards

### E2E Testing Patterns
- **Test Data Attributes**: Use `data-testid` attributes for reliable element selection
- **Network Assertions**: Wait for specific GraphQL requests using `waitForResponse`
- **Timeout Handling**: Set generous timeouts for network-dependent operations (5000ms)
- **Content Validation**: Verify both presence and content of rendered elements

### Test Structure
```typescript
test('descriptive test name', async ({ page }) => {
    await page.goto('url');
    await page.waitForSelector('[data-testid="element"]');
    
    // Perform actions
    await page.selectOption('[data-testid="select"]', 'value');
    await page.click('[data-testid="button"]');
    
    // Wait for network response
    await page.waitForResponse(response => {
        // Network assertion logic
    });
    
    // Verify results
    const elements = page.locator('[data-testid="result"]');
    expect(await elements.count()).toBeGreaterThan(0);
});
```

## API Integration Patterns

### GraphQL Error Handling
- **Network Errors**: Check response.ok before parsing JSON
- **GraphQL Errors**: Check body.errors array and extract messages
- **Type Safety**: Use generic types for expected response structure
- **Logging**: Log requests and responses for debugging

### Variable Handling
- **Optional Parameters**: Use object destructuring with defaults
- **Conditional Variables**: Only add variables to request if they have valid values
- **Type Conversion**: Convert boolean filters to string format when required by API

## Code Idioms

### Frequently Used Patterns
- **Optional Chaining**: `data?.property?.nested` for safe property access
- **Nullish Coalescing**: `value ?? defaultValue` for default assignment
- **Type Assertions**: `raw as Record<string, any>` for dynamic data
- **Array Filtering**: Chain `.filter()` and `.map()` for data processing
- **Conditional Logic**: Use ternary operators for simple conditional assignments